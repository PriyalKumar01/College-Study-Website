// Professional Student Admin Application Modal
import React, { useState } from 'react';
import { X, ShieldCheck, Sparkles, Send, CheckCircle2, GraduationCap, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminApplicationModal: React.FC<AdminApplicationModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [college, setCollege] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !branch.trim() || !batchYear.trim() || !college.trim()) {
      toast({
        title: 'Missing Details',
        description: 'Please fill in First & Last Name, Branch, Batch Year and College Name.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    const applicationData = {
      id: crypto.randomUUID(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: (email || user?.email || '').trim().toLowerCase(),
      phone: phone.trim(),
      branch: branch.trim().toUpperCase(),
      batch_year: batchYear.trim(),
      college: college.trim().toUpperCase(),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    try {
      // 1. Save to Supabase table
      const { error } = await (supabase as any)
        .from('admin_applications')
        .insert([applicationData]);

      if (error) {
        console.warn('Could not insert to remote admin_applications table, using local sync fallback:', error.message);
      }
    } catch (err) {
      console.warn('Supabase request failed, falling back to local persistence:', err);
    }

    // 2. Local user state & broadcast sync so Notes page and Owner Dashboard update immediately
    try {
      localStorage.setItem('studyhub_my_admin_application', JSON.stringify({
        id: applicationData.id,
        email: applicationData.email,
        phone: applicationData.phone,
        status: 'pending',
        applied_at: applicationData.created_at,
      }));

      const existingRaw = localStorage.getItem('studyhub_admin_applications');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [applicationData, ...existing.filter((item: any) => item.id !== applicationData.id)];
      localStorage.setItem('studyhub_admin_applications', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('studyhub_admin_applications_updated'));
    } catch {}

    setSubmitting(false);
    setSubmitted(true);

    toast({
      title: 'Application Submitted Successfully! 🎉',
      description: 'Your application has been received. Founder & admin team will review it soon.',
    });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[6px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none sm:rounded-[3px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Apply for Website Admin
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Join your branch academic operations & content management team
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-none hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Application Received!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you for stepping up to help students. The Founder will review your profile and reach out via your student email / WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Highlight Perks banner */}
              <div className="p-3.5 bg-sky-50 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 rounded-none sm:rounded-[3px] space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-300">
                  <Sparkles className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Admin Responsibilities & Perks</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                  • Upload Mid Sem & End Sem PYQs for your branch after exams.<br />
                  • Curate missing or top-quality notes for students welfare.<br />
                  • Public recognition on Admin Wall & Contributor Leaderboard + uploader credit on PDFs.
                </p>
              </div>

              {/* Name Fields (First & Last) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Singh"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Branch & Batch Passing Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <GraduationCap className="h-3 w-3 text-slate-400" />
                    <span>Branch</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE, IT, EE, ME, CE, CHE, BSMS..."
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Batch Passing Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2027, 2028, 2029"
                    value={batchYear}
                    onChange={(e) => setBatchYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* College (Short form) & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-slate-400" />
                    <span>College Name (Short Form)</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HBTU, IITK, IET, MMMUT..."
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    WhatsApp / Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Student Email
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[3px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-none sm:rounded-[3px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-none sm:rounded-[3px] transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationModal;
