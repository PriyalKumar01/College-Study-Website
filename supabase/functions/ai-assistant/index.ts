import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── CORS ─────────────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Config ───────────────────────────────────────────────────
const ACCESS_CODE = Deno.env.get("AI_ACCESS_CODE") || "";
const MAX_QUERIES_PER_DAY = 10;

// ── Token Hashing Helper ─────────────────────────────────────
async function hashToken(token: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ── Access Validation Helper ─────────────────────────────────
async function validateAccess(accessCode?: string, sessionToken?: string): Promise<boolean> {
  if (accessCode && accessCode.trim() === ACCESS_CODE) {
    return true;
  }
  if (sessionToken) {
    try {
      const tokenHash = await hashToken(sessionToken);
      const { data, error } = await supabaseAdmin
        .from("ai_sessions")
        .select("token_hash, expires_at")
        .eq("token_hash", tokenHash)
        .gt("expires_at", new Date().toISOString())
        .maybeSingle();

      if (!error && data) {
        return true;
      }
    } catch {
      // ai_sessions table may not exist yet or failed
    }
  }
  return false;
}

// ── Supabase Admin Client ────────────────────────────────────
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// ── Rate Limit Check ─────────────────────────────────────────
async function checkRateLimit(userEmail: string): Promise<{ allowed: boolean; count: number }> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const todayStart = `${today}T00:00:00.000Z`;
    const todayEnd = `${today}T23:59:59.999Z`;

    const { count, error } = await supabaseAdmin
      .from("ai_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("user_email", userEmail)
      .gte("created_at", todayStart)
      .lte("created_at", todayEnd);

    if (error) {
      console.error("Rate limit check error:", error);
      return { allowed: true, count: 0 };
    }

    const currentCount = count ?? 0;
    return { allowed: currentCount < MAX_QUERIES_PER_DAY, count: currentCount };
  } catch (e) {
    console.error("Rate limit exception:", e);
    return { allowed: true, count: 0 };
  }
}

// ── Log to rate limit table ──────────────────────────────────
async function logQuery(userEmail: string, queryType: string, queryText: string) {
  try {
    await supabaseAdmin.from("ai_rate_limits").insert({
      user_email: userEmail,
      query_text: queryText?.slice(0, 500),
      response_type: queryType,
    });
  } catch (e) {
    console.error("Log error:", e);
  }
}

// ── OpenAI Call ──────────────────────────────────────────────
async function callOpenAI(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content ?? "Sorry, no response received.";
}

// ── Gemini Call ──────────────────────────────────────────────
async function callGemini(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Active Gemini models
  const models = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
  let lastError = null;

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.7,
            },
          }),
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errText = await response.text();
        console.warn(`Gemini ${model} error ${response.status}:`, errText);
        lastError = new Error(`Gemini ${model} error ${response.status}: ${errText}`);
      }
    } catch (e) {
      console.warn(`Gemini ${model} fetch exception:`, e);
      lastError = e;
    }
  }

  throw lastError ?? new Error("Gemini generation failed");
}

// ── AI Call with Fallback (Gemini primary -> OpenAI fallback) ──
async function callAI(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>
): Promise<{ text: string; modelUsed: string; fallbackUsed: boolean }> {
  let lastError: unknown = null;

  // 1. Primary: Try Gemini
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (geminiKey) {
    try {
      const text = await callGemini(systemPrompt, messages);
      if (text && text.trim().length > 0) {
        return { text, modelUsed: "gemini-flash", fallbackUsed: false };
      }
    } catch (geminiErr) {
      console.warn("Gemini call failed, switching to OpenAI fallback:", geminiErr);
      lastError = geminiErr;
    }
  }

  // 2. Fallback: Try OpenAI GPT
  const openAiKey = Deno.env.get("OPENAI_API_KEY");
  if (openAiKey) {
    try {
      const text = await callOpenAI(systemPrompt, messages);
      if (text && text.trim().length > 0) {
        return { text, modelUsed: "gpt-4o-mini", fallbackUsed: true };
      }
// [rag-build-step 2/5]: refactor(ai-assistant): enforce strict English response in system prompt