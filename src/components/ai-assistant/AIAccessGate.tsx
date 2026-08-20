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
    <div className="flex flex-col items-center justify-center px-5 py-5 text-center bg-white dark:bg-slate-900">
      {/* Lock Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-center mb-3 shadow-sm text-indigo-600 dark:text-indigo-400"
      >
        <Lock className="w-6 h-6" />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-base font-bold text-slate-900 dark:text-white mb-0.5"
      >
        College Study Assistant
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed"
      >
        Enter your beta access code to unlock AI assistance.
      </motion.p>

      {/* Features preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-3 mb-4 text-left"
      >
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          Key Capabilities:
        </p>
        <ul className="space-y-1.5">
          {[
            "📚 Branch & semester notes finder",
            "🏛️ HBTU website & academic doubts",
            "📄 PDF resume scanner & ATS score",
            "💡 GATE practice & PYQ analysis",
          ].map((item) => (
            <li key={item} className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item}</li>
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
            className="w-full px-4 py-2.5 text-center font-mono text-sm font-bold tracking-widest
              rounded-xl border transition-all duration-200 outline-none
              bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-600
              border-slate-300 dark:border-slate-700
              focus:bg-white dark:focus:bg-slate-950
              focus:border-indigo-600 dark:focus:border-indigo-500
              focus:ring-2 focus:ring-indigo-500/20"
          />
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-rose-500 mb-3 justify-center font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={!code.trim() || isChecking}
          className="w-full py-2.5 rounded-xl font-bold text-xs text-white
            bg-indigo-600 hover:bg-indigo-700
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
              Verifying Code...
            </span>
          ) : (
            "🔓 Unlock Assistant"
          )}
        </button>
      </motion.form>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3.5 leading-relaxed">
        Don&apos;t have a code? Contact{" "}
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Priyal Kumar sir</span> for beta access.
      </p>
    </div>
  );
};

export default AIAccessGate;
