import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, User, ExternalLink, FileText } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "pdf_result" | "ats_result";
  isLoading?: boolean;
}

interface AIChatMessageProps {
  message: Message;
}

// Simple markdown-like renderer (no extra dependency needed)
const renderMarkdown = (text: string) => {
  // Convert markdown links [text](url) to JSX-compatible format
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g);
  
  return parts.map((part, i) => {
    // Bold: **text**
    if (/^\*\*(.+)\*\*$/.test(part)) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Inline code: `code`
    if (/^`(.+)`$/.test(part)) {
      return (
        <code key={i} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 
          px-1 py-0.5 rounded text-[11px] font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    // Link: [text](url)
    const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");
      return (
        <a
          key={i}
          href={isExternal ? href : href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 
            hover:text-blue-800 dark:hover:text-blue-200 underline underline-offset-2 
            font-medium transition-colors"
          onClick={!isExternal ? (e) => {
            e.preventDefault();
            window.location.href = href;
          } : undefined}
        >
          {label}
          {isExternal && <ExternalLink className="w-2.5 h-2.5" />}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const formatMessage = (content: string) => {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-1 my-1.5">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
              <span>{renderMarkdown(item.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, i) => {
    if (!line.trim()) {
      flushList();
      return;
    }

    // Heading: # ## ###
    if (/^#{1,3}\s/.test(line)) {
      flushList();
      const level = line.match(/^(#{1,3})/)?.[1].length || 1;
      const text = line.replace(/^#{1,3}\s/, "");
      const cls = level === 1 
        ? "text-sm font-bold text-gray-900 dark:text-white mt-2 mb-1"
        : "text-xs font-semibold text-gray-800 dark:text-gray-100 mt-1.5 mb-0.5";
      elements.push(<p key={i} className={cls}>{renderMarkdown(text)}</p>);
      return;
    }

    // List items
    if (/^[-•*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      inList = true;
      listItems.push(line);
      return;
    }

    flushList();
    elements.push(
      <p key={i} className="leading-relaxed">
        {renderMarkdown(line)}
      </p>
    );
  });

  flushList();
  return elements;
};

// Typing indicator
export const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-2 items-start"
  >
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
      flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
      <Bot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
      rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
      <div className="flex gap-1 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const AIChatMessage = ({ message }: AIChatMessageProps) => {
  const isUser = message.role === "user";

  if (message.isLoading) {
    return <TypingIndicator />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 
        shadow-sm mt-0.5 ${isUser 
          ? "bg-gray-200 dark:bg-gray-700" 
          : "bg-gradient-to-br from-blue-500 to-purple-600"}`}
      >
        {isUser 
          ? <User className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
          : <Bot className="w-3.5 h-3.5 text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[82%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div className={`px-3.5 py-2.5 shadow-sm text-xs leading-relaxed
          ${isUser
            ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-sm"
            : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm"
          }`}
        >
          {isUser ? (
            // User messages: show PDF indicator if needed
            <div className="flex items-start gap-2">
              {message.type === "pdf_result" && (
                <FileText className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-80" />
              )}
              <span>{message.content}</span>
            </div>
          ) : (
            // AI messages: render markdown
            <div className="space-y-1">
              {formatMessage(message.content)}
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-[10px] text-gray-400 dark:text-gray-600 px-1">
          {message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
};

export default AIChatMessage;
