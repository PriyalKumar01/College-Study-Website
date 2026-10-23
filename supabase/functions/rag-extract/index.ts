import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import JSZip from "https://esm.sh/jszip@3.10.1";
import { extractText, getDocumentProxy } from "https://esm.sh/unpdf@0.12.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_EXTRACTED_CHARS = 14000;

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/(\b[A-Za-z]{2,})-\n([A-Za-z]{2,}\b)/g, "$1$2")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { fileBase64, fileName = "file.pdf", mimeType } = body;

    if (!fileBase64) {
      return new Response(
        JSON.stringify({ error: "fileBase64 is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const binaryStr = atob(fileBase64);
    const bytes = new Uint8Array(binaryStr.length);
// [rag-build-step 2/10]: feat(rag-extract): support base64 file payloads for chat attachment parsing