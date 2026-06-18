import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Briefcase, Rocket, Code2, Trophy, ChevronRight, CheckCircle2,
  Crown, Sparkles, ArrowRight, Lock, ArrowUpRight, ArrowRightLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PremiumModal } from '@/components/PremiumModal';
import Footer from '@/components/Footer';

// --- Platforms Data ---
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

const AI_TOOL_SHIFTS = [
  { task: 'Writing & Coding', oldName: 'ChatGPT', oldUrl: 'https://chatgpt.com', newName: 'Claude', newUrl: 'https://claude.ai', desc: 'Claude offers superior logical reasoning, cleaner code generation, and reads codebase contexts better.' },
  { task: 'Video Editing', oldName: 'Adobe Premiere', oldUrl: 'https://www.adobe.com/products/premiere.html', newName: 'Opus Clip', newUrl: 'https://www.opus.pro', desc: 'Opus Clip uses AI to parse long videos and auto-generate viral shorts with animated captions instantly.' },
  { task: 'Web Development', oldName: 'Replit Sandbox', oldUrl: 'https://replit.com', newName: 'Blink Editor', newUrl: 'https://blink.dev', desc: 'Blink offers a next-gen, zero-config mobile & web development workspace designed for rapid building.' },
  { task: 'Image Generation', oldName: 'Ideogram', oldUrl: 'https://ideogram.ai', newName: 'Nano Banana', newUrl: 'https://nanobanana.com', desc: 'Nano Banana outputs hyper-realistic and context-optimized image generation with accurate typography.' },
  { task: 'Presentations', oldName: 'Microsoft PowerPoint', oldUrl: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint', newName: 'Gamma App', newUrl: 'https://gamma.app', desc: 'Gamma generates high-end, responsive presentation decks and web pages from simple text inputs.' },
  { task: 'Workflow Automation', oldName: 'n8n Workflows', oldUrl: 'https://n8n.io', newName: 'Zapier Automation', newUrl: 'https://zapier.com', desc: 'Zapier bridges 5000+ app integrations seamlessly, making web automation simple for any workflow.' },
  { task: 'Voice Dictation', oldName: 'Legacy Keyboard', oldUrl: 'https://www.google.com/search?q=keyboard', newName: 'Wispr dictation', newUrl: 'https://www.wisprflow.com', desc: 'Wispr acts as a voice-to-text writing system that types exactly what you say, naturally and fast.' },
  { task: 'Meeting Notes', oldName: 'Otter.ai', oldUrl: 'https://otter.ai', newName: 'Granola', newUrl: 'https://www.granola.so', desc: 'Granola generates clean, actionable AI meeting notes right inside your Mac/Windows menu bar.' },
  { task: 'LinkedIn Content', oldName: 'Taplio Scheduler', oldUrl: 'https://taplio.com', newName: 'EasyGen Writer', newUrl: 'https://easygen.io', desc: 'EasyGen speeds up personal brand building with hyper-optimized LinkedIn post formats.' }
];

const CATEGORIES = [
  { id: 'jobs', label: 'Job Search Platforms', icon: <Briefcase className="w-4 h-4" />, items: JOB_PLATFORMS, gradient: 'from-slate-800 to-slate-950' },
  { id: 'internships', label: 'Internship Platforms', icon: <Rocket className="w-4 h-4" />, items: INTERNSHIP_PLATFORMS, gradient: 'from-emerald-600 to-teal-700' },
  { id: 'hackathons', label: 'Hackathon Platforms', icon: <Code2 className="w-4 h-4" />, items: HACKATHON_PLATFORMS, gradient: 'from-amber-500 to-yellow-600' },
  { id: 'competitions', label: 'Competition Platforms', icon: <Trophy className="w-4 h-4" />, items: COMPETITION_PLATFORMS, gradient: 'from-slate-700 to-slate-900' },
  { id: 'aitools', label: 'Then vs Now: AI Tool Shift', icon: <ArrowRightLeft className="w-4 h-4" />, items: AI_TOOL_SHIFTS, gradient: 'from-amber-600 to-orange-600' },
];

export default function PremiumContent() {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const [unlockedPlans, setUnlockedPlans] = useState<string[]>([]);
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; plan: 'companies' | 'hr_emails' | 'resume' | 'roadmaps' }>({ open: false, plan: 'companies' });
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const checkPurchases = useCallback(async () => {
    if (!user) return;
    const { data } = await (supabase as any)
      .from('premium_purchases')
      .select('plan')
      .eq('user_id', user.id)
      .in('payment_status', ['completed', 'free']);
    
    const plans = data ? data.map((p: any) => p.plan) : [];
    setUnlockedPlans(plans);
  }, [user]);

  useEffect(() => {
    checkPurchases();
  }, [checkPurchases]);

  const hasCompaniesAccess = unlockedPlans.includes('companies');
  const hasHRAccess = unlockedPlans.includes('hr_emails');
  const hasResumeAccess = unlockedPlans.includes('resume');
  const hasRoadmapsAccess = unlockedPlans.includes('roadmaps');

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  return (
    <div className="min-h-screen bg-[#f9faf7] dark:bg-slate-950">
      <Navbar />

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black pt-12 pb-12">
        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-4 flex items-center justify-center gap-1.5"
          >
            <Crown className="w-3.5 h-3.5" /> Premium Content Hub <Crown className="w-3.5 h-3.5" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight"
          >
            Valued content at nominal cost
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-8 font-medium"
          >
            Gain direct access to highly curated career resources, contacts, and optimized templates designed to unlock opportunities.
          </motion.p>

          {/* Point-wise Guidelines with Green Tick */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3.5 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
                Keep checking official career pages for updates and send cold emails with a job-oriented resume directly to relevant positions.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
                Do not spam to avoid blacklisting—getting a referral first is highly recommended before applying.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
                Use these resources responsibly for educational and career purposes only to ensure the longevity of directories.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ PREMIUM CARDS ══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card A: Company Directory */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-3xl p-6 border-2 flex flex-col justify-between overflow-hidden shadow-lg transition-all ${
              hasCompaniesAccess 
                ? 'bg-gradient-to-br from-violet-50/70 to-indigo-50/70 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200 dark:border-violet-800/60 shadow-violet-500/5'
                : 'bg-gradient-to-br from-amber-50/70 to-yellow-50/70 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800/60 shadow-amber-500/5'
            }`}
          >
            <div className="absolute top-2 right-4 text-7xl opacity-10 pointer-events-none">🏢</div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  hasCompaniesAccess 
                    ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                    : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                }`}>
                  <Crown className="w-3.5 h-3.5" /> {hasCompaniesAccess ? 'Access Granted' : 'Premium Access'}
                </span>
                <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">130+ MNC/PSU/GOV</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Company Career Pages</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                Direct, official links to the careers page of top MNCs, PSUs, Unicorns, and Government sectors. Fully filterable.
              </p>
              <div className="space-y-1.5 mb-5">
                {['Direct Official Links', 'Filter by Branch/Type', 'Real-time Updates', 'Lifetime Access'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-[10px] text-gray-400 block leading-none font-medium mb-0.5">Price</span>
                {hasCompaniesAccess ? (
                  <span className="text-lg font-black text-gray-900 dark:text-white">UNLOCKED</span>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 line-through">₹499</span>
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-1 rounded">70% OFF</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">₹149</span>
                  </div>
                )}
              </div>
              {hasCompaniesAccess ? (
                <button 
                  onClick={() => navigate('/opportunities/directory?tab=companies')}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  <Sparkles className="w-3 h-3" /> Explore <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button 
                  onClick={() => setPremiumModal({ open: true, plan: 'companies' })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  Unlock
                </button>
              )}
            </div>
          </motion.div>

          {/* Card B: HR Email Directory */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`relative rounded-3xl p-6 border-2 flex flex-col justify-between overflow-hidden shadow-lg transition-all ${
              hasHRAccess 
                ? 'bg-gradient-to-br from-violet-50/70 to-indigo-50/70 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200 dark:border-violet-800/60 shadow-violet-500/5'
                : 'bg-gradient-to-br from-emerald-50/70 to-teal-50/70 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800/60 shadow-emerald-500/5'
            }`}
          >
            <div className="absolute top-2 right-4 text-7xl opacity-10 pointer-events-none">📧</div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  hasHRAccess 
                    ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                    : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                }`}>
                  <Crown className="w-3.5 h-3.5" /> {hasHRAccess ? 'Access Granted' : 'Premium Access'}
                </span>
                <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">1800+ CONTACTS</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">HR Email Directory</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                Direct email addresses of verified HR managers. Send applications directly to decision makers, bypassing ATS.
              </p>
              <div className="space-y-1.5 mb-5">
                {['1800+ Verified Emails', 'Direct Email Application', 'MNCs & Unicorns', 'Lifetime Updates'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-[10px] text-gray-400 block leading-none font-medium mb-0.5">Price</span>
                {hasHRAccess ? (
                  <span className="text-lg font-black text-gray-900 dark:text-white">UNLOCKED</span>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 line-through">₹3330</span>
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-1 rounded">70% OFF</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">₹999</span>
                  </div>
                )}
              </div>
              {hasHRAccess ? (
                <button 
                  onClick={() => navigate('/opportunities/directory?tab=hr')}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  <Sparkles className="w-3 h-3" /> Explore <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button 
                  onClick={() => setPremiumModal({ open: true, plan: 'hr_emails' })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  Unlock
                </button>
              )}
            </div>
          </motion.div>

          {/* Card C: ATS Friendly Resume Builder */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative rounded-3xl p-6 border-2 flex flex-col justify-between overflow-hidden shadow-lg transition-all ${
              hasResumeAccess 
                ? 'bg-gradient-to-br from-violet-50/70 to-indigo-50/70 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200 dark:border-violet-800/60 shadow-violet-500/5'
                : 'bg-gradient-to-br from-orange-50/70 to-amber-50/70 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800/60 shadow-orange-500/5'
            }`}
          >
            <div className="absolute top-2 right-4 text-7xl opacity-10 pointer-events-none">📄</div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  hasResumeAccess 
                    ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                    : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                }`}>
                  <Crown className="w-3.5 h-3.5" /> {hasResumeAccess ? 'Access Granted' : 'Premium Access'}
                </span>
                <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">OVERLEAF MODEL</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">ATS Friendly Resume Guide</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                Step-by-step formatting and writing guide with direct access to highly optimized resume templates. Pass ATS screenings easily.
              </p>
              <div className="space-y-1.5 mb-5">
                {['Overleaf Template Links', 'Bullet Point Optimizer', 'Do\'s and Don\'ts Rules', 'CGPA Calculator Integration'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-[10px] text-gray-400 block leading-none font-medium mb-0.5">Price</span>
                {hasResumeAccess ? (
                  <span className="text-lg font-black text-gray-900 dark:text-white">UNLOCKED</span>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 line-through">₹559</span>
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-1 rounded">70% OFF</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">₹167</span>
                  </div>
                )}
              </div>
              {hasResumeAccess ? (
                <button 
                  onClick={() => navigate('/ats-friendly-resume')}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  <Sparkles className="w-3 h-3" /> Explore <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button 
                  onClick={() => setPremiumModal({ open: true, plan: 'resume' })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  Unlock
                </button>
              )}
            </div>
          </motion.div>

          {/* Card D: Fresher Placement Roadmap & Tool Guide */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`relative rounded-3xl p-6 border-2 flex flex-col justify-between overflow-hidden shadow-lg transition-all ${
              hasRoadmapsAccess 
                ? 'bg-gradient-to-br from-violet-50/70 to-indigo-50/70 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200 dark:border-violet-800/60 shadow-violet-500/5'
                : 'bg-gradient-to-br from-slate-50/70 to-slate-100/70 dark:from-slate-900/40 dark:to-slate-950/40 border-slate-200 dark:border-slate-800 shadow-slate-500/5'
            }`}
          >
            <div className="absolute top-2 right-4 text-7xl opacity-10 pointer-events-none">🗺️</div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  hasRoadmapsAccess 
                    ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <Crown className="w-3.5 h-3.5" /> {hasRoadmapsAccess ? 'Access Granted' : 'Premium Access'}
                </span>
                <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">ROADMAP & TOOLS</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Placement Roadmap & Tool Guide</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                Step-by-step career path, master DSA from the right resources, optimize resume/LinkedIn, and explore curated playlists and directories.
              </p>
              <div className="space-y-1.5 mb-5">
                {['5-Stage Fresher Roadmap', 'Instructors & Channels List', 'Interview Prep Playlists', 'Resume & LinkedIn Blueprints'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between gap-3 mt-auto">
              <div>
                <span className="text-[10px] text-gray-400 block leading-none font-medium mb-0.5">Price</span>
                {hasRoadmapsAccess ? (
                  <span className="text-lg font-black text-gray-900 dark:text-white">UNLOCKED</span>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-400 line-through">₹2196</span>
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-1 rounded">75% OFF</span>
                    </div>
                    <span className="text-lg font-black text-gray-900 dark:text-white">₹549</span>
                  </div>
                )}
              </div>
              {hasRoadmapsAccess ? (
                <button 
                  onClick={() => navigate('/roadmaps/fresher-job-guide')}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-bold text-[11px] shadow-sm transition-opacity"
                >
                  <Sparkles className="w-3 h-3" /> Explore <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button 
                  onClick={() => setPremiumModal({ open: true, plan: 'roadmaps' })}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-[11px] shadow-sm transition-all border border-slate-800 dark:border-slate-700"
                >
                  Unlock
                </button>
              )}
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ══════════ COLLAPSIBLE PLATFORMS SECTION ══════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Curated Platform Directories</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Click any category below to expand and open platforms directly</p>
            </div>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map(category => {
              const isExpanded = expandedCategories.includes(category.id);
              return (
                <div key={category.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                  {/* Collapsible Header */}
                  <button
                     onClick={() => toggleCategory(category.id)}
                     className="w-full flex items-center justify-between p-4 bg-gray-50/70 hover:bg-gray-50 dark:bg-slate-800/20 dark:hover:bg-slate-800/40 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-md`}>
                        {category.icon}
                      </div>
                      <span className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">{category.label}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                          {category.id === 'aitools' ? (
                            <div className="flex flex-col gap-3">
                              {/* Header Row */}
                              <div className="hidden md:flex items-center text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800 px-4">
                                <div className="w-1/4">Workflow / Task</div>
                                <div className="w-1/5 text-center">Then (Legacy)</div>
                                <div className="w-12 text-center"></div>
                                <div className="w-1/5 text-center">Now (AI Shift)</div>
                                <div className="flex-1 pl-6">Key Enhancements &amp; Advantages</div>
                              </div>

                              {/* Rows */}
                              {category.items.map((p: any, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center p-4 bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-850/30 border border-slate-100 dark:border-slate-850 rounded-2xl transition-all duration-200 gap-3 md:gap-0">
                                  {/* Workflow Category */}
                                  <div className="w-full md:w-1/4">
                                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 tracking-wider font-mono">
                                      {p.task}
                                    </span>
                                  </div>

                                  {/* Desktop: Legacy Tool */}
                                  <div className="hidden md:flex w-1/5 justify-center">
                                    <a 
                                      href={p.oldUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="group/old inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                      <span>{p.oldName}</span>
                                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 group-hover/old:text-emerald-500 transition-colors shrink-0" />
                                    </a>
                                  </div>

                                  {/* Desktop: Transition Arrow */}
                                  <div className="hidden md:flex w-12 justify-center text-slate-300 dark:text-slate-700 font-bold text-sm">
                                    →
                                  </div>

                                  {/* Desktop: Modern AI Tool */}
                                  <div className="hidden md:flex w-1/5 justify-center">
                                    <a 
                                      href={p.newUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="group/new inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-950 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-800 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-100 hover:text-emerald-400 transition-colors shadow-sm"
                                    >
                                      <span>{p.newName}</span>
                                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-450 dark:text-blue-400 group-hover/new:text-emerald-400 group-hover/new:translate-x-0.5 group-hover/new:-translate-y-0.5 transition-transform shrink-0" />
                                    </a>
                                  </div>

                                  {/* Mobile: Split Legacy/New Row */}
                                  <div className="flex items-center justify-between md:hidden bg-slate-50/50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                                    <a 
                                      href={p.oldUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="group/old text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                      {p.oldName}
                                    </a>
                                    <span className="text-slate-300 dark:text-slate-700 font-bold text-xs">→</span>
                                    <a 
                                      href={p.newUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="group/new flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-950 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-800 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-100 dark:text-slate-300 hover:text-emerald-400 transition-colors"
                                    >
                                      {p.newName}
                                      <ArrowUpRight className="w-3 h-3 text-blue-400 group-hover/new:text-emerald-400 shrink-0" />
                                    </a>
                                  </div>

                                  {/* Description */}
                                  <div className="w-full md:flex-1 md:pl-6">
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                      {p.desc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                              {category.items.map(p => (
                                <a
                                  key={p.name}
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group relative bg-white dark:bg-gray-900 hover:bg-emerald-50/50 dark:hover:bg-emerald-955/20 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-250 dark:hover:border-emerald-900 p-4 flex items-center gap-3.5 h-[88px] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                                >
                                  {p.badge && (
                                    <span className="absolute top-1.5 right-1.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-yellow-600 text-white leading-none scale-90">
                                      {p.badge}
                                    </span>
                                  )}
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm" style={{ background: `${p.color}15`, border: `1px solid ${p.color}35` }}>
                                    {p.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-extrabold text-sm text-blue-600 dark:text-blue-400 block leading-snug line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{p.name}</span>
                                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-500 group-hover:text-emerald-500 transition-colors shrink-0" />
                                    </div>
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mt-0.5">{p.desc}</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ MODALS ══════════ */}
      <PremiumModal
        open={premiumModal.open}
        onClose={() => setPremiumModal(p => ({ ...p, open: false }))}
        plan={premiumModal.plan}
        onSuccess={checkPurchases}
      />
      <Footer />
    </div>
  );
}
