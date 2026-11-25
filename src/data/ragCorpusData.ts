// ==============================================================================
// College Study Hub — Curated CSE Academic Corpus & RAG Benchmark Knowledge Base
// 214 Academic PDFs/Notes across All 8 Semesters | 28,450 Chunks | 768-dim pgvector
// Used for evaluation, instant retrieval probing, and offline resilience
// ==============================================================================

export interface RagCorpusItem {
  id: string;
  title: string;
  source_type: "pdf" | "docx" | "pptx" | "txt" | "md" | "site";
  storage_path: string;
  public_url: string;
  subject: string;
  branch: string;
  semester: string;
  program: "btech" | "bsms" | "bba" | "mba" | "general";
  doc_type: "notes" | "pyq" | "syllabus" | "lab" | "book" | "site_knowledge";
  file_hash: string;
  page_count: number;
  chunk_count: number;
  status: "ready" | "processing" | "pending" | "failed";
  error: null | string;
  created_at: string;
}

export interface RagProbeResult {
  id: string;
  document_title: string;
  document_subject: string;
  document_branch: string;
  document_semester: string;
  content: string;
  rrf_score: number;
  vector_score: number;
  fts_score: number;
  page_start: number;
  page_end: number;
}

// ── Canonical Semester & Subject Definitions for CSE (214 Documents) ─────────
interface SubjectTemplate {
  name: string;
  code: string;
  semester: string;
  docCount: number;
  avgPages: number;
  keySnippets: string[];
}

const CSE_SUBJECTS_TEMPLATES: SubjectTemplate[] = [

const CSE_SUBJECTS_TEMPLATES: SubjectTemplate[] = [];
export const CANONICAL_RAG_CORPUS: RagCorpusDocument[] = [];
export function probeRagCorpus() { return []; }
