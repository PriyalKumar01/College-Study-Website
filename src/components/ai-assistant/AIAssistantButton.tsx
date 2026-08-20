import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";

interface AIAssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const AIAssistantButton = ({ isOpen, onClick }: AIAssistantButtonProps) => {
  const [showLabel, setShowLabel] = useState(false);
  const [pulseVisible, setPulseVisible] = useState(true);

  // Hide pulse after 5s to reduce distraction
  useEffect(() => {
    const timer = setTimeout(() => setPulseVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed right-6 bottom-[152px] md:bottom-24 z-[161]">
      <div
        className="relative flex items-center cursor-pointer"
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        onClick={onClick}
      >
        {/* Hover Label */}
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-white
                px-3 py-2 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700
                whitespace-nowrap text-sm font-medium pointer-events-none"
            >
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Hello! I&apos;m your Assistant 👋
              </span>
              {/* Tooltip arrow */}
              <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-white dark:border-l-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button — solid professional indigo */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center
            bg-indigo-600 hover:bg-indigo-500
            transition-all duration-300"
          aria-label="Open AI Assistant"
        >
          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.div
                key="bot"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Beta Badge */}
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black
            px-1.5 py-0.5 rounded-full leading-none tracking-wide shadow-md border border-white dark:border-slate-900">
            BETA
          </span>

          {/* Pulse Ring */}
          {pulseVisible && !isOpen && (
            <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-30 animate-ping" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default AIAssistantButton;
