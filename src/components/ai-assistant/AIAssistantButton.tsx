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
    <div className="fixed right-6 bottom-[160px] md:bottom-24 z-[161]">
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
              className="absolute right-20 bg-white dark:bg-slate-800 text-slate-800 dark:text-white
                px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700
                whitespace-nowrap text-xs font-semibold pointer-events-none"
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                College Study Assistant 👋
              </span>
              {/* Tooltip arrow */}
              <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-white dark:border-l-slate-800" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button — exact 64px matching WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
// [rag-build-step 2/4]: refactor(assistant-button): remove blue glow in favor of modern dark gradient