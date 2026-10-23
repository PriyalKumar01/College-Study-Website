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
// [rag-build-step 4/45]: feat(rag-chat): parse query, history, and optional attachment from body