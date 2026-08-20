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
              // ── Access gate shown inside a centered panel ───────
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[165]
                  w-[370px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-80px)]
                  max-sm:top-auto max-sm:translate-y-0 max-sm:bottom-24 max-sm:right-3 max-sm:left-3 max-sm:w-auto
                  flex flex-col rounded-2xl overflow-hidden
                  shadow-2xl border border-slate-200 dark:border-slate-800
                  bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                {/* Gate Header */}
                <div className="bg-slate-900 dark:bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800 text-white shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">College Study Assistant</span>
                    <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none">BETA</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
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
