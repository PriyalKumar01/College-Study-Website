-- ==============================================================================
-- College Study Hub — Phase 2: RAG System Migration
-- Migration: 20261024000000_rag_system_pgvector.sql
-- ==============================================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. rag_documents: Knowledge Base Catalog & Ingested Files
CREATE TABLE IF NOT EXISTS public.rag_documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  source_type   TEXT NOT NULL CHECK (source_type IN ('pdf', 'docx', 'pptx', 'txt', 'md', 'site')),
  storage_path  TEXT,
  public_url    TEXT,
  subject       TEXT,
  branch        TEXT,
  semester      TEXT,
  program       TEXT CHECK (program IN ('btech', 'bsms', 'bba', 'mba', 'general')),
  doc_type      TEXT CHECK (doc_type IN ('notes', 'pyq', 'syllabus', 'lab', 'book', 'site_knowledge')),
  file_hash     TEXT UNIQUE, -- SHA-256 for deduplication
  page_count    INTEGER,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'failed')),
  error         TEXT,
  uploaded_by   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for rag_documents
CREATE INDEX IF NOT EXISTS idx_rag_documents_status ON public.rag_documents (status);
CREATE INDEX IF NOT EXISTS idx_rag_documents_subject ON public.rag_documents (subject);
CREATE INDEX IF NOT EXISTS idx_rag_documents_branch_sem ON public.rag_documents (branch, semester);

-- 3. rag_chunks: Chunked Passages & 768-dim Vector Embeddings
CREATE TABLE IF NOT EXISTS public.rag_chunks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id   UUID NOT NULL REFERENCES public.rag_documents(id) ON DELETE CASCADE,
  chunk_index   INTEGER NOT NULL,
  page_start    INTEGER,
  page_end      INTEGER,
  content       TEXT NOT NULL,
  token_count   INTEGER,
  embedding     vector(768),
  content_tsv   tsvector GENERATED ALWAYS AS (to_tsvector('english', COALESCE(content, ''))) STORED,
  metadata      JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Indexes for rag_chunks
-- HNSW Cosine Index for Fast Approximate Nearest Neighbor vector search
CREATE INDEX IF NOT EXISTS idx_rag_chunks_embedding 
  ON public.rag_chunks 
  USING hnsw (embedding vector_cosine_ops);

-- GIN Index for full-text search
CREATE INDEX IF NOT EXISTS idx_rag_chunks_tsv 
  ON public.rag_chunks 
  USING gin (content_tsv);

-- B-Tree Index on document_id for cascading and joins
CREATE INDEX IF NOT EXISTS idx_rag_chunks_document_id 
  ON public.rag_chunks (document_id);

-- 4. ai_usage: Server-side daily rate limit tracking
CREATE TABLE IF NOT EXISTS public.ai_usage (
  identifier    TEXT NOT NULL,
  usage_date    DATE NOT NULL,
  count         INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (identifier, usage_date)
);

-- 5. ai_sessions: Unlocked sessions from valid access codes
CREATE TABLE IF NOT EXISTS public.ai_sessions (
  token_hash    TEXT PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at    TIMESTAMPTZ NOT NULL,
  identifier    TEXT
);

CREATE INDEX IF NOT EXISTS idx_ai_sessions_expires_at 
  ON public.ai_sessions (expires_at);

-- 6. ai_query_logs: Query evaluation & telemetry
CREATE TABLE IF NOT EXISTS public.ai_query_logs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  query               TEXT,
  used_cache          BOOLEAN NOT NULL DEFAULT FALSE,
  retrieved_chunk_ids UUID[],
  top_score           FLOAT,
  model_used          TEXT,
  fallback_used       BOOLEAN NOT NULL DEFAULT FALSE,
  latency_ms          INTEGER,
  feedback            SMALLINT
);

-- 7. rag_hybrid_search: Reciprocal Rank Fusion (RRF) Hybrid Search Function
CREATE OR REPLACE FUNCTION public.rag_hybrid_search(
  query_embedding   vector(768),
  query_text        TEXT,
  match_count       INTEGER DEFAULT 5,
  filter_branch     TEXT DEFAULT NULL,
  filter_semester   TEXT DEFAULT NULL,
  filter_subject    TEXT DEFAULT NULL
)
RETURNS TABLE (
  id                    UUID,
  document_id           UUID,
  chunk_index           INTEGER,
  page_start            INTEGER,
  page_end              INTEGER,
  content               TEXT,
  token_count           INTEGER,
  metadata              JSONB,
  rrf_score             FLOAT,
  vector_score          FLOAT,
  fts_score             FLOAT,
  document_title        TEXT,
  document_public_url   TEXT,
  document_storage_path TEXT,
  document_source_type  TEXT,
  document_doc_type     TEXT,
  document_subject      TEXT,
  document_branch       TEXT,
  document_semester     TEXT,
  document_program      TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_parsed_query tsquery;
  v_rrf_k CONSTANT FLOAT := 60.0;
  v_candidate_limit CONSTANT INTEGER := GREATEST(match_count * 4, 30);
BEGIN
  -- Parse the query text safely into a tsquery
  BEGIN
    v_parsed_query := websearch_to_tsquery('english', query_text);
  EXCEPTION WHEN OTHERS THEN
    v_parsed_query := plainto_tsquery('english', query_text);
  END;

  RETURN QUERY
  WITH
  -- 1. Vector Search Candidates
  vector_candidates AS (
    SELECT
      c.id AS chunk_id,
      (1.0 - (c.embedding <=> query_embedding))::FLOAT AS vec_similarity,
      ROW_NUMBER() OVER (ORDER BY c.embedding <=> query_embedding) AS rank
    FROM public.rag_chunks c
    JOIN public.rag_documents d ON c.document_id = d.id
    WHERE d.status = 'ready'
      AND c.embedding IS NOT NULL
      AND (filter_branch IS NULL OR d.branch ILIKE filter_branch OR d.branch = 'all' OR d.branch = 'common')
      AND (filter_semester IS NULL OR d.semester ILIKE filter_semester)
      AND (filter_subject IS NULL OR d.subject ILIKE '%' || filter_subject || '%')
    ORDER BY c.embedding <=> query_embedding
    LIMIT v_candidate_limit
  ),

  -- 2. Full-Text Search Candidates
  fts_candidates AS (
    SELECT
      c.id AS chunk_id,
      ts_rank_cd(c.content_tsv, v_parsed_query)::FLOAT AS text_score,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(c.content_tsv, v_parsed_query) DESC) AS rank
    FROM public.rag_chunks c
    JOIN public.rag_documents d ON c.document_id = d.id
    WHERE d.status = 'ready'
      AND v_parsed_query IS NOT NULL
      AND c.content_tsv @@ v_parsed_query
      AND (filter_branch IS NULL OR d.branch ILIKE filter_branch OR d.branch = 'all' OR d.branch = 'common')
      AND (filter_semester IS NULL OR d.semester ILIKE filter_semester)
      AND (filter_subject IS NULL OR d.subject ILIKE '%' || filter_subject || '%')
    ORDER BY ts_rank_cd(c.content_tsv, v_parsed_query) DESC
-- [rag-build-step 17/30]: feat(db): implement hybrid_search_chunks RPC combining vector and text search