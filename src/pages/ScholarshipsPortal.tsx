import { useState, useMemo, useEffect, useRef } from 'react';
import {
  ExternalLink, Download, Search, X, ChevronDown, Eye, Sparkles, ArrowLeft,
  Bookmark, BookmarkCheck, Clock, TrendingUp, GraduationCap, Loader2, Trash2, Share2, ChevronUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Helper: convert scholarship name → URL slug
const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Build the shareable WhatsApp link
const getWhatsAppShareUrl = (sc: { name: string }) => {
  const slug = toSlug(sc.name);
  const pageUrl = `${window.location.origin}/scholarship/${slug}`;
  const text = `🎓 Check out this scholarship on CollegeStudy!\n\n*${sc.name}*\n\nClick to view full details & apply:\n${pageUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};

// ─── Featured UP Scholarship PDF ─────────────────────────────────────────────
const UP_PDF_URL = 'https://drive.google.com/file/d/17o2G4M_n602fXOWlCwIse0gxVPmfuAn9/view?usp=drivesdk';
const UP_PDF_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=17o2G4M_n602fXOWlCwIse0gxVPmfuAn9';

// ==================== TYPES ====================
interface Scholarship {
  id: string;
  name: string;
  org: string;
  amount: string;
  amount_num: number;
  status: string;
  streams: string[];
  who: string[];
  type: string;
  level: string;
  description: string;
  income: string;
  marks: string;
  deadline: string;
  apply_url: string;
  tags: string[];
}

interface FilterOption { label: string; value: string; }

// ==================== FILTER OPTIONS ====================
const STREAM_OPTS: FilterOption[] = [
  { label: 'Engineering (B.Tech/BE)', value: 'engineering' },
  { label: 'Medical (MBBS/BDS)', value: 'medical' },
  { label: 'Science (B.Sc)', value: 'science' },
  { label: 'Commerce (B.Com/BBA)', value: 'commerce' },
  { label: 'Arts / Humanities (BA)', value: 'arts' },
  { label: 'Law (LLB)', value: 'law' },
  { label: 'Diploma / ITI / Polytechnic', value: 'diploma' },
  { label: 'Management (MBA)', value: 'management' },
];

const WHO_OPTS: FilterOption[] = [
  { label: 'Girls Only', value: 'girls' },
  { label: 'SC Students', value: 'sc' },
  { label: 'ST Students', value: 'st' },
  { label: 'OBC / EBC / DNT', value: 'obc' },
  { label: 'Minority Students', value: 'minority' },
];

const TYPE_OPTS: FilterOption[] = [
  { label: 'Government', value: 'government' },
  { label: 'Private / Corporate', value: 'private' },
  { label: 'Central Government', value: 'central' },
];

const STATUS_OPTS: FilterOption[] = [
  { label: 'Open Now', value: 'open' },
  { label: 'Opening Soon', value: 'upcoming' },
  { label: 'Closed', value: 'closed' },
];

const AMOUNT_OPTS: FilterOption[] = [
  { label: 'Under ₹25,000', value: 'under25k' },
  { label: '₹25,000 – ₹1 Lakh', value: '25k-1l' },
  { label: 'Above ₹1 Lakh', value: 'above1l' },
];

const STATUS_DISPLAY: Record<string, { label: string; color: string; bg: string; dot: boolean }> = {
  open:     { label: 'Open',         color: '#10B981', bg: 'rgba(16,185,129,0.12)', dot: true },
  upcoming: { label: 'Opening Soon', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', dot: false },
  closed:   { label: 'Closed',       color: '#94A3B8', bg: 'rgba(148,163,184,0.10)', dot: false },
};

interface Filters {
  streams: string[];
  who: string[];
  type: string[];
  status: string[];
  amount: string[];
}

// ==================== MAIN COMPONENT ====================
export default function ScholarshipsPortal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const { isOwner } = useAuth();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({ streams: [], who: [], type: [], status: [], amount: [] });
  const [search, setSearch] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [expandedDesc, setExpandedDesc] = useState<Set<string>>(new Set());
  const filterBarRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Load scholarships from Supabase
  const fetchScholarships = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from('scholarships')
      .select('*')
      .eq('approval_status', 'approved')
      .order('amount_num', { ascending: false });

    if (!error && data) {
      setScholarships(data as Scholarship[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Scroll to highlighted scholarship
  useEffect(() => {
    if (highlightId && highlightRef.current && !loading) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [highlightId, loading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Owner: delete a scholarship from DB
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Permanently delete "${name}"?`)) return;
    const { error } = await (supabase as any).from('scholarships').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: `"${name}" has been removed.` });
      setScholarships(prev => prev.filter(s => s.id !== id));
    }
  };

  // Filter logic
  const filtered = useMemo(() => {
    return scholarships.filter(s => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) &&
            !s.org.toLowerCase().includes(q) &&
            !s.description.toLowerCase().includes(q)) return false;
      }
      if (filters.streams.length > 0) {
        const match = s.streams.includes('all') || filters.streams.some(st => s.streams.includes(st));
        if (!match) return false;
      }
      if (filters.who.length > 0) {
        const match = s.who.includes('all') || filters.who.some(w => s.who.includes(w));
        if (!match) return false;
      }
      if (filters.type.length > 0) {
        const match = filters.type.some(t => s.type === t || s.level === t);
        if (!match) return false;
      }
      if (filters.status.length > 0) {
        if (!filters.status.includes(s.status)) return false;
      }
      if (filters.amount.length > 0) {
        const inRange = filters.amount.some(a => {
          if (a === 'under25k') return s.amount_num < 25000;
          if (a === '25k-1l') return s.amount_num >= 25000 && s.amount_num <= 100000;
          if (a === 'above1l') return s.amount_num > 100000;
          return true;
        });
        if (!inRange) return false;
      }
      return true;
    });
  }, [filters, search, scholarships]);

  const totalFiltersApplied = Object.values(filters).flat().length;

  const toggleFilter = (group: keyof Filters, val: string) => {
    setFilters(prev => {
      const current = prev[group];
      const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
      return { ...prev, [group]: next };
    });
  };

  const resetFilters = () => {
    setFilters({ streams: [], who: [], type: [], status: [], amount: [] });
    setSearch('');
  };

  const toggleSave = (id: string) => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleDesc = (id: string) => {
    setExpandedDesc(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Sidebar
  const closingSoon = useMemo(() =>
    [...scholarships].filter(s => s.status === 'open').slice(0, 3),
    [scholarships]
  );
  const highValue = useMemo(() =>
    [...scholarships].sort((a, b) => b.amount_num - a.amount_num).slice(0, 4),
    [scholarships]
  );

  // ==================== DROPDOWN ====================
  const Dropdown = ({ id, label, options, selected }: {
    id: string; label: string; options: FilterOption[]; selected: string[];
  }) => {
    const isOpen = openDropdown === id;
    const group = id as keyof Filters;
    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
            selected.length > 0
              ? 'bg-primary/10 text-primary border-primary/40'
              : 'bg-card text-muted-foreground border-border hover:border-primary/40'
          }`}
        >
          {label}{selected.length > 0 ? ` (${selected.length})` : ''}
          <ChevronDown size={13} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1.5 z-[200] bg-card border border-border rounded-xl py-1.5 min-w-[220px] shadow-xl overflow-hidden">
            {options.map(opt => {
              const checked = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 px-4 py-2 cursor-pointer text-sm transition-colors ${
                    checked ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => toggleFilter(group, opt.value)}
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                    checked ? 'bg-primary border-0' : 'border-[1.5px] border-border'
                  }`}>
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ==================== RENDER ====================
  return (
    <>
      <style>{`
        @keyframes pulse-open {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          60%       { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        @keyframes shimmer-slow {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
        .hero-shine {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.13) 50%, transparent 100%);
          background-size: 300% 100%;
          animation: shimmer-slow 6s linear infinite;
        }
        .sc-card-hover { transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease; }
        .sc-card-hover:hover {
          border-color: hsl(var(--primary)/0.3) !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18);
          transform: translateY(-1px);
        }
        .sc-link-btn { transition: all 0.15s ease; }
        .sc-link-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        @media (max-width: 1024px) {
          .sc-sidebar { display: none !important; }
          .sc-main { width: 100% !important; }
        }
        @media (max-width: 768px) {
          .sc-card-cols { flex-direction: column !important; gap: 14px !important; }
          .sc-card-mid, .sc-card-right { border-left: none !important; padding-left: 0 !important; padding-right: 0 !important; border-top: 1px solid hsl(var(--border)); padding-top: 14px !important; }
          .sc-featured-grid { flex-direction: column !important; align-items: stretch !important; }
          .sc-featured-img { width: 100% !important; max-width: 220px !important; margin: 0 auto !important; }
        }
      `}</style>

      <Navbar />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">

          {/* ─── Back link (compact, above hero) ─── */}
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>

          {/* ─── HERO HEADER (compact, single-line feel) ─── */}
          <div className="relative bg-card border border-border rounded-xl mb-5 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex items-center gap-3 flex-wrap">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" strokeWidth={2.2} />
              </div>
              <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-tight m-0">
                  Scholarships for College Students
                </h1>
                <span className="hidden sm:inline text-muted-foreground text-xs">—</span>
                <span className="text-xs text-muted-foreground leading-snug hidden sm:inline">
                  Curated govt &amp; private · verified sources · apply directly
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 border border-border text-[11px] font-medium text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {scholarships.length} Active
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 border border-border text-[11px] font-medium text-muted-foreground">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              FEATURED — UP SCHOLARSHIP (always shown)
          ══════════════════════════════════════ */}
          <div className="bg-card border border-border border-l-4 border-l-primary rounded-2xl p-5 sm:p-7 mb-5 sm:mb-6">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                <Sparkles size={11} /> Most Applied in UP Colleges
              </span>
            </div>

            <div className="sc-featured-grid flex gap-6 sm:gap-8 items-start">
              {/* Left: Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 tracking-tight">
                  UP Scholarship — Complete Guide
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5 max-w-lg">
                  Uttar Pradesh's state scholarship covers fee reimbursement and maintenance allowance for SC, ST, OBC, General, and Minority students studying in UP colleges.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-5">
                  {[
                    { label: 'Eligible Categories', val: 'SC / ST / OBC / General / Minority' },
                    { label: 'Application Period', val: 'July – December (Annual)' },
                    { label: 'Coverage', val: 'Fee Reimbursement + Maintenance' },
                    { label: 'Income Limit', val: '≤ ₹2L (Gen/OBC) · ≤ ₹2.5L (SC/ST)' },
                    { label: 'Official Portal', val: 'scholarship.up.gov.in' },
                    { label: 'Status Tracking', val: 'pfms.nic.in' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase tracking-wider">{item.label}</div>
                      <div className="text-[13px] text-foreground font-medium">{item.val}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', borderColor: 'rgba(16,185,129,0.25)' }}
                  >
                    <span className="w-[7px] h-[7px] rounded-full bg-[#10B981] inline-block" style={{ animation: 'pulse-open 1.8s infinite' }} />
                    Open — Jul to Dec
                  </span>
                  <a href="https://scholarship.up.gov.in" target="_blank" rel="noreferrer"
                    className="sc-link-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-primary text-primary-foreground"
                  >
                    Apply Now <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Right: Banner */}
              <div className="sc-featured-img flex flex-col items-center gap-2.5" style={{ flexShrink: 0, width: 220 }}>
                <a href={UP_PDF_DOWNLOAD_URL} target="_blank" rel="noreferrer" title="Click to download the UP Scholarship Guide"
                  className="block w-full sc-link-btn"
                >
                  <img
                    src="/images/study/UPScholarshipGuideBanner.png"
                    alt="UP Scholarship Guide"
                    className="w-full block object-contain rounded-lg"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </a>
                <div className="flex gap-2 w-full" style={{ maxWidth: 200 }}>
                  <a href={UP_PDF_URL} target="_blank" rel="noreferrer"
                    className="sc-link-btn flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/30 no-underline"
                  >
                    <Eye size={12} /> Preview
                  </a>
                  <a href={UP_PDF_DOWNLOAD_URL} target="_blank" rel="noreferrer"
                    className="sc-link-btn flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold bg-muted text-muted-foreground border border-border no-underline"
                  >
                    <Download size={12} /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              FILTER BAR
          ══════════════════════════════════════ */}
          <div ref={filterBarRef} className="sticky top-0 z-[100] bg-background/95 backdrop-blur-md border-b border-border -mx-1 px-1 py-3 mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <Dropdown id="streams" label="Course" options={STREAM_OPTS} selected={filters.streams} />
              <Dropdown id="who" label="Category" options={WHO_OPTS} selected={filters.who} />
              <Dropdown id="type" label="Type" options={TYPE_OPTS} selected={filters.type} />
              <Dropdown id="status" label="Status" options={STATUS_OPTS} selected={filters.status} />
              <Dropdown id="amount" label="Amount" options={AMOUNT_OPTS} selected={filters.amount} />

              <div className="relative ml-auto flex-shrink-0">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-8 py-2 rounded-lg text-xs sm:text-sm outline-none bg-card text-foreground border border-border w-[140px] sm:w-[210px]"
                />
                {search && (
                  <button aria-label="Clear search" onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {(totalFiltersApplied > 0 || search) && (
                <button onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-transparent text-muted-foreground border border-border"
                >
                  <X size={12} /> Reset
                </button>
              )}
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Showing <strong className="text-foreground">{filtered.length}</strong> of {scholarships.length} scholarships
            </div>
          </div>

          {/* ══════════════════════════════════════
              MAIN + SIDEBAR
          ══════════════════════════════════════ */}
          <div className="flex gap-6 items-start">

            {/* MAIN */}
            <div className="sc-main flex-1 min-w-0">

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 px-6 bg-card rounded-xl border border-border">
                  <div className="text-3xl mb-3">🔍</div>
                  <div className="text-base font-semibold text-foreground mb-1.5">
                    {scholarships.length === 0 ? 'No scholarships available yet' : 'No scholarships match your filters'}
                  </div>
                  <div className="text-sm text-muted-foreground mb-5">
                    {scholarships.length === 0
                      ? 'Admins can add new scholarships from the Admin Portal.'
                      : 'Try clearing some filters or changing your search.'}
                  </div>
                  {scholarships.length > 0 && (
                    <Button variant="outline" onClick={resetFilters}>Clear All Filters</Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {filtered.map(sc => {
                    const st = STATUS_DISPLAY[sc.status] || STATUS_DISPLAY.open;
                    const isSaved = saved.has(sc.id);
                    return (
                      <div
                        key={sc.id}
                        ref={highlightId === sc.id ? highlightRef : undefined}
                        className={`sc-card-hover bg-card border rounded-xl p-4 sm:p-5 transition-all ${
                          highlightId === sc.id
                            ? 'border-primary/60 shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]'
                            : 'border-border'
                        }`}
                      >
                        <div className="sc-card-cols flex items-stretch">

                          {/* LEFT */}
                          <div className="flex-1 min-w-0 sm:pr-5" style={{ flexBasis: '45%' }}>
                            <div className="flex items-start justify-between mb-1 gap-2">
                              <h3 className="text-[15px] font-bold text-foreground tracking-tight leading-snug m-0">
                                {sc.name}
                              </h3>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {/* WhatsApp Share Button */}
                                <a
                                  href={getWhatsAppShareUrl(sc)}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Share on WhatsApp"
                                  className="p-1 rounded-md bg-transparent border-0 cursor-pointer text-muted-foreground hover:text-[#25D366] transition-colors inline-flex items-center justify-center"
                                >
                                  {/* Official WhatsApp green icon */}
                                  <svg width="15" height="15" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16" cy="16" r="16" fill="#25D366"/>
                                    <path d="M22.7 9.3A9.5 9.5 0 0 0 7.1 20.6L6 26l5.6-1.1a9.5 9.5 0 0 0 4.5 1.1 9.5 9.5 0 0 0 6.6-16.7zm-6.6 14.6a7.9 7.9 0 0 1-4-1.1l-.3-.2-3.3.6.7-3.2-.2-.3a7.9 7.9 0 1 1 7.1 4.2zm4.3-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.7 2.7 0 0 0-.8 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.6 4.1 3.6.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z" fill="#fff"/>
                                  </svg>
                                </a>
                                <button onClick={() => toggleSave(sc.id)}
                                  className={`p-0 bg-transparent border-0 cursor-pointer transition-colors ${
                                    isSaved ? 'text-primary' : 'text-muted-foreground'
                                  }`}
                                >
                                  {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                                </button>
                                {isOwner && (
                                  <button onClick={() => handleDelete(sc.id, sc.name)}
                                    title="Delete scholarship (Owner only)"
                                    className="p-1 rounded-md bg-transparent border-0 cursor-pointer text-red-500 hover:bg-red-500/10 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground font-medium mb-2">
                              {sc.org}
                            </div>
                            {/* Expandable Description */}
                            <div>
                              <p className={`text-[13px] text-muted-foreground leading-relaxed m-0 ${
                                expandedDesc.has(sc.id) ? '' : 'line-clamp-2'
                              }`}>
                                {sc.description}
                              </p>
                              {sc.description && sc.description.length > 120 && (
                                <button
                                  onClick={() => toggleDesc(sc.id)}
                                  className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-primary bg-transparent border-0 cursor-pointer p-0 hover:opacity-75 transition-opacity"
                                >
                                  {expandedDesc.has(sc.id) ? (
                                    <><ChevronUp size={12} /> Show less</>
                                  ) : (
                                    <><ChevronDown size={12} /> Read more</>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* MIDDLE */}
                          <div className="sc-card-mid min-w-0 sm:border-l border-border sm:px-5" style={{ flexBasis: '28%' }}>
                            {sc.tags && sc.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2.5">
                                {sc.tags.slice(0, 4).map(tag => (
                                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded font-semibold bg-muted text-muted-foreground border border-border">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              <div><span className="text-foreground font-semibold">Income:</span> {sc.income}</div>
                              <div><span className="text-foreground font-semibold">Marks:</span> {sc.marks}</div>
                            </div>
                          </div>

                          {/* RIGHT */}
                          <div className="sc-card-right min-w-0 sm:border-l border-border sm:pl-5 flex flex-col justify-between" style={{ flexBasis: '22%' }}>
                            <div>
                              <div className="text-lg font-bold text-foreground mb-0.5">
                                {sc.amount}
                              </div>
                              <div className="text-xs text-muted-foreground mb-2.5">
                                Deadline: <span className="font-semibold text-foreground">{sc.deadline}</span>
                              </div>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold mb-3 border"
                                style={{ background: st.bg, color: st.color, borderColor: `${st.color}33` }}
                              >
                                {st.dot && (
                                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: st.color, animation: 'pulse-open 1.8s infinite' }} />
                                )}
                                {st.label}
                              </span>
                            </div>
                            <a href={sc.apply_url} target="_blank" rel="noreferrer"
                              className={`sc-link-btn inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-lg text-xs font-semibold no-underline ${
                                sc.status === 'closed'
                                  ? 'bg-muted text-muted-foreground pointer-events-none opacity-60'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {sc.status === 'closed' ? 'Closed' : 'View Details'}
                              {sc.status !== 'closed' && <ExternalLink size={11} />}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="sc-sidebar w-[240px] flex-shrink-0 sticky top-20">

              {scholarships.length > 0 && (
                <>
                  <div className="bg-card border border-border rounded-xl p-4 mb-3.5">
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <Clock size={14} className="text-amber-500" />
                      <span className="text-[13px] font-bold text-foreground">Closing Soon</span>
                    </div>
                    {closingSoon.length === 0 ? (
                      <div className="text-xs text-muted-foreground">No open scholarships.</div>
                    ) : closingSoon.map(sc => (
                      <a key={sc.id} href={sc.apply_url} target="_blank" rel="noreferrer"
                        className="block mb-3 pb-3 border-b border-border no-underline last:border-0 last:pb-0 last:mb-0"
                      >
                        <div className="text-[12.5px] font-semibold text-foreground leading-tight mb-0.5">{sc.name}</div>
                        <div className="text-[11px] text-muted-foreground">Deadline: {sc.deadline}</div>
                      </a>
                    ))}
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4 mb-3.5">
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <TrendingUp size={14} className="text-primary" />
                      <span className="text-[13px] font-bold text-foreground">Highest Value</span>
                    </div>
                    {highValue.map(sc => (
                      <a key={sc.id} href={sc.apply_url} target="_blank" rel="noreferrer"
                        className="flex items-center justify-between mb-2.5 no-underline gap-2 last:mb-0"
                      >
                        <div className="text-xs text-foreground font-medium leading-tight flex-1 min-w-0 truncate">
                          {sc.name}
                        </div>
                        <span className="text-[11px] font-bold text-primary flex-shrink-0">
                          {sc.amount_num >= 100000 ? `₹${(sc.amount_num / 100000).toFixed(1)}L` : `₹${(sc.amount_num / 1000).toFixed(0)}K`}
                        </span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-[13px] font-bold text-foreground mb-3">
                  Official Portals
                </div>
                {[
                  { label: 'NSP — scholarships.gov.in', href: 'https://scholarships.gov.in' },
                  { label: 'UP Scholarship Portal', href: 'https://scholarship.up.gov.in' },
                  { label: 'Buddy4Study', href: 'https://www.buddy4study.com' },
                  { label: 'PFMS Status Check', href: 'https://pfms.nic.in' },
                  { label: 'INSPIRE Scholarship', href: 'https://online-inspire.gov.in' },
                ].map(lnk => (
                  <a key={lnk.label} href={lnk.href} target="_blank" rel="noreferrer"
                    className="flex items-center justify-between text-xs text-muted-foreground no-underline py-1.5 border-b border-border last:border-0 hover:text-primary transition-colors"
                  >
                    {lnk.label} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 p-4 sm:p-5 rounded-xl bg-muted/50 border border-border">
            <p className="text-xs sm:text-[12.5px] text-muted-foreground m-0 leading-relaxed">
              <strong className="text-foreground">⚠ Disclaimer:</strong> Always verify deadlines and eligibility on official portals before applying.
              Sources: scholarships.gov.in · scholarship.up.gov.in · buddy4study.com · official scholarship websites.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
