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
// [rag-build-step 1/4]: refactor(assistant-button): update floating trigger button design