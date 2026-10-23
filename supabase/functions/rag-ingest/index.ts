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
  if (!token) return { isAdmin: false };

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user?.email) return { isAdmin: false };

    const email = user.email.toLowerCase();
    if (email === "priyalkumar06@gmail.com") {
      return { isAdmin: true, email };
    }

    const { data: roleData } = await supabaseAdmin
      .from("admin_roles")
      .select("role")
      .eq("user_email", email)
      .neq("role", "removed")
      .maybeSingle();

    const role = roleData?.role;
    const isAdmin = role === "owner" || role === "super_admin" || role === "admin";
    return { isAdmin, email };
  } catch (err) {
    console.error("Admin verification error:", err);
    return { isAdmin: false };
  }
}

// ── Text Cleaning ────────────────────────────────────────────
export function cleanDocumentText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    // Fix hyphenated words broken across lines: e.g. "algo-\nrithm" -> "algorithm"
    .replace(/(\b[A-Za-z]{2,})-\n([A-Za-z]{2,}\b)/g, "$1$2")
    // Remove repeated page numbers / headers / footers
    .replace(/^\s*(page\s*\d+(\s*of\s*\d+)?|\d+\s*\|\s*page)\s*$/gim, "")
    // Collapse excess horizontal whitespace
    .replace(/[ \t]+/g, " ")
    // Collapse more than two consecutive newlines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ── Page-by-page Extraction ──────────────────────────────────
interface PageContent {
  pageNumber: number;
  text: string;
  isOcr?: boolean;
}

// 1. PDF Extractor (unpdf + Gemini multimodal OCR fallback)
async function extractPdfPages(fileBytes: Uint8Array, geminiApiKey?: string): Promise<{ pages: PageContent[]; usedOcr: boolean }> {
  let pages: PageContent[] = [];
  let lowTextPageCount = 0;

  try {
    const pdf = await getDocumentProxy(fileBytes);
    const { totalPages, text } = await extractText(pdf, { mergePages: false });

    for (let i = 0; i < totalPages; i++) {
      const pageText = cleanDocumentText(text[i] || "");
      pages.push({ pageNumber: i + 1, text: pageText });
      if (pageText.length < 50) {
        lowTextPageCount++;
      }
    }
  } catch (pdfErr) {
    console.warn("Direct PDF extraction warning, fallback to OCR:", pdfErr);
    lowTextPageCount = 999;
  }

  // If >50% pages have little or no text, the PDF is likely scanned or handwritten.
  // Run Gemini multimodal OCR if API key is provided.
  const isScanned = pages.length === 0 || (lowTextPageCount / Math.max(pages.length, 1)) > 0.5;

  if (isScanned && geminiApiKey) {
    console.log("Triggering Gemini Multimodal OCR for scanned PDF...");
    try {
      const base64 = btoa(
        Array.from(fileBytes)
          .map((byte) => String.fromCharCode(byte))
          .join("")
      );

      const ocrPrompt = `Transcribe ALL text, formulas, diagrams, headings, and tables from this document accurately page by page.
Output strictly in this format with no introduction or conclusion:
--- PAGE 1 ---
[Transcribed content of page 1]
--- PAGE 2 ---
[Transcribed content of page 2]`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
// [rag-build-step 8/40]: feat(rag-ingest): update document status to processing on ingestion start