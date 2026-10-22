import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  RefreshCw,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import {
  ReportedIssue,
  submitReportedIssue,
  fetchUserReportedIssues
} from '@/lib/reportedIssuesService';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [category, setCategory] = useState<string>('Website Glitch / UI Bug');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [studentCollege, setStudentCollege] = useState('');
  const [studentBranch, setStudentBranch] = useState('');
  const [studentYear, setStudentYear] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userIssues, setUserIssues] = useState<ReportedIssue[]>([]);
  const [isLoadingIssues, setIsLoadingIssues] = useState(false);

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      const fullName = [meta.first_name, meta.last_name].filter(Boolean).join(' ');
      setUserName(fullName || user.email?.split('@')[0] || 'Student');
      setUserEmail(user.email || '');
      if (meta.college) setStudentCollege(meta.college);
      if (meta.branch) setStudentBranch(meta.branch);
      if (meta.year || meta.grad_year) setStudentYear(String(meta.year || meta.grad_year));

      // Fetch profile to get real verified branch, college, year
      supabase
        .from('profiles')
        .select('college, branch, year, full_name')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            if (data.college) setStudentCollege(data.college);
            if (data.branch) setStudentBranch(data.branch);
            if (data.year) setStudentYear(String(data.year));
            if (data.full_name) setUserName(data.full_name);
          }
        });
    }
  }, [user]);

  const loadUserIssues = async () => {
    if (!userEmail && !user?.email) return;
    setIsLoadingIssues(true);
    try {
      const issues = await fetchUserReportedIssues(userEmail || user?.email);
      setUserIssues(issues);
    } finally {
      setIsLoadingIssues(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadUserIssues();
    }
  }, [isOpen, userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in with a verified student account to report an issue.',
        variant: 'destructive',
      });
      return;
    }

    if (!subject.trim() || !description.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both subject and description.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitReportedIssue({
        category,
        subject,
        description,
        userName: userName.trim() || 'Student',
        userEmail: (userEmail || user?.email || '').trim(),
        userId: user?.id,
        college: studentCollege || undefined,
        branch: studentBranch || undefined,
        year: studentYear || undefined,
      });

      if (res.success) {
        toast({
          title: 'Issue Submitted! 🚀',
          description: 'Our support team has logged your issue. Track updates below.',
        });
        setSubject('');
        setDescription('');
        await loadUserIssues();
      } else {
        toast({
          title: 'Could not submit',
          description: res.error || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-lg p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader className="border-b border-border/60 pb-3 text-left">
          <DialogTitle className="text-base sm:text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Report an Issue / Support Ticket
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Found a bug, broken link, or missing notes? Submit below. The support team will resolve it and update your status in real time.
          </DialogDescription>
        </DialogHeader>

        {/* Student Identity verification banner (Email is fixed & unchangeable) */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 dark:text-slate-100 truncate flex items-center gap-1.5">
                {userName}
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30">
                  Verified
                </span>
              </p>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                {userEmail || user?.email || 'Logged in student'}
              </p>
            </div>
          </div>
          {(studentBranch || studentYear) && (
            <div className="text-right shrink-0 hidden sm:block">
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                {studentBranch}
              </span>
              <span className="text-[10px] text-slate-400">
                {studentYear ? `Year ${studentYear}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Issue Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-9 text-xs rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus:ring-1 focus:ring-slate-400">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
                <SelectItem value="Notes & Syllabus Content">Notes & Syllabus Content</SelectItem>
                <SelectItem value="Coding Space & Contest Bug">Coding Space & Contest Bug</SelectItem>
                <SelectItem value="GATE Study Feature">GATE Study Feature</SelectItem>
                <SelectItem value="Account & Access Verification">Account & Access</SelectItem>
                <SelectItem value="Website Glitch / UI Bug">Website Glitch / UI Bug</SelectItem>
                <SelectItem value="General Feedback / Suggestion">General Suggestion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Issue Subject
            </label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Missing Unit 3 notes in Chemical Engineering"
              required
              className="h-9 text-xs rounded-xl border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Description / Details
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what happened or what resource is needed in detail..."
              rows={3}
              required
              className="text-xs rounded-xl border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-slate-400 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 font-bold text-xs gap-1.5 shadow-md shadow-emerald-900/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Submit Issue to Support Team</span>
          </Button>
        </form>

        {/* Student's Reported Issues Tracker */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Your Reported Issues ({userIssues.length})
            </h4>
            {userIssues.length > 0 && (
              <button
                onClick={loadUserIssues}
                disabled={isLoadingIssues}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingIssues ? 'animate-spin' : ''}`} />
                Refresh Status
              </button>
            )}
          </div>

          {userIssues.length === 0 ? (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic py-1">
              You haven't reported any issues yet. If you notice any bug or missing paper, report it above.
            </p>
          ) : (
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {userIssues.map((issue) => {
                const isFixed = issue.status === 'fixed';
                return (
                  <div
                    key={issue.id}
                    className={`p-2.5 rounded-xl border transition-all text-xs space-y-1 ${
                      isFixed
                        ? 'border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white truncate">
                        {issue.subject}
                      </span>
                      {isFixed ? (
                        <Badge className="bg-emerald-600 text-white rounded-full text-[10px] px-2 py-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Fixed 🎉
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-amber-500/50 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30 rounded-full text-[10px] px-2 py-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Pending (Resolve soon...)
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                      {issue.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>Category: {issue.category}</span>
                      <span>
                        {new Date(issue.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
