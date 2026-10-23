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
// [rag-build-step 3/7]: feat(access-gate): call ai-unlock edge function on code submit