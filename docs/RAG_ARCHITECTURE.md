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
# [rag-build-step 2/8]: docs(rag): illustrate document ingestion pipeline in Mermaid diagram