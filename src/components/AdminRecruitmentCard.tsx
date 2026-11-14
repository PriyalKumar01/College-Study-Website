// Professional Student Admin Recruitment Card with Multi-State Logic & Highlighted Theme
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, Award, ArrowRight, ShieldCheck, Clock, XCircle, Sparkles } from 'lucide-react';
import { AdminApplicationModal } from '@/components/AdminApplicationModal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AdminRecruitmentCard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isOwner } = useAuth();
  const { toast } = useToast();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminStatus, setAdminStatus] = useState<'already_admin' | 'approved' | 'pending' | 'rejected' | 'none'>('none');
  const [daysRemaining, setDaysRemaining] = useState(30);

  const checkAdminStatus = useCallback(async () => {
    // 1. If currently marked as admin or owner in auth context
    if (isAdmin || isOwner) {
      setAdminStatus('already_admin');
      return;
    }

    if (user?.email) {
      const cleanEmail = user.email.toLowerCase().trim();

      // Check admin_roles database table
      try {
        const { data: roleData } = await supabase
          .from('admin_roles')
          .select('id, role')
          .eq('user_email', cleanEmail)
          .neq('role', 'removed')
          .maybeSingle();

        if (roleData && roleData.role !== 'removed') {
          setAdminStatus('already_admin');
          return;
        }
      } catch (err) {
        console.warn('Could not query admin_roles:', err);
      }

      // Check remote admin_applications table
      let application: any = null;
      try {
        const { data, error } = await (supabase as any)
          .from('admin_applications')
          .select('*')
          .eq('email', cleanEmail)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          application = data;
        }
      } catch (err) {
        console.warn('Could not query admin_applications table:', err);
      }

      // Check local storage fallback
      if (!application) {
        try {
          const myAppRaw = localStorage.getItem('studyhub_my_admin_application');
          if (myAppRaw) {
            const parsed = JSON.parse(myAppRaw);
            if (parsed.email?.toLowerCase() === cleanEmail) {
              application = parsed;
            }
          }
        } catch {}
      }

      if (!application) {
        try {
          const allAppsRaw = localStorage.getItem('studyhub_admin_applications');
          if (allAppsRaw) {
            const allApps = JSON.parse(allAppsRaw);
            const found = allApps.find((a: any) => a.email?.toLowerCase() === cleanEmail);
            if (found) application = found;
          }
        } catch {}
      }

      if (application) {
        if (application.status === 'approved') {
          setAdminStatus('approved');
          return;
        }
        if (application.status === 'pending') {
          setAdminStatus('pending');
          return;
        }
        if (application.status === 'rejected') {
          const updatedDate = new Date(application.updated_at || application.created_at || Date.now()).getTime();
          const daysDiff = (Date.now() - updatedDate) / (1000 * 60 * 60 * 24);
          if (daysDiff < 30) {
            setDaysRemaining(Math.max(1, Math.ceil(30 - daysDiff)));
            setAdminStatus('rejected');
            return;
          } else {
            setAdminStatus('none');
            return;
          }
        }
      }

      setAdminStatus('none');
      return;
    }

    // Fallback for guest or browser-only submission
    try {
      const myAppRaw = localStorage.getItem('studyhub_my_admin_application');
      if (myAppRaw) {
        const parsed = JSON.parse(myAppRaw);
        if (parsed.status === 'approved') {
          setAdminStatus('approved');
          return;
        }
        if (parsed.status === 'pending') {
          setAdminStatus('pending');
          return;
        }
        if (parsed.status === 'rejected') {
          const updatedDate = new Date(parsed.updated_at || parsed.applied_at || Date.now()).getTime();
          const daysDiff = (Date.now() - updatedDate) / (1000 * 60 * 60 * 24);
          if (daysDiff < 30) {
            setDaysRemaining(Math.max(1, Math.ceil(30 - daysDiff)));
            setAdminStatus('rejected');
            return;
          }
        }
      }
    } catch {}

    setAdminStatus('none');
  }, [user, isAdmin, isOwner]);

  useEffect(() => {
    checkAdminStatus();

    const handleUpdate = () => {
      checkAdminStatus();
    };

    window.addEventListener('studyhub_admin_applications_updated', handleUpdate);
    window.addEventListener('studyhub_admin_roles_updated', handleUpdate);
    return () => {
      window.removeEventListener('studyhub_admin_applications_updated', handleUpdate);
      window.removeEventListener('studyhub_admin_roles_updated', handleUpdate);
    };
  }, [checkAdminStatus]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="my-10 border-2 border-sky-300/80 dark:border-sky-500/40 bg-gradient-to-br from-white via-sky-50/70 to-blue-50/50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 rounded-none sm:rounded-[4px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden"
      >
        {/* Subtle decorative highlight badge bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-90" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Content Area */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-700 dark:text-sky-300 bg-sky-100/90 dark:bg-sky-950/70 px-2.5 py-1 rounded-none sm:rounded-[2px] border border-sky-300/70 dark:border-sky-800/80 shadow-xs">
              <Shield className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              <span>STUDENT LEADERSHIP & VOLUNTEERING</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Do you want to Apply for Website Admin?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Become your branch & academic year's official student administrator. Lead academic content quality and help thousands of students study effectively.
              </p>
            </div>

            {/* Responsibilities & Perks Grid (100% Professional English) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Key Responsibilities */}
              <div className="bg-white/90 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800/90 p-3.5 rounded-none sm:rounded-[3px] space-y-2 shadow-xs">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Key Responsibilities
                </span>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                  <li>• Timely upload of official Mid-Semester (1 & 2) and End-Semester PYQs for your branch after examinations.</li>
                  <li>• Curate and contribute missing syllabus modules, subject notes, and practical lab manuals for student welfare.</li>
                  <li>• Verify academic quality to ensure only accurate, high-standard study resources reach students.</li>
                </ul>
              </div>

              {/* Exclusive Perks */}
              <div className="bg-white/90 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800/90 p-3.5 rounded-none sm:rounded-[3px] space-y-2 shadow-xs">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  Admin Perks & Recognition
                </span>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                  <li>• <strong>Official Recognition</strong>: Your name permanently featured on the Website Admins & Contributors Wall of Fame.</li>
                  <li>• <strong>Platform Powers</strong>: Direct privileges to upload study materials, publish career guides, and add verified scholarships.</li>
                  <li>• <strong>Uploader Credit</strong>: Public recognition badge and your name displayed on every contributed PDF document.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Action Box - Multi-State Button */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-stretch lg:items-end gap-2.5">
            {(adminStatus === 'already_admin' || adminStatus === 'approved') ? (
              <>
                <button
                  onClick={() => navigate('/admin-portal')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-none sm:rounded-[3px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer text-center"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>You're an Admin!</span>
                </button>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold text-center lg:text-right">
                  Active Administrator Privileges · Click to open Admin Portal
                </p>
              </>
            ) : adminStatus === 'pending' ? (
              <>
                <button
                  onClick={() => {
                    toast({
                      title: 'Application Under Review ⏳',
                      description: 'Your admin application is currently under review by founder Priyal Kumar. You will be contacted via WhatsApp or Email soon!',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-500/50 rounded-none sm:rounded-[3px] transition-all shadow-xs cursor-pointer text-center"
                >
                  <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span>Application Pending Review</span>
                </button>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium text-center lg:text-right">
                  Application under review · Decision within 24–48 hours
                </p>
              </>
            ) : adminStatus === 'rejected' ? (
              <>
                <button
                  onClick={() => {
                    toast({
                      title: 'Application Cooldown Active',
                      description: `Your previous application was not selected. You can re-apply after ${daysRemaining} days. Thank you for your support!`,
                      variant: 'destructive',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-none sm:rounded-[3px] transition-all shadow-xs cursor-not-allowed opacity-90 text-center"
                >
                  <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  <span>Application Not Selected</span>
                </button>
                <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium text-center lg:text-right">
                  Cooldown active · Re-apply in {daysRemaining} days
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-none sm:rounded-[3px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer text-center"
                >
                  <span>Apply for Website Admin</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center lg:text-right">
                  1-minute quick application · Reviewed by Founder
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <AdminApplicationModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
    </>
  );
};

export default AdminRecruitmentCard;
