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
// [rag-build-step 3/31]: feat(admin-kb): implement document stats header with total counts