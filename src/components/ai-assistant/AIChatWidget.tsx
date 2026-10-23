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
// [rag-build-step 2/35]: refactor(chat-widget): update welcome message to professional English