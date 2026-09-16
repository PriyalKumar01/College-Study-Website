import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, DownloadCloud } from 'lucide-react';

export const ExamNoticeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if not dismissed in the current session
    const dismissed = sessionStorage.getItem('csh_exam_notice_dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('csh_exam_notice_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Exam traffic alert" className="relative w-full bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 dark:from-amber-950/40 dark:via-yellow-950/50 dark:to-amber-950/40 border-b border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs sm:text-sm py-2 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
          </span>
          <p className="text-[11px] sm:text-xs md:text-[13px] leading-snug font-medium text-amber-900 dark:text-amber-200">
            <strong className="font-semibold text-amber-950 dark:text-amber-100">Traffic Alert:</strong> Due to heavy exam traffic, you may experience intermittent glitches/slowdowns between <span className="font-semibold underline decoration-amber-500/50 underline-offset-2">Sept 21 – Sept 29</span> (services normal before Sept 21 &amp; full stability resumes Sept 30). <span className="inline-flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-300"><DownloadCloud className="w-3.5 h-3.5 inline shrink-0" /> Please download your required study materials in advance!</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-md text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white hover:bg-amber-500/20 transition-colors"
          title="Dismiss notification"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </aside>
  );
};

export default ExamNoticeBanner;
