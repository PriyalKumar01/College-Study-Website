import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── CORS ─────────────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Config ───────────────────────────────────────────────────
const ACCESS_CODE = "ACCESS#250";
const MAX_QUERIES_PER_DAY = 10;

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

  // Try gemini-flash-latest first, then gemini-3.7-flash
  const models = ["gemini-flash-latest", "gemini-3.7-flash"];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errText = await response.text();
        lastError = new Error(`Gemini ${model} error ${response.status}: ${errText}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError ?? new Error("Gemini generation failed");
}

// ── AI Call with Fallback ────────────────────────────────────
async function callAI(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  // 1. Try OpenAI if key is configured
  const openAiKey = Deno.env.get("OPENAI_API_KEY");
  if (openAiKey) {
    try {
      return await callOpenAI(systemPrompt, messages);
    } catch (openaiErr) {
      console.warn("OpenAI quota/call failed, switching to Gemini:", openaiErr);
    }
  }

  // 2. Try Gemini
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (geminiKey) {
    try {
      return await callGemini(systemPrompt, messages);
    } catch (geminiErr) {
      console.error("Gemini failed:", geminiErr);
    }
  }

  throw new Error("AI services are currently unavailable. Please try again shortly.");
}

// ── PDF Text Extraction via Gemini Vision ────────────────────
async function extractAndAnalyzePDF(
  base64PDF: string,
  userQuery: string,
  fileName: string
): Promise<string> {
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{
                text: `You are an expert academic assistant for HBTU Kanpur students. 
You analyze exam question papers (PYQs) and academic notes PDFs.
When given a PDF, identify:
1. Subject name and exam year (if visible)
2. Topic-wise distribution of questions
3. Most frequently repeated concepts
4. Top probable exam questions based on pattern analysis

Format your response clearly with numbered lists and sections.
Use Hinglish (mix of Hindi and English) for a friendly tone.
Do NOT disclose or mention any coupon codes or discount codes in responses.`
              }]
            },
            contents: [{
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: base64PDF,
                  }
                },
                {
                  text: userQuery || `Is PDF ko analyze karo aur:
1. 📚 Subject aur topic identify karo
2. 🔄 Most repeated concepts nikalo  
3. ⭐ Top 10 most probable exam questions do (numbered list mein)
4. 💡 Preparation tips do

Clearly formatted response do with emojis.`
                }
              ]
            }],
            generationConfig: {
              maxOutputTokens: 1500,
              temperature: 0.5,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (result) return result;
      }
    } catch (e) {
      console.error("Gemini PDF error:", e);
    }
  }

  // Fallback: use text instruction
  return await callAI(
    "You are an academic assistant. The user has uploaded an exam paper. Provide guidance on how to prepare for this subject and identify key high-weightage topics.",
    [{ role: "user", content: `Exam paper "${fileName}" uploaded. ${userQuery}` }]
  );
}

// ── ATS Resume Scoring ───────────────────────────────────────
async function scoreResume(resumeText: string, jobDescription: string): Promise<string> {
  const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst and career coach.
Analyze the resume against the job description and provide:

1. **ATS Score** (0-100): Based on keyword match, formatting, and relevance
2. **Matched Keywords**: Keywords from JD found in resume
3. **Missing Keywords**: Important JD keywords NOT in resume
4. **Section Analysis**: Quick review of each resume section
5. **Top 5 Improvement Suggestions**: Specific, actionable changes
6. **Tailored Sentences**: 2-3 bullet points student can directly add to resume

Format clearly with emojis and sections. Be encouraging but honest.
Respond in Hinglish for Indian students.`;

  const userMessage = `**Resume:**
${resumeText}

**Job Description:**
${jobDescription}

Please provide comprehensive ATS analysis.`;

  return await callAI(systemPrompt, [{ role: "user", content: userMessage }]);
}

// ── Main Handler ─────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type, userEmail, accessCode } = body;

    // Access code validation
    if (accessCode !== ACCESS_CODE) {
      return new Response(
        JSON.stringify({ error: "Invalid access code" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const email = userEmail || "anonymous";

    // Rate limit check
    if (type !== "cache_hit") {
      const { allowed, count } = await checkRateLimit(email);
      if (!allowed) {
        return new Response(
          JSON.stringify({
            error: "rate_limit_exceeded",
            message: `Aapne aaj ke ${MAX_QUERIES_PER_DAY} queries use kar liye hain. Kal phir milte hain! 🌙`,
            queriesUsed: count,
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    let response = "";

    switch (type) {
      case "chat": {
        const { query, systemPrompt, conversationHistory = [] } = body;
        if (!query) throw new Error("Query is required");

        const messages = [
          ...conversationHistory,
          { role: "user", content: query },
        ];

        response = await callAI(systemPrompt, messages);
        await logQuery(email, "chat", query);
        break;
      }

      case "pdf_analyze": {
        const { fileBase64, fileName, userQuery } = body;
        if (!fileBase64) throw new Error("File data required");

        response = await extractAndAnalyzePDF(fileBase64, userQuery, fileName ?? "document.pdf");
        await logQuery(email, "pdf_analyze", `PDF: ${fileName}`);
        break;
      }

      case "ats_score": {
        const { resumeText, jobDescription } = body;
        if (!resumeText || !jobDescription) {
          throw new Error("Resume text aur job description dono required hain");
        }

        response = await scoreResume(resumeText, jobDescription);
        await logQuery(email, "ats_score", "ATS Resume Analysis");
        break;
      }

      default:
        throw new Error(`Unknown request type: ${type}`);
    }

    return new Response(
      JSON.stringify({ response, success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("AI Assistant Edge Function Error:", message);

    return new Response(
      JSON.stringify({ error: message, success: false }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
