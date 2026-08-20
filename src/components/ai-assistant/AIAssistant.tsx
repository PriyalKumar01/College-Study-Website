import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AIAssistantButton from "./AIAssistantButton";
import AIAccessGate from "./AIAccessGate";
import AIChatWidget from "./AIChatWidget";
import { RATE_LIMIT_CONFIG } from "@/data/ai-knowledge-base";
import { motion } from "framer-motion";

const AIAssistant = () => {
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
              // ── Access gate shown inside a small panel ───────
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed right-4 md:right-6 bottom-20 md:bottom-24 z-[162]
                  w-[350px] max-w-[calc(100vw-32px)]
                  flex flex-col rounded-3xl overflow-hidden
                  shadow-2xl border border-slate-700/80 dark:border-slate-800
                  bg-slate-900/95 backdrop-blur-xl text-slate-100"
              >
                {/* Gate Header */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-4 py-3.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">StudyHub AI</span>
                    <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">BETA</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Access Gate Content */}
                <div className="max-h-[460px] overflow-y-auto">
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
