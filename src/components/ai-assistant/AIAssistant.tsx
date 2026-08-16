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
                className="fixed right-6 bottom-[185px] md:bottom-40 z-[162]
                  w-[340px] max-sm:right-3 max-sm:left-3 max-sm:w-auto
                  flex flex-col rounded-2xl overflow-hidden
                  shadow-[0_8px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]
                  border border-gray-200/80 dark:border-gray-700/80
                  bg-white dark:bg-gray-900"
              >
                {/* Gate Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">StudyHub AI</span>
                    <span className="bg-red-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">BETA</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Access Gate Content */}
                <div className="h-[420px]">
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
