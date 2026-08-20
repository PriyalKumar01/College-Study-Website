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

// ── PDF Text Extraction & Analysis via Gemini Multimodal ────
async function extractAndAnalyzePDF(
  base64PDF: string,
  userQuery: string,
  fileName: string
): Promise<string> {
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  const isResume = fileName.toLowerCase().includes("resume") || 
                   fileName.toLowerCase().includes("cv") || 
                   userQuery.toLowerCase().includes("ats") || 
                   userQuery.toLowerCase().includes("resume");
  
  if (geminiKey) {
    try {
      const systemInstruction = isResume
        ? `You are an expert ATS (Applicant Tracking System) reviewer and hiring coach for college students and freshers.
Analyze the uploaded resume PDF in detail:
1. Scan all text, sections, technical skills, projects, work experience, education, and links (GitHub/LinkedIn).
2. Calculate an **ATS Score (0-100)** based on formatting, keyword density, and action-verb usage.
3. List **Matched Strengths** and **Missing Keywords/Skills** for modern tech roles.
4. Provide **Top 5 Actionable Improvements** and **2-3 High-Impact Bullet Points** the student can directly use.
Format cleanly in Hinglish with appropriate emojis. Never disclose any coupon codes.`
        : `You are an expert academic assistant for HBTU Kanpur students. 
You analyze exam question papers (PYQs), syllabus copies, and academic notes PDFs.
When given a PDF, identify:
1. Subject name and exam year (if visible)
2. Topic-wise distribution of questions
3. Most frequently repeated concepts
4. Top probable exam questions based on pattern analysis
Format your response clearly with numbered lists and sections in Hinglish. Never disclose any coupon codes.`;

      const promptText = isResume
        ? (userQuery || `Is resume PDF ko scan karo aur:
1. 🎯 **ATS Score: [0-100]** do
2. 💡 Key strengths & formatting review
3. ⚠️ Missing tech skills & keywords
4. 🚀 Top 5 specific improvement suggestions
5. ✍️ 2-3 ready-to-use resume bullet points do`)
        : (userQuery || `Is PDF ko analyze karo aur:
1. 📚 Subject aur topic identify karo
2. 🔄 Most repeated concepts nikalo  
3. ⭐ Top 10 most probable exam questions do (numbered list mein)
4. 💡 Preparation tips do`);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: base64PDF,
                  }
                },
                { text: promptText }
              ]
            }],
            generationConfig: {
              maxOutputTokens: 1500,
              temperature: 0.4,
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

  // Fallback
  return await callAI(
    "You are an academic assistant. The user has uploaded an academic/resume document. Provide a comprehensive structured evaluation.",
    [{ role: "user", content: `Document "${fileName}" uploaded. ${userQuery}` }]
  );
}

// ── ATS Resume Scoring (Direct PDF Scan or Text) ─────────────
async function scoreResume(
  resumeText: string,
  jobDescription: string,
  fileBase64?: string,
  fileName?: string
): Promise<string> {
  const geminiKey = Deno.env.get("GEMINI_API_KEY");

  const systemPrompt = `You are a Senior Technical Recruiter and ATS (Applicant Tracking System) Algorithm Specialist.
Analyze the candidate's resume against the Job Description with extreme precision.

Provide the response in the following exact format:

**ATS Score: [Calculate a precise score from 0 to 100 based on keyword match, relevance, formatting, and metrics]**

### 🎯 Matched Keywords:
(Comma-separated list of keywords and skills from the JD found in the resume)

### ⚠️ Missing Keywords:
(Comma-separated list of high-priority technical skills, frameworks, tools, or concepts from the JD NOT found in the resume)

### 📋 Section-by-Section Review:
- **Contact & Links**: Review contact details, LinkedIn, GitHub/Portfolio presence.
- **Education & Academics**: Degree, Branch, College (HBTU or similar), CGPA.
- **Technical Skills**: Relevance to the JD, categorization.
- **Projects & Experience**: Action verbs, quantifiable metrics, complexity.
- **ATS Formatting**: Single-column readability, standard fonts, no graphical tables.

### 💡 Top 5 Actionable Improvements:
1. ...
2. ...
3. ...
4. ...
5. ...

### ✍️ Tailored Sentences to Add:
(Provide 2-3 impact-driven bullet points in the format: [Action Verb] + [What was built/optimized] using [Technologies] resulting in [Quantifiable Impact %/Number] matching the JD)

Use natural Hinglish suitable for Indian engineering students. Be constructive and actionable.`;

  // 1. If PDF base64 is provided, pass directly to Gemini Multimodal
  if (fileBase64 && geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: fileBase64,
                  }
                },
                {
                  text: `**Target Job Description:**
${jobDescription || "General Software Development Engineer / Tech Fresher role (DSA, OOPs, Web/Backend, Databases, Problem Solving)"}

Please perform full ATS evaluation by scanning every word, project, skill, and formatting element in this PDF resume.`
                }
              ]
            }],
            generationConfig: {
              maxOutputTokens: 1800,
              temperature: 0.3,
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
      console.warn("Gemini multimodal ATS scoring failed, falling back to text:", e);
    }
  }

  // 2. Fallback to text-based evaluation
  const userMessage = `**Resume Content / Name:**
${resumeText || fileName || "Uploaded Resume"}

**Target Job Description:**
${jobDescription}

Please provide full ATS score and detailed analysis.`;

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
        const { resumeText, jobDescription, fileBase64, fileName } = body;
        if ((!resumeText && !fileBase64) || !jobDescription) {
          throw new Error("Resume (PDF file ya text) aur Job Description dono required hain");
        }

        response = await scoreResume(resumeText, jobDescription, fileBase64, fileName);
        await logQuery(email, "ats_score", `ATS: ${fileName || "Text"}`);
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
