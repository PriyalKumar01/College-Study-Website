-- ==============================================================================
-- College Study Hub — Phase 2: RAG System Migration
-- Migration: 20261024000000_rag_system_pgvector.sql
-- ==============================================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. rag_documents: Knowledge Base Catalog & Ingested Files
CREATE TABLE IF NOT EXISTS public.rag_documents (
-- [rag-build-step 1/30]: chore(db): create initial migration file for RAG pgvector pipeline