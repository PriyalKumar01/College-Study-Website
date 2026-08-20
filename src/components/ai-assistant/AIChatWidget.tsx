import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Paperclip,
  X,
  Minus,
  Maximize2,
  Minimize2,
  FileText,
  AlertTriangle,
  Sparkles,
  RotateCcw,
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
  "CSE 5th sem ke notes kahan hain?",
  "CGPA calculator kahan hai?",
  "Notes contribute kaise karein?",
  "Premium access kaise milega?",
  "Scholarships portal dikhaao",
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
      content: `👋 **Hello! Main hoon StudyHub AI** — aapka academic assistant!

Aap mujhse puch sakte hain:
- 📚 Branch/semester ke notes
- 🏆 Scholarships & opportunities
- 💼 Premium features & access
- 📄 PDF analyze (attach karein below)
- 💡 Kuch bhi website ke baare mein!

*Aaj ke liye ${RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount()} queries baaki hain.* 🚀`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [queriesLeft, setQueriesLeft] = useState(RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount());

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

  // ── PDF Text Extraction ──────────────────────────────────────
  const extractPDFText = async (file: File): Promise<string> => {
    // Use FileReader to read as ArrayBuffer, then pass raw bytes to edge function
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // We'll send the file as base64 to the edge function for server-side parsing
          const base64 = btoa(
            new Uint8Array(e.target?.result as ArrayBuffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), "")
          );
          resolve(base64);
        } catch {
          reject(new Error("PDF read failed"));
        }
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsArrayBuffer(file);
    });
  };

  // ── Send Message ─────────────────────────────────────────────
  const handleSend = useCallback(async (queryText?: string) => {
    const text = queryText ?? input.trim();
    if (!text && !attachedFile) return;
    if (isLoading) return;

    // Hide suggestions once user starts
    setShowSuggestions(false);

    const userEmail = user?.email ?? "anonymous";

    // Rate limit check
    const count = getLocalCount();
    if (count >= RATE_LIMIT_CONFIG.maxQueriesPerDay) {
      addMessage({
        role: "assistant",
        content: `⛔ **Daily Limit Reached**

Aapne aaj ke ${RATE_LIMIT_CONFIG.maxQueriesPerDay} queries use kar liye hain.

Limit **midnight IST** pe reset hogi. Kal phir milte hain! 🌙

*Need more? Contact Priyal Kumar sir for expanded access.*`,
      });
      return;
    }

    // Show user message
    const userMsgContent = attachedFile
      ? `📎 ${attachedFile.name}\n${text || "Is PDF ko analyze karo aur top 10 most probable questions do."}`
      : text;

    addMessage({
      role: "user",
      content: userMsgContent,
      type: attachedFile ? "pdf_result" : "text",
    });

    const currentInput = text;
    const currentFile = attachedFile;
    setInput("");
    setAttachedFile(null);
    setIsLoading(true);

    // Add typing indicator
    const loadingId = generateId();
    setMessages(prev => [...prev, {
      id: loadingId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    }]);

    try {
      let responseText = "";

      // ── PDF Analysis path ──────────────────────────────────
      if (currentFile) {
        setIsProcessingFile(true);
        const base64PDF = await extractPDFText(currentFile);
        setIsProcessingFile(false);

        const { data, error } = await supabase.functions.invoke("ai-assistant", {
          body: {
            type: "pdf_analyze",
            userEmail,
            fileName: currentFile.name,
            fileBase64: base64PDF,
            userQuery: currentInput || "Top 10 most probable exam questions do is PDF se. Unhe clearly numbered list mein format karo.",
            accessCode: RATE_LIMIT_CONFIG.accessCode,
          },
        });

        if (error) throw error;
        responseText = data?.response ?? "PDF analyze karne mein kuch issue aaya. Please try again.";
        incrementLocalCount();

      } else {
        // ── Cache check first ───────────────────────────────
        const cached = findCachedResponse(currentInput);

        if (cached) {
          // Instant cached response — no API call, no rate limit deduction
          responseText = cached;
        } else {
          // ── API call ────────────────────────────────────
          const { data, error } = await supabase.functions.invoke("ai-assistant", {
            body: {
              type: "chat",
              userEmail,
              query: currentInput,
              systemPrompt: buildSystemPrompt(),
              accessCode: RATE_LIMIT_CONFIG.accessCode,
              conversationHistory: messages
                .filter(m => !m.isLoading && m.id !== "welcome")
                .slice(-6) // last 6 messages for context
                .map(m => ({ role: m.role, content: m.content })),
            },
          });

          if (error) throw error;
          responseText = data?.response ?? "Kuch gadbad ho gayi. Please try again!";
          incrementLocalCount();
        }
      }

      // Remove loading indicator, add real response
      setMessages(prev => [
        ...prev.filter(m => m.id !== loadingId),
        { id: generateId(), role: "assistant", content: responseText, timestamp: new Date() },
      ]);

      setQueriesLeft(RATE_LIMIT_CONFIG.maxQueriesPerDay - getLocalCount());

    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      console.error("AI Assistant error:", errMsg);
      
      setMessages(prev => [
        ...prev.filter(m => m.id !== loadingId),
        {
          id: generateId(),
          role: "assistant",
          content: `⚠️ **Connection Error**

Kuch technical issue aaya. Please:
1. Internet connection check karein
2. Thodi der baad retry karein

*Agar problem continue kare toh WhatsApp karo Priyal Kumar sir ko.* 🙏`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsProcessingFile(false);
    }
  }, [input, attachedFile, isLoading, messages, user]);

  // Handle keyboard submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // File attachment handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== "application/pdf") {
      addMessage({ role: "assistant", content: "⚠️ Abhi sirf **PDF files** support hoti hain. Please PDF attach karein." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      addMessage({ role: "assistant", content: "⚠️ File size **5MB se zyada** hai. Choti PDF use karein." });
      return;
    }
    setAttachedFile(file);
    // Reset file input
    e.target.value = "";
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: `👋 **Chat clear ho gayi!** Aap fresh start kar sakte ho.

*Aaj ke liye ${queriesLeft} queries baaki hain.* 🚀`,
      timestamp: new Date(),
    }]);
    setShowSuggestions(true);
  };

  // Chat widget positioning:
  // Mobile: fills most of screen above bottom nav
  // Desktop: anchored right/bottom, height capped so it never bleeds off top
  const widgetWidthClass = isExpanded ? "sm:w-[490px]" : "sm:w-[410px]";
  const widgetHeightClass = isExpanded
    ? "max-h-[min(640px,calc(100dvh-120px))]"
    : "max-h-[min(560px,calc(100dvh-120px))]";

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
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">College Study Assistant</span>
              <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none uppercase">
                BETA
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 text-[10px]">Online · {queriesLeft}/{RATE_LIMIT_CONFIG.maxQueriesPerDay} queries left today</span>
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
                      text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:border-indigo-200 transition-all font-medium shadow-sm"
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
            className="bg-indigo-50/50 dark:bg-slate-900 border-t border-indigo-100 dark:border-slate-800 px-3.5 py-2.5"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span className="text-xs text-slate-800 dark:text-slate-200 truncate flex-1 font-medium">{attachedFile.name}</span>
              <span className="text-[10px] text-slate-500">
                {(attachedFile.size / 1024).toFixed(0)} KB
              </span>
              <button
                onClick={() => setAttachedFile(null)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {isProcessingFile && (
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1 font-medium">
                <span className="animate-spin inline-block">⟳</span> Scanning PDF with AI...
              </p>
            )}
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
            className="p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800
              disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            title="Attach PDF"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Text input */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={attachedFile ? "PDF ya resume ke baare mein kuch puchho..." : "HBTU, notes, scholarships kuch bhi puchhein..."}
            disabled={isLoading || queriesLeft === 0}
            rows={1}
            className="flex-1 resize-none rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800
              text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
              px-3 py-2.5 outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-600
              focus:ring-1 focus:ring-indigo-600/30 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              max-h-24 overflow-y-auto"
            style={{ lineHeight: "1.4" }}
          />

          {/* Send button */}
          <button
            onClick={() => handleSend()}
            disabled={(!input.trim() && !attachedFile) || isLoading || queriesLeft === 0}
            className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-indigo-700 transition-all
              shadow-md hover:shadow-indigo-500/20 active:scale-95 flex-shrink-0"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-[9px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
            <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
            College Study Assistant · Beta
          </p>
          <p className="text-[9px] text-slate-400 dark:text-slate-500">
            Enter to send · Shift+Enter for newline
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChatWidget;
