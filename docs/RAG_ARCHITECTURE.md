# College Study Hub - Production RAG Architecture

This document describes the Retrieval-Augmented Generation (RAG) architecture implemented for the **College Study Assistant** on College Study Hub (React 18 + Vite + TypeScript + Tailwind + Supabase pgvector + Netlify).

---

## 1. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Client Application (React 18 + Vite)"]
        UI["Chat Widget (AIChatWidget.tsx)"]
        Gate["Access Gate (AIAccessGate.tsx)"]
        CacheCheck["Fast Client Cache Matcher"]
        AdminUI["Admin Knowledge Base (/admin/knowledge-base)"]
    end

    subgraph EdgeFunctions["Supabase Edge Functions (Deno)"]
        Unlock["ai-unlock (Timing-Safe Code Validation)"]
        Chat["rag-chat (Orchestrator)"]
        Ingest["rag-ingest (PDF / OCR / Chunking / Embed)"]
        Extract["rag-extract (Ephemeral File Parser)"]
        SiteIngest["rag-ingest-site-knowledge (Syllabus & Portals)"]
    end

    subgraph Database["Supabase Postgres with pgvector"]
        DocTable["rag_documents (Metadata & Deduplication)"]
        ChunkTable["rag_chunks (768-dim Vectors & tsvector)"]
        Sessions["ai_sessions (Hashed 30-day Sessions)"]
        Usage["ai_usage (Daily Quota: 10/day)"]
        Logs["ai_query_logs (Telemetry & Latency)"]
        Storage["rag-documents (Private Storage Bucket)"]
        RRF["rag_hybrid_search() SQL Function (Reciprocal Rank Fusion)"]
    end

    subgraph LLMServices["External LLM & Embedding Providers"]
        GeminiEmbed["Gemini Embedding (gemini-embedding-001, 768-dim)"]
        GeminiFlash["Primary: Google Gemini 3.5 Flash (gemini-3.5-flash)"]
        OpenAI["Fallback: OpenAI (gpt-4o-mini)"]
    end

    %% Client flows
    Gate -->|Submit Access Code| Unlock
    Unlock -->|Hash & Save Session| Sessions
    Unlock -->|Return Session Token| Gate

    UI -->|Quick FAQ Check| CacheCheck
    CacheCheck -->|Cache Hit: <15ms, 0 Quota| UI

    UI -->|Attach File: PDF/DOCX/TXT/Image| Extract
    Extract -->|Return Extracted Text| UI

    UI -->|Query + Session Token + History| Chat
    AdminUI -->|Upload Document + Metadata| Storage
    AdminUI -->|Trigger Ingestion| Ingest

    %% Ingest flow
    Storage --> Ingest
    Ingest -->|OCR Fallback| GeminiFlash
    Ingest -->|Batch Embeddings| GeminiEmbed
    Ingest -->|Store Vectors & Chunks| ChunkTable
    Ingest -->|Record Status| DocTable

    %% Query flow
    Chat -->|Verify Session Token| Sessions
    Chat -->|Enforce 10 queries/day limit| Usage
    Chat -->|Embed Query| GeminiEmbed
    Chat -->|Hybrid Search| RRF
    RRF --> ChunkTable
    RRF -->|Top Ranked Chunks| Chat

    Chat -->|Prompt + Numbered Context| GeminiFlash
    GeminiFlash -.->|On 429 / 5xx / Timeout| OpenAI
    Chat -->|Increment Daily Count| Usage
    Chat -->|Log Telemetry| Logs
    Chat -->|Structured Answer with Citations [1], [2]| UI
```

---

## 2. Ingestion Pipeline & Chunking Strategy

### Ingestion Flow (`rag-ingest`)
1. **Document Upload**: Authorized admins upload academic files (`.pdf`, `.docx`, `.pptx`, `.txt`, `.md`, up to 25MB) to the private `rag-documents` Supabase Storage bucket.
2. **SHA-256 Deduplication**: Calculates the cryptographic hash of the file payload. If an identical file exists in `rag_documents`, the system reuses or updates the existing document record instead of creating duplicates.
3. **Multi-Format Extraction**:
   - **PDF**: Extracted page by page using `unpdf` in Deno. Page boundaries are strictly preserved.
   - **Gemini Multimodal OCR Fallback**: If a page or scanned document yields $< 50$ characters of text, the page is sent directly as an inline PDF/image part to Gemini Flash with the instruction: *"Transcribe all text exactly, preserve formulas, tables, and headings without commentary."*
   - **DOCX / PPTX**: Unpacked using zip parsing to extract raw text and slide numbers.
   - **TXT / Markdown**: Parsed directly with heading preservation.
4. **Text Cleaning**:
   - Strips repeating page headers, running footers, and noise.
   - Normalizes whitespace, repairs word hyphenation across lines, and retains markdown headings (`#`, `##`) and mathematical formulas.
5. **Chunking Strategy**:
   - **Target chunk size**: ~800 to 1,000 characters (~200 to 250 tokens).
   - **Overlap**: 150 characters.
   - **Boundary splitting**: Chunks break on paragraph (`\n\n`), heading (`#`), or sentence punctuation boundaries. Never mid-sentence.
   - **Metadata enrichment**: Each chunk records `page_start`, `page_end`, nearest heading, and subject.
   - **Context prefixing**: When generating the vector embedding, the chunk text is prefixed with:
     ```
     Subject: {subject} | Title: {document_title} | Heading: {nearest_heading}
     {content}
     ```
     The raw chunk content is stored clean in Postgres for prompt rendering.
6. **Vector Embeddings**:
   - Model: `gemini-embedding-001` (fallback `gemini-embedding-2`).
   - Output dimensionality: **768 dimensions** (utilizing Matryoshka Representation Learning).
   - Rate limit mitigation: Batches processed with exponential backoff and jitter.

---

## 3. Database Schema & Search Mechanics

### Schema Highlights (`supabase/migrations/20261024000000_rag_system_pgvector.sql`)
- **`rag_documents`**: Tracks documents, metadata (`subject`, `branch`, `semester`, `program`, `doc_type`), SHA-256 hash, page counts, and lifecycle status (`pending`, `processing`, `ready`, `failed`).
- **`rag_chunks`**: Stores content chunks, page coordinates, metadata, `embedding vector(768)`, and generated full-text `content_tsv tsvector`.
- **`ai_usage`**: Tracks `(identifier, usage_date, count)` for server-side rate-limiting.
- **`ai_sessions`**: Stores SHA-256 hashes of cryptographically random session tokens with a 30-day expiration timestamp.
- **`ai_query_logs`**: Logs query text, latency, model used, fallback status, and user feedback.

### Indexing
# [rag-build-step 4/8]: docs(rag): detail pgvector cosine similarity and HNSW/IVFFlat indexing