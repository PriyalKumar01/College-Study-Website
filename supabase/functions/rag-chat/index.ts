import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── CORS Headers ─────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Supabase Admin Client ────────────────────────────────────
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const MAX_QUERIES_PER_DAY = 10;
const EMBEDDING_DIMENSION = 768;

// ── Token Hashing ────────────────────────────────────────────
async function hashToken(token: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ── Verify Session Token ─────────────────────────────────────
async function verifySessionToken(token?: string | null): Promise<{ valid: boolean; identifier?: string }> {
  if (!token) return { valid: false };

  try {
    const tokenHash = await hashToken(token);
    const { data, error } = await supabaseAdmin
      .from("ai_sessions")
      .select("token_hash, expires_at, identifier")
      .eq("token_hash", tokenHash)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error || !data) {
      return { valid: false };
    }

    return { valid: true, identifier: data.identifier || "anonymous" };
  } catch (err) {
    console.error("Session verification error:", err);
    return { valid: false };
  }
}

// ── Server-Side Daily Rate Limit Check ───────────────────────
async function checkDailyRateLimit(identifier: string): Promise<{ allowed: boolean; count: number }> {
  const today = new Date().toISOString().split("T")[0];

  try {
    const { data, error } = await supabaseAdmin
      .from("ai_usage")
      .select("count")
      .eq("identifier", identifier)
      .eq("usage_date", today)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.warn("Usage lookup warning:", error);
    }

    const currentCount = data?.count ?? 0;
    return {
      allowed: currentCount < MAX_QUERIES_PER_DAY,
      count: currentCount,
    };
  } catch (e) {
    console.error("Rate limit check error:", e);
    return { allowed: true, count: 0 };
  }
}

async function incrementDailyUsage(identifier: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0];

  try {
    const { data: existing } = await supabaseAdmin
      .from("ai_usage")
      .select("count")
      .eq("identifier", identifier)
      .eq("usage_date", today)
      .maybeSingle();

    const newCount = (existing?.count ?? 0) + 1;

    await supabaseAdmin
      .from("ai_usage")
      .upsert({
        identifier,
        usage_date: today,
        count: newCount,
      });

    return newCount;
  } catch (e) {
    console.error("Increment usage error:", e);
    return 1;
  }
}

// ── Cached Response Layer (Matching Phase 1 logic) ───────────
function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const GREETING_WORDS = new Set(["hi", "hello", "hey", "namaste", "hii", "helo", "greetings"]);

const CACHED_ENTRIES = [
  {
    keywords: ["notes contribute", "contribute notes", "notes submit", "notes upload"],
    response: `📝 **Notes Contribution Process:**\n\nTo contribute notes, **Admin Access** is required.\n1. Contact Founder Priyal Kumar on WhatsApp (+91 89572 21543).\n2. Share your name, branch, and semester so Admin Portal access can be granted.\n3. After review, your notes will go live and you'll earn **StudyCoins** on the [Notes Contributors](/notes-contributors) leaderboard!`,
  },
  {
    keywords: ["admin kaise bane", "admin access", "admin banana", "admin banna"],
    response: `🔐 **Admin Access:**\nFor Admin Access, contact Founder Priyal Kumar directly on WhatsApp (+91 89572 21543). As an admin, you can review and upload notes, manage opportunities, and publish scholarships.`,
  },
  {
    keywords: ["premium kaise lein", "premium access", "premium buy", "premium plans"],
    response: `💎 **College Study Hub Premium:**\n- [Company Directory & HR Emails](/premium-directory)\n- [Career Roadmaps](/premium-content)\n- [GATE Study Hub](/gate-study)\n- [ATS Resume Builder](/ats-resume)\nCheckout via secure Razorpay. For special student discounts, contact Founder Priyal Kumar (+91 89572 21543).`,
  },
  {
    keywords: ["cgpa calculator", "sgpa calculator", "calculate cgpa"],
    response: `📊 **CGPA / SGPA Calculator:**\nDirect link: [CGPA Calculator](/cgpa-calculator)\nFeatures: Calibrated to HBTU Kanpur's 10-point relative grading scale for semester-wise SGPA and cumulative CGPA.`,
  },
  {
    keywords: ["scholarship", "scholarship portal", "scholarship list", "scholarship kahan"],
    response: `🏆 **Scholarships Portal:**\nDirect link: [Scholarships Portal](/scholarship-portal)\nBrowse UP Post-Matric scholarships, corporate CSR grants, and Buddy4Study scholarship opportunities with upcoming deadlines.`,
  },
  {
    keywords: ["up scholarship", "scholarship up", "scholarship.up.gov.in"],
    response: `🏛️ **UP Scholarship & Fee Reimbursement:**\nOfficial portal: [scholarship.up.gov.in](https://scholarship.up.gov.in/index.aspx)\nCategory: Post-Matric Other Than Inter for engineering and management programs. Mandatory hard copy submission is required in the university scholarship office.`,
  },
  {
    keywords: ["digi shakti", "tablet portal", "tablet yojana", "digishakti", "ekyc tablet"],
    response: `📱 **Digi Shakti UP Free Tablet / Smartphone Scheme:**\nPortal: [digishakti.up.gov.in](https://digishakti.up.gov.in/). Once your data is uploaded by the university, verify your records on the portal and complete eKYC.`,
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "hii", "helo"],
    response: `👋 **Hello! Welcome to College Study Assistant!**\nI am your official academic AI assistant. Ask me anything about notes, past year question papers (PYQs), university portals (ERP, Attendance), scholarships, or resume ATS scoring! 😊`,
  },
];

function findServerCachedResponse(query: string): string | null {
  const norm = normalizeQuery(query);
  if (!norm) return null;

  const words = norm.split(/\s+/).filter(Boolean);
  let bestMatch: { response: string; score: number } | null = null;

  for (const item of CACHED_ENTRIES) {
    let entryScore = 0;
    for (const kw of item.keywords) {
      const normKw = normalizeQuery(kw);
      const kwWords = normKw.split(/\s+/).filter(Boolean);
      const isGreeting = kwWords.every((w) => GREETING_WORDS.has(w));

      if (isGreeting && words.length > 3) continue;

      if (norm === normKw) {
        const score = 100 + normKw.length * 2;
        if (score > entryScore) entryScore = score;
        continue;
      }

      const pattern = new RegExp(`\\b${normKw}\\b`, "i");
      if (pattern.test(norm)) {
        const score = kwWords.length * 15 + normKw.length * 2;
        if (score > entryScore) entryScore = score;
      }
    }

    if (entryScore > 0) {
      if (!bestMatch || entryScore > bestMatch.score) {
        bestMatch = { response: item.response, score: entryScore };
      }
    }
  }

  return bestMatch && bestMatch.score >= 5 ? bestMatch.response : null;
}

// ── Query Embedding ──────────────────────────────────────────
async function getQueryEmbedding(query: string, apiKey: string): Promise<number[]> {
  const models = ["gemini-embedding-001", "gemini-embedding-2"];
  let lastErr: unknown = null;

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: `models/${model}`,
            content: { parts: [{ text: query }] },
            taskType: "RETRIEVAL_QUERY",
            outputDimensionality: EMBEDDING_DIMENSION,
          }),
        }
      );
      clearTimeout(timeoutId);

      if (resp.ok) {
        const data = await resp.json();
        const vals = data.embedding?.values;
        if (Array.isArray(vals) && vals.length > 0) {
          return vals.slice(0, EMBEDDING_DIMENSION);
        }
      } else {
        const errBody = await resp.text();
        console.warn(`Embedding model ${model} status ${resp.status}:`, errBody);
        lastErr = new Error(`Embedding status: ${resp.status}`);
      }
    } catch (e) {
      console.warn(`Embedding ${model} fetch exception:`, e);
      lastErr = e;
    }
  }

  throw lastErr ?? new Error("Failed to embed query");
}

// ── LLM Calls (Gemini primary -> OpenAI fallback) ────────────
async function callGemini(
  systemInstruction: string,
  messages: Array<{ role: string; content: string }>,
  apiKey: string
): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Active working Gemini models verified for this API key
  const models = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
  let lastErr: unknown = null;

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
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents,
            generationConfig: {
              maxOutputTokens: 1200,
              temperature: 0.3,
            },
          }),
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) return text;
      } else {
        const errText = await response.text();
        console.warn(`Gemini ${model} ${response.status}:`, errText);
        lastErr = new Error(`Gemini ${model} ${response.status}: ${errText}`);
      }
    } catch (e) {
      console.warn(`Gemini ${model} fetch error:`, e);
      lastErr = e;
    }
  }

  throw lastErr ?? new Error("Gemini generation failed");
}

async function callOpenAI(
  systemInstruction: string,
  messages: Array<{ role: string; content: string }>,
  apiKey: string
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    signal: controller.signal,
// [rag-build-step 23/45]: feat(rag-chat): trigger GPT fallback on empty Gemini responses