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

// [rag-build-step 2/7]: refactor(access-gate): remove client-side hardcoded access code check