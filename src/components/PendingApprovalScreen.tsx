import React, { useState } from 'react';
import { Clock, CheckCircle2, LogOut, RefreshCw, ShieldAlert, Home, Info, Lock, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { isDirectlyAllowedDomain } from '@/utils/emailValidation';

interface PendingApprovalScreenProps {
  userEmail?: string | null;
  onRefresh?: () => Promise<void> | void;
  onSignOut?: () => void;
}

export const PendingApprovalScreen: React.FC<PendingApprovalScreenProps> = ({
  userEmail,
  onRefresh,
  onSignOut
}) => {
  const [checking, setChecking] = useState(false);
  const { toast } = useToast();

  const email = userEmail?.toLowerCase().trim() || '';
  const domain = email.split('@')[1] || '';
  const isWhitelisted = email === 'priyalkumar06@gmail.com' || isDirectlyAllowedDomain(domain);

  React.useEffect(() => {
    if (isWhitelisted) {
      try { localStorage.setItem('csh_approval_status', 'approved'); } catch {}
      window.location.href = '/dashboard';
    }
  }, [isWhitelisted]);

  const handleRefresh = async () => {
    setChecking(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      toast({
        title: "Status Refreshed",
        description: "Checking platform administrative records...",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setChecking(false), 600);
    }
  };

  const handleSignOut = async () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem('csh_approval_status');
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
    <div className="fixed inset-0 z-[999998] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 select-none overflow-y-auto">
      <div className="relative w-full max-w-xl bg-card border border-amber-500/30 dark:border-amber-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 text-card-foreground animate-in fade-in zoom-in-95 duration-300 my-8">
        {/* Glow effect behind badge */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Under Administrative Review
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Waiting for Administrator Approval
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            College Study Hub • Student Safety & Academic Verification Protocol
          </p>
        </div>

        {/* Professional Credential Notice */}
        <div className="bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 dark:border-amber-800/40 rounded-xl p-4 sm:p-5 mb-5 text-left">
          <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2 mb-1.5">
            <span>Credential Verification Notice</span>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Since your account was registered using an external or personal email provider rather than standard institutional / college credentials (e.g. <span className="font-semibold text-foreground font-mono">@hbtu.ac.in</span> or official university domain), your account has been placed in the administrative review queue.
          </p>
          <p className="text-xs text-muted-foreground/90 mt-2 leading-relaxed">
            To safeguard community integrity, curb spam, and protect proprietary academic materials, all non-institutional accounts require manual verification and authorization by the platform owner before inner portal access can be unlocked.
          </p>
        </div>

        {/* Account Details */}
        {userEmail && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-muted/50 rounded-xl p-3 mb-5 border border-border text-xs">
            <span className="text-muted-foreground font-medium">Registered Email:</span>
            <span className="font-mono font-bold text-foreground bg-background px-2.5 py-1 rounded-md border border-border/80 break-all">
              {userEmail}
            </span>
          </div>
        )}

        {/* Access Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Currently Accessible</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-normal">
              Public pages: Home Overview (<span className="font-mono font-semibold">/</span>) and About Platform (<span className="font-mono font-semibold">/about</span>).
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs mb-1">
              <Lock className="w-4 h-4" />
              <span>Locked Until Approved</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-normal">
              Semester Notes, PYQs, GATE Study, DSA Track, Resume Builder, & Dashboard.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              onClick={handleRefresh}
              disabled={checking}
              className="flex-1 font-bold flex items-center justify-center gap-2 h-11 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Checking Status...' : 'Check Approval Status'}
            </Button>

            <Button
              variant="outline"
              onClick={() => { window.location.href = '/'; }}
              className="flex-1 font-semibold flex items-center justify-center gap-2 h-11 border-border"
            >
              <Home className="w-4 h-4" />
              Explore Home & About
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 h-9"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out & Switch Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalScreen;
