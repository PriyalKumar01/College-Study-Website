import React, { useState } from 'react';
import { Clock, CheckCircle2, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  const handleRefresh = async () => {
    setChecking(true);
    try {
      if (onRefresh) {
        await onRefresh();
      }
      toast({
        title: "Status Checked",
        description: "Your verification status has been refreshed.",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setChecking(false), 500);
    }
  };

  const handleSignOut = async () => {
    try {
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
    <div className="fixed inset-0 z-[999998] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 select-none overflow-y-auto">
      <div className="relative w-full max-w-lg bg-card border border-amber-500/30 dark:border-amber-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-card-foreground animate-in fade-in zoom-in-95 duration-300">
        {/* Glow effect behind badge */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Icon */}
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner">
          <Clock className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2">
          Account Pending Approval
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
          Thank you for joining College Study Hub!
        </p>

        {/* Status Box */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-4 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                Under Administrative Review
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Because your email is from an external or custom provider, your registration is queued for review by our administrative team to maintain community integrity and platform safety.
              </p>
            </div>
          </div>
        </div>

        {userEmail && (
          <div className="bg-muted/40 rounded-lg py-2 px-3 mb-5 inline-block border border-border">
            <p className="text-xs text-muted-foreground">
              Registered Email: <span className="font-mono font-semibold text-foreground">{userEmail}</span>
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground/80 mb-6 leading-relaxed">
          You will automatically gain full access to all materials and portals once an administrator approves your account in the dashboard. Please check back shortly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3 border-t border-border">
          <Button
            onClick={handleRefresh}
            disabled={checking}
            className="w-full sm:w-auto font-semibold flex items-center justify-center gap-2 h-11 px-5"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking Status...' : 'Check Approval Status'}
          </Button>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full sm:w-auto font-medium flex items-center justify-center gap-2 h-11 px-5"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalScreen;
