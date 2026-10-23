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
      );
    }
    // Link: [text](url)
    const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-0.5 text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 font-semibold transition-colors"
          onClick={
            !isExternal
              ? (e) => {
                  e.preventDefault();
                  window.location.href = href;
                }
              : undefined
          }
        >
          {label}
          {isExternal && <ExternalLink className="w-2.5 h-2.5" />}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const formatMessage = (content: string) => {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-1 my-1.5">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-2 items-start text-xs">
              <span className="text-slate-500 mt-0.5 flex-shrink-0">•</span>
              <span>{renderMarkdown(item.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, i) => {
    if (!line.trim()) {
      flushList();
      return;
    }

    // Heading: # ## ###
    if (/^#{1,3}\s/.test(line)) {
      flushList();
      const level = line.match(/^(#{1,3})/)?.[1].length || 1;
      const text = line.replace(/^#{1,3}\s/, "");
      const cls =
        level === 1
          ? "text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1"
          : "text-xs font-bold text-slate-800 dark:text-slate-100 mt-1.5 mb-0.5";
      elements.push(
        <p key={i} className={cls}>
          {renderMarkdown(text)}
        </p>
      );
      return;
    }

    // List items
    if (/^[-•*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      inList = true;
      listItems.push(line);
      return;
    }

    flushList();
    elements.push(
      <p key={i} className="leading-relaxed text-xs">
        {renderMarkdown(line)}
      </p>
    );
  });

  flushList();
  return elements;
};

// Typing indicator
export const TypingIndicator = () => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 items-start">
    <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 text-emerald-400">
      <Bot className="w-4 h-4" />
    </div>
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
      <div className="flex gap-1.5 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-slate-500 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const AIChatMessage = ({ message, onFeedbackChange }: AIChatMessageProps) => {
  const isUser = message.role === "user";
  const [expandedSource, setExpandedSource] = useState<number | null>(null);
  const [userFeedback, setUserFeedback] = useState<1 | -1 | null>(message.feedback ?? null);

  const handleFeedback = async (score: 1 | -1) => {
    setUserFeedback(score);
    if (onFeedbackChange) onFeedbackChange(message.id, score);

    if (message.queryLogId) {
      await supabase
        .from("ai_query_logs")
        .update({ feedback: score })
        .eq("id", message.queryLogId)
        .catch(() => {});
    }
  };

  if (message.isLoading) {
    return <TypingIndicator />;
  }

  const isDev = import.meta.env.DEV;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 ${
          isUser
            ? "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            : "bg-slate-900 dark:bg-slate-800 border border-slate-700 text-emerald-400"
        }`}
// [rag-build-step 9/15]: style(chat-message): improve dark mode readability for AI answers