import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
  Crown, Sparkles, Mail, ChevronDown, ChevronUp,
  Flame, ChevronLeft, ChevronRight, SlidersHorizontal, Check, RefreshCw, Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PremiumModal } from '@/components/PremiumModal';
import { PremiumPlan } from '@/components/LockedSection';
import { getCachedData, setCachedData, removeCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Opportunity {
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
  is_trending?: boolean;
}

export type TabType = 'All' | 'Jobs' | 'Internships' | 'Hackathons' | 'Competitions';
export type StatusFilter = 'all' | 'active' | 'closing_soon' | 'upcoming';
export type SortOption = 'newest' | 'deadline';

// Helper to check if an opportunity is trending
export const checkIsTrending = (item: Opportunity): boolean => {
  if (item.is_trending === true) return true;
  if (item.category && item.category.toLowerCase().includes('trending')) return true;
  try {
    const trendingIds = JSON.parse(localStorage.getItem('trending_opportunity_ids') || '[]');
    if (trendingIds.includes(item.id)) return true;
  } catch (_) {}
  return false;
};

// ─── Tabs Configuration ───────────────────────────────────────────────────────
const TABS: { id: TabType; label: string; icon: React.ReactNode; gradient: string; accent: string; glow: string }[] = [
  { id: 'All', label: 'All', icon: <LayersIcon className="w-4 h-4" />, gradient: 'from-slate-700 to-slate-900', accent: '#64748b', glow: 'rgba(100,116,139,0.3)' },
  { id: 'Jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" />, gradient: 'from-indigo-500 to-violet-600', accent: '#6366f1', glow: 'rgba(99,102,241,0.3)' },
  { id: 'Internships', label: 'Internships', icon: <Rocket className="w-4 h-4" />, gradient: 'from-sky-500 to-cyan-500', accent: '#0ea5e9', glow: 'rgba(14,165,233,0.3)' },
  { id: 'Hackathons', label: 'Hackathons', icon: <Code2 className="w-4 h-4" />, gradient: 'from-amber-500 to-orange-500', accent: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  { id: 'Competitions', label: 'Competitions', icon: <Trophy className="w-4 h-4" />, gradient: 'from-emerald-500 to-teal-500', accent: '#10b981', glow: 'rgba(16,185,129,0.3)' },
];

function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const tabTypeMap: Record<TabType, string[]> = {
  All: ['job', 'intern', 'hack', 'comp', 'full-time', 'part-time', 'competition'],
  Jobs: ['job', 'full-time', 'part-time', 'remote', 'hybrid', 'onsite', 'permanent'],
  Internships: ['intern', 'internship', 'technical', 'non-technical'],
  Hackathons: ['hack', 'hackathon', 'web development', 'ai/ml', 'blockchain', 'mobile'],
  Competitions: ['comp', 'competition', 'coding', 'design', 'innovation', 'business'],
};

// ─── Trending Carousel Component (Unstop style auto-slide) ───────────────────
interface TrendingCarouselProps {
  trendingItems: Opportunity[];
  isOwner: boolean;
  onToggleTrending: (item: Opportunity, forcedState?: boolean) => void;
  onSelectOpportunity: (item: Opportunity) => void;
}

function TrendingCarousel({ trendingItems, isOwner, onToggleTrending, onSelectOpportunity }: TrendingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const total = trendingItems.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

  if (total === 0) {
    if (!isOwner) return null;
    return (
      <div className="mb-8 rounded-3xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-500 font-bold mb-2">
          <Flame className="w-5 h-5 animate-pulse" />
          <span>Top Trending Showcase (Owner Mode)</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          No opportunities are marked as trending yet. As the owner, click the <Flame className="w-3.5 h-3.5 inline text-amber-500" /> icon or double-click any opportunity card below to feature it here in the auto-sliding showcase!
        </p>
      </div>
    );
  }

  const current = trendingItems[currentIndex % total];
  const daysLeft = current.deadline ? Math.ceil((new Date(current.deadline).getTime() - Date.now()) / 86400000) : null;
  const isExpired = current.deadline ? new Date(current.deadline) < new Date() : false;

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % total);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + total) % total);

  return (
    <div 
      className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-950 border border-indigo-500/30 shadow-2xl p-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glowing aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar inside banner */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
            <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
            Trending Now
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 font-medium">
            Featured student opportunities with high engagement
          </span>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          {isOwner && (
            <span className="hidden md:inline-block text-[10px] text-amber-400/90 font-medium bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              💡 Owner: Double click to remove
            </span>
          )}
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="p-5 sm:p-7 relative cursor-pointer"
          onDoubleClick={() => {
            if (isOwner) {
              onToggleTrending(current, false);
            }
          }}
        >
          {isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleTrending(current, false);
              }}
              className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold border border-red-500/30 transition-colors flex items-center gap-1"
              title="Remove from trending showcase"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Info */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wide">
                  {current.type || 'Opportunity'}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <strong className="text-white font-bold">{current.company}</strong>
                </span>
                {current.location && (
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {current.location}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {current.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {current.duration && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                    <Calendar className="w-3 h-3 text-amber-400" /> {current.duration}
                  </span>
                )}
                {current.deadline && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    isExpired 
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : daysLeft !== null && daysLeft <= 5
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {isExpired ? 'Application Closed' : daysLeft ? `${daysLeft} days left to apply` : 'Open'}
                  </span>
                )}
                {Array.isArray(current.eligibility) && current.eligibility.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {current.eligibility[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <a
                href={current.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-xl hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Apply Now Directly</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const shareUrl = `${window.location.origin}/opportunity/${current.id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast({ title: 'Link Copied', description: 'Opportunity link copied to clipboard.' });
                  }}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button
                  onClick={() => onSelectOpportunity(current)}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      {total > 1 && (
        <div className="flex justify-center items-center gap-1.5 pb-3">
          {trendingItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Opportunity Card (Professional Unstop / LinkedIn Style) ───────────────────
interface OpportunityCardProps {
  item: Opportunity;
  isOwner: boolean;
  activeTab: TabType;
  onEdit: (item: Opportunity) => void;
  onDelete: (id: string) => void;
  onToggleTrending: (item: Opportunity, forcedState?: boolean) => void;
}

function OpportunityCard({ item, isOwner, activeTab, onEdit, onDelete, onToggleTrending }: OpportunityCardProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const isFuture = item.created_at ? new Date(item.created_at) > new Date() : false;
  const isExpired = item.deadline ? new Date(item.deadline) < new Date() : false;
  const isActive = !isExpired && !isFuture;
  const isTrending = checkIsTrending(item);

  const daysLeft = item.deadline ? Math.ceil((new Date(item.deadline).getTime() - Date.now()) / 86400000) : null;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/opportunity/${item.id}`;
    const text = `Check out this opportunity on CollegeStudy!\n\n*${item.title}* at *${item.company}*\n\nClick to view full details & apply:\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text, url: shareUrl });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast({ title: 'Link Copied', description: 'Opportunity details link copied to clipboard.' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Company logo/avatar color generator
  const getAvatarBg = (name: string) => {
    const colors = [
      'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length];
  };

  const companyInitials = (item.company || 'CO').slice(0, 2).toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={isActive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      onDoubleClick={() => {
        if (isOwner) {
          onToggleTrending(item);
        }
      }}
      className={`group relative bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl ${
        isTrending 
          ? 'border-amber-400/60 dark:border-amber-500/40 ring-1 ring-amber-400/30' 
          : 'border-slate-200/80 dark:border-slate-800'
      } ${!isActive ? 'opacity-65 grayscale-[15%]' : ''}`}
    >
      <div>
        {/* Top Header: Company Avatar + Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${getAvatarBg(item.company)}`}>
              {companyInitials}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 truncate">
                {item.company}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" title="Verified Posting" />
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                {item.location || 'Remote'}
              </span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {isTrending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                <Flame className="w-3 h-3 fill-white" /> Trending
              </span>
            )}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              isExpired 
                ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50' 
                : isFuture 
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
                  : daysLeft !== null && daysLeft <= 5
                    ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50 font-black'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50'
            }`}>
              <Clock className="w-3 h-3" />
              {isExpired ? 'Expired' : isFuture ? 'Upcoming' : daysLeft ? `${daysLeft}d left` : 'Active'}
            </span>
          </div>
        </div>

        {/* Opportunity Title */}
        <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {item.title}
        </h3>

        {/* Chips row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Briefcase className="w-2.5 h-2.5" /> {item.type}
          </span>
          {item.duration && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Calendar className="w-2.5 h-2.5" /> {item.duration}
            </span>
          )}
          {item.category && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Tag className="w-2.5 h-2.5" /> {item.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap ${
          isExpanded ? 'mb-3' : 'line-clamp-2 mb-1'
        }`}>
          {item.description}
        </p>

        {item.description && item.description.length > 90 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-3 flex items-center gap-0.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer p-0"
          >
            {isExpanded ? (
              <><ChevronUp className="w-3 h-3" /> Show less</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> Read more</>
            )}
          </button>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-3.5 border-t border-slate-150 dark:border-slate-800/80 flex items-center gap-2 mt-auto">
        <a
          href={item.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all shadow-sm ${
            !isActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {isFuture ? 'Upcoming' : isExpired ? 'Closed' : <>Apply Direct <ExternalLink className="w-3.5 h-3.5" /></>}
        </a>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
          title="Share opportunity"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {/* Owner Controls */}
        {isOwner && (
          <div className="flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onToggleTrending(item)}
              className={`p-2 rounded-xl transition-all ${
                isTrending 
                  ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' 
                  : 'text-slate-400 hover:bg-amber-500/10 hover:text-amber-500'
              }`}
              title={isTrending ? 'Featured in Trending (Click to remove)' : 'Click to add to Trending Showcase'}
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onEdit(item)}
              className="p-2 rounded-xl text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="Edit opportunity"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete opportunity"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Opportunities Modal (Owner post/edit with Trending Toggle) ──────────────
function OpportunityModal({ open, onClose, editing, activeTab, onSaved }: {
  open: boolean;
  onClose: () => void;
  editing: Opportunity | null;
  activeTab: TabType;
  onSaved: () => void;
}) {
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState<any>({
    title: '', company: '', type: 'Job', location: '', deadline: '',
    description: '', apply_url: '', duration: '', eligibility: '', category: '',
    created_at: '', is_trending: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        deadline: editing.deadline ? editing.deadline.slice(0, 10) : '',
        eligibility: editing.eligibility ? editing.eligibility.join(', ') : '',
        created_at: editing.created_at ? editing.created_at.slice(0, 10) : '',
        is_trending: checkIsTrending(editing),
      });
    } else {
      setForm({
        title: '',
        company: '',
        type: activeTab === 'All' ? 'Job' : activeTab.slice(0, -1),
        location: 'Remote',
        deadline: '',
        description: '',
        apply_url: '',
        duration: '',
        eligibility: '',
        category: '',
        created_at: new Date().toISOString().slice(0, 10),
        is_trending: false,
      });
    }
  }, [open, editing, activeTab]);

  const f = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.title || !form.company || !form.apply_url || !form.description) {
      toast({ title: 'Validation Error', description: 'Please fill out required fields (*)', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      let categoryStr = form.category || '';
      if (form.is_trending && !categoryStr.toLowerCase().includes('trending')) {
        categoryStr = categoryStr ? `${categoryStr}, Trending` : 'Trending';
      } else if (!form.is_trending && categoryStr.toLowerCase().includes('trending')) {
        categoryStr = categoryStr.replace(/trending/gi, '').replace(/^,\s*|,\s*$/g, '').trim();
      }

      const payload: any = {
        title: form.title,
        company: form.company,
        type: form.type,
        location: form.location,
        description: form.description,
        apply_url: form.apply_url,
        duration: form.duration || null,
        category: categoryStr,
        created_by: user?.id || 'admin',
        user_name: user?.user_metadata?.full_name || 'Admin',
        deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        created_at: form.created_at ? new Date(form.created_at).toISOString() : new Date().toISOString(),
        eligibility: form.eligibility ? form.eligibility.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      };

      // Add is_trending
      if (typeof form.is_trending === 'boolean') {
        payload.is_trending = form.is_trending;
      }

      let savedItem: any = null;

      if (editing) {
        let { data, error } = await (supabase as any).from('opportunities').update(payload).eq('id', editing.id).select().maybeSingle();
        if (error && error.message?.includes('is_trending')) {
          delete payload.is_trending;
          const retry = await (supabase as any).from('opportunities').update(payload).eq('id', editing.id).select().maybeSingle();
          error = retry.error;
          data = retry.data;
        }
        if (error) throw error;
        savedItem = data || { ...editing, ...payload };
        toast({ title: 'Saved Successfully', description: 'Opportunity updated.' });
      } else {
        let { data, error } = await (supabase as any).from('opportunities').insert(payload).select().maybeSingle();
        if (error && error.message?.includes('is_trending')) {
          delete payload.is_trending;
          const retry = await (supabase as any).from('opportunities').insert(payload).select().maybeSingle();
          error = retry.error;
          data = retry.data;
        }
        if (error) throw error;
        savedItem = data;
        toast({ title: 'Posted Successfully', description: 'New opportunity added.' });
      }

      // Sync local trending ids if needed
      if (savedItem && savedItem.id) {
        try {
          let trendingIds: string[] = JSON.parse(localStorage.getItem('trending_opportunity_ids') || '[]');
          if (form.is_trending) {
            trendingIds = Array.from(new Set([...trendingIds, savedItem.id]));
          } else {
            trendingIds = trendingIds.filter(id => id !== savedItem.id);
          }
          localStorage.setItem('trending_opportunity_ids', JSON.stringify(trendingIds));
        } catch (_) {}
      }

      removeCachedData('opportunities');
      onSaved();
      onClose();
    } catch (err: any) {
      toast({ title: 'Error saving', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;
  const inputCls = "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm px-3.5 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all";

  return (
    <AnimatePresence>
      <motion.div
        key="opp-modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="opp-modal-box"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-gray-800"
          onClick={e => e.stopPropagation()}
        >
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-700 flex items-center justify-between text-white">
            <div>
              <h2 className="text-base font-black">
                {editing ? 'Edit Opportunity' : 'Post New Opportunity'}
              </h2>
              <p className="text-[11px] text-white/75">
                Add verified career opening, hackathon or contest
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
            {/* Owner Trending Toggle Feature */}
            {isOwner && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                    <Flame className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <label htmlFor="is_trending_box" className="text-xs font-black text-gray-900 dark:text-white block cursor-pointer">
                      🔥 Feature in Trending Showcase
                    </label>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                      Auto-slides at the top of the Opportunities page
                    </p>
                  </div>
                </div>
                <input
                  id="is_trending_box"
                  type="checkbox"
                  checked={form.is_trending || false}
                  onChange={e => f('is_trending', e.target.checked)}
                  className="w-5 h-5 rounded-md text-amber-500 focus:ring-amber-400 cursor-pointer accent-amber-500"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Opportunity Title *
                </label>
                <input className={inputCls} value={form.title} onChange={e => f('title', e.target.value)} placeholder="e.g. Software Engineer Intern 2026" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Company / Organization *
                </label>
                <input className={inputCls} value={form.company} onChange={e => f('company', e.target.value)} placeholder="e.g. Google India, Flipkart" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Type *
                </label>
                <select className={inputCls} value={form.type} onChange={e => f('type', e.target.value)}>
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Location *
                </label>
                <input className={inputCls} value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Remote, Bangalore, Kanpur" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Deadline
                </label>
                <input type="date" className={inputCls} value={form.deadline} onChange={e => f('deadline', e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Duration / Stipend
                </label>
                <input className={inputCls} value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="e.g. 6 Months, ₹40k/month" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Category / Tags
                </label>
                <input className={inputCls} value={form.category} onChange={e => f('category', e.target.value)} placeholder="e.g. SDE, AI/ML, Frontend" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Apply URL *
                </label>
                <input className={inputCls} value={form.apply_url} onChange={e => f('apply_url', e.target.value)} placeholder="https://careers.google.com/..." />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Eligibility Criteria
                </label>
                <input className={inputCls} value={form.eligibility} onChange={e => f('eligibility', e.target.value)} placeholder="B.Tech 2026/2027 batch, CSE/IT, Python/Java" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea rows={3} className={inputCls} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Role description, key perks and how to prepare..." />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2 bg-gray-50/50 dark:bg-gray-800/30">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-700 hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60 shadow-md"
            >
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

  const btnClass = "min-w-[36px] h-9 px-2 rounded-xl text-xs font-black bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300 disabled:opacity-25 transition-all shadow-sm flex items-center justify-center font-mono";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={btnClass} title="First page">
        «
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={btnClass} title="Previous page">
        ‹
      </button>
      {getPages().map((p, i) => (
        p === '...'
          ? <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-gray-500 font-extrabold">...</span>
          : <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`min-w-[36px] h-9 px-2.5 rounded-xl text-xs font-black transition-all shadow-sm flex items-center justify-center ${
                currentPage === p
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500 border border-indigo-500'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300'
              }`}
            >
              {p}
            </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={btnClass} title="Next page">
        ›
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={btnClass} title="Last page">
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

  // Tab & Filters State
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [search, setSearch] = useState('');
  const [filterLoc, setFilterLoc] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Opportunities data
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    return getCachedData<Opportunity[]>('opportunities', DEFAULT_CACHE_TTL_MS) || [];
  });
  const [loading, setLoading] = useState(() => {
    return !getCachedData<Opportunity[]>('opportunities', DEFAULT_CACHE_TTL_MS);
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);

  // Pagination state for active listings
  const [listingsPage, setListingsPage] = useState(1);
  const LISTINGS_PER_PAGE = 9;

  // Premium state
  const [premiumModal, setPremiumModal] = useState<{ open: boolean; plan: PremiumPlan }>({ open: false, plan: 'companies' });
  const [hasCompaniesAccess, setHasCompaniesAccess] = useState(false);
  const [hasHRAccess, setHasHRAccess] = useState(false);

  // Fetch opportunities
  const fetchOpportunities = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = getCachedData<Opportunity[]>('opportunities', DEFAULT_CACHE_TTL_MS);
      if (cached) {
        setOpportunities(cached);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (!error && data) {
        setOpportunities(data as Opportunity[]);
        setCachedData('opportunities', data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
    const p = new URLSearchParams(window.location.search).get('tab') as TabType;
    if (p && ['All', 'Jobs', 'Internships', 'Hackathons', 'Competitions'].includes(p)) {
      setActiveTab(p);
    }
  }, []);

  // Check purchases on mount (cached per session)
  const checkPurchases = useCallback(async (force = false) => {
    if (!user) return;
    if (isOwner) {
      setHasCompaniesAccess(true);
      setHasHRAccess(true);
      return;
    }
    if (!force) {
      const cachedPurchases = getCachedData<string[]>(`purchases_${user.id}`, 15 * 60 * 1000);
      if (cachedPurchases) {
        setHasCompaniesAccess(cachedPurchases.includes('companies'));
        setHasHRAccess(cachedPurchases.includes('hr_emails'));
        return;
      }
    }

    try {
      const { data } = await (supabase as any)
        .from('premium_purchases')
        .select('plan')
        .eq('user_id', user.id)
        .in('payment_status', ['completed', 'free']);

      if (data) {
        const plans = data.map((p: any) => p.plan);
        setCachedData(`purchases_${user.id}`, plans);
        setHasCompaniesAccess(plans.includes('companies'));
        setHasHRAccess(plans.includes('hr_emails'));
      }
    } catch (_) {}
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
            checkPurchases(true);
          }
        } catch (e) {
          console.error(e);
        }
      };
      recordRedirectPurchase();
    }
  }, [user, checkPurchases]);

  // Deep-link highlighting
  const highlightId = new URLSearchParams(window.location.search).get('highlight');
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightId && opportunities.length > 0) {
      const opp = opportunities.find(o => o.id === highlightId);
      if (opp) {
        const typeLower = (opp.type || '').toLowerCase();
        const matchedTab = (Object.keys(tabTypeMap) as TabType[]).find(tabId => 
          tabId !== 'All' && tabTypeMap[tabId].some(kw => typeLower.includes(kw))
        );
        if (matchedTab) {
          setActiveTab(matchedTab);
        }
      }
    }
  }, [highlightId, opportunities]);

  // Trending toggle handler for owner
  const handleToggleTrending = async (item: Opportunity, forcedState?: boolean) => {
    if (!isOwner) return;
    const currentState = checkIsTrending(item);
    const nextState = forcedState !== undefined ? forcedState : !currentState;

    // Snappy optimistic update in state
    setOpportunities(prev => prev.map(o => {
      if (o.id === item.id) {
        let cat = o.category || '';
        if (nextState && !cat.toLowerCase().includes('trending')) {
          cat = cat ? `${cat}, Trending` : 'Trending';
        } else if (!nextState && cat.toLowerCase().includes('trending')) {
          cat = cat.replace(/trending/gi, '').replace(/^,\s*|,\s*$/g, '').trim();
        }
        return { ...o, is_trending: nextState, category: cat };
      }
      return o;
    }));

    // Local storage sync
    try {
      let trendingIds: string[] = JSON.parse(localStorage.getItem('trending_opportunity_ids') || '[]');
      if (nextState) {
        trendingIds = Array.from(new Set([...trendingIds, item.id]));
      } else {
        trendingIds = trendingIds.filter(id => id !== item.id);
      }
      localStorage.setItem('trending_opportunity_ids', JSON.stringify(trendingIds));
    } catch (_) {}

    removeCachedData('opportunities');

    // Supabase update
    try {
      let cat = item.category || '';
      if (nextState && !cat.toLowerCase().includes('trending')) {
        cat = cat ? `${cat}, Trending` : 'Trending';
      } else if (!nextState && cat.toLowerCase().includes('trending')) {
        cat = cat.replace(/trending/gi, '').replace(/^,\s*|,\s*$/g, '').trim();
      }

      let { error } = await (supabase as any)
        .from('opportunities')
        .update({ is_trending: nextState, category: cat })
        .eq('id', item.id);

      if (error && error.message?.includes('is_trending')) {
        const { error: catErr } = await (supabase as any)
          .from('opportunities')
          .update({ category: cat })
          .eq('id', item.id);
        error = catErr;
      }

      if (error) {
        console.warn('Database trending update notice:', error);
      } else {
        toast({
          title: nextState ? '🔥 Added to Trending!' : 'Removed from Trending',
          description: nextState 
            ? `"${item.title}" will now auto-slide in the top trending showcase.`
            : `"${item.title}" removed from top trending section.`
        });
      }
    } catch (e: any) {
      console.warn('Trending toggle error:', e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    const { error } = await (supabase as any).from('opportunities').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Deleted', description: 'Opportunity removed.' });
    fetchOpportunities(true);
  };

  // Compile Trending Items
  const trendingList = useMemo(() => {
    return opportunities.filter(o => checkIsTrending(o));
  }, [opportunities]);

  // Tab counts
  const getCountForTab = (tabId: TabType) => {
    if (tabId === 'All') return opportunities.length;
    return opportunities.filter(o => {
      const t = (o.type || '').toLowerCase();
      return tabTypeMap[tabId].some(kw => t.includes(kw));
    }).length;
  };

  // Filtered listings
  const filtered = useMemo(() => {
    return opportunities.filter(o => {
      // Tab filter
      if (activeTab !== 'All') {
        const t = (o.type || '').toLowerCase();
        const tabMatch = tabTypeMap[activeTab].some(kw => t.includes(kw));
        if (!tabMatch) return false;
      }

      // Search match
      if (search.trim()) {
        const searchL = search.toLowerCase();
        const searchMatch = 
          o.title?.toLowerCase().includes(searchL) || 
          o.company?.toLowerCase().includes(searchL) || 
          o.description?.toLowerCase().includes(searchL) ||
          o.category?.toLowerCase().includes(searchL) ||
          (Array.isArray(o.eligibility) && o.eligibility.some(e => e.toLowerCase().includes(searchL)));
        if (!searchMatch) return false;
      }

      // Location match
      if (filterLoc !== 'all') {
        const locMatch = o.location?.toLowerCase().includes(filterLoc.toLowerCase());
        if (!locMatch) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        const isExpired = o.deadline ? new Date(o.deadline) < new Date() : false;
        const isFuture = o.created_at ? new Date(o.created_at) > new Date() : false;
        const daysLeft = o.deadline ? Math.ceil((new Date(o.deadline).getTime() - Date.now()) / 86400000) : null;

        if (statusFilter === 'active' && (isExpired || isFuture)) return false;
        if (statusFilter === 'closing_soon' && (isExpired || daysLeft === null || daysLeft > 7 || daysLeft < 0)) return false;
        if (statusFilter === 'upcoming' && !isFuture) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        const timeA = a.deadline ? new Date(a.deadline).getTime() : 9999999999999;
        const timeB = b.deadline ? new Date(b.deadline).getTime() : 9999999999999;
        return timeA - timeB;
      }
      // default newest
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    });
  }, [opportunities, activeTab, search, filterLoc, statusFilter, sortBy]);

  // Reset pagination on filter change
  useEffect(() => {
    setListingsPage(1);
  }, [activeTab, search, filterLoc, statusFilter, sortBy]);

  // Scroll to highlight item if present
  useEffect(() => {
    if (highlightId && filtered.length > 0) {
      const idx = filtered.findIndex(o => o.id === highlightId);
      if (idx !== -1) {
        const page = Math.floor(idx / LISTINGS_PER_PAGE) + 1;
        setListingsPage(page);
      }
    }
  }, [highlightId, filtered]);

  useEffect(() => {
    if (highlightId && highlightRef.current && !loading) {
      const timer = setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [highlightId, loading, listingsPage]);

  // Pagination slices
  const totalListingsPages = Math.ceil(filtered.length / LISTINGS_PER_PAGE);
  const pagedListings = filtered.slice((listingsPage - 1) * LISTINGS_PER_PAGE, listingsPage * LISTINGS_PER_PAGE);

  const locationsList = ['all', 'Remote', 'Bangalore', 'Delhi', 'Kanpur', 'Mumbai', 'Hyderabad', 'Pune', 'Hybrid', 'Online'];

  const hasActiveFilters = search || filterLoc !== 'all' || statusFilter !== 'all' || activeTab !== 'All';

  const resetAllFilters = () => {
    setSearch('');
    setFilterLoc('all');
    setStatusFilter('all');
    setActiveTab('All');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar />

      {/* ══════════ HERO SECTION (Compact, Professional Header) ══════════ */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-8 border-b border-slate-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Career &amp; Coding Opportunities</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Find Your Next Big <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-amber-300 bg-clip-text text-transparent">Opportunity</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-medium">
                Direct apply links for internships, fresher jobs, coding hackathons, and national competitions.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              {isOwner && (
                <button
                  onClick={() => { setEditing(null); setModalOpen(true); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Opportunity</span>
                </button>
              )}
              <button
                onClick={() => navigate('/premium-directory')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold text-xs transition-colors"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>HR &amp; Company Directory</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MAIN CONTENT AREA (Sidebar Filter + Listings) ══════════ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* TOP TRENDING AUTO-SLIDER SHOWCASE */}
        <TrendingCarousel
          trendingItems={trendingList}
          isOwner={!!isOwner}
          onToggleTrending={handleToggleTrending}
          onSelectOpportunity={(opp) => {
            const el = document.getElementById(`opp-card-${opp.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        />

        {/* 2-Column Responsive Layout: Sidebar Filters + Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ──── LEFT SIDEBAR FILTERS (Sticky on Desktop) ──── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6">
              
              {/* Filter Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-black text-sm text-slate-800 dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                  <span>Filter Opportunities</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Role, company, tech..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-900 dark:text-slate-100"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Opportunity Type / Tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Category Type
                </label>
                <div className="space-y-1">
                  {TABS.map(tab => {
                    const count = getCountForTab(tab.id);
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {tab.icon}
                          <span>{tab.label}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          isSelected ? 'bg-white/20 dark:bg-slate-900/20' : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Application Status
                </label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Opportunities' },
                    { id: 'active', label: 'Active & Open' },
                    { id: 'closing_soon', label: 'Closing Soon (≤ 7d)' },
                    { id: 'upcoming', label: 'Upcoming Opportunities' },
                  ].map(st => (
                    <button
                      key={st.id}
                      onClick={() => setStatusFilter(st.id as StatusFilter)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        statusFilter === st.id
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800/60'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{st.label}</span>
                      {statusFilter === st.id && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Location
                </label>
                <select
                  value={filterLoc}
                  onChange={e => setFilterLoc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {locationsList.map(l => (
                    <option key={l} value={l}>
                      {l === 'all' ? '📍 All Locations' : l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Promotional Card */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="rounded-2xl p-3.5 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Need direct contacts?</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    Access 1800+ direct verified HR emails &amp; 90+ career portals.
                  </p>
                  <button
                    onClick={() => navigate('/premium-directory')}
                    className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors"
                  >
                    View Directory →
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* ──── RIGHT MAIN CONTENT (Header + Active Chips + Grid) ──── */}
          <div className="lg:col-span-9 space-y-5">
            
            {/* Mobile Filter Toggle & Quick Tabs Bar */}
            <div className="lg:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </button>

                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search opportunities..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Horizontal Scrollable Tabs on Mobile */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Control Bar: Result count + Sort dropdown */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {filtered.length} Opportunities Available
                </span>
                {activeTab !== 'All' && (
                  <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Category: {activeTab}
                  </span>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="newest">Latest Posted</option>
                  <option value="deadline">Closing Soonest</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips (if any active) */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-slate-500 font-medium mr-1">Active filters:</span>
                {activeTab !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Type: {activeTab}
                    <button onClick={() => setActiveTab('All')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    Search: "{search}"
                    <button onClick={() => setSearch('')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filterLoc !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    Location: {filterLoc}
                    <button onClick={() => setFilterLoc('all')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    Status: {statusFilter.replace('_', ' ')}
                    <button onClick={() => setStatusFilter('all')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Opportunities Cards Grid */}
            {loading ? (
              <div className="flex justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                  <p className="text-slate-400 text-xs font-medium">Fetching verified opportunities...</p>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-1">
                  No matching opportunities found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
                  Try adjusting your search query, location filter, or reset your filters to see more results.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {pagedListings.map(item => (
                      <div
                        id={`opp-card-${item.id}`}
                        key={item.id}
                        ref={highlightId === item.id ? highlightRef : undefined}
                        className={highlightId === item.id ? "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2 rounded-3xl animate-pulse shadow-lg" : ""}
                      >
                        <OpportunityCard
                          item={item}
                          isOwner={!!isOwner}
                          activeTab={activeTab}
                          onEdit={o => { setEditing(o); setModalOpen(true); }}
                          onDelete={handleDelete}
                          onToggleTrending={handleToggleTrending}
                        />
                      </div>
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
      </main>

      {/* ──── MOBILE FILTER DRAWER MODAL ──── */}
      {mobileFilterOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
            onClick={() => setMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 max-w-[85vw] h-full bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-sm">Filters</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-xs font-bold">Location</label>
                  <select
                    value={filterLoc}
                    onChange={e => setFilterLoc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  >
                    {locationsList.map(l => (
                      <option key={l} value={l}>{l === 'all' ? '📍 All Locations' : l}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-xs font-bold">Status</label>
                  <div className="space-y-1">
                    {[
                      { id: 'all', label: 'All Opportunities' },
                      { id: 'active', label: 'Active & Open' },
                      { id: 'closing_soon', label: 'Closing Soon (≤ 7d)' },
                      { id: 'upcoming', label: 'Upcoming' },
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setStatusFilter(st.id as StatusFilter)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                          statusFilter === st.id ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'text-slate-600'
                        }`}
                      >
                        <span>{st.label}</span>
                        {statusFilter === st.id && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <button
                  onClick={() => { resetAllFilters(); setMobileFilterOpen(false); }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* ══════════ MODALS ══════════ */}
      <OpportunityModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        editing={editing}
        activeTab={activeTab}
        onSaved={fetchOpportunities}
      />

      <PremiumModal
        open={premiumModal.open}
        onClose={() => setPremiumModal(p => ({ ...p, open: false }))}
        plan={premiumModal.plan}
        onSuccess={() => { checkPurchases(); }}
      />
    </div>
  );
};

export default Opportunities;
