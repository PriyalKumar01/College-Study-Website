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
  const [inputMode, setInputMode] = useState<"file" | "paste">("file");
  const [copied, setCopied] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type) && !file.name.endsWith('.pdf')) {
      setError("Please upload a PDF or TXT file");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("File size exceeds 8MB limit");
      return;
    }
    setResumeFile(file);
    setError("");
    e.target.value = "";
  };

  const handleScore = async () => {
    if ((!resumeFile && !resumeText.trim()) || !jobDescription.trim()) {
      setError("Resume (PDF file ya text) aur Job Description dono required hain!");
      return;
    }
    if (jobDescription.trim().length < 30) {
      setError("Job description thodi detail mein paste karein taaki ATS score accurate mile.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      let base64 = "";
      let fileName = "resume.pdf";

      if (resumeFile) {
        fileName = resumeFile.name;
        base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const arrayBuffer = e.target?.result as ArrayBuffer;
              const bytes = new Uint8Array(arrayBuffer);
              let binary = "";
              for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              resolve(btoa(binary));
            } catch { reject(new Error("PDF conversion error")); }
          };
          reader.onerror = () => reject(new Error("File read error"));
          reader.readAsArrayBuffer(resumeFile);
        });
      }

      const { data, error: fnError } = await supabase.functions.invoke("ai-assistant", {
        body: {
          type: "ats_score",
          userEmail: userEmail ?? "anonymous",
          accessCode: sessionStorage.getItem("csh_ai_code") || undefined,
          sessionToken: localStorage.getItem("csh_ai_session_token") || undefined,
          resumeText: base64 ? "" : resumeText,
          jobDescription,
          ...(base64 ? { fileBase64: base64, fileName } : {}),
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      const parsed = parseATSResponse(data?.response ?? "");
      setResult(parsed);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      setError(`Error: ${msg}. Please retry.`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAnalysis = () => {
    if (!result?.fullResponse) return;
    navigator.clipboard.writeText(result.fullResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 dark:border-slate-800 
        bg-white dark:bg-slate-900/95 backdrop-blur-xl
        shadow-xl overflow-hidden max-w-full"
    >
      {/* Section Header */}
      <div className="bg-slate-900 dark:bg-slate-950 px-5 sm:px-7 py-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
// [rag-build-step 4/9]: feat(ats-scorer): extract text from uploaded resume PDF for score analysis