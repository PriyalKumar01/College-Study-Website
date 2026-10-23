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
-- [rag-build-step 3/30]: feat(db): enable pg_trgm extension for fuzzy keyword matching