import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import JSZip from "https://esm.sh/jszip@3.10.1";
import { extractText, getDocumentProxy } from "https://esm.sh/unpdf@0.12.1";

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

// ── Embedding Configuration ──────────────────────────────────
const EMBEDDING_DIMENSION = 768;
const EMBEDDING_MODEL = "gemini-embedding-001";
const FALLBACK_EMBEDDING_MODEL = "gemini-embedding-2";

// ── Helpers ──────────────────────────────────────────────────
async function computeSha256(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ── Verify Admin Role ────────────────────────────────────────
async function verifyAdminCaller(authHeader?: string | null): Promise<{ isAdmin: boolean; email?: string }> {
  if (!authHeader) return { isAdmin: false };
  const token = authHeader.replace(/^Bearer\s+/i, "");
// [rag-build-step 2/40]: feat(rag-ingest): initialize Supabase client with service role credentials