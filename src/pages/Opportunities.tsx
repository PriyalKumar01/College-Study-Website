import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Search, ExternalLink, Calendar, MapPin, Building, Clock,
  Briefcase, Code2, Trophy, Rocket, Plus, Pencil, Trash2,
  X, Share2, Globe, Loader2, Filter,
  ArrowRight, Lock, Tag, CheckCircle2,
  Crown, Sparkles, Mail
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PremiumModal } from '@/components/PremiumModal';
import { PremiumPlan } from '@/components/LockedSection';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  deadline: string | null;
  description: string;
  apply_url: string;
  created_by: string;
  user_name: string;
  created_at: string | null;
  image_url?: string | null;
  duration?: string | null;
  eligibility?: string[] | null;
  category?: string | null;
}

type TabType = 'Jobs' | 'Internships' | 'Hackathons' | 'Competitions';

// ─── Platforms ────────────────────────────────────────────────────────────────
const JOB_PLATFORMS = [
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/', icon: '💼', desc: 'Best for networking + jobs', color: '#0A66C2', badge: 'Top Pick' },
  { name: 'Naukri.com', url: 'https://www.naukri.com/', icon: '🔍', desc: '#1 India job portal', color: '#FF7555', badge: 'Popular' },
  { name: 'Indeed India', url: 'https://in.indeed.com/', icon: '🌐', desc: 'Global job listings', color: '#003A9B', badge: null },
  { name: 'Glassdoor', url: 'https://www.glassdoor.co.in/', icon: '🏢', desc: 'Jobs + salary insights', color: '#0CAA41', badge: null },
  { name: 'Internshala', url: 'https://internshala.com/jobs/', icon: '🎓', desc: 'Freshers & internship jobs', color: '#009999', badge: null },
  { name: 'Unstop', url: 'https://unstop.com/jobs', icon: '🚀', desc: 'Jobs, hackathons, contests', color: '#6C63FF', badge: null },
  { name: 'Wellfound', url: 'https://wellfound.com/', icon: '🦄', desc: 'Startup jobs (AngelList)', color: '#141414', badge: null },
  { name: 'Freshersworld', url: 'https://www.freshersworld.com/', icon: '⭐', desc: 'Campus & fresher jobs', color: '#E91E63', badge: null },
  { name: 'Shine.com', url: 'https://www.shine.com/', icon: '✨', desc: 'Fresher + experienced', color: '#F5A623', badge: null },
  { name: 'HackerEarth Jobs', url: 'https://www.hackerearth.com/jobs/', icon: '💻', desc: 'Tech jobs via skills', color: '#00C853', badge: null },
  { name: 'CutShort', url: 'https://cutshort.io/', icon: '✂️', desc: 'AI-based job matching', color: '#7B61FF', badge: null },
  { name: 'Hirist.tech', url: 'https://www.hirist.tech/', icon: '🔧', desc: 'Tech-only jobs', color: '#FF4757', badge: null },
];

const INTERNSHIP_PLATFORMS = [
  { name: 'Internshala', url: 'https://internshala.com/', icon: '🎓', desc: '#1 India internship portal', color: '#009999', badge: 'Top Pick' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/internship-jobs/', icon: '💼', desc: 'Professional network internships', color: '#0A66C2', badge: 'Popular' },
  { name: 'Unstop', url: 'https://unstop.com/internships', icon: '🚀', desc: 'Paid & stipend internships', color: '#6C63FF', badge: null },
  { name: 'LetsIntern', url: 'https://www.letsintern.com/', icon: '🌟', desc: 'Top company internships', color: '#FF6B35', badge: null },
  { name: 'Indeed Internships', url: 'https://in.indeed.com/internships', icon: '🌐', desc: 'Global internship search', color: '#003A9B', badge: null },
  { name: 'AngelList / Wellfound', url: 'https://wellfound.com/jobs?role=internship', icon: '🦄', desc: 'Startup internships', color: '#141414', badge: null },
  { name: 'Fresherslive', url: 'https://www.fresherslive.com/internship', icon: '💡', desc: 'Fresher internship opportunities', color: '#E91E63', badge: null },
  { name: 'Naukri Internships', url: 'https://www.naukri.com/internship-jobs', icon: '🔍', desc: 'Verified company internships', color: '#FF7555', badge: null },
];

const HACKATHON_PLATFORMS = [
  { name: 'Devpost', url: 'https://devpost.com/hackathons', icon: '🏗️', desc: 'World\'s largest hackathon host', color: '#003E54', badge: 'Top Pick' },
  { name: 'Devfolio', url: 'https://devfolio.co/hackathons', icon: '🛠️', desc: 'India\'s leading hackathon platform', color: '#5C6BC0', badge: 'Popular' },
  { name: 'Unstop', url: 'https://unstop.com/hackathons', icon: '🚀', desc: 'Hackathons + competitions', color: '#6C63FF', badge: null },
  { name: 'HackerEarth', url: 'https://www.hackerearth.com/challenges/', icon: '💻', desc: 'Coding challenges & sprints', color: '#00C853', badge: null },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/contests', icon: '⚡', desc: 'Skill-based coding contests', color: '#2EC866', badge: null },
  { name: 'Kaggle', url: 'https://www.kaggle.com/competitions', icon: '🤖', desc: 'AI/ML data science challenges', color: '#20BEFF', badge: null },
  { name: 'MLH', url: 'https://mlh.io/seasons/2025/events', icon: '🌐', desc: 'Major League Hacking events', color: '#ED1F82', badge: null },
  { name: 'Codeforces', url: 'https://codeforces.com/contests', icon: '🎯', desc: 'Competitive programming', color: '#1F8ACB', badge: null },
  { name: 'LeetCode Contests', url: 'https://leetcode.com/contest/', icon: '🧩', desc: 'Weekly coding contests', color: '#FFA116', badge: null },
];

const COMPETITION_PLATFORMS = [
  { name: 'Unstop', url: 'https://unstop.com/competitions', icon: '🏆', desc: 'National competitions & quizzes', color: '#6C63FF', badge: 'Top Pick' },
  { name: 'Devfolio', url: 'https://devfolio.co/hackathons', icon: '🛠️', desc: 'Tech & innovation challenges', color: '#5C6BC0', badge: null },
  { name: 'IIT Case Comps', url: 'https://unstop.com/competitions?opportunity=case-competitions', icon: '📊', desc: 'Business case competitions', color: '#FF4500', badge: null },
  { name: 'Dare2Compete', url: 'https://dare2compete.com/competitions', icon: '⚔️', desc: 'B-school & tech competitions', color: '#E53935', badge: 'Popular' },
  { name: 'HackerEarth', url: 'https://www.hackerearth.com/challenges/', icon: '💡', desc: 'Innovation challenges', color: '#00C853', badge: null },
  { name: 'Kaggle', url: 'https://www.kaggle.com/competitions', icon: '🤖', desc: 'Data science competitions', color: '#20BEFF', badge: null },
  { name: 'Google Competitions', url: 'https://buildwithgoogle.com/', icon: '🔵', desc: 'Google developer challenges', color: '#4285F4', badge: null },
  { name: 'Smart India Hackathon', url: 'https://www.sih.gov.in/', icon: '🇮🇳', desc: 'India\'s biggest innovation contest', color: '#FF9800', badge: null },
];

const TABS: { id: TabType; label: string; icon: React.ReactNode; gradient: string; accent: string; glow: string }[] = [
  { id: 'Jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" />, gradient: 'from-indigo-500 to-violet-600', accent: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  { id: 'Internships', label: 'Internships', icon: <Rocket className="w-4 h-4" />, gradient: 'from-sky-500 to-cyan-500', accent: '#0ea5e9', glow: 'rgba(14,165,233,0.3)' },
  { id: 'Hackathons', label: 'Hackathons', icon: <Code2 className="w-4 h-4" />, gradient: 'from-amber-500 to-orange-500', accent: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  { id: 'Competitions', label: 'Competitions', icon: <Trophy className="w-4 h-4" />, gradient: 'from-emerald-500 to-teal-500', accent: '#10b981', glow: 'rgba(16,185,129,0.3)' },
];

const tabTypeMap: Record<TabType, string[]> = {
  Jobs: ['job', 'full-time', 'part-time', 'remote', 'hybrid', 'onsite', 'permanent'],
  Internships: ['intern', 'internship', 'technical', 'non-technical'],
  Hackathons: ['hack', 'hackathon', 'web development', 'ai/ml', 'blockchain', 'mobile'],
  Competitions: ['comp', 'competition', 'coding', 'design', 'innovation', 'business'],
};

const TAB_PLATFORMS: Record<TabType, typeof JOB_PLATFORMS> = {
  Jobs: JOB_PLATFORMS,
  Internships: INTERNSHIP_PLATFORMS,
  Hackathons: HACKATHON_PLATFORMS,
  Competitions: COMPETITION_PLATFORMS,
};

const TAB_PLATFORM_LABELS: Record<TabType, string> = {
  Jobs: 'Quick Job Search Platforms',
  Internships: 'Top Internship Platforms',
  Hackathons: 'Top Hackathon Platforms',
  Competitions: 'Top Competition Platforms',
};

// ─── Opportunity Card ─────────────────────────────────────────────────────────
function OpportunityCard({ item, isOwner, activeTab, onEdit, onDelete }: {
  item: Opportunity; isOwner: boolean; activeTab: TabType;
  onEdit: (item: Opportunity) => void; onDelete: (id: string) => void;
}) {
  const tab = TABS.find(t => t.id === activeTab)!;
  const isExpired = item.deadline ? new Date(item.deadline) < new Date() : false;
  const daysLeft = item.deadline ? Math.ceil((new Date(item.deadline).getTime() - Date.now()) / 86400000) : null;

  const handleShare = async () => {
    const text = `Check out: ${item.title} at ${item.company}\n${item.apply_url}`;
    if (navigator.share) await navigator.share({ title: item.title, text, url: item.apply_url });
    else { await navigator.clipboard.writeText(text); }
  };

  return (
    <motion.div
      layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase text-gray-400 block mb-1 tracking-wider leading-none">
              {item.company}
            </span>
            <h3 className="font-black text-gray-800 dark:text-white text-base leading-snug line-clamp-2">
              {item.title}
            </h3>
          </div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
            isExpired ? 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' : 'bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400'
          }`}>
            <Clock className="w-3 h-3" />
            {isExpired ? 'Expired' : daysLeft ? `${daysLeft}d left` : 'Open'}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-5">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-50 dark:bg-gray-800 text-gray-655 dark:text-gray-300 border border-gray-150 dark:border-gray-700">
            <MapPin className="w-2.5 h-2.5" /> {item.location}
          </span>
          {item.duration && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-50 dark:bg-gray-800 text-gray-655 dark:text-gray-300 border border-gray-150 dark:border-gray-700">
              <Calendar className="w-2.5 h-2.5" /> {item.duration}
            </span>
          )}
          {item.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-50 dark:bg-gray-800 text-gray-655 dark:text-gray-300 border border-gray-150 dark:border-gray-700">
              <Tag className="w-2.5 h-2.5" /> {item.category}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-50 dark:border-gray-800/80">
        <a href={item.apply_url} target="_blank" rel="noopener noreferrer"
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r ${tab.gradient} hover:opacity-90 transition-opacity`}>
          Apply Now <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button onClick={handleShare}
          className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-500 dark:text-gray-400 transition-colors border border-gray-200/50 dark:border-gray-700/50">
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {isOwner && (
          <div className="flex gap-1">
            <button onClick={() => onEdit(item)} className="p-2 rounded-2xl text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => onDelete(item.id)} className="p-2 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Opportunities Modal (Owner post/edit) ──────────────────────────────────
function OpportunityModal({ open, onClose, editing, activeTab, onSaved }: {
  open: boolean; onClose: () => void; editing: Opportunity | null;
  activeTab: TabType; onSaved: () => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState<any>({
    title: '', company: '', type: 'Job', location: '', deadline: '',
    description: '', apply_url: '', duration: '', eligibility: '', category: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        deadline: editing.deadline ? editing.deadline.slice(0, 10) : '',
        eligibility: editing.eligibility ? editing.eligibility.join(', ') : '',
      });
    } else {
      setForm({
        title: '', company: '', type: activeTab === 'Jobs' ? 'Job' : activeTab === 'Internships' ? 'Internship' : activeTab === 'Hackathons' ? 'Hackathon' : 'Competition',
        location: 'Remote', deadline: '', description: '', apply_url: '', duration: '', eligibility: '', category: '',
      });
    }
  }, [open, editing, activeTab]);

  const f = (k: string, v: string) => setForm((p: any) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.title || !form.company || !form.apply_url || !form.description) {
      toast({ title: 'Validation Error', description: 'Please fill out required fields (*)', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        created_by: user?.id || 'admin',
        user_name: user?.user_metadata?.full_name || 'Admin',
        deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        eligibility: form.eligibility ? form.eligibility.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      };

      if (editing) {
        const { error } = await (supabase as any).from('opportunities').update(payload).eq('id', editing.id);
        if (error) throw error;
        toast({ title: 'Saved Successfully', description: 'Opportunity updated.' });
      } else {
        const { error } = await (supabase as any).from('opportunities').insert(payload);
        if (error) throw error;
        toast({ title: 'Posted Successfully', description: 'New opportunity added.' });
      }
      onSaved(); onClose();
    } catch (err: any) {
      toast({ title: 'Error saving', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;
  const tab = TABS.find(t => t.id === activeTab)!;
  const inputCls = "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm px-3 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all";

  return (
    <AnimatePresence>
      <motion.div key="opp-modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <motion.div key="opp-modal-box" initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className={`px-6 py-4 bg-gradient-to-r ${tab.gradient} flex items-center justify-between`}>
            <h2 className="text-lg font-bold text-white">{editing ? 'Edit Opportunity' : `Add ${activeTab.slice(0, -1)}`}</h2>
            <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-6 space-y-3 max-h-[68vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Opportunity Title *</label><input className={inputCls} value={form.title} onChange={e => f('title', e.target.value)} placeholder="e.g. Frontend Engineer Intern" /></div>
              <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Company *</label><input className={inputCls} value={form.company} onChange={e => f('company', e.target.value)} placeholder="e.g. Google India" /></div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Type *</label>
                <select className={inputCls} value={form.type} onChange={e => f('type', e.target.value)}>
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>
              <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Location *</label><input className={inputCls} value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Remote, Bangalore" /></div>
              <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Deadline</label><input type="date" className={inputCls} value={form.deadline} onChange={e => f('deadline', e.target.value)} /></div>
              <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Duration</label><input className={inputCls} value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="e.g. 3 months, Permanent" /></div>
              <div><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Category</label><input className={inputCls} value={form.category} onChange={e => f('category', e.target.value)} placeholder="e.g. AI/ML, Full-stack..." /></div>
              <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Apply Link *</label><input className={inputCls} value={form.apply_url} onChange={e => f('apply_url', e.target.value)} placeholder="https://..." /></div>
              <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Description *</label><textarea rows={3} className={inputCls} value={form.description} onChange={e => f('description', e.target.value)} placeholder="What will the candidate do?" /></div>
              <div className="col-span-2"><label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Eligibility (comma-separated)</label><input className={inputCls} value={form.eligibility} onChange={e => f('eligibility', e.target.value)} placeholder="CSE/IT, 2+ years Python, B.Tech 3rd year..." /></div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className={`px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${tab.gradient} hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60`}>
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {editing ? 'Save Changes' : 'Post Opportunity'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── High-Contrast Pagination Component ───────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number; totalPages: number; onPageChange: (page: number) => void;
}) {
  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push('...');
      const start = Math.max(3, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const btnClass = "min-w-[38px] h-9 px-2 rounded-xl text-xs font-black bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300 disabled:opacity-25 transition-all shadow-md flex items-center justify-center font-mono";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}
        className={btnClass} title="First page">
        «
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className={btnClass} title="Previous page">
        ‹
      </button>
      {getPages().map((p, i) => (
        p === '...'
          ? <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-gray-500 font-extrabold">...</span>
          : <button key={p} onClick={() => onPageChange(p as number)}
              className={`min-w-[38px] h-9 px-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center ${
                currentPage === p
                  ? 'bg-violet-750 text-white dark:bg-violet-600 border border-violet-500 shadow-violet-500/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300'
              }`}>
              {p}
            </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className={btnClass} title="Next page">
        ›
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}
        className={btnClass} title="Last page">
        »
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Opportunities = () => {
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Tab + search state
  const [activeTab, setActiveTab] = useState<TabType>('Jobs');
  const [search, setSearch] = useState('');
  const [filterLoc, setFilterLoc] = useState('all');

  // Opportunities data
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);

  // Pagination state for active listings
  const [listingsPage, setListingsPage] = useState(1);
  const LISTINGS_PER_PAGE = 9;

  // Premium state
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; plan: PremiumPlan }>({ open: false, plan: 'companies' });
  const [hasCompaniesAccess, setHasCompaniesAccess] = useState(false);
  const [hasHRAccess, setHasHRAccess] = useState(false);

  // Check purchases on mount
  const checkPurchases = useCallback(async () => {
    if (!user) return;
    const { data } = await (supabase as any).from('premium_purchases').select('plan').eq('user_id', user.id).in('payment_status', ['completed', 'free']);
    if (data) {
      setHasCompaniesAccess(isOwner || data.some((p: any) => p.plan === 'companies'));
      setHasHRAccess(isOwner || data.some((p: any) => p.plan === 'hr_emails'));
    }
    if (isOwner) { setHasCompaniesAccess(true); setHasHRAccess(true); }
  }, [user, isOwner]);

  useEffect(() => {
    checkPurchases();

    // Check if redirect query param exists (from Razorpay Payment Button redirect)
    const params = new URLSearchParams(window.location.search);
    const unlockPlan = params.get('unlocked') as PremiumPlan;
    if (unlockPlan && user) {
      const recordRedirectPurchase = async () => {
        try {
          const { error } = await (supabase as any).from('premium_purchases').insert({
            user_id: user.id,
            user_email: user.email,
            plan: unlockPlan,
            amount_paid: unlockPlan === 'companies' ? 14900 : 99900,
            original_amount: unlockPlan === 'companies' ? 14900 : 99900,
            payment_status: 'completed',
            razorpay_payment_id: params.get('payment_id') || 'redirect_payment_btn',
          });
          if (!error) {
            toast({ title: '🎉 Access Unlocked!', description: `Your access to ${unlockPlan === 'companies' ? 'Company Career Pages' : 'HR Emails'} has been unlocked.` });
            window.history.replaceState({}, document.title, window.location.pathname);
            checkPurchases();
          }
        } catch (e) {
          console.error(e);
        }
      };
      recordRedirectPurchase();
    }
  }, [user, checkPurchases]);

  const fetchOpportunities = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any).from('opportunities').select('*').order('created_at', { ascending: false });
    if (!error && data) setOpportunities(data as Opportunity[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
    const p = new URLSearchParams(window.location.search).get('tab') as TabType;
    if (p && ['Jobs', 'Internships', 'Hackathons', 'Competitions'].includes(p)) setActiveTab(p);
  }, []);

  const filtered = opportunities.filter(o => {
    const t = (o.type || '').toLowerCase();
    const tabMatch = tabTypeMap[activeTab].some(kw => t.includes(kw));
    const searchL = search.toLowerCase();
    const searchMatch = !search || o.title.toLowerCase().includes(searchL) || o.company.toLowerCase().includes(searchL) || o.description.toLowerCase().includes(searchL);
    const locMatch = filterLoc === 'all' || o.location.toLowerCase().includes(filterLoc.toLowerCase());
    return tabMatch && searchMatch && locMatch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this opportunity?')) return;
    const { error } = await (supabase as any).from('opportunities').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Deleted', description: 'Opportunity removed.' });
    fetchOpportunities();
  };

  const activeTabCfg = TABS.find(t => t.id === activeTab)!;
  const locations = ['all', 'Remote', 'Online', 'Bangalore', 'Mumbai', 'Hyderabad', 'Delhi', 'Kanpur', 'Hybrid', 'Global'];

  // Pagination for listings
  const totalListingsPages = Math.ceil(filtered.length / LISTINGS_PER_PAGE);
  const pagedListings = filtered.slice((listingsPage - 1) * LISTINGS_PER_PAGE, listingsPage * LISTINGS_PER_PAGE);

  useEffect(() => { setListingsPage(1); }, [activeTab, search, filterLoc]);

  // Active tab platform list
  const activePlatforms = TAB_PLATFORMS[activeTab];
  const platformLabel = TAB_PLATFORM_LABELS[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* ══════════ HERO + SWITCHER (combined, no gap) ══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 pt-12 pb-6">
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          <motion.div animate={{ x: [0, -25, 0], y: [0, 25, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-10 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-4 text-center">
          {/* Eyebrow */}
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-300/70 mb-5">
            ✦ Career &amp; Opportunity Hub ✦
          </motion.p>

          {/* ── Tab Switcher Pushed to Top ── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex justify-center mb-6">
            <div className="relative flex rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-1 bg-white/5 backdrop-blur-md">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearch(''); setFilterLoc('all'); }}
                  className={`relative z-10 flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 ${activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                >
                  {activeTab === tab.id && (
                    <motion.div layoutId="tab-pill" className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl`}
                      style={{ boxShadow: `0 4px 15px ${tab.glow}` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }} />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">{tab.icon}{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* New Custom Header */}
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
            <span className="font-serif italic text-3xl md:text-5xl" style={{ fontFamily: '"Georgia", "Times New Roman", serif', letterSpacing: '-0.01em' }}>
              Right People
            </span>{' '}
            <span className="text-white/90 font-serif italic text-3xl md:text-5xl" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>
              at the
            </span>{' '}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-transparent font-black not-italic">
              Right Place
            </span>
          </motion.h1>
        </div>
      </section>

      {/* S-Wave 3: hero → opportunity listings (seamlessly matching colors) */}
      <div className="w-full overflow-hidden leading-none bg-slate-900 dark:bg-slate-950" style={{ height: 70 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 C240,10 480,65 720,35 C960,5 1200,55 1440,25 L1440,70 L0,70 Z" fill="#f9fafb" className="dark:fill-[#030712]" />
        </svg>
      </div>

      {/* ══════════ OPPORTUNITY CARDS SECTION ══════════ */}
      <section className="bg-gray-50 dark:bg-gray-950 pb-12 -mt-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm p-8">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeTabCfg.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {activeTabCfg.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{activeTab}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} opportunities found</p>
                </div>
                {isOwner && (
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setEditing(null); setModalOpen(true); }}
                    className={`ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${activeTabCfg.gradient} shadow-md hover:shadow-lg transition-shadow`}>
                    <Plus className="w-4 h-4" /> Add {activeTab.slice(0, -1)}
                  </motion.button>
                )}
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${activeTab.toLowerCase()}...`}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select value={filterLoc} onChange={e => setFilterLoc(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    {locations.map(l => <option key={l} value={l}>{l === 'all' ? '📍 All Locations' : l}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                  <p className="text-gray-400 text-sm">Loading opportunities...</p>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-5 text-3xl">
                  {activeTab === 'Jobs' ? '💼' : activeTab === 'Internships' ? '🚀' : activeTab === 'Hackathons' ? '💻' : '🏆'}
                </div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No {activeTab} found</h3>
                <p className="text-gray-400 text-sm mb-6">Try different search terms or check back later</p>
                {isOwner && (
                  <button onClick={() => { setEditing(null); setModalOpen(true); }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r ${activeTabCfg.gradient}`}>
                    <Plus className="w-4 h-4" /> Add First {activeTab.slice(0, -1)}
                  </button>
                )}
              </motion.div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pagedListings.map(item => (
                      <OpportunityCard key={item.id} item={item} isOwner={!!isOwner} activeTab={activeTab}
                        onEdit={o => { setEditing(o); setModalOpen(true); }} onDelete={handleDelete} />
                    ))}
                  </div>
                </AnimatePresence>

                {/* Pagination */}
                <Pagination
                  currentPage={listingsPage}
                  totalPages={totalListingsPages}
                  onPageChange={setListingsPage}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ MODALS ══════════ */}
      <OpportunityModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}
        editing={editing} activeTab={activeTab} onSaved={fetchOpportunities} />

      <PremiumModal open={premiumModal.open} onClose={() => setPremiumModal(p => ({ ...p, open: false }))}
        plan={premiumModal.plan} onSuccess={() => { checkPurchases(); }} />
    </div>
  );
};

export default Opportunities;
