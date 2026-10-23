import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Briefcase,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  BarChart2,
  Copy,
  Check,
  CheckCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// ── Score ring component ─────────────────────────────────────
const ScoreRing = ({ score }: { score: number }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" />
        {/* Score ring */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          className="transition-all duration-1000"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{score}</span>
        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 dark:text-slate-400">/100 ATS</span>
      </div>
    </div>
  );
};

// ── Keyword chip ─────────────────────────────────────────────
const KeywordChip = ({ word, type }: { word: string; type: "matched" | "missing" }) => (
  <span className={`inline-flex items-center gap-1 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg font-semibold transition-all
    ${type === "matched"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
    }`}>
    {type === "matched"
      ? <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
      : <XCircle className="w-3 h-3 text-rose-500 shrink-0" />
    }
    <span className="truncate max-w-[160px]">{word}</span>
  </span>
);

// ── Parse AI response into structured data ──────────────────
const parseATSResponse = (raw: string) => {
  // Extract score
  const scoreMatch = raw.match(/ATS\s*Score[:\s]*(\d+)/i) || raw.match(/Score[:\s]*(\d+)/i);
  const score = scoreMatch ? Math.min(100, Math.max(10, parseInt(scoreMatch[1]))) : 70;

  // Extract matched keywords
  const matchedSection = raw.match(/Matched\s*Keywords?[:\s]+([\s\S]*?)(?=Missing|Section|Review|Improvement|Top|$)/i);
  const matchedRaw = matchedSection?.[1] ?? "";
  const matched = matchedRaw
    .split(/[\n,•·\-|]/)
    .map(w => w.replace(/\*\*/g, "").replace(/^[0-9.]+\s*/, "").trim())
    .filter(w => w.length > 1 && w.length < 35 && !w.includes(":") && !w.toLowerCase().includes("keywords"));

  // Extract missing keywords
  const missingSection = raw.match(/Missing\s*Keywords?[:\s]+([\s\S]*?)(?=Section|Review|Improvement|Suggestion|Top|Tailored|$)/i);
  const missingRaw = missingSection?.[1] ?? "";
  const missing = missingRaw
    .split(/[\n,•·\-|]/)
    .map(w => w.replace(/\*\*/g, "").replace(/^[0-9.]+\s*/, "").trim())
    .filter(w => w.length > 1 && w.length < 35 && !w.includes(":") && !w.toLowerCase().includes("keywords"));

  return { score, matched: matched.slice(0, 14), missing: missing.slice(0, 14), fullResponse: raw };
};

interface ATSScorerProps {
  userEmail?: string;
}

const ATSScorer = ({ userEmail }: ATSScorerProps) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; matched: string[]; missing: string[]; fullResponse: string } | null>(null);
  const [error, setError] = useState("");
  const [showFullResponse, setShowFullResponse] = useState(true);
// [rag-build-step 2/9]: refactor(ats-scorer): replace blue accent styling with sleek slate and emerald palette