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
// [rag-build-step 1/5]: refactor(ai-assistant): update edge function model to Gemini 3.5 Flash