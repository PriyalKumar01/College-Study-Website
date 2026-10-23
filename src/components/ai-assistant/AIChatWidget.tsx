import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Paperclip,
  X,
  Maximize2,
  Minimize2,
  FileText,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AIChatMessage, { Message, TypingIndicator } from "./AIChatMessage";
import { findCachedResponse, RATE_LIMIT_CONFIG, buildSystemPrompt } from "@/data/ai-knowledge-base";

// ── Rate limit helpers (client-side fallback) ────────────────
const getTodayStr = () => new Date().toISOString().split("T")[0];

const getLocalCount = (): number => {
  const savedDate = localStorage.getItem(RATE_LIMIT_CONFIG.rateLimitDateKey);
  const today = getTodayStr();
  if (savedDate !== today) {
    localStorage.setItem(RATE_LIMIT_CONFIG.rateLimitDateKey, today);
    localStorage.setItem(RATE_LIMIT_CONFIG.rateLimitStorageKey, "0");
    return 0;
  }
  return parseInt(localStorage.getItem(RATE_LIMIT_CONFIG.rateLimitStorageKey) || "0", 10);
};

const incrementLocalCount = () => {
  const count = getLocalCount() + 1;
  localStorage.setItem(RATE_LIMIT_CONFIG.rateLimitStorageKey, String(count));
  return count;
};

// ── Quick suggestion chips ────────────────────────────────────
const QUICK_SUGGESTIONS = [
  "Where can I find CSE 5th sem notes?",
  "Explain Operating Systems deadlock recovery",
  "Where is the CGPA calculator?",
  "How can I contribute notes?",
  "Show scholarships portal",
];

// ── Helpers ────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2, 9);

interface AIChatWidgetProps {
  onClose: () => void;
}

const AIChatWidget = ({ onClose }: AIChatWidgetProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 **Hello! I am College Study Assistant** — your official academic AI assistant!

You can ask me anything about your courses and the platform:
- 📚 Notes, PYQs & Syllabus across all branches
- 🏛️ HBTU portals, ERP & attendance regulations
- 🏆 Scholarships & career opportunities
- 📄 Document analysis (attach any PDF, DOCX, TXT, or PPTX below)

*You have ${Math.max(0, RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount())} queries remaining today.* 🚀`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [attachedContext, setAttachedContext] = useState<{ fileName: string; text: string } | null>(null);
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [fileExtractStatus, setFileExtractStatus] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [queriesLeft, setQueriesLeft] = useState(Math.max(0, RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount()));

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
// [rag-build-step 5/35]: feat(chat-widget): show selected attachment chip with remove action