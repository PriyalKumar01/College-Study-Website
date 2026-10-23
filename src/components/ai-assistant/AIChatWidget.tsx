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

    // Show user message
    const userMsgContent = currentFile
      ? `📎 ${currentFile.name}\n${currentInput || "Is document ko analyze karo aur key points explain karo."}`
      : currentInput;

    addMessage({
      role: "user",
      content: userMsgContent,
      type: currentFile ? "pdf_result" : "text",
    });

    setInput("");
    setAttachedFile(null);
    setAttachedContext(null);
    setFileExtractStatus("");
    setIsLoading(true);

    const loadingId = generateId();
    setMessages(prev => [...prev, {
      id: loadingId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    }]);

    try {
      // 1. Instant cached response if no file attached
      if (!currentFile) {
        const cached = findCachedResponse(currentInput);
        if (cached) {
          setMessages(prev => [
            ...prev.filter(m => m.id !== loadingId),
            {
              id: generateId(),
              role: "assistant",
              content: cached,
              timestamp: new Date(),
              source: "cache",
            },
          ]);
          setIsLoading(false);
          return;
        }
      }

      // 2. Prepare file context if not extracted yet
      let resolvedFileContext = currentExtractedContext;
      if (currentFile && !resolvedFileContext) {
        try {
          const base64 = await readFileAsBase64(currentFile);
          const { data } = await supabase.functions.invoke("rag-extract", {
            body: {
              fileBase64: base64,
              fileName: currentFile.name,
              mimeType: currentFile.type || "application/octet-stream",
            },
          });
          if (data?.text) {
            resolvedFileContext = { fileName: currentFile.name, text: data.text };
          }
        } catch (e) {
          console.warn("Fallback extraction failed:", e);
        }
      }

      // 3. Invoke rag-chat
      const sessionToken = localStorage.getItem("csh_ai_session_token") || undefined;
      const historyToSend = messages
        .filter(m => !m.isLoading && m.id !== "welcome")
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }));

      const queryToSend = currentInput || (currentFile ? `Analyze ${currentFile.name} and provide summary and top questions.` : "Hello");

      const storedCode = sessionStorage.getItem("csh_ai_code") || undefined;

      const { data, error } = await supabase.functions.invoke("rag-chat", {
        body: {
          query: queryToSend,
          sessionToken,
          accessCode: storedCode,
          attachedFileContext: resolvedFileContext,
          conversationHistory: historyToSend,
        },
      });

      if (error || data?.error) {
        // Fallback to legacy ai-assistant endpoint if rag-chat fails or encounters remote session issue
        console.warn("rag-chat notice, attempting ai-assistant fallback:", error || data?.error);
        let fallbackData: { response?: string } | null = null;
        let fallbackError: unknown = null;

        const res1 = await supabase.functions.invoke("ai-assistant", {
          body: {
            type: "chat",
            userEmail,
            query: queryToSend,
            systemPrompt: buildSystemPrompt(),
            accessCode: storedCode,
            sessionToken,
            conversationHistory: historyToSend,
          },
        });
        fallbackData = res1.data;
        fallbackError = res1.error;

        if (fallbackError) {
          throw new Error(data?.error || (error instanceof Error ? error.message : "Service temporarily unavailable"));
        }

        incrementLocalCount();
        setMessages(prev => [
          ...prev.filter(m => m.id !== loadingId),
          {
            id: generateId(),
            role: "assistant",
            content: fallbackData?.response ?? "Something went wrong. Please try again!",
            timestamp: new Date(),
            source: "llm_only",
          },
        ]);
        setQueriesLeft(Math.max(0, RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount()));
        return;
      }

      // Update remaining queries
      if (typeof data.remaining_queries === "number") {
        setQueriesLeft(data.remaining_queries);
        const used = Math.max(0, RATE_LIMIT_CONFIG.maxQueriesPerDay - data.remaining_queries);
        localStorage.setItem(RATE_LIMIT_CONFIG.rateLimitStorageKey, String(used));
      } else {
        incrementLocalCount();
        setQueriesLeft(Math.max(0, RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount()));
      }

      // Add response message with citations
      setMessages(prev => [
        ...prev.filter(m => m.id !== loadingId),
        {
          id: generateId(),
          role: "assistant",
          content: data.answer || "No response received.",
          timestamp: new Date(),
          sources: data.sources || [],
          source: data.source || "rag",
          model_used: data.model_used,
          fallback_used: data.fallback_used,
          queryLogId: data.session_id,
        },
      ]);

    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      console.error("AI Assistant error:", errMsg);

      setMessages(prev => [
        ...prev.filter(m => m.id !== loadingId),
        {
          id: generateId(),
          role: "assistant",
          content: `⚠️ **Connection Issue**

${errMsg}

Please:
1. Check your internet connection
2. Try again in a few moments
3. If the issue persists, contact Founder Priyal Kumar on WhatsApp (+91 89572 21543) 🙏`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsExtractingFile(false);
    }
  }, [input, attachedFile, attachedContext, isLoading, messages, user]);

  // Handle keyboard submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: `👋 **Chat cleared!** How can I help you today?

*You have ${queriesLeft} queries remaining today.* 🚀`,
      timestamp: new Date(),
    }]);
    setShowSuggestions(true);
  };

  const widgetWidthClass = isExpanded ? "sm:w-[540px]" : "sm:w-[430px]";
  const widgetHeightClass = isExpanded
    ? "max-h-[min(680px,calc(100dvh-120px))]"
    : "max-h-[min(580px,calc(100dvh-120px))]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed z-[162] flex flex-col rounded-2xl overflow-hidden
        shadow-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100
        ${widgetWidthClass}
        left-3 right-3 bottom-20
        max-w-[calc(100vw-24px)]
        sm:left-auto sm:right-6 sm:bottom-24
        ${widgetHeightClass}
      `}
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="bg-slate-900 dark:bg-slate-950 px-4 py-3 flex items-center justify-between flex-shrink-0 border-b border-slate-800 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">College Study Assistant</span>
              <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none uppercase">
                RAG BETA
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 text-[10px]">Grounded AI · {queriesLeft}/{RATE_LIMIT_CONFIG.maxQueriesPerDay} queries left</span>
            </div>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Clear chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Messages Area ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-3.5 py-3.5 space-y-3 min-h-0 scroll-smooth custom-scrollbar">
        {messages.map((msg) =>
          msg.isLoading ? (
            <TypingIndicator key={msg.id} />
          ) : (
            <AIChatMessage key={msg.id} message={msg} />
          )
        )}

        {/* Quick suggestion chips */}
        <AnimatePresence>
          {showSuggestions && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pt-1"
            >
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 px-1 uppercase tracking-wider">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800
                      text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all font-medium shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── File attachment preview ───────────────────────────── */}
      <AnimatePresence>
        {attachedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-100/90 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3.5 py-2.5"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700 dark:text-slate-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-800 dark:text-slate-200 truncate font-medium">{attachedFile.name}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span>{(attachedFile.size / 1024).toFixed(0)} KB</span>
                  {isExtractingFile ? (
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                      {fileExtractStatus}
                    </span>
                  ) : attachedContext ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {fileExtractStatus || "Extracted & ready"}
                    </span>
                  ) : (
                    <span>{fileExtractStatus}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setAttachedFile(null);
                  setAttachedContext(null);
                  setFileExtractStatus("");
                }}
                className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input Area ────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3.5 py-3 flex-shrink-0">
        {queriesLeft <= 2 && queriesLeft > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-400 mb-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl px-2.5 py-1">
            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
            Sirf {queriesLeft} queries baaki hain aaj ke liye!
          </div>
        )}
        {queriesLeft === 0 && (
          <div className="flex items-center gap-1.5 text-[10px] text-rose-700 dark:text-rose-400 mb-2 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-2.5 py-1">
            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
            Aaj ki limit khatam ho gayi. Kal phir milte hain! 🌙
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* File attach button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={!!attachedFile || isLoading}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800
              disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            title="Attach Document (PDF, DOCX, TXT, PPTX, Image)"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.pptx,.txt,.md,image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Text input */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              attachedFile
                ? "Ask anything about this document..."
                : "Ask about notes, syllabus, scholarships, HBTU portals..."
            }
            disabled={isLoading || queriesLeft === 0}
            rows={1}
            className="flex-1 resize-none rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800
              text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
              px-3 py-2.5 outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-slate-400 dark:focus:border-slate-600
              focus:ring-1 focus:ring-slate-400/20 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              max-h-24 overflow-y-auto"
            style={{ lineHeight: "1.4" }}
// [rag-build-step 33/35]: refactor(chat-widget): optimize memory usage on long chat sessions