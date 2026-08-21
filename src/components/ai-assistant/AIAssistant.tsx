import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AIAssistantButton from "./AIAssistantButton";
import AIAccessGate from "./AIAccessGate";
import AIChatWidget from "./AIChatWidget";
import { RATE_LIMIT_CONFIG } from "@/data/ai-knowledge-base";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const AIAssistant = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // Check localStorage for existing access
  useEffect(() => {
    const granted = localStorage.getItem(RATE_LIMIT_CONFIG.localStorageKey);
    setHasAccess(granted === "true");
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  // If user is not logged in, do not render AI Assistant at all
  if (!user) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      <AIAssistantButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {hasAccess ? (
              // ── Full chat widget ─────────────────────────────
              <AIChatWidget onClose={() => setIsOpen(false)} />
            ) : (
              // ── Access gate shown inside a compact panel ───────
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="fixed right-4 md:right-6 bottom-24 z-[165]
                  w-[340px] sm:w-[350px] max-w-[calc(100vw-24px)]
                  max-h-[calc(100dvh-110px)]
                  flex flex-col rounded-xl overflow-hidden
                  shadow-2xl border border-slate-200 dark:border-slate-800
                  bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                {/* Gate Header */}
                <div className="bg-[#0a1931] dark:bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-white shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-xs tracking-wide">College Study Assistant</span>
                    <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase leading-none">BETA</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Access Gate Content */}
                <div className="overflow-y-auto">
                  <AIAccessGate onAccessGranted={handleAccessGranted} />
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
