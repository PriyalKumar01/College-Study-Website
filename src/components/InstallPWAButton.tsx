import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Check, X, Share2, PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface InstallPWAButtonProps {
  variant?: 'desktop-navbar' | 'mobile-header' | 'drawer-full';
}

export const InstallPWAButton = ({ variant = 'desktop-navbar' }: InstallPWAButtonProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (installed)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instructions modal for iOS or manual install
      setShowInstructions(true);
    }
  };

  if (isInstalled) {
    return null;
  }

  if (variant === 'mobile-header') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold
            bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400
            hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
          title="Download App"
          aria-label="Download App"
        >
          <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>App</span>
        </button>

        {/* Dialog */}
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogContent className="sm:max-w-[380px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-slate-100">
            <DialogHeader className="text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mb-2 text-indigo-600 dark:text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <DialogTitle className="text-base font-bold">Install College Study App</DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                Install the app directly on your phone or PC for lightning-fast offline notes access.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  🤖 Android (Chrome)
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tap browser menu <strong>⋮ (3 dots)</strong> & select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  🍎 iPhone / iPad (Safari)
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tap <Share2 className="w-3 h-3 inline text-blue-500 mx-0.5" /> <strong>Share</strong> & select <PlusSquare className="w-3 h-3 inline text-slate-600 dark:text-slate-300 mx-0.5" /> <strong>&quot;Add to Home Screen&quot;</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Got it!
            </button>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (variant === 'drawer-full') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
            bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-700 text-white text-xs font-bold
            shadow-md active:scale-98 transition-all"
        >
          <Download className="w-4 h-4 text-indigo-300 animate-bounce" />
          <span>Download & Install Mobile App</span>
        </button>

        {/* Dialog */}
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogContent className="sm:max-w-[380px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-slate-100">
            <DialogHeader className="text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mb-2 text-indigo-600 dark:text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <DialogTitle className="text-base font-bold">Install College Study App</DialogTitle>
              <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                Install the app directly on your phone or PC for lightning-fast offline notes access.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  🤖 Android (Chrome)
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tap browser menu <strong>⋮ (3 dots)</strong> & select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  🍎 iPhone / iPad (Safari)
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tap <Share2 className="w-3 h-3 inline text-blue-500 mx-0.5" /> <strong>Share</strong> & select <PlusSquare className="w-3 h-3 inline text-slate-600 dark:text-slate-300 mx-0.5" /> <strong>&quot;Add to Home Screen&quot;</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Got it!
            </button>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Desktop Navbar Variant (Executive borderless design)
  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 font-bold rounded-full px-3.5 py-1.5 text-xs
          bg-[#0a1931] hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500
          shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all group"
        title="Download / Install College Study App"
        aria-label="Download App"
      >
        <Download className="w-3.5 h-3.5 text-indigo-400 dark:text-white group-hover:translate-y-0.5 transition-transform" />
        <span className="tracking-wide">Download App</span>
      </button>

      {/* Instructions Dialog for iOS and unsupported browsers */}
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-[380px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-slate-100">
          <DialogHeader className="text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mb-2 text-indigo-600 dark:text-indigo-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <DialogTitle className="text-base font-bold">Install College Study App</DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Install the app directly on your phone or PC for lightning-fast offline notes access.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {/* Android / Chrome */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                <span>🤖 Android (Chrome)</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Tap browser menu <strong>⋮ (3 dots)</strong> at top right & select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
              </p>
            </div>

            {/* iOS / Safari */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                <span>🍎 iPhone / iPad (Safari)</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Tap the <Share2 className="w-3 h-3 inline text-blue-500 mx-0.5" /> <strong>Share</strong> button at bottom & select <PlusSquare className="w-3 h-3 inline text-slate-600 dark:text-slate-300 mx-0.5" /> <strong>&quot;Add to Home Screen&quot;</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            Got it!
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstallPWAButton;
