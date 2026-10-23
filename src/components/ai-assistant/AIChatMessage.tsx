import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  ExternalLink,
  FileText,
  Sparkles,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Check,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface SourceCitation {
  index: number;
  title: string;
  page_start?: number;
  page_end?: number;
  url?: string;
  snippet?: string;
  score?: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "pdf_result" | "ats_result";
  source?: "rag" | "cache" | "llm_only";
  sources?: SourceCitation[];
  model_used?: string;
  fallback_used?: boolean;
  isLoading?: boolean;
  queryLogId?: string;
  feedback?: 1 | -1 | null;
}

interface AIChatMessageProps {
  message: Message;
  onFeedbackChange?: (messageId: string, feedback: 1 | -1) => void;
}

// Simple markdown-like renderer with clickable links and citation highlights
const renderMarkdown = (text: string) => {
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`|\[\d+\])/g);
// [rag-build-step 2/15]: feat(chat-message): render interactive citation pills for RAG sources