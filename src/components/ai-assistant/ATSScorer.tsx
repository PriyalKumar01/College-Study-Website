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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { RATE_LIMIT_CONFIG } from "@/data/ai-knowledge-base";

// ── Score ring component ─────────────────────────────────────
const ScoreRing = ({ score }: { score: number }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-100 dark:text-gray-800" />
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
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">/100</span>
      </div>
    </div>
  );
};

// ── Keyword chip ─────────────────────────────────────────────
const KeywordChip = ({ word, type }: { word: string; type: "matched" | "missing" }) => (
  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium
    ${type === "matched"
      ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800"
      : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800"
    }`}>
    {type === "matched"
      ? <CheckCircle2 className="w-3 h-3" />
      : <XCircle className="w-3 h-3" />
    }
    {word}
  </span>
);

// ── Parse AI response into structured data ──────────────────
const parseATSResponse = (raw: string) => {
  // Extract score
  const scoreMatch = raw.match(/ATS\s*Score[:\s]*(\d+)/i) || raw.match(/Score[:\s]*(\d+)/i);
  const score = scoreMatch ? Math.min(100, parseInt(scoreMatch[1])) : 65;

  // Extract matched keywords (after "Matched Keywords" section)
  const matchedSection = raw.match(/Matched\s*Keywords?[:\s]+([\s\S]*?)(?=Missing|Improvement|Section|$)/i);
  const matchedRaw = matchedSection?.[1] ?? "";
  const matched = matchedRaw
    .split(/[\n,•·\-]/)
    .map(w => w.replace(/\*\*/g, "").trim())
    .filter(w => w.length > 2 && w.length < 40 && !w.includes(":"));

  // Extract missing keywords
  const missingSection = raw.match(/Missing\s*Keywords?[:\s]+([\s\S]*?)(?=Section|Improvement|Suggestion|Top|$)/i);
  const missingRaw = missingSection?.[1] ?? "";
  const missing = missingRaw
    .split(/[\n,•·\-]/)
    .map(w => w.replace(/\*\*/g, "").trim())
    .filter(w => w.length > 2 && w.length < 40 && !w.includes(":"));

  return { score, matched: matched.slice(0, 12), missing: missing.slice(0, 12), fullResponse: raw };
};

interface ATSScorerProps {
  userEmail?: string;
}

const ATSScorer = ({ userEmail }: ATSScorerProps) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState(""); // manual text fallback
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; matched: string[]; missing: string[]; fullResponse: string } | null>(null);
  const [error, setError] = useState("");
  const [showFullResponse, setShowFullResponse] = useState(false);
  const [inputMode, setInputMode] = useState<"file" | "paste">("file");

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      setError("Please upload PDF or TXT file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large (max 5MB)");
      return;
    }
    setResumeFile(file);
    setError("");
    e.target.value = "";
  };

  const handleScore = async () => {
    if ((!resumeFile && !resumeText.trim()) || !jobDescription.trim()) {
      setError("Resume aur Job Description dono required hain!");
      return;
    }
    if (jobDescription.trim().length < 50) {
      setError("Job description bahut choti hai. Properly paste karein.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      let base64 = "";
      let fileName = "resume.txt";

      if (resumeFile) {
        fileName = resumeFile.name;
        base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              resolve(btoa(new Uint8Array(e.target?.result as ArrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), "")));
            } catch { reject(new Error("Read failed")); }
          };
          reader.onerror = () => reject(new Error("File error"));
          reader.readAsArrayBuffer(resumeFile);
        });
      }

      const { data, error: fnError } = await supabase.functions.invoke("ai-assistant", {
        body: {
          type: "ats_score",
          userEmail: userEmail ?? "anonymous",
          accessCode: RATE_LIMIT_CONFIG.accessCode,
          resumeText: base64 ? `[PDF Resume: ${fileName}]` : resumeText,
          jobDescription,
          ...(base64 ? { fileBase64: base64, fileName } : {}),
        },
      });

      if (fnError) throw fnError;
      const parsed = parseATSResponse(data?.response ?? "");
      setResult(parsed);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(`Error: ${msg}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-blue-200/50 dark:border-blue-800/30 
        bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20
        shadow-sm overflow-hidden"
    >
      {/* Section Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-base">AI ATS Resume Scorer</h3>
          <p className="text-white/75 text-xs">Upload resume + paste job description → get instant ATS score</p>
        </div>
        <span className="ml-auto bg-red-400 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">NEW</span>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Input Mode Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
          {(["file", "paste"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setInputMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                inputMode === mode
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {mode === "file" ? "📎 Upload Resume" : "📋 Paste Resume Text"}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Resume Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Your Resume
            </label>

            {inputMode === "file" ? (
              <div
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                  ${resumeFile
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800/50"
                  }`}
              >
                <input ref={fileRef} type="file" accept=".pdf,.txt,.doc,.docx" className="hidden" onChange={handleFileChange} />
                {resumeFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300 break-all">{resumeFile.name}</p>
                    <p className="text-xs text-gray-500">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Click to upload</p>
                    <p className="text-xs text-gray-400">PDF, DOC, TXT (max 5MB)</p>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Apna resume text yahan paste karein..."
                rows={8}
                className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-600
                  px-3 py-2.5 outline-none focus:border-blue-400 dark:focus:border-blue-600
                  focus:ring-1 focus:ring-blue-400/30 transition-all resize-none"
              />
            )}
          </div>

          {/* JD Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-500" />
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Job posting se full job description yahan paste karein (requirements, skills, responsibilities)..."
              rows={8}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                placeholder:text-gray-400 dark:placeholder:text-gray-600
                px-3 py-2.5 outline-none focus:border-purple-400 dark:focus:border-purple-600
                focus:ring-1 focus:ring-purple-400/30 transition-all resize-none"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 
              bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleScore}
          disabled={isLoading || (!resumeFile && !resumeText.trim()) || !jobDescription.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
            text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              AI Analyzing your resume...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Score My Resume
            </span>
          )}
        </Button>

        {/* ── Results ─────────────────────────────────────────── */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Score + headline */}
              <div className="flex items-center gap-5 p-4 bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700">
                <ScoreRing score={result.score} />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">ATS Score: {result.score}/100</h4>
                  <p className={`text-sm font-medium ${
                    result.score >= 70 ? "text-green-600 dark:text-green-400" :
                    result.score >= 50 ? "text-amber-600 dark:text-amber-400" :
                    "text-red-600 dark:text-red-400"
                  }`}>
                    {result.score >= 70 ? "✅ Good ATS Score! Most ATS will pass your resume." :
                     result.score >= 50 ? "⚠️ Average Score. Add missing keywords to improve." :
                     "❌ Low Score. Significant improvements needed."}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Target: 70+ for most job applications
                  </p>
                </div>
              </div>

              {/* Matched & Missing keywords */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Matched */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                  <h5 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Matched Keywords ({result.matched.length})
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matched.length > 0
                      ? result.matched.map(w => <KeywordChip key={w} word={w} type="matched" />)
                      : <span className="text-xs text-gray-400">Analyzing...</span>
                    }
                  </div>
                </div>

                {/* Missing */}
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50">
                  <h5 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Missing Keywords ({result.missing.length})
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing.length > 0
                      ? result.missing.map(w => <KeywordChip key={w} word={w} type="missing" />)
                      : <span className="text-xs text-gray-400">None found! 🎉</span>
                    }
                  </div>
                </div>
              </div>

              {/* Full AI Analysis toggle */}
              <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => setShowFullResponse(!showFullResponse)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold 
                    text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    Full AI Analysis & Suggestions
                  </span>
                  {showFullResponse ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {showFullResponse && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap border-t border-gray-100 dark:border-gray-700 pt-3">
                        {result.fullResponse}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tip */}
              <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center">
                💡 Tip: Add missing keywords naturally into your resume bullets. Avoid keyword stuffing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ATSScorer;
