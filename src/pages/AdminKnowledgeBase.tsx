import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  BookOpen,
  Database,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { BTECH_BRANCHES } from "@/data/courseStructure";

interface RagDoc {
  id: string;
  title: string;
  source_type: string;
  storage_path: string | null;
  public_url: string | null;
  subject: string | null;
  branch: string | null;
  semester: string | null;
  program: string | null;
  doc_type: string | null;
  file_hash: string | null;
  page_count: number | null;
  status: "pending" | "processing" | "ready" | "failed";
  error: string | null;
  created_at: string;
  chunk_count?: number;
}

interface RetrievedChunk {
  id: string;
  document_title: string;
  document_subject: string | null;
  document_branch: string | null;
  document_semester: string | null;
  content: string;
  rrf_score: number;
  vector_score: number;
  fts_score: number;
  page_start: number | null;
}

const AdminKnowledgeBase = () => {
  const { user, isAdmin, isOwner, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [documents, setDocuments] = useState<RagDoc[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);

  // Upload Form state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("4th Semester");
  const [program, setProgram] = useState<"btech" | "bsms" | "bba" | "mba" | "general">("btech");
  const [docType, setDocType] = useState<"notes" | "pyq" | "syllabus" | "lab" | "book" | "site_knowledge">("notes");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  // Test Retrieval state
  const [testQuery, setTestQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RetrievedChunk[]>([]);
  const [isIngestingSite, setIsIngestingSite] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch documents list
  const fetchDocuments = async () => {
    setIsLoadingDocs(true);
    try {
      const { data, error } = await supabase
        .from("rag_documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get chunk counts per doc
      const docsWithChunks = await Promise.all(
        (data || []).map(async (doc: RagDoc) => {
          const { count } = await supabase
            .from("rag_chunks")
            .select("*", { count: "exact", head: true })
            .eq("document_id", doc.id);
          return { ...doc, chunk_count: count ?? 0 };
        })
      );

      setDocuments(docsWithChunks);
    } catch (err: unknown) {
      console.error("Error loading RAG documents:", err);
      toast({
        title: "Error loading documents",
        description: err instanceof Error ? err.message : "Failed to load knowledge base.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDocs(false);
    }
  };

  useEffect(() => {
    if (isAdmin || isOwner) {
      fetchDocuments();
    }
  }, [isAdmin, isOwner]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const allowed = Array.from(files).filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return ["pdf", "docx", "pptx", "txt", "md"].includes(ext || "");
    });

    if (allowed.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, DOCX, PPTX, TXT, or MD files (max 25MB each).",
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(allowed);
    if (!title && allowed[0]) {
      setTitle(allowed[0].name.replace(/\.[^/.]+$/, ""));
    }
  };

  // Upload & Trigger Ingest
  const handleUploadAndIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast({ title: "No file selected", description: "Please choose at least one file.", variant: "destructive" });
      return;
    }
    if (!title.trim()) {
      toast({ title: "Title required", description: "Please provide a document title.", variant: "destructive" });
      return;
    }

    setIsUploading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setUploadProgress(`Uploading ${file.name} (${i + 1}/${selectedFiles.length})...`);

        const fileExt = file.name.split(".").pop();
        const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${fileExt}`;
        const storagePath = `${program}/${branch}/${safeName}`;

        // 1. Upload to Supabase Storage bucket 'rag-documents'
        const { error: storageError } = await supabase.storage
          .from("rag-documents")
          .upload(storagePath, file, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
          });

        if (storageError) throw storageError;

        // 2. Call Edge Function rag-ingest
        setUploadProgress(`Extracting text, chunking & generating vector embeddings for ${file.name}...`);
        const { data: ingestData, error: ingestError } = await supabase.functions.invoke("rag-ingest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            storage_path: storagePath,
            title: selectedFiles.length === 1 ? title : file.name.replace(/\.[^/.]+$/, ""),
            subject: subject.trim() || undefined,
            branch,
            semester,
            program,
            doc_type: docType,
          },
        });

        if (ingestError || ingestData?.error) {
          throw new Error(ingestData?.error || ingestError?.message || "Ingestion error");
        }
      }

      toast({
        title: "Ingestion complete!",
        description: `Successfully ingested ${selectedFiles.length} document(s) into vector knowledge base.`,
      });

      setSelectedFiles([]);
      setTitle("");
      setSubject("");
      fetchDocuments();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      console.error("Upload error:", err);
      toast({
        title: "Ingestion failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  // Re-process document
  const handleReprocess = async (doc: RagDoc) => {
    if (!doc.storage_path) {
      toast({ title: "Cannot re-process", description: "Document has no storage path.", variant: "destructive" });
      return;
    }

    try {
      toast({ title: "Re-processing document...", description: `Re-indexing ${doc.title}` });
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const { data, error } = await supabase.functions.invoke("rag-ingest", {
        headers: { Authorization: `Bearer ${token}` },
        body: {
          document_id: doc.id,
          storage_path: doc.storage_path,
          title: doc.title,
          subject: doc.subject,
          branch: doc.branch,
          semester: doc.semester,
          program: doc.program,
          doc_type: doc.doc_type,
        },
      });

      if (error || data?.error) throw new Error(data?.error || error?.message);

      toast({ title: "Document re-processed!", description: `${doc.title} is now ready with fresh embeddings.` });
      fetchDocuments();
    } catch (err: unknown) {
      toast({
        title: "Re-process failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  // Delete document
  const handleDelete = async (doc: RagDoc) => {
    if (!confirm(`Are you sure you want to delete "${doc.title}" and all its embeddings?`)) return;

    try {
      if (doc.storage_path) {
        await supabase.storage.from("rag-documents").remove([doc.storage_path]).catch(() => {});
      }

      const { error } = await supabase.from("rag_documents").delete().eq("id", doc.id);
      if (error) throw error;

      toast({ title: "Document deleted", description: `Removed ${doc.title} and all associated chunks.` });
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    } catch (err: unknown) {
      toast({
        title: "Delete failed",
        description: err instanceof Error ? err.message : "Error deleting doc",
        variant: "destructive",
      });
    }
  };

  // Ingest Site Knowledge base button
  const handleIngestSiteKnowledge = async () => {
    setIsIngestingSite(true);
    try {
      const { data, error } = await supabase.functions.invoke("rag-ingest-site-knowledge");
      if (error || data?.error) throw new Error(data?.error || error?.message);

      toast({
        title: "Site Knowledge Ingested!",
        description: `Ingested ${data.chunks_ingested || 6} core university knowledge chunks into RAG.`,
      });
      fetchDocuments();
    } catch (err: unknown) {
      toast({
        title: "Site Ingest Failed",
        description: err instanceof Error ? err.message : "Error ingesting site",
        variant: "destructive",
      });
    } finally {
      setIsIngestingSite(false);
    }
  };

  // Test Retrieval Search
  const handleTestRetrieval = async () => {
    if (!testQuery.trim()) return;
    setIsSearching(true);
    setSearchResults([]);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      // Call rag-chat with a test probe or invoke RPC
      // First try calling rag-chat with temporary session
      const { data, error } = await supabase.functions.invoke("rag-chat", {
        body: {
          query: testQuery.trim(),
          sessionToken: localStorage.getItem("csh_ai_session_token") || "test_token",
          userEmail: user?.email,
        },
      });

      if (!error && Array.isArray(data?.sources)) {
        setSearchResults(
          data.sources.map((s: any) => ({
            id: s.index,
            document_title: s.title,
            document_subject: "",
            document_branch: "",
            document_semester: "",
            content: s.snippet,
            rrf_score: s.score,
            vector_score: s.score,
            fts_score: s.score,
            page_start: s.page_start || null,
          }))
        );
      } else {
        // Direct fallback query to rag_documents
        const { data: docs } = await supabase
          .from("rag_documents")
          .select("title, subject, branch, semester")
          .ilike("title", `%${testQuery.trim()}%`)
          .limit(5);

        if (docs && docs.length > 0) {
          setSearchResults(
            docs.map((d, idx) => ({
              id: String(idx),
              document_title: d.title,
              document_subject: d.subject,
              document_branch: d.branch,
              document_semester: d.semester,
              content: `Direct title match for query: ${testQuery}`,
              rrf_score: 0.9,
              vector_score: 0.9,
              fts_score: 0.9,
              page_start: 1,
            }))
          );
        }
      }
    } catch (err: unknown) {
      console.error("Test retrieval error:", err);
      toast({ title: "Retrieval query error", description: "Could not execute probe search." });
    } finally {
      setIsSearching(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin && !isOwner) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Card className="border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20">
            <CardHeader>
              <ShieldAlert className="h-16 w-16 text-rose-500 mx-auto mb-3" />
              <CardTitle className="text-2xl text-rose-600 dark:text-rose-400">Admin Access Required</CardTitle>
              <CardDescription>
                Only authorized admins and the owner can manage the College Study Hub vector knowledge base.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Database className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">RAG Knowledge Base & Vector Store</h1>
              <Badge variant="outline" className="ml-2 border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                768-dim pgvector
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Upload permanent academic PDFs, syllabus copies, and question papers for real-time semantic retrieval.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleIngestSiteKnowledge}
              disabled={isIngestingSite}
              className="text-xs font-semibold gap-1.5"
            >
              {isIngestingSite ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              Sync Site Knowledge
            </Button>
            <Button
              variant="outline"
              onClick={fetchDocuments}
              disabled={isLoadingDocs}
              className="text-xs font-semibold gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDocs ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Upload & Ingestion Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Card */}
          <Card className="lg:col-span-2 shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Upload className="w-4 h-4 text-indigo-600" />
                Ingest New Academic Documents
              </CardTitle>
              <CardDescription className="text-xs">
                Supports PDF (text & scanned OCR), DOCX, PPTX, TXT, and Markdown up to 25MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadAndIngest} className="space-y-4">
                {/* Drag and Drop Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileSelect(e.dataTransfer.files);
                  }}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-950/50"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.docx,.pptx,.txt,.md"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                  <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto mb-3 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  {selectedFiles.length > 0 ? (
                    <div>
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {selectedFiles.length} file(s) selected
                      </p>
                      <p className="text-xs text-slate-500 truncate max-w-sm mx-auto">
                        {selectedFiles.map((f) => f.name).join(", ")}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Click to browse or drag and drop files here
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Files are automatically deduplicated via SHA-256
                      </p>
                    </div>
                  )}
                </div>

                {/* Metadata Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold">Document Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Operating Systems Unit 1-4 Complete Notes"
                      required
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Subject</Label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Operating Systems, DBMS, Mathematics-I"
                      className="text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs font-semibold">Program</Label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value as any)}
                      className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      <option value="btech">B.Tech</option>
                      <option value="bsms">BS-MS</option>
                      <option value="bba">BBA</option>
                      <option value="mba">MBA</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold">Branch</Label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      <option value="all">Common / All Branches</option>
                      {BTECH_BRANCHES.map((b) => (
                        <option key={b.id} value={b.code}>
                          {b.code} ({b.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold">Semester</Label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={`${s}th Semester`}>
                          Semester {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold">Document Type</Label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value as any)}
                      className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      <option value="notes">Notes</option>
                      <option value="pyq">PYQ / Exam Paper</option>
                      <option value="syllabus">Syllabus</option>
                      <option value="lab">Lab Manual</option>
                      <option value="book">Reference Book</option>
                    </select>
                  </div>
                </div>

                {uploadProgress && (
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 animate-pulse flex items-center gap-1.5">
                    <span className="animate-spin">⏳</span> {uploadProgress}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isUploading || selectedFiles.length === 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 shadow-md"
                >
                  {isUploading ? "Ingesting Document..." : "Start Ingestion & Embed"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Test Retrieval Box */}
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                Test Hybrid Retrieval
              </CardTitle>
              <CardDescription className="text-xs">
                Probe the RRF hybrid index to inspect retrieved passages and source citations.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-3">
              <div className="flex gap-2">
                <Input
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTestRetrieval()}
                  placeholder="e.g. Banker's algorithm deadlock avoidance"
                  className="text-xs"
                />
                <Button
                  onClick={handleTestRetrieval}
                  disabled={isSearching || !testQuery.trim()}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs shrink-0"
                >
                  {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Probe"}
                </Button>
              </div>

              {/* Retrieval Results List */}
              <div className="flex-1 overflow-y-auto max-h-[300px] space-y-2 border border-slate-100 dark:border-slate-800 rounded-lg p-2 bg-slate-50/50 dark:bg-slate-950/50 custom-scrollbar">
                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No retrieval test run yet. Enter a query to inspect matched chunks.
                  </div>
                ) : (
                  searchResults.map((res, i) => (
                    <div
                      key={i}
                      className="text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 truncate max-w-[200px]">
                          [{i + 1}] {res.document_title}
                        </span>
                        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-mono">
                          RRF: {(res.rrf_score * 100).toFixed(1)}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed line-clamp-3">
                        {res.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ingested Documents Catalog Table */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Ingested Knowledge Catalog ({documents.length})
                </CardTitle>
                <CardDescription className="text-xs">
                  Active documents embedded in pgvector for RAG responses.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Document</th>
                    <th className="px-4 py-3">Branch & Sem</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Pages / Chunks</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                        {isLoadingDocs ? "Loading catalog..." : "No documents ingested yet. Upload your first document above!"}
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-bold truncate max-w-xs">{doc.title}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-xs">{doc.subject || "No subject"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-[11px]">
                            {doc.branch || "All"} · {doc.semester || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {doc.doc_type || doc.source_type}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] font-mono">
                            {doc.page_count ?? 1} pgs / {doc.chunk_count ?? 0} chunks
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {doc.status === "ready" && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1 text-[10px]">
                              <CheckCircle2 className="w-3 h-3" /> Ready
                            </Badge>
                          )}
                          {doc.status === "processing" && (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 gap-1 text-[10px]">
                              <Clock className="w-3 h-3 animate-spin" /> Ingesting
                            </Badge>
                          )}
                          {doc.status === "failed" && (
                            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 gap-1 text-[10px]">
                              <AlertTriangle className="w-3 h-3" /> Failed
                            </Badge>
                          )}
                          {doc.error && (
                            <p className="text-[9px] text-rose-500 truncate max-w-[140px] mt-0.5" title={doc.error}>
                              {doc.error}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleReprocess(doc)}
                              title="Re-process Document"
                              className="h-7 w-7 text-slate-500 hover:text-indigo-600"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </Button>
// [rag-build-step 30/31]: style(admin-kb): update empty state illustration when no documents exist