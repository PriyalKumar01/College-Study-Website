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
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    if (bytes.length > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "File exceeds 10MB limit" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const lowerName = fileName.toLowerCase();
    let extractedText = "";
    let pageCount = 1;
    let usedOcr = false;

    // 1. PDF
    if (lowerName.endsWith(".pdf") || mimeType === "application/pdf") {
      let pages: string[] = [];
      try {
        const pdf = await getDocumentProxy(bytes);
        const res = await extractText(pdf, { mergePages: false });
        pageCount = res.totalPages;
        pages = res.text.map((t) => cleanText(t || ""));
      } catch (pdfErr) {
        console.warn("Direct PDF extract warning in rag-extract:", pdfErr);
      }

      const totalChars = pages.join("").length;
      if (totalChars < 60 && geminiKey) {
        // Scanned PDF fallback via Gemini
        usedOcr = true;
        try {
          const resp = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [
                      { inlineData: { mimeType: "application/pdf", data: fileBase64 } },
                      { text: "Transcribe all text from this document accurately, preserving headings, questions, and formulas. No commentary." },
                    ],
                  },
                ],
                generationConfig: { maxOutputTokens: 3000, temperature: 0.1 },
              }),
            }
          );
          if (resp.ok) {
            const data = await resp.json();
            extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          }
        } catch (ocrErr) {
          console.error("Gemini OCR error in rag-extract:", ocrErr);
        }
      } else {
        extractedText = pages.map((p, idx) => `[Page ${idx + 1}]\n${p}`).join("\n\n");
      }
    }
    // 2. DOCX
    else if (lowerName.endsWith(".docx")) {
      try {
        const zip = await JSZip.loadAsync(bytes);
        const docXml = await zip.file("word/document.xml")?.async("string");
        if (docXml) {
          const raw = docXml.replace(/<\/w:p>/gi, "\n\n").replace(/<[^>]+>/g, " ");
          extractedText = cleanText(raw);
        }
      } catch (docxErr) {
        console.error("DOCX extraction error in rag-extract:", docxErr);
      }
    }
    // 3. Image OCR
    else if (
      lowerName.endsWith(".png") ||
      lowerName.endsWith(".jpg") ||
      lowerName.endsWith(".jpeg") ||
      lowerName.endsWith(".webp") ||
      mimeType?.startsWith("image/")
    ) {
      if (geminiKey) {
        usedOcr = true;
        const imgMime = mimeType || (lowerName.endsWith(".png") ? "image/png" : "image/jpeg");
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { inlineData: { mimeType: imgMime, data: fileBase64 } },
                    { text: "Transcribe all text, notes, equations, and tables in this image accurately." },
                  ],
                },
              ],
              generationConfig: { maxOutputTokens: 2500, temperature: 0.1 },
            }),
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      }
    }
    // 4. Plain Text
    else {
      extractedText = cleanText(new TextDecoder("utf-8").decode(bytes));
    }

    if (!extractedText.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Could not extract readable text from the attached file. Ensure the file contains text or clear images.",
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Truncate to safety cap
    const safeText = extractedText.slice(0, MAX_EXTRACTED_CHARS);

    return new Response(
      JSON.stringify({
// [rag-build-step 9/10]: perf(rag-extract): optimize in-memory buffer handling for fast response