import React from 'react';
import { ShieldAlert, AlertTriangle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface BannedScreenProps {
  userEmail?: string | null;
  onSignOut?: () => void;
}

export const BannedScreen: React.FC<BannedScreenProps> = ({ userEmail, onSignOut }) => {
  const handleSignOut = async () => {
    try {
      localStorage.removeItem('csh_banned_user');
      sessionStorage.clear();
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Sign out error:', e);
    }
    if (onSignOut) {
      onSignOut();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-card border-2 border-red-600/60 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-card-foreground animate-in fade-in zoom-in-95 duration-300">
        {/* Glow effect behind badge */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Icon */}
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-red-500 shadow-inner">
          <ShieldAlert className="w-10 h-10 animate-pulse" />
        </div>

        {/* Bold Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-red-600 dark:text-red-500 uppercase mb-3">
          SORRY ! YOU ARE BANNED
        </h1>

        {/* Reason Box */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 my-4 text-left">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-500 mb-1">
                Violation of Terms & Conditions
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your access to College Study Hub has been revoked due to a violation of our Terms and Conditions, platform usage policies, or community guidelines.
              </p>
            </div>
          </div>
        </div>

        {userEmail && (
          <p className="text-xs text-muted-foreground mb-6">
            Banned Account: <span className="font-mono font-medium text-foreground">{userEmail}</span>
          </p>
        )}

        <p className="text-xs text-muted-foreground/80 mb-6 leading-relaxed">
          All active authentication sessions associated with this account have been suspended and restricted from accessing learning resources, notes, quizzes, and community portals.
        </p>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 border-t border-border">
          <Button
            variant="destructive"
            onClick={handleSignOut}
            className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 h-11 px-6 shadow-lg shadow-red-900/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out & Switch Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannedScreen;
