import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, AlertCircle } from "lucide-react";
import { RATE_LIMIT_CONFIG } from "@/data/ai-knowledge-base";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AIAccessGateProps {
  onAccessGranted: () => void;
}

const AIAccessGate = ({ onAccessGranted }: AIAccessGateProps) => {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    setIsChecking(true);
    setError("");

    try {
      let sessionToken = "";
      let granted = false;

      // Validate securely against server-side edge function
      try {
        const { data: unlockData, error: unlockError } = await supabase.functions.invoke("ai-unlock", {
          body: {
            accessCode: cleanCode,
            userEmail: user?.email ?? "anonymous",
          },
        });

        if (!unlockError && unlockData?.valid) {
          granted = true;
          sessionToken = unlockData.sessionToken || `csh_sess_${Date.now()}`;
        } else {
          // Fallback to ai-assistant verify_access
          const { data: assistData, error: assistError } = await supabase.functions.invoke("ai-assistant", {
            body: {
              type: "verify_access",
              accessCode: cleanCode,
              userEmail: user?.email ?? "anonymous",
            },
          });
          if (!assistError && assistData?.valid) {
            granted = true;
            sessionToken = assistData.sessionToken || `csh_sess_${Date.now()}`;
          }
        }
      } catch (invokeErr) {
        console.warn("Server validation network error:", invokeErr);
      }

      if (!granted) {
        setIsShaking(true);
        setError("Invalid access code. Please contact Founder Priyal Kumar for beta access.");
        setTimeout(() => setIsShaking(false), 500);
      } else {
        localStorage.setItem(RATE_LIMIT_CONFIG.localStorageKey, "true");
        localStorage.setItem("csh_ai_session_token", sessionToken);
        sessionStorage.setItem("csh_ai_session_token", sessionToken);
        localStorage.setItem("csh_ai_code", cleanCode);
        sessionStorage.setItem("csh_ai_code", cleanCode);
        onAccessGranted();
      }
    } catch {
      setIsShaking(true);
      setError("Verification failed. Please check your internet connection.");
      setTimeout(() => setIsShaking(false), 500);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 text-center bg-white dark:bg-slate-900">
      {/* Lock Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center mb-2 shadow-sm text-slate-800 dark:text-slate-100"
      >
        <Lock className="w-5 h-5" />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-sm font-bold text-slate-900 dark:text-white mb-0.5"
      >
        College Study Assistant
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[11px] text-slate-500 dark:text-slate-400 mb-3"
      >
        Enter your beta code to unlock assistant.
      </motion.p>

      {/* Features preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 mb-3 text-left"
      >
        <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-slate-700 dark:text-slate-300" />
          Key Features:
        </p>
        <ul className="space-y-1">
          {[
            "📚 Notes & PYQs for all semesters",
            "🏛️ HBTU portals, ERP & attendance doubts",
            "📄 PDF resume scanner & ATS scoring",
            "💡 Placement roadmaps & GATE prep",
          ].map((item) => (
            <li key={item} className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight">{item}</li>
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
          className="relative mb-2.5"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="ENTER ACCESS CODE"
            maxLength={12}
            className="w-full px-3 py-2 text-center font-mono text-xs font-bold tracking-widest
              rounded-lg border transition-all duration-200 outline-none
              bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-600
              border-slate-300 dark:border-slate-700
              focus:bg-white dark:focus:bg-slate-950
              focus:border-slate-900 dark:focus:border-slate-100
              focus:ring-2 focus:ring-slate-400/20"
          />
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 text-[11px] text-rose-500 mb-2 justify-center font-medium"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={!code.trim() || isChecking}
          className="w-full py-2 rounded-lg font-bold text-xs text-white
            bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 shadow-md
            active:scale-[0.98]"
        >
          {isChecking ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
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

      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2.5">
        Don&apos;t have a code? Contact{" "}
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Priyal Kumar sir</span>.
      </p>
    </div>
  );
};

export default AIAccessGate;
