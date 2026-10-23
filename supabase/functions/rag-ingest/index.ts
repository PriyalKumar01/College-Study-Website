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
                parts: [
                  {
                    inlineData: {
                      mimeType: "application/pdf",
                      data: base64,
                    },
                  },
                  { text: ocrPrompt },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 4000,
              temperature: 0.1,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const ocrText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (ocrText && ocrText.trim().length > 100) {
          const pageSplits = ocrText.split(/---\s*PAGE\s*(\d+)\s*---/i);
          const ocrPages: PageContent[] = [];

          if (pageSplits.length > 2) {
            for (let i = 1; i < pageSplits.length; i += 2) {
              const pNum = parseInt(pageSplits[i], 10) || Math.floor(i / 2) + 1;
              const pContent = cleanDocumentText(pageSplits[i + 1] || "");
              if (pContent) {
                ocrPages.push({ pageNumber: pNum, text: pContent, isOcr: true });
              }
            }
          }

          if (ocrPages.length > 0) {
            return { pages: ocrPages, usedOcr: true };
          }
        }
      }
    } catch (ocrErr) {
      console.error("Gemini OCR error:", ocrErr);
    }
  }

  return { pages, usedOcr: false };
}

// 2. DOCX Extractor (ZIP -> word/document.xml)
async function extractDocxPages(fileBytes: Uint8Array): Promise<{ pages: PageContent[]; usedOcr: boolean }> {
  try {
    const zip = await JSZip.loadAsync(fileBytes);
    const docXml = await zip.file("word/document.xml")?.async("string");
    if (!docXml) throw new Error("word/document.xml not found in DOCX");

    // Replace paragraph endings with newlines
    let text = docXml.replace(/<\/w:p>/gi, "\n\n");
    // Strip XML tags
    text = text.replace(/<[^>]+>/g, " ");
    const clean = cleanDocumentText(text);

    return {
      pages: [{ pageNumber: 1, text: clean }],
      usedOcr: false,
    };
  } catch (err) {
    console.error("DOCX extraction error:", err);
    throw new Error("Failed to extract DOCX text: " + (err instanceof Error ? err.message : String(err)));
  }
}

// 3. PPTX Extractor (ZIP -> ppt/slides/slide*.xml)
async function extractPptxPages(fileBytes: Uint8Array): Promise<{ pages: PageContent[]; usedOcr: boolean }> {
  try {
    const zip = await JSZip.loadAsync(fileBytes);
    const pages: PageContent[] = [];

    // Find all slides sorted by slide number
    const slideNames: string[] = [];
    zip.forEach((relativePath) => {
      if (relativePath.match(/^ppt\/slides\/slide\d+\.xml$/i)) {
        slideNames.push(relativePath);
      }
    });

    slideNames.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)![0], 10);
      const numB = parseInt(b.match(/\d+/)![0], 10);
      return numA - numB;
    });

    for (let i = 0; i < slideNames.length; i++) {
      const slideXml = await zip.file(slideNames[i])?.async("string");
      if (slideXml) {
        let slideText = slideXml.replace(/<\/a:p>/gi, "\n");
        slideText = slideText.replace(/<[^>]+>/g, " ");
        const clean = cleanDocumentText(slideText);
        if (clean) {
          pages.push({ pageNumber: i + 1, text: clean });
        }
      }
    }

    if (pages.length === 0) {
      pages.push({ pageNumber: 1, text: "Empty presentation or unreadable slides." });
    }

    return { pages, usedOcr: false };
  } catch (err) {
    console.error("PPTX extraction error:", err);
    throw new Error("Failed to extract PPTX text: " + (err instanceof Error ? err.message : String(err)));
  }
}

// 4. Plain Text & Markdown
function extractPlainPages(fileBytes: Uint8Array): { pages: PageContent[]; usedOcr: boolean } {
  const text = new TextDecoder("utf-8").decode(fileBytes);
  const clean = cleanDocumentText(text);
  return {
    pages: [{ pageNumber: 1, text: clean }],
    usedOcr: false,
  };
}

// ── Chunking Engine ──────────────────────────────────────────
export interface ChunkData {
  chunkIndex: number;
  pageStart: number;
  pageEnd: number;
  content: string;
  embedText: string;
  tokenCount: number;
  metadata: {
    heading?: string;
    ocr?: boolean;
    subject?: string;
    branch?: string;
    semester?: string;
    doc_type?: string;
  };
}

export function chunkDocument(
  pages: PageContent[],
  docMeta: { title: string; subject?: string; branch?: string; semester?: string; doc_type?: string },
  targetSize = 900,
  overlap = 150
): ChunkData[] {
  const chunks: ChunkData[] = [];
  let currentHeading = "General";
  let chunkIndex = 0;

  for (const page of pages) {
    const pageText = page.text;
    if (!pageText || pageText.trim().length === 0) continue;

    // Split paragraphs
    const paragraphs = pageText.split(/\n\n+/);
    let buffer = "";

    for (const paragraph of paragraphs) {
      // Check for headings: Markdown (# Heading) or short capitalized line
      const firstLine = paragraph.trim().split("\n")[0].trim();
      if (
        firstLine.startsWith("#") ||
        (firstLine.length < 80 && /^[A-Z0-9\s:.-]{4,}$/.test(firstLine) && !firstLine.endsWith("."))
      ) {
        currentHeading = firstLine.replace(/^#+\s*/, "").slice(0, 100);
      }

      if (buffer.length + paragraph.length <= targetSize) {
        buffer += (buffer ? "\n\n" : "") + paragraph;
      } else {
        // If buffer has content, push chunk
        if (buffer.trim()) {
          const content = buffer.trim();
          const embedText = `Subject: ${docMeta.subject || "General"} | Title: ${docMeta.title} | Section: ${currentHeading}\n\n${content}`;
          chunks.push({
            chunkIndex: chunkIndex++,
            pageStart: page.pageNumber,
            pageEnd: page.pageNumber,
            content,
            embedText,
            tokenCount: Math.ceil(content.length / 4),
            metadata: {
              heading: currentHeading,
              ocr: page.isOcr ?? false,
              subject: docMeta.subject,
              branch: docMeta.branch,
              semester: docMeta.semester,
              doc_type: docMeta.doc_type,
            },
          });
        }

        // Handle paragraphs larger than targetSize: split by sentence
        if (paragraph.length > targetSize) {
          const sentences = paragraph.split(/(?<=[.!?])\s+/);
          let sentBuffer = "";

          for (const sentence of sentences) {
            if (sentBuffer.length + sentence.length <= targetSize) {
              sentBuffer += (sentBuffer ? " " : "") + sentence;
            } else {
              if (sentBuffer.trim()) {
                const content = sentBuffer.trim();
                const embedText = `Subject: ${docMeta.subject || "General"} | Title: ${docMeta.title} | Section: ${currentHeading}\n\n${content}`;
                chunks.push({
                  chunkIndex: chunkIndex++,
                  pageStart: page.pageNumber,
                  pageEnd: page.pageNumber,
                  content,
                  embedText,
                  tokenCount: Math.ceil(content.length / 4),
                  metadata: {
                    heading: currentHeading,
                    ocr: page.isOcr ?? false,
                    subject: docMeta.subject,
                    branch: docMeta.branch,
                    semester: docMeta.semester,
                    doc_type: docMeta.doc_type,
                  },
                });
                // Carry overlap from sentence end
                sentBuffer = sentBuffer.slice(-overlap) + " " + sentence;
              } else {
                sentBuffer = sentence;
              }
            }
          }
          buffer = sentBuffer;
        } else {
          // Carry overlap from previous paragraph
          const carryOver = buffer.slice(-overlap);
          buffer = carryOver ? carryOver + "\n\n" + paragraph : paragraph;
        }
      }
    }

    if (buffer.trim()) {
      const content = buffer.trim();
      const embedText = `Subject: ${docMeta.subject || "General"} | Title: ${docMeta.title} | Section: ${currentHeading}\n\n${content}`;
      chunks.push({
        chunkIndex: chunkIndex++,
        pageStart: page.pageNumber,
        pageEnd: page.pageNumber,
        content,
        embedText,
        tokenCount: Math.ceil(content.length / 4),
        metadata: {
          heading: currentHeading,
          ocr: page.isOcr ?? false,
          subject: docMeta.subject,
          branch: docMeta.branch,
          semester: docMeta.semester,
          doc_type: docMeta.doc_type,
        },
      });
    }
  }

  return chunks;
}

// ── Gemini Batch Embeddings Generator ────────────────────────
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
        const errText = await response.text();
        lastError = new Error(`Embedding model ${model} error ${response.status}: ${errText}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError ?? new Error("Failed to compute chunk embedding with Gemini");
}

// ── Main Server ──────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    const { isAdmin, email } = await verifyAdminCaller(authHeader);

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Admin access required." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const {
      storage_path,
      title,
      subject,
      branch,
      semester,
      program = "btech",
      doc_type = "notes",
      document_id, // optional: re-process existing doc
    } = body;

    if (!storage_path || !title) {
      return new Response(
        JSON.stringify({ error: "storage_path and title are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not configured in Supabase secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Download file bytes from private storage bucket 'rag-documents'
    const { data: fileBlob, error: downloadError } = await supabaseAdmin.storage
      .from("rag-documents")
      .download(storage_path);

    if (downloadError || !fileBlob) {
      throw new Error(`Failed to download from storage: ${downloadError?.message ?? "Not found"}`);
    }

    const fileBytes = new Uint8Array(await fileBlob.arrayBuffer());
    const fileHash = await computeSha256(fileBytes);

    // 2. Check deduplication by SHA-256
    let docId = document_id;
    if (!docId) {
      const { data: existingDoc } = await supabaseAdmin
        .from("rag_documents")
        .select("id, status")
        .eq("file_hash", fileHash)
        .maybeSingle();

      if (existingDoc) {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Document already ingested (duplicate hash)",
            document_id: existingDoc.id,
            status: existingDoc.status,
            duplicate: true,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Determine source type from extension
    const ext = storage_path.split(".").pop()?.toLowerCase() || "pdf";
    const sourceType = ["pdf", "docx", "pptx", "txt", "md"].includes(ext) ? ext : "pdf";

    // 3. Insert or update rag_documents record to 'processing'
    if (!docId) {
      const { data: insertedDoc, error: insertError } = await supabaseAdmin
        .from("rag_documents")
        .insert({
          title,
          source_type: sourceType,
          storage_path,
          subject,
// [rag-build-step 32/40]: feat(rag-ingest): insert generated chunk embeddings into rag_chunks table