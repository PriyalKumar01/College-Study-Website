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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    setMessages(prev => [...prev, { ...msg, id: generateId(), timestamp: new Date() }]);
  };

  // ── Read File to Base64 ──────────────────────────────────────
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const res = reader.result as string;
          const base64 = res.includes(",") ? res.split(",")[1] : res;
          resolve(base64);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsDataURL(file);
    });
  };

  // ── Handle File Selection & Auto-Extraction ──────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExts = [".pdf", ".docx", ".pptx", ".txt", ".md", ".png", ".jpg", ".jpeg", ".webp"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const isAllowed = allowedExts.includes(ext) || file.type.startsWith("image/") || file.type === "application/pdf";

    if (!isAllowed) {
      addMessage({
        role: "assistant",
        content: "⚠️ Abhi sirf **PDF, DOCX, PPTX, TXT, MD aur Images** supported hain. Kripya supported format select karein.",
      });
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      addMessage({
        role: "assistant",
        content: "⚠️ File size **10MB se zyada** hai. Kripya choti file attach karein.",
      });
      e.target.value = "";
      return;
    }

    setAttachedFile(file);
    setAttachedContext(null);
    setIsExtractingFile(true);
    setFileExtractStatus("AI scanning & text extraction...");

    try {
      const base64 = await readFileAsBase64(file);
      const { data, error } = await supabase.functions.invoke("rag-extract", {
        body: {
          fileBase64: base64,
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
        },
      });

      if (!error && data?.text) {
        setAttachedContext({ fileName: file.name, text: data.text });
        setFileExtractStatus(
          `Extracted ${data.text.length} chars${data.ocrUsed ? " (Gemini OCR)" : ""}`
        );
      } else {
        setFileExtractStatus("Attached (will analyze on submit)");
      }
    } catch {
      setFileExtractStatus("Attached (ready)");
    } finally {
      setIsExtractingFile(false);
      e.target.value = "";
    }
  };

  // ── Send Message ─────────────────────────────────────────────
  const handleSend = useCallback(async (queryText?: string) => {
    const text = (queryText ?? input).trim();
    if (!text && !attachedFile) return;
    if (isLoading) return;

    setShowSuggestions(false);
    const userEmail = user?.email ?? "anonymous";

    // Client-side rate check
    const currentCount = getLocalCount();
    if (currentCount >= RATE_LIMIT_CONFIG.maxQueriesPerDay) {
      addMessage({
        role: "assistant",
        content: `⛔ **Daily Limit Reached**\n\nAapne aaj ke ${RATE_LIMIT_CONFIG.maxQueriesPerDay} queries use kar liye hain.\n\nLimit **midnight IST** pe reset hogi. Kal phir milte hain! 🌙\n\n*Need more? Contact Priyal Kumar sir for expanded access.*`,
      });
      return;
    }

    const currentInput = text;
    const currentFile = attachedFile;
    const currentExtractedContext = attachedContext;

// [rag-build-step 11/35]: feat(chat-widget): smooth scrolling to latest message during streaming