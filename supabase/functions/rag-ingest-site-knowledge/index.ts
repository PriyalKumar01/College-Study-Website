import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const EMBEDDING_DIMENSION = 768;
const EMBEDDING_MODEL = "gemini-embedding-001";
const FALLBACK_EMBEDDING_MODEL = "gemini-embedding-2";

// ── Embed helper ─────────────────────────────────────────────
async function getGeminiEmbedding(text: string, apiKey: string): Promise<number[]> {
  const models = [EMBEDDING_MODEL, FALLBACK_EMBEDDING_MODEL];
  let lastError: unknown = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: `models/${model}`,
            content: { parts: [{ text }] },
            taskType: "RETRIEVAL_DOCUMENT",
            outputDimensionality: EMBEDDING_DIMENSION,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const values = data.embedding?.values;
        if (Array.isArray(values) && values.length > 0) {
          return values.slice(0, EMBEDDING_DIMENSION);
        }
      } else {
        lastError = new Error(`Embedding error: ${response.status}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError ?? new Error("Gemini embedding failed");
}

// ── Verified Knowledge Chunks (Sanitized: NO secrets/coupons) ─
const SITE_KNOWLEDGE_CHUNKS = [
  {
// [rag-build-step 4/15]: feat(site-ingest): extract BTECH_NOTES curriculum structure into chunks