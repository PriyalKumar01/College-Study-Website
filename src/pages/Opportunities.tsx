import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Search, ExternalLink, Calendar, MapPin, Building, Clock,
  Briefcase, Code2, Trophy, Rocket, Plus, Pencil, Trash2,
  X, Share2, Loader2,
  ArrowRight, Tag, CheckCircle2,
  Crown, ChevronDown, ChevronUp,
  Flame, ChevronLeft, ChevronRight, SlidersHorizontal, Check
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

// ─── Tabs Configuration (Solid, Professional, Minimal) ────────────────────────
// Minimal solid tabs
const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'All', label: 'All Opportunities', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'Jobs', label: 'Jobs & Full-Time', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'Internships', label: 'Internships', icon: <Rocket className="w-3.5 h-3.5" /> },
  { id: 'Hackathons', label: 'Hackathons', icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: 'Competitions', label: 'Competitions', icon: <Trophy className="w-3.5 h-3.5" /> },
];

const tabTypeMap: Record<TabType, string[]> = {
  All: ['job', 'intern', 'hack', 'comp', 'full-time', 'part-time', 'competition'],
  Jobs: ['job', 'full-time', 'part-time', 'remote', 'hybrid', 'onsite', 'permanent'],
  Internships: ['intern', 'internship', 'technical', 'non-technical'],
  Hackathons: ['hack', 'hackathon', 'web development', 'ai/ml', 'blockchain', 'mobile'],
  Competitions: ['comp', 'competition', 'coding', 'design', 'innovation', 'business'],
};

// ─── Featured Showcase (Executive, Solid Dark Theme, Sharp Corners) ─────────
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
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

  if (total === 0) {
    if (!isOwner) return null;
    return (
      <div className="mb-6 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-zinc-800 dark:text-zinc-200 font-semibold text-xs mb-1">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Featured Opportunities Showcase (Admin / Owner Mode)</span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          No opportunities are currently featured. Double-click or click the <Flame className="w-3 h-3 inline text-amber-500" /> icon on any card below to feature it here.
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
      className="relative mb-6 rounded-lg bg-zinc-950 border border-zinc-800 text-white shadow-sm overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-zinc-850 bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950">
            <Flame className="w-3 h-3 fill-zinc-950" />
            Featured
          </span>
          <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
            Priority listing with open applications
          </span>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          {isOwner && (
            <span className="hidden md:inline-block text-[10px] text-amber-400 font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              Double-click to unfeature
            </span>
          )}
          <button
            onClick={handlePrev}
            className="w-6 h-6 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors"
            title="Previous"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-zinc-400">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={handleNext}
            className="w-6 h-6 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors"
            title="Next"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 cursor-pointer"
          onDoubleClick={() => {
            if (isOwner) onToggleTrending(current, false);
          }}
        >
          {isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleTrending(current, false);
              }}
              className="absolute top-3.5 right-20 px-2 py-0.5 rounded bg-red-950/60 hover:bg-red-900/80 text-red-300 text-[11px] font-semibold border border-red-800/60 transition-colors flex items-center gap-1"
              title="Remove from featured"
            >
              <X className="w-3 h-3" /> Remove
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Left: Info */}
            <div className="md:col-span-8 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide bg-zinc-800 text-zinc-200 border border-zinc-700">
                  {current.type || 'Opportunity'}
                </span>
                <span className="text-zinc-400 text-xs flex items-center gap-1 font-medium">
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  <strong className="text-zinc-100">{current.company}</strong>
                </span>
                {current.location && (
                  <span className="text-zinc-400 text-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {current.location}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                {current.title}
              </h3>

              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                {current.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {current.duration && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                    <Calendar className="w-3 h-3 text-zinc-400" /> {current.duration}
                  </span>
                )}
                {current.deadline && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                    isExpired 
                      ? 'bg-red-950/60 text-red-400 border border-red-900/50'
                      : daysLeft !== null && daysLeft <= 5
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {isExpired ? 'Application Closed' : daysLeft ? `${daysLeft} days left to apply` : 'Open'}
                  </span>
                )}
                {Array.isArray(current.eligibility) && current.eligibility.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {current.eligibility[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5 justify-center">
              <a
                href={current.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-md bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs transition-colors shadow-xs"
              >
                <span>Apply Direct</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const shareUrl = `${window.location.origin}/opportunity/${current.id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast({ title: 'Link Copied', description: 'Opportunity link copied to clipboard.' });
                  }}
                  className="flex-1 py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-850 text-zinc-300 text-xs font-medium border border-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3 h-3" /> Share
                </button>
                <button
                  onClick={() => onSelectOpportunity(current)}
                  className="flex-1 py-2 px-3 rounded-md bg-zinc-900 hover:bg-zinc-850 text-zinc-300 text-xs font-medium border border-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Opportunity Card (Minimalist, Solid Color Theme, Clean Monogram) ────────
interface OpportunityCardProps {
  item: Opportunity;
  isOwner: boolean;
  activeTab: TabType;
  onEdit: (item: Opportunity) => void;
  onDelete: (id: string) => void;
  onToggleTrending: (item: Opportunity, forcedState?: boolean) => void;
}

function OpportunityCard({ item, isOwner, onEdit, onDelete, onToggleTrending }: OpportunityCardProps) {
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
    const text = `Check out this opportunity on CollegeStudy:\n\n*${item.title}* at *${item.company}*\n\nApply here: ${shareUrl}`;
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

  const companyInitials = (item.company || 'CO').slice(0, 2).toUpperCase();

  return (
    <div
      onDoubleClick={() => {
        if (isOwner) onToggleTrending(item);
      }}
      className={`group relative bg-white dark:bg-zinc-900 rounded-lg border transition-colors duration-150 p-4 sm:p-5 flex flex-col justify-between shadow-xs ${
        isTrending 
          ? 'border-amber-400/80 dark:border-amber-500/50' 
          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      } ${!isActive ? 'opacity-65' : ''}`}
    >
      <div>
        {/* Top Header: Monogram Avatar + Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Square minimal company monogram */}
            <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-800 dark:text-zinc-200 shrink-0">
              {companyInitials}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block truncate">
                {item.company}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block truncate">
                {item.location || 'Remote'}
              </span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isTrending && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/60">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
              isExpired 
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700' 
                : isFuture 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                  : daysLeft !== null && daysLeft <= 5
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 font-semibold'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 font-semibold'
            }`}>
              <Clock className="w-2.5 h-2.5" />
              {isExpired ? 'Closed' : isFuture ? 'Upcoming' : daysLeft ? `${daysLeft}d left` : 'Active'}
            </span>
          </div>
        </div>

        {/* Opportunity Title */}
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
          {item.title}
        </h3>

        {/* Meta Chips */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-750">
            <Briefcase className="w-2.5 h-2.5 text-zinc-500" /> {item.type}
          </span>
          {item.duration && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-750">
              <Calendar className="w-2.5 h-2.5 text-zinc-500" /> {item.duration}
            </span>
          )}
          {item.category && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-750">
              <Tag className="w-2.5 h-2.5 text-zinc-500" /> {item.category}
            </span>
          )}
        </div>

        {/* Description */}
        <p className={`text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap ${
          isExpanded ? 'mb-2.5' : 'line-clamp-2 mb-1'
        }`}>
          {item.description}
        </p>

        {item.description && item.description.length > 90 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-2 flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer p-0"
          >
            {isExpanded ? (
              <><ChevronUp className="w-3 h-3" /> Less</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> More</>
            )}
          </button>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-zinc-150 dark:border-zinc-800/80 flex items-center gap-2 mt-auto">
        <a
          href={item.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs ${
            !isActive ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {isFuture ? 'Upcoming' : isExpired ? 'Closed' : <>Apply Direct <ExternalLink className="w-3 h-3" /></>}
        </a>

        <button
          onClick={handleShare}
          className="p-2 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-600 dark:text-zinc-300 transition-colors border border-zinc-200 dark:border-zinc-700"
          title="Share"
        >
          <Share2 className="w-3 h-3" />
        </button>

        {/* Owner Controls */}
        {isOwner && (
          <div className="flex items-center gap-0.5 pl-1 border-l border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => onToggleTrending(item)}
              className={`p-1.5 rounded-md transition-colors ${
                isTrending 
                  ? 'bg-amber-500/20 text-amber-500' 
                  : 'text-zinc-400 hover:text-amber-500'
              }`}
              title={isTrending ? 'Remove from featured' : 'Feature in showcase'}
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 rounded-md text-zinc-400 hover:text-blue-500 transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Opportunities Modal (Owner post/edit) ──────────────────────────────────
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
  const inputCls = "w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-colors";

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
            <div>
              <h2 className="text-sm font-bold">
                {editing ? 'Edit Opportunity' : 'Post New Opportunity'}
              </h2>
              <p className="text-[11px] text-zinc-400">
                Add verified role, hackathon, or competition
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
            {/* Owner Trending Toggle Feature */}
            {isOwner && (
              <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <div>
                    <label htmlFor="is_trending_box" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block cursor-pointer">
                      Feature in Priority Showcase
                    </label>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      Auto-slides at the top of the Opportunities section
                    </p>
                  </div>
                </div>
                <input
                  id="is_trending_box"
                  type="checkbox"
                  checked={form.is_trending || false}
                  onChange={e => f('is_trending', e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900 cursor-pointer accent-zinc-900 dark:accent-zinc-100"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Opportunity Title *
                </label>
                <input className={inputCls} value={form.title} onChange={e => f('title', e.target.value)} placeholder="e.g. Software Engineer Intern 2026" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Company / Organization *
                </label>
                <input className={inputCls} value={form.company} onChange={e => f('company', e.target.value)} placeholder="e.g. Google India, Flipkart" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
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
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Location *
                </label>
                <input className={inputCls} value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Remote, Bangalore, Kanpur" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Deadline
                </label>
                <input type="date" className={inputCls} value={form.deadline} onChange={e => f('deadline', e.target.value)} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Duration / Stipend
                </label>
                <input className={inputCls} value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="e.g. 6 Months, ₹40k/month" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category / Tags
                </label>
                <input className={inputCls} value={form.category} onChange={e => f('category', e.target.value)} placeholder="e.g. SDE, AI/ML, Frontend" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Apply URL *
                </label>
                <input className={inputCls} value={form.apply_url} onChange={e => f('apply_url', e.target.value)} placeholder="https://careers.google.com/..." />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Eligibility Criteria
                </label>
                <input className={inputCls} value={form.eligibility} onChange={e => f('eligibility', e.target.value)} placeholder="B.Tech 2026/2027 batch, CSE/IT, Python/Java" />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description *
                </label>
                <textarea rows={3} className={inputCls} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Role description, key perks and how to prepare..." />
              </div>
            </div>
          </div>

          <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2 bg-zinc-50 dark:bg-zinc-850">
            <button onClick={onClose} className="px-3.5 py-1.5 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5 disabled:opacity-60 shadow-xs"
            >
              {saving && <Loader2 className="w-3 h-3 animate-spin" />}
              {editing ? 'Save Changes' : 'Post Opportunity'}
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

// ─── Minimal Pagination Component ───────────────────────────────────────────
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

  const btnClass = "min-w-[32px] h-8 px-2 rounded-md text-xs font-medium bg-white hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 transition-colors shadow-xs flex items-center justify-center font-mono";

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={btnClass} title="First page">
        «
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={btnClass} title="Previous page">
        ‹
      </button>
      {getPages().map((p, i) => (
        p === '...'
          ? <span key={`ellipsis-${i}`} className="px-2 py-1 text-xs text-zinc-400 font-bold">...</span>
          : <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`min-w-[32px] h-8 px-2 rounded-md text-xs font-semibold transition-colors shadow-xs flex items-center justify-center ${
                currentPage === p
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-900 dark:border-zinc-100'
                  : 'bg-white hover:bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
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
    if (isOwner) return;

    if (!force) {
      const cachedPurchases = getCachedData<string[]>(`purchases_${user.id}`, 15 * 60 * 1000);
      if (cachedPurchases) return;
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
      }
    } catch (_) {}
  }, [user, isOwner]);

  useEffect(() => {
    checkPurchases();

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
            toast({ title: 'Access Unlocked', description: `Your access to ${unlockPlan === 'companies' ? 'Company Career Pages' : 'HR Emails'} has been unlocked.` });
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
          title: nextState ? 'Featured in Showcase' : 'Removed from Featured',
          description: nextState 
            ? `"${item.title}" will now show in the top showcase.`
            : `"${item.title}" removed from top showcase.`
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

  const trendingList = useMemo(() => {
    return opportunities.filter(o => checkIsTrending(o));
  }, [opportunities]);

  const getCountForTab = (tabId: TabType) => {
    if (tabId === 'All') return opportunities.length;
    return opportunities.filter(o => {
      const t = (o.type || '').toLowerCase();
      return tabTypeMap[tabId].some(kw => t.includes(kw));
    }).length;
  };

  const filtered = useMemo(() => {
    return opportunities.filter(o => {
      if (activeTab !== 'All') {
        const t = (o.type || '').toLowerCase();
        const tabMatch = tabTypeMap[activeTab].some(kw => t.includes(kw));
        if (!tabMatch) return false;
      }

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

      if (filterLoc !== 'all') {
        const locMatch = o.location?.toLowerCase().includes(filterLoc.toLowerCase());
        if (!locMatch) return false;
      }

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
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return timeB - timeA;
    });
  }, [opportunities, activeTab, search, filterLoc, statusFilter, sortBy]);

  useEffect(() => {
    setListingsPage(1);
  }, [activeTab, search, filterLoc, statusFilter, sortBy]);

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
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [highlightId, loading, listingsPage]);

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
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <Navbar />

      {/* ══════════ HERO SECTION (Solid Professional Slate/Zinc) ══════════ */}
      <section className="bg-zinc-950 text-white pt-8 pb-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300">
                <Briefcase className="w-3 h-3 text-zinc-400" />
                <span>Verified Career &amp; Contest Board</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Career Opportunities
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Direct apply links for internships, fresher roles, technical hackathons, and university coding competitions.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5">
              {isOwner && (
                <button
                  onClick={() => { setEditing(null); setModalOpen(true); }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Opportunity</span>
                </button>
              )}
              <button
                onClick={() => navigate('/premium-directory')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 font-semibold text-xs transition-colors"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>HR &amp; Career Directory</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MAIN CONTENT AREA (Sidebar Filter + Listings) ══════════ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* TOP FEATURED SHOWCASE */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ──── LEFT SIDEBAR FILTERS (Sticky on Desktop) ──── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 shadow-xs space-y-5">
              
              {/* Filter Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Filter Roles</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search Box */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Search Keywords
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Role, company, tech..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/60 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 text-zinc-900 dark:text-zinc-100"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Opportunity Type / Tabs */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Category
                </label>
                <div className="space-y-0.5">
                  {TABS.map(tab => {
                    const count = getCountForTab(tab.id);
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {tab.icon}
                          <span>{tab.label}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                          isSelected ? 'bg-white/20 dark:bg-zinc-900/20' : 'bg-zinc-100 dark:bg-zinc-800'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Status
                </label>
                <div className="space-y-0.5">
                  {[
                    { id: 'all', label: 'All Listings' },
                    { id: 'active', label: 'Active & Open' },
                    { id: 'closing_soon', label: 'Closing Soon (≤ 7d)' },
                    { id: 'upcoming', label: 'Upcoming' },
                  ].map(st => (
                    <button
                      key={st.id}
                      onClick={() => setStatusFilter(st.id as StatusFilter)}
                      className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
                        statusFilter === st.id
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <span>{st.label}</span>
                      {statusFilter === st.id && <Check className="w-3 h-3 text-zinc-900 dark:text-zinc-100" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Location
                </label>
                <select
                  value={filterLoc}
                  onChange={e => setFilterLoc(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/60 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                >
                  {locationsList.map(l => (
                    <option key={l} value={l}>
                      {l === 'all' ? 'All Locations' : l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Directory Callout */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="rounded-md p-3 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-750 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Direct HR Contacts</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                    Access 1800+ verified corporate HR emails and 90+ career portals.
                  </p>
                  <button
                    onClick={() => navigate('/premium-directory')}
                    className="w-full mt-1 py-1 rounded bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-white font-semibold text-[11px] transition-colors"
                  >
                    Open Directory →
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* ──── RIGHT MAIN CONTENT (Header + Active Chips + Grid) ──── */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Mobile Filter Toggle & Quick Tabs Bar */}
            <div className="lg:hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                >
                  <SlidersHorizontal className="w-3 h-3 text-zinc-500" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  )}
                </button>

                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search opportunities..."
                    className="w-full pl-7 pr-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Horizontal Scrollable Tabs on Mobile */}
              <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Control Bar: Result count + Sort dropdown */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {filtered.length} Opportunities Available
                </span>
                {activeTab !== 'All' && (
                  <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    Category: {activeTab}
                  </span>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-zinc-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none"
                >
                  <option value="newest">Latest Posted</option>
                  <option value="deadline">Closing Soonest</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[11px] text-zinc-500 font-medium mr-0.5">Active filters:</span>
                {activeTab !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    Category: {activeTab}
                    <button onClick={() => setActiveTab('All')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    Search: "{search}"
                    <button onClick={() => setSearch('')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filterLoc !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    Location: {filterLoc}
                    <button onClick={() => setFilterLoc('all')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    Status: {statusFilter.replace('_', ' ')}
                    <button onClick={() => setStatusFilter('all')} className="hover:opacity-75"><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline px-1 py-0.5"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Opportunities Cards Grid */}
            {loading ? (
              <div className="flex justify-center py-20 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                  <p className="text-zinc-400 text-xs">Loading opportunities...</p>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-10 text-center shadow-xs">
                <div className="w-12 h-12 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto mb-3 text-xl">
                  🔍
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  No matching opportunities
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-4">
                  Adjust your search keyword, category, or clear filters to see all available roles.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-white text-xs font-semibold shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {pagedListings.map(item => (
                    <div
                      id={`opp-card-${item.id}`}
                      key={item.id}
                      ref={highlightId === item.id ? highlightRef : undefined}
                      className={highlightId === item.id ? "ring-2 ring-zinc-900 dark:ring-zinc-100 rounded-lg" : ""}
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

      {/* ──── MOBILE FILTER DRAWER ──── */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex justify-end lg:hidden"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="w-80 max-w-[85vw] h-full bg-white dark:bg-zinc-900 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-xs uppercase tracking-wider">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded text-zinc-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Location</label>
                <select
                  value={filterLoc}
                  onChange={e => setFilterLoc(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs"
                >
                  {locationsList.map(l => (
                    <option key={l} value={l}>{l === 'all' ? 'All Locations' : l}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Status</label>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Listings' },
                    { id: 'active', label: 'Active & Open' },
                    { id: 'closing_soon', label: 'Closing Soon (≤ 7d)' },
                    { id: 'upcoming', label: 'Upcoming' },
                  ].map(st => (
                    <button
                      key={st.id}
                      onClick={() => setStatusFilter(st.id as StatusFilter)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium ${
                        statusFilter === st.id ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 font-bold' : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span>{st.label}</span>
                      {statusFilter === st.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
              <button
                onClick={() => { resetAllFilters(); setMobileFilterOpen(false); }}
                className="flex-1 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 text-xs font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
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
