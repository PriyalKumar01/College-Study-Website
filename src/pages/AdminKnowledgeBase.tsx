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
// [rag-build-step 2/31]: feat(admin-kb): enforce admin role authentication on knowledge base page