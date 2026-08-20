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
import { RATE_LIMIT_CONFIG } from "@/data/ai-knowledge-base";

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
          accessCode: RATE_LIMIT_CONFIG.accessCode,
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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-5 sm:px-7 py-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-inner">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base sm:text-lg">AI ATS Resume Scorer & Analyzer</h3>
              <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                BETA
              </span>
            </div>
            <p className="text-slate-300 text-xs mt-0.5">Upload PDF resume + Job Description → Instant ATS score, missing skills & tailored points</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Input Mode Toggle */}
        <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit border border-slate-200 dark:border-slate-700/60">
          {(["file", "paste"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setInputMode(mode)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                inputMode === mode
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {mode === "file" ? "📎 Upload PDF Resume" : "📋 Paste Resume Text"}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Resume Input */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              1. Your Resume (PDF Scan)
            </label>

            {inputMode === "file" ? (
              <div
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px]
                  ${resumeFile
                    ? "border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-950/40"
                  }`}
              >
                <input ref={fileRef} type="file" accept=".pdf,.txt,.doc,.docx" className="hidden" onChange={handleFileChange} />
                {resumeFile ? (
                  <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                      <FileText className="w-8 h-8" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate w-full">{resumeFile.name}</p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      ✓ PDF Ready for Direct AI Word Scan ({(resumeFile.size / 1024).toFixed(0)} KB)
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                      className="text-xs text-rose-500 hover:underline mt-1 font-semibold"
                    >
                      Change File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">Click to upload your Resume PDF</p>
                    <p className="text-[11px] text-muted-foreground">Scans words, skills & formatting automatically (max 8MB)</p>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Apna resume text yahan paste karein..."
                rows={8}
                className="w-full text-xs rounded-2xl border border-slate-200 dark:border-slate-800 
                  bg-slate-50/50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200
                  placeholder:text-slate-400 dark:placeholder:text-slate-600
                  p-3.5 outline-none focus:border-blue-500 dark:focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/20 transition-all resize-none min-h-[190px]"
              />
            )}
          </div>

          {/* JD Input */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-500" />
              2. Job Description (Target Role)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Target company ya job listing ka text paste karein (e.g. SDE-1, Web Developer, Data Analyst requirements, tech stack, skills)..."
              rows={8}
              className="w-full text-xs rounded-2xl border border-slate-200 dark:border-slate-800 
                bg-slate-50/50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200
                placeholder:text-slate-400 dark:placeholder:text-slate-600
                p-3.5 outline-none focus:border-purple-500 dark:focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/20 transition-all resize-none min-h-[190px]"
            />
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 text-xs sm:text-sm text-rose-600 dark:text-rose-400 
              bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-4"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleScore}
          disabled={isLoading || (!resumeFile && !resumeText.trim()) || !jobDescription.trim()}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
            text-white font-bold py-3.5 h-auto rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2.5">
              <Loader2 className="w-5 h-5 animate-spin" />
              Scanning PDF words & calculating ATS score...
            </span>
          ) : (
            <span className="flex items-center gap-2.5">
              <BarChart2 className="w-5 h-5" />
              Scan Resume & Calculate ATS Score
            </span>
          )}
        </Button>

        {/* ── Structured Results Section ──────────────────────── */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-5 overflow-hidden pt-2"
            >
              {/* Score card */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gradient-to-r from-slate-50 to-indigo-50/40 dark:from-slate-950 dark:to-indigo-950/30 rounded-3xl border border-slate-200 dark:border-slate-800">
                <ScoreRing score={result.score} />
                <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">ATS Match Score: {result.score}/100</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      result.score >= 75 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" :
                      result.score >= 50 ? "bg-amber-500/10 text-amber-600 border-amber-500/30" :
                      "bg-rose-500/10 text-rose-600 border-rose-500/30"
                    }`}>
                      {result.score >= 75 ? "STRONG PASS" : result.score >= 50 ? "MODERATE" : "NEEDS WORK"}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm font-semibold ${
                    result.score >= 75 ? "text-emerald-600 dark:text-emerald-400" :
                    result.score >= 50 ? "text-amber-600 dark:text-amber-400" :
                    "text-rose-600 dark:text-rose-400"
                  }`}>
                    {result.score >= 75 ? "✅ Excellent! High probability of clearing automated ATS filters." :
                     result.score >= 50 ? "⚠️ Average Match. Incorporate the missing keywords and metrics below." :
                     "❌ Low Match. Significant alignment needed with target JD."}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Industry standard target: <strong>75+ for top tech and product companies</strong>
                  </p>
                </div>
              </div>

              {/* Matched & Missing Keywords Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Matched */}
                <div className="p-4 sm:p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
                  <h5 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Matched Keywords ({result.matched.length})
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matched.length > 0
                      ? result.matched.map(w => <KeywordChip key={w} word={w} type="matched" />)
                      : <span className="text-xs text-muted-foreground">Keywords matching target job requirements.</span>
                    }
                  </div>
                </div>

                {/* Missing */}
                <div className="p-4 sm:p-5 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 space-y-3">
                  <h5 className="text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    Missing Keywords ({result.missing.length})
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing.length > 0
                      ? result.missing.map(w => <KeywordChip key={w} word={w} type="missing" />)
                      : <span className="text-xs text-emerald-500 font-semibold">No critical missing keywords! 🎉</span>
                    }
                  </div>
                </div>
              </div>

              {/* Full Detailed Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-950/60 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/50">
                  <button
                    onClick={() => setShowFullResponse(!showFullResponse)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-500 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Detailed Section Audit & Tailored Bullets
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFullResponse ? 'rotate-180' : ''}`} />
                  </button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyAnalysis}
                    className="h-8 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 gap-1.5"
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy Report"}
                  </Button>
                </div>

                <AnimatePresence>
                  {showFullResponse && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans space-y-2 custom-scrollbar">
                        {result.fullResponse}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pro-tip banner */}
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-600 dark:text-blue-400 font-medium">
                💡 <strong>Pro Tip:</strong> Add missing keywords naturally into your bullet points with quantifiable impact metrics (e.g. <em>"Increased speed by 35%"</em>).
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ATSScorer;
