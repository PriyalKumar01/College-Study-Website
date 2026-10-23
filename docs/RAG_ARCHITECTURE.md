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
# [rag-build-step 1/8]: docs(rag): create comprehensive RAG architecture documentation