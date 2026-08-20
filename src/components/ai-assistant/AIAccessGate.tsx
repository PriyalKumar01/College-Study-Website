import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, AlertCircle } from "lucide-react";
import { RATE_LIMIT_CONFIG } from "@/data/ai-knowledge-base";

interface AIAccessGateProps {
  onAccessGranted: () => void;
}

const AIAccessGate = ({ onAccessGranted }: AIAccessGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setError("");

    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 600));

    if (code.trim() === RATE_LIMIT_CONFIG.accessCode) {
      localStorage.setItem(RATE_LIMIT_CONFIG.localStorageKey, "true");
      onAccessGranted();
    } else {
      setIsShaking(true);
      setError("Invalid access code. Contact Priyal Kumar sir for access.");
      setTimeout(() => setIsShaking(false), 500);
    }
    setIsChecking(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-5 py-6 text-center">
      {/* Lock Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 
          dark:from-blue-900/40 dark:to-purple-900/40 flex items-center justify-center mb-4 shadow-md"
      >
        <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-base font-bold text-gray-900 dark:text-white mb-1"
      >
        AI Assistant — Beta Access
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed"
      >
        This is a beta feature. Enter your access code to continue.
      </motion.p>

      {/* Features preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full bg-slate-950/70 dark:bg-slate-950/80 border border-slate-800 rounded-2xl p-3 mb-5 text-left"
      >
        <p className="text-[11px] font-bold text-slate-300 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          What you can do:
        </p>
        <ul className="space-y-1">
          {[
            "📚 Find notes by branch & semester",
            "🔍 Solve HBTU website & academic doubts",
            "📄 Scan PDF resumes & get ATS score",
            "💡 Practice GATE questions & PYQ analysis",
          ].map((item) => (
            <li key={item} className="text-[11px] text-slate-400">{item}</li>
          ))}
        </ul>
      </motion.div>

      {/* Code Input Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="w-full"
      >
        <motion.div
          animate={isShaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mb-3"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="ACCESS#XXXX"
            maxLength={12}
            className="w-full px-4 py-3 text-center font-mono text-sm font-semibold tracking-widest
              rounded-xl border transition-all duration-200 outline-none
              bg-slate-950 text-white
              placeholder:text-slate-600
              border-slate-800
              focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-500/20"
          />
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-[11px] text-rose-400 mb-3 justify-center"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={!code.trim() || isChecking}
          className="w-full py-3 rounded-xl font-bold text-sm text-white
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-500 hover:to-indigo-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 shadow-md hover:shadow-indigo-500/20
            active:scale-[0.98]"
        >
          {isChecking ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Verifying...
            </span>
          ) : (
            "🔓 Unlock Assistant"
          )}
        </button>
      </motion.form>

      <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
        Don&apos;t have a code? Contact{" "}
        <span className="text-blue-400 font-medium">Priyal Kumar sir</span> for beta access.
      </p>
    </div>
  );
};

export default AIAccessGate;
