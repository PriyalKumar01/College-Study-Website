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
// [rag-build-step 13/20]: style(ai-unlock): add structured logging for verification attempts