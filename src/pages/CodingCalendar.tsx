import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  BookOpen,
  Building2,
  FileCode,
  ArrowLeft,
  Clock,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ContestEvent } from '@/types/codingProfile';
import { getContestSchedule, fetchLiveCodeforcesContests } from '@/data/codingContestsData';
import { ContestCalendarView } from '@/components/coding-calendar/ContestCalendarView';
import { DsaSheetsHub } from '@/components/coding-calendar/DsaSheetsHub';
import { CodingNotesView } from '@/components/coding-calendar/CodingNotesView';
import { PopularGithubReposView } from '@/components/coding-calendar/PopularGithubReposView';
import { CodingOnboardingCard } from '@/components/coding-calendar/CodingOnboardingModal';
import { GitHubLogo } from '@/components/coding-calendar/BrandLogos';

type ActiveCodingTab = 'calendar' | 'sheets' | 'company-kits' | 'notes' | 'repos';

// Safe insert/update helper that avoids failing on missing unique constraints (NO onConflict error)
const saveCodingAccessRecord = async (
  userId: string,
  email: string,
  status: 'completed' | 'pending',
  paymentId: string
) => {
  try {
    const { data: existing, error: selectErr } = await (supabase as any)
      .from('premium_purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('plan', 'coding_calendar')
      .maybeSingle();

    if (selectErr) {
      console.warn('Error checking existing purchase:', selectErr);
    }

    if (existing?.id) {
      const { error: updateErr } = await (supabase as any)
        .from('premium_purchases')
        .update({
          payment_status: status,
          razorpay_payment_id: paymentId,
          user_email: email,
        })
        .eq('id', existing.id);

      if (updateErr) {
        console.warn('Notice updating coding access record:', updateErr?.message);
        return { success: false, error: updateErr };
      }
    } else {
      const { error: insertErr } = await (supabase as any)
        .from('premium_purchases')
        .insert({
          user_id: userId,
          user_email: email,
          plan: 'coding_calendar',
          amount_paid: 0,
          original_amount: 0,
          payment_status: status,
          razorpay_payment_id: paymentId,
        });

      if (insertErr) {
        console.warn('Notice saving coding access record:', insertErr?.message);
        return { success: false, error: insertErr };
      }
    }
    return { success: true };
  } catch (err: any) {
    console.warn('Error saving coding access record:', err?.message || err);
    return { success: false, error: err };
  }
};

const CodingCalendar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isOwner, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveCodingTab>('calendar');
  const [contests, setContests] = useState<ContestEvent[]>(() => getContestSchedule());

  // Access status: 'approved' | 'pending' | 'none'
  const [accessStatus, setAccessStatus] = useState<'approved' | 'pending' | 'none'>('approved');
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isSubmittingAccess, setIsSubmittingAccess] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  // Onboarding walkthrough display
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Check user access and HBTU domain
  const checkCodingAccess = async (showRefreshToast = false) => {
    if (!user) {
      setCheckingAccess(false);
      return;
    }

    const email = (user.email || '').toLowerCase();

    // 1. Owner, Admin, or HBTU students get instant auto-approval
    if (isOwner || isAdmin || email.endsWith('@hbtu.ac.in')) {
      setAccessStatus('approved');
      setCheckingAccess(false);

      // Save record safely in database
      saveCodingAccessRecord(user.id, email, 'completed', 'auto_approved_hbtu');

      try {
        if (!localStorage.getItem('csh_onboarding_seen')) {
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } catch {}

      if (showRefreshToast) {
        toast({
          title: 'Status: Approved 🎉',
          description: 'Your @hbtu.ac.in student account is active.',
        });
      }
      return;
    }

    // 2. Non-HBTU email (e.g. @gmail.com) -> Check premium_purchases table
    try {
      const { data, error } = await (supabase as any)
        .from('premium_purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('plan', 'coding_calendar')
        .maybeSingle();

      if (data) {
        if (data.payment_status === 'completed' || data.payment_status === 'free') {
          setAccessStatus('approved');
          try {
            if (!localStorage.getItem('csh_onboarding_seen')) {
              setShowOnboarding(true);
            } else {
              setShowOnboarding(false);
            }
          } catch {}

          if (showRefreshToast) {
            toast({
              title: 'Access Approved! 🎉',
              description: 'Your Coding Space access has been verified.',
            });
          }
        } else if (data.payment_status === 'pending') {
          setAccessStatus('pending');
          setSubmittedAt(data.purchased_at);
          setShowOnboarding(false);

          if (showRefreshToast) {
            toast({
              title: 'Status: Pending Verification ⏳',
              description: 'Your access request is currently waiting for admin approval.',
            });
          }
        } else {
          setAccessStatus('none');
          setShowOnboarding(true);
        }
      } else {
        setAccessStatus('none');
        setShowOnboarding(true);
      }
    } catch (err) {
      console.warn('Error checking coding access:', err);
    } finally {
      setCheckingAccess(false);
    }
  };

  useEffect(() => {
    checkCodingAccess();
  }, [user, isOwner, isAdmin]);

  // Handle Onboarding Completion / Access Request
  const handleCompleteAccessRequest = async () => {
    if (!user) {
      setShowOnboarding(false);
      navigate('/auth');
      return;
    }

    const email = (user.email || '').toLowerCase();

    // Auto-approve HBTU accounts or admins
    if (isOwner || isAdmin || email.endsWith('@hbtu.ac.in')) {
      try {
        localStorage.setItem('csh_onboarding_seen', 'true');
      } catch {}
      setShowOnboarding(false);
      setAccessStatus('approved');
      await saveCodingAccessRecord(user.id, email, 'completed', 'auto_approved_hbtu');
      toast({
        title: 'Access Granted! 🎉',
        description: 'Your @hbtu.ac.in student account has been verified.',
      });
      return;
    }

    // Submit pending verification request for external accounts (@gmail.com)
    setIsSubmittingAccess(true);
    try {
      const result = await saveCodingAccessRecord(user.id, email, 'pending', 'coding_pending_approval');
      if (!result.success && result.error) {
        throw result.error;
      }

      try {
        localStorage.setItem('csh_onboarding_seen', 'true');
      } catch {}

      setShowOnboarding(false);
      setAccessStatus('pending');
      setSubmittedAt(new Date().toISOString());

      toast({
        title: 'Application Submitted! ⏳',
        description: 'Your access request has been sent to the Owner Dashboard for verification.',
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      toast({
        title: 'Submission Notice',
        description: err?.message || 'Could not record application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingAccess(false);
    }
  };

  // Fetch live Codeforces official rounds on mount
  useEffect(() => {
    let isMounted = true;
    const loadLiveCF = async () => {
      try {
        const liveCF = await fetchLiveCodeforcesContests();
        if (isMounted && liveCF.length > 0) {
          setContests((prev) => {
            const nonCF = prev.filter((c) => c.platform.toLowerCase() !== 'codeforces');
            const map = new Map<string, ContestEvent>();
            for (const c of [...liveCF, ...nonCF]) {
              map.set(c.id, c);
            }
            return Array.from(map.values()).sort(
              (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            );
          });
        }
      } catch (err) {
        console.warn('Live Codeforces fetch fallback active:', err);
      }
    };
    loadLiveCF();
    return () => {
      isMounted = false;
    };
  }, []);

  // -----------------------------------------------------------------
  // 1. CHECKING ACCESS LOADER
  // -----------------------------------------------------------------
  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Verifying student credentials...</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // 2. PENDING APPROVAL SCREEN (No Footer, Screen-Fit, No Violet Hover!)
  // -----------------------------------------------------------------
  if (accessStatus === 'pending') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 overflow-hidden select-none">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto w-full px-4 flex flex-col items-center justify-center">
          <div className="w-full bg-white dark:bg-slate-900 border border-amber-500/30 rounded-md shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm">
              <Clock className="w-7 h-7 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-0.5 rounded-sm border border-amber-200 dark:border-amber-900/50">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Pending for Approval
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Application Under Verification
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Your Coding Space access request has been received and is waiting for verification by the Owner / Admin.
              </p>
            </div>

            <div className="p-3.5 rounded-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Account Email:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Section:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Coding Space</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verification Status:</span>
                <span className="font-bold text-amber-600">Pending Admin Approval</span>
              </div>
              {submittedAt && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Submitted At:</span>
                  <span className="font-medium text-slate-500">
                    {new Date(submittedAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-normal max-w-md mx-auto">
              Once approved by the owner dashboard, full access to Contest Calendar, DSA Sheets, Company Kits, and Notes will be automatically unlocked.
            </p>

            <div className="flex items-center justify-center gap-2.5 pt-1">
              <button
                onClick={() => checkCodingAccess(true)}
                className="h-9 px-4 rounded-sm text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 text-slate-800 dark:text-slate-100 transition-colors shadow-xs"
              >
                Refresh Status
              </button>
              <button
                onClick={() => navigate('/')}
                className="h-9 px-4 rounded-sm text-xs font-bold bg-slate-900 hover:bg-black active:bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors shadow-xs"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // 3. WALKTHROUGH & ACCESS REQUEST VIEW (No Footer, 2-Column Responsive Fit)
  // -----------------------------------------------------------------
  if (accessStatus === 'none' || showOnboarding) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white transition-colors duration-200 overflow-hidden select-none">
        <Navbar />
        <div className="flex-1 w-full flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <CodingOnboardingCard
            onCompleteAccessRequest={handleCompleteAccessRequest}
            isSubmitting={isSubmittingAccess}
            isHbtuOrAdmin={isOwner || isAdmin || (user?.email || '').toLowerCase().endsWith('@hbtu.ac.in')}
            onSkipOrClose={() => {
              if (accessStatus === 'approved') {
                try {
                  localStorage.setItem('csh_onboarding_seen', 'true');
                } catch {}
                setShowOnboarding(false);
              } else {
                navigate('/');
              }
            }}
          />
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // 4. APPROVED INTERIOR CODING SPACE DASHBOARD
  // -----------------------------------------------------------------
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white transition-colors duration-200 select-none"
    >
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 md:py-6 space-y-4">
        {/* Top Control Bar: Back button & Breadcrumb only (Walkthrough button removed) */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-xs font-black tracking-tight text-slate-700 dark:text-slate-300 uppercase">
              College Study • Coding Space
            </span>
          </div>
        </div>

        {/* 5 Screen-Fitting Navigation Tabs (Negligible Rounding: rounded-sm) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
            { id: 'calendar', label: 'Contest Calendar', icon: <CalendarIcon className="w-4 h-4 shrink-0" /> },
            { id: 'sheets', label: 'DSA Sheets & Trackers', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
            { id: 'company-kits', label: 'Company Question Kits 🎁', icon: <Building2 className="w-4 h-4 shrink-0" /> },
            { id: 'notes', label: 'Coding Notes', icon: <FileCode className="w-4 h-4 shrink-0" /> },
            { id: 'repos', label: 'Popular GitHub Repos', icon: <GitHubLogo className="w-4 h-4 shrink-0" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveCodingTab)}
                className={`flex items-center justify-start gap-2 py-2 px-3 font-bold text-xs rounded-sm transition-all text-left ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <ContestCalendarView
                contests={contests}
                onOpenCompanyKits={() => setActiveTab('company-kits')}
              />
            </motion.div>
          )}

          {activeTab === 'sheets' && (
            <motion.div
              key="sheets"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <DsaSheetsHub
                initialCategory="All"
                onOpenCompanyKits={() => setActiveTab('company-kits')}
              />
            </motion.div>
          )}

          {activeTab === 'company-kits' && (
            <motion.div
              key="company-kits"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <DsaSheetsHub
                initialCategory="Company Wise"
                onOpenCompanyKits={() => setActiveTab('company-kits')}
              />
            </motion.div>
          )}

          {activeTab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <CodingNotesView />
            </motion.div>
          )}

          {activeTab === 'repos' && (
            <motion.div
              key="repos"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <PopularGithubReposView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CodingCalendar;
