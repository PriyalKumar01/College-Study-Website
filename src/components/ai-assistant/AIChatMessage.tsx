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

  return parts.map((part, i) => {
    // Bold: **text**
    if (/^\*\*(.+)\*\*$/.test(part)) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    // Inline code: `code`
    if (/^`(.+)`$/.test(part)) {
      return (
        <code
          key={i}
          className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1 py-0.5 rounded text-[11px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Citation tag: [1], [2]
    if (/^\[\d+\]$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-flex items-center justify-center font-mono text-[9px] font-black text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-1.5 py-0.2 rounded-md mx-0.5 align-baseline"
        >
          {part}
        </span>
// [rag-build-step 3/15]: feat(chat-message): add citation popover preview with snippet and page number