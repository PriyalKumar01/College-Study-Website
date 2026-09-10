import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, X, ExternalLink } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleReject}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Centered Professional Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
            className="relative w-full max-w-[420px] z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 text-slate-900 dark:text-slate-100"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-sky-500 to-indigo-500" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-xs">
                  <Cookie className="h-6 w-6" />
                </div>
                <div>
                  <h3 id="cookie-consent-title" className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                    We value your privacy
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                    Cookie & Data Preferences
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReject}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 -mr-1 -mt-1"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
              We use cookies and local storage to personalize your experience, keep you securely signed in, and analyze site usage to improve our platform.
            </p>

            {/* Categories / Highlights */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 mb-3.5 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-medium text-slate-700 dark:text-slate-200">Essential:</span> Auth, session security & preferences
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                <span className="font-medium text-slate-700 dark:text-slate-200">Analytics:</span> Anonymous performance metrics
              </div>
            </div>

            {/* Privacy Link */}
            <div className="mb-5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Learn more in our{' '}
              <Link
                to="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 dark:text-sky-400 hover:underline font-medium inline-flex items-center gap-0.5"
              >
                Privacy Policy
                <ExternalLink className="w-3 h-3 inline ml-0.5" />
              </Link>
              .
            </div>

            {/* Action Buttons: 2 columns side-by-side, fully visible on any mobile device */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleReject}
                className="w-full h-10 sm:h-11 text-xs sm:text-sm font-medium rounded-xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Decline
              </Button>
              <Button
                type="button"
                onClick={handleAccept}
                className="w-full h-10 sm:h-11 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white shadow-md hover:shadow-lg transition-all"
              >
                Accept Cookies
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
