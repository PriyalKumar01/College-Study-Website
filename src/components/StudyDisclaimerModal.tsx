import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'csh_study_disclaimer_accepted';

export const StudyDisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        // Small delay so page renders smoothly first
        const timer = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Storage check error for study disclaimer:', e);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Storage save error:', e);
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            role="alertdialog"
            aria-modal="true"
            className="relative w-full max-w-[500px] z-10 bg-white dark:bg-slate-900 border-2 border-amber-500/40 dark:border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 text-foreground"
          >
            {/* Top Warning Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

            {/* Header */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-sm">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
                  Important Compliance Notice
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                  Strictly For Personal Study Only
                </h2>
              </div>
            </div>

            {/* Core Message Body */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                All handwritten notes, PDFs, solved papers, playlists, and study resources on{' '}
                <strong className="text-slate-900 dark:text-white">College Study Hub</strong> are provided solely for{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold underline decoration-emerald-500/30">
                  personal, non-commercial educational use
                </span>{' '}
                by students.
              </p>

              <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-amber-950 dark:text-amber-200 space-y-2">
                <div className="flex items-start gap-2 text-xs font-semibold">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>Strictly Prohibited Actions:</span>
                </div>
                <ul className="text-xs list-disc list-inside space-y-1 pl-1 text-slate-800 dark:text-slate-200">
                  <li>Selling, bundling, or commercializing any content found on this portal.</li>
                  <li>Re-uploading, mirroring, or distributing materials to other websites, Telegram channels, or drives.</li>
                  <li>Automated scraping or bulk harvesting of platform materials.</li>
                </ul>
              </div>

              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg border border-red-200 dark:border-red-900/50">
                <Scale className="h-4 w-4 shrink-0" />
                <span>
                  Any violation is subject to permanent account termination and strict legal action under copyright and intellectual property laws.
                </span>
              </div>
            </div>

            {/* Footer Links & Button */}
            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-muted-foreground">
                By continuing, you agree to our{' '}
                <Link to="/terms-of-service" target="_blank" className="text-primary hover:underline font-semibold">
                  Terms of Service
                </Link>.
              </span>

              <Button
                onClick={handleAccept}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all shrink-0"
              >
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                I Understand & Agree
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StudyDisclaimerModal;
