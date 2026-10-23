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

// [rag-build-step 11/31]: feat(admin-kb): display document status badge with ready, processing, failed states