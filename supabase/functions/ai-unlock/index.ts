import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBuf = enc.encode(a);
  const bBuf = enc.encode(b);
  if (aBuf.byteLength !== bBuf.byteLength) {
    let diff = 1;
    for (let i = 0; i < aBuf.byteLength; i++) {
      diff |= aBuf[i] ^ aBuf[i % Math.max(bBuf.byteLength, 1)];
    }
    return false;
  }
  let diff = 0;
  for (let i = 0; i < aBuf.byteLength; i++) {
    diff |= aBuf[i] ^ bBuf[i];
  }
  return diff === 0;
}

async function hashToken(token: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { accessCode, userEmail } = body;

    const expectedCode = Deno.env.get("AI_ACCESS_CODE") || "";
    const providedCode = (accessCode || "").trim();

    if (!providedCode || !timingSafeEqual(providedCode, expectedCode)) {
      return new Response(
        JSON.stringify({
          success: false,
          valid: false,
          error: "Invalid access code. Please contact Priyal Kumar sir for beta access.",
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate random 256-bit secure session token
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    const sessionToken = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const tokenHash = await hashToken(sessionToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
    const identifier = userEmail ? userEmail.toLowerCase() : "anonymous";

    const { error: dbError } = await supabaseAdmin.from("ai_sessions").insert({
      token_hash: tokenHash,
      created_at: new Date().toISOString(),
      expires_at: expiresAt,
      identifier,
    });

    if (dbError) {
      console.error("Failed to store ai_session:", dbError);
      throw new Error("Failed to register session");
    }

    return new Response(
      JSON.stringify({
        success: true,
        valid: true,
        sessionToken,
        expiresAt,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unlock failed";
    console.error("ai-unlock error:", msg);
    return new Response(
// [rag-build-step 19/20]: test(ai-unlock): validate rejection of invalid access code