import { useState, useMemo, useEffect, useRef } from 'react';
import {
  ExternalLink, Download, Search, X, ChevronDown, Eye, Sparkles, ArrowLeft,
  Bookmark, BookmarkCheck, Clock, TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// ─── REPLACE this with your actual UP Scholarship PDF URL ─────────────────────
const UP_PDF_URL = 'https://drive.google.com/file/d/17o2G4M_n602fXOWlCwIse0gxVPmfuAn9/view?usp=drivesdk';
const UP_PDF_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=17o2G4M_n602fXOWlCwIse0gxVPmfuAn9';
// For Google Drive: Change the /view URL to /preview for embed support
// ─────────────────────────────────────────────────────────────────────────────

// ==================== DATA ====================
const scholarships = [
  {
    id: 1,
    name: "Reliance Foundation UG Scholarship",
    org: "Reliance Foundation",
    amount: "Up to ₹2 Lakh",
    amountNum: 200000,
    status: "open",
    streams: ["all"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "India's largest private UG scholarship open to all streams. 5,000 seats annually with mandatory aptitude test. Includes networking + alumni community access.",
    income: "Family income below ₹15 Lakh",
    marks: "Merit-cum-means basis",
    deadline: "Nov 30, 2025",
    link: "https://scholarships.reliancefoundation.org",
    tags: ["All Streams", "Merit + Need"],
  },
  {
    id: 2,
    name: "Siemens Scholarship Program",
    org: "Siemens India CSR",
    amount: "4-Year Full Support",
    amountNum: 100000,
    status: "open",
    streams: ["engineering"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "For 1st year engineering students in government colleges. Covers fees with additional internship, mechatronics training, and senior mentor access. IIT students not eligible.",
    income: "Below ₹2 Lakh/year",
    marks: "60% in 10th, 50% in 12th",
    deadline: "Sep 30, 2025",
    link: "https://www.siemens.com/in/en/company/sustainability/corporate-citizenship/siemens-scholarship-program.html",
    tags: ["Engineering", "Govt. Colleges", "50% Seats for Girls"],
  },
  {
    id: 3,
    name: "HDFC Parivartan ECSS Scholarship",
    org: "HDFC Bank",
    amount: "₹30,000 – ₹75,000",
    amountNum: 75000,
    status: "open",
    streams: ["all"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "For UG students facing financial hardship or family crisis. Apply via Buddy4Study. ₹30K–₹50K for UG students. Applications in 3 rounds throughout the year.",
    income: "Below ₹2.5 Lakh/year",
    marks: "55% in previous exam",
    deadline: "Dec 31, 2025",
    link: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme",
    tags: ["All Streams", "Crisis Support"],
  },
  {
    id: 4,
    name: "Tata Capital Pankh Scholarship",
    org: "Tata Capital Limited",
    amount: "Up to ₹50,000",
    amountNum: 50000,
    status: "open",
    streams: ["all"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "For Class 11 through UG students in general and professional courses. Covers up to 80% of tuition fees. Includes career mentorship and stipend support.",
    income: "Below ₹2.5 Lakh/year",
    marks: "60% General | 80% Professional",
    deadline: "Oct 15, 2025",
    link: "https://www.buddy4study.com/page/the-tata-capital-pankh-scholarship-programme",
    tags: ["All Streams", "Mentorship Included"],
  },
  {
    id: 5,
    name: "NSP Central Sector Scholarship (CSSS)",
    org: "Ministry of Education, Govt. of India",
    amount: "₹12,000/year",
    amountNum: 12000,
    status: "upcoming",
    streams: ["all"],
    who: ["all"],
    type: "government",
    level: "central",
    description: "Most important central government scholarship with 82,000 annual seats. 50% reserved for female students. Direct Benefit Transfer via NSP portal.",
    income: "Below ₹4.5 Lakh/year",
    marks: "80%+ in Class 12",
    deadline: "Oct 31, 2025",
    link: "https://scholarships.gov.in",
    tags: ["All Streams", "82,000 Seats"],
  },
  {
    id: 6,
    name: "PM YASASVI Scholarship",
    org: "Ministry of Social Justice & Empowerment",
    amount: "₹75,000 – ₹1.25 Lakh/year",
    amountNum: 125000,
    status: "upcoming",
    streams: ["all"],
    who: ["obc"],
    type: "government",
    level: "central",
    description: "For OBC, EBC, and DNT category students. No entrance exam — purely merit-based on previous year's final exam. State-wise merit lists.",
    income: "Below ₹2.5 Lakh/year",
    marks: "Previous class final marks",
    deadline: "Aug 31, 2025",
    link: "https://scholarships.gov.in",
    tags: ["OBC / EBC / DNT", "Merit-based"],
  },
  {
    id: 7,
    name: "AICTE Pragati Scholarship",
    org: "All India Council for Technical Education",
    amount: "₹50,000/year",
    amountNum: 50000,
    status: "upcoming",
    streams: ["engineering", "diploma"],
    who: ["girls"],
    type: "government",
    level: "central",
    description: "For girl students in AICTE-approved technical institutions (degree and diploma). 5,000 seats annually. Covers tuition, books, and equipment costs.",
    income: "Below ₹8 Lakh/year",
    marks: "Merit-based",
    deadline: "Oct 31, 2025",
    link: "https://scholarships.gov.in",
    tags: ["Girls Only", "Engineering / Diploma"],
  },
  {
    id: 8,
    name: "INSPIRE Scholarship for Higher Education",
    org: "Dept. of Science & Technology, Govt. of India",
    amount: "₹80,000/year",
    amountNum: 80000,
    status: "open",
    streams: ["science"],
    who: ["all"],
    type: "government",
    level: "central",
    description: "For exceptionally talented students pursuing B.Sc., B.S., or Integrated M.Sc. Must be in top 1% of Class 12 board results. Summer research attachment included.",
    income: "No income limit",
    marks: "Top 1% in Class 12 (Science)",
    deadline: "Nov 09, 2025",
    link: "https://online-inspire.gov.in",
    tags: ["Science Only", "Research Attachment"],
  },
  {
    id: 9,
    name: "Aditya Birla Capital Scholarship",
    org: "Aditya Birla Capital Foundation",
    amount: "Up to ₹60,000 (one-time)",
    amountNum: 60000,
    status: "closed",
    streams: ["all"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "One-time scholarship from Class 1 through UG. Female students given priority. Includes career counseling and life skills sessions. Apply via Buddy4Study.",
    income: "Below ₹6 Lakh/year",
    marks: "60% in previous class",
    deadline: "Oct 15, 2025",
    link: "https://www.buddy4study.com/page/aditya-birla-capital-scholarship",
    tags: ["All Streams", "Girls Priority"],
  },
  {
    id: 10,
    name: "Kotak Kanya Scholarship",
    org: "Kotak Education Foundation",
    amount: "Up to ₹1.5 Lakh/year",
    amountNum: 150000,
    status: "closed",
    streams: ["engineering", "medical", "law"],
    who: ["girls"],
    type: "private",
    level: "central",
    description: "One of the best girl-only scholarships in India. Renewable for the full course duration. Covers Engineering, Medicine, Law, and other professional courses.",
    income: "Below ₹6 Lakh/year",
    marks: "85% in Class 12",
    deadline: "Oct 31, 2025",
    link: "https://www.buddy4study.com/page/kotak-kanya-scholarship",
    tags: ["Girls Only", "Renewable", "Professional"],
  },
  {
    id: 11,
    name: "Swami Dayanand India Scholarship",
    org: "Swami Dayanand Education Foundation",
    amount: "Up to ₹50,000/year",
    amountNum: 50000,
    status: "open",
    streams: ["engineering", "medical"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "Strictly for B.Tech and MBBS 1st year students who cleared JEE or NEET. Drop-year students not eligible. 8 CGPA required for renewal. 30% seats for girls.",
    income: "Below ₹12 Lakh/year",
    marks: "80% in 12th + JEE/NEET cleared",
    deadline: "Sep 30, 2025",
    link: "https://www.swamidayanand.org/scholarship-india",
    tags: ["B.Tech / MBBS", "JEE / NEET Required"],
  },
  {
    id: 12,
    name: "Post-Matric Scholarship — SC Category",
    org: "National Scholarship Portal (NSP)",
    amount: "₹230 – ₹13,500/year",
    amountNum: 13500,
    status: "upcoming",
    streams: ["all"],
    who: ["sc"],
    type: "government",
    level: "central",
    description: "For SC category UG, PG, and Diploma students. Amount depends on course type. Direct Benefit Transfer to bank account. College AISHE code required for application.",
    income: "Below ₹2.5 Lakh/year",
    marks: "Pass marks in previous class",
    deadline: "Oct 31, 2025",
    link: "https://scholarships.gov.in",
    tags: ["SC Students", "Direct Bank Transfer"],
  },
  {
    id: 13,
    name: "Post-Matric Scholarship — ST Category",
    org: "National Scholarship Portal (NSP)",
    amount: "₹230 – ₹13,500/year",
    amountNum: 13500,
    status: "upcoming",
    streams: ["all"],
    who: ["st"],
    type: "government",
    level: "central",
    description: "For ST category UG, PG, and Diploma students. Direct Benefit Transfer via NSP portal. College AISHE code required. October deadline on NSP.",
    income: "Below ₹2.5 Lakh/year",
    marks: "Pass marks in previous class",
    deadline: "Oct 31, 2025",
    link: "https://scholarships.gov.in",
    tags: ["ST Students", "Direct Bank Transfer"],
  },
  {
    id: 14,
    name: "Minority Post-Matric Scholarship",
    org: "Ministry of Minority Affairs, NSP",
    amount: "Up to ₹13,500/year",
    amountNum: 13500,
    status: "upcoming",
    streams: ["all"],
    who: ["minority"],
    type: "government",
    level: "central",
    description: "For Muslim, Christian, Sikh, Buddhist, Parsi, and Jain communities. Both pre-matric and post-matric scholarships available. Apply before October on NSP portal.",
    income: "Below ₹2 Lakh/year",
    marks: "50%+ in previous class",
    deadline: "Oct 31, 2025",
    link: "https://scholarships.gov.in",
    tags: ["Minority Communities", "Pre + Post Matric"],
  },
  {
    id: 15,
    name: "Dr. Reddy's Foundation Sashakt Scholarship",
    org: "Dr. Reddy's Foundation",
    amount: "Up to ₹40,000/year",
    amountNum: 40000,
    status: "closed",
    streams: ["all"],
    who: ["all"],
    type: "private",
    level: "central",
    description: "For economically weaker section students in general and professional UG courses. Includes mentorship support. Apply via Buddy4Study before the October deadline.",
    income: "Below ₹4 Lakh/year",
    marks: "60% in previous class",
    deadline: "Oct 30, 2025",
    link: "https://www.buddy4study.com",
    tags: ["All Streams", "Mentorship"],
  }
];

// ==================== FILTER OPTION TYPES ====================
interface FilterOption { label: string; value: string; }

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

// ==================== STATUS DISPLAY ====================
const STATUS_DISPLAY: Record<string, { label: string; color: string; bg: string; dot: boolean }> = {
  open:     { label: 'Open',         color: '#10B981', bg: 'rgba(16,185,129,0.12)', dot: true },
  upcoming: { label: 'Opening Soon', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', dot: false },
  closed:   { label: 'Closed',       color: '#94A3B8', bg: 'rgba(148,163,184,0.10)', dot: false },
};

// ==================== INTERFACES ====================
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
  const [filters, setFilters] = useState<Filters>({ streams: [], who: [], type: [], status: [], amount: [] });
  const [search, setSearch] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showPdfModal, setShowPdfModal] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);

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

  // Filter logic
  const filtered = useMemo(() => {
    return scholarships.filter(s => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.org.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q)) return false;
      }
      // Streams (OR within group — show if scholarship matches any selected stream or is for all)
      if (filters.streams.length > 0) {
        const match = s.streams.includes('all') || filters.streams.some(st => s.streams.includes(st));
        if (!match) return false;
      }
      // Who
      if (filters.who.length > 0) {
        const match = s.who.includes('all') || filters.who.some(w => s.who.includes(w));
        if (!match) return false;
      }
      // Type
      if (filters.type.length > 0) {
        const match = filters.type.some(t => s.type === t || s.level === t);
        if (!match) return false;
      }
      // Status
      if (filters.status.length > 0) {
        if (!filters.status.includes(s.status)) return false;
      }
      // Amount
      if (filters.amount.length > 0) {
        const inRange = filters.amount.some(a => {
          if (a === 'under25k') return s.amountNum < 25000;
          if (a === '25k-1l') return s.amountNum >= 25000 && s.amountNum <= 100000;
          if (a === 'above1l') return s.amountNum > 100000;
          return true;
        });
        if (!inRange) return false;
      }
      return true;
    });
  }, [filters, search]);

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

  const toggleSave = (id: number) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ==================== DROPDOWN COMPONENT ====================
  const Dropdown = ({
    id, label, options, selected
  }: { id: string; label: string; options: FilterOption[]; selected: string[] }) => {
    const isOpen = openDropdown === id;
    const group = id as keyof Filters;
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            background: selected.length > 0 ? 'hsl(var(--primary)/0.1)' : 'hsl(var(--card))',
            color: selected.length > 0 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
            border: selected.length > 0
              ? '1px solid hsl(var(--primary)/0.4)'
              : '1px solid hsl(var(--border))',
            cursor: 'pointer', whiteSpace: 'nowrap' as const,
            transition: 'all 0.15s ease', fontFamily: 'inherit'
          }}
        >
          {label}{selected.length > 0 ? ` (${selected.length})` : ''}
          <ChevronDown size={14} style={{ transition: 'transform 0.15s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
        </button>
        {isOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 200,
            background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
            borderRadius: 10, padding: '6px 0', minWidth: 220,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)', overflow: 'hidden'
          }}>
            {options.map(opt => {
              const checked = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 16px', cursor: 'pointer', fontSize: 13,
                    color: checked ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                    background: checked ? 'hsl(var(--primary)/0.08)' : 'transparent',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'hsl(var(--muted))'; }}
                  onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                    border: checked ? 'none' : '1.5px solid hsl(var(--border))',
                    background: checked ? 'hsl(var(--primary))' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.12s'
                  }}>
                    {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <input
                    type="checkbox" checked={checked} readOnly
                    onChange={() => toggleFilter(group, opt.value)}
                    onClick={() => toggleFilter(group, opt.value)}
                    style={{ display: 'none' }}
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ==================== SIDEBAR DATA ====================
  const closingSoon = [...scholarships]
    .filter(s => s.status === 'open')
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  const highValue = [...scholarships]
    .sort((a, b) => b.amountNum - a.amountNum)
    .slice(0, 4);

  // ==================== RENDER ====================
  return (
    <>
      {/* ─── GLOBAL STYLES ─── */}
      <style>{`
        @keyframes pulse-open {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          60%       { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .sc-card-hover { transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease; }
        .sc-card-hover:hover {
          border-color: hsl(var(--primary)/0.3) !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          transform: translateY(-1px);
        }
        .sc-link-btn { transition: all 0.15s ease; }
        .sc-link-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .pdf-doc-line { height: 8px; border-radius: 4px; background: hsl(var(--muted)); }
        @media (max-width: 1024px) {
          .sc-sidebar { display: none !important; }
          .sc-main { width: 100% !important; }
        }
        @media (max-width: 768px) {
          .sc-card-cols { flex-direction: column !important; }
          .sc-card-right { border-left: none !important; padding-left: 0 !important; border-top: 1px solid hsl(var(--border)); padding-top: 14px !important; }
          .sc-featured-grid { flex-direction: column !important; }
        }
      `}</style>

      <Navbar />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ─── HERO PAGE HEADER ─── */}
          <div style={{
            background: 'linear-gradient(135deg, hsl(235 69% 55%) 0%, hsl(262 83% 52%) 100%)',
            borderRadius: 16, padding: '28px 32px', marginBottom: 28,
            position: 'relative' as const, overflow: 'hidden'
          }}>
            {/* Dot pattern overlay */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.06,
              backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px', pointerEvents: 'none' as const
            }} />
            {/* Back to Dashboard */}
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 13, color: 'rgba(255,255,255,0.7)', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
                marginBottom: 16, transition: 'color 0.15s', position: 'relative' as const, zIndex: 1
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8, position: 'relative' as const, zIndex: 1 }}>
              <span style={{ fontSize: 34, lineHeight: 1 }}>🎓</span>
              <h1 style={{
                fontSize: 28, fontWeight: 800, color: '#fff',
                letterSpacing: '-0.03em', margin: 0, lineHeight: 1.15
              }}>
                Scholarship Page for College Students
              </h1>
            </div>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.72)', margin: 0, position: 'relative' as const, zIndex: 1, paddingLeft: 48 }}>
              Verified scholarships for UP &amp; India — 2025–26 academic year
            </p>
          </div>

          {/* ══════════════════════════════════════
              FEATURED — UP SCHOLARSHIP
          ══════════════════════════════════════ */}
          <div style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderLeft: '3px solid hsl(var(--primary))',
            borderRadius: 14,
            padding: '24px 28px',
            marginBottom: 20,
          }}>
            {/* Featured badge */}
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                background: 'hsl(var(--primary)/0.1)', color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--primary)/0.2)', letterSpacing: '0.04em', textTransform: 'uppercase' as const
              }}>
                <Sparkles size={11} /> Most Applied in UP Colleges
              </span>
            </div>

            {/* Two-column */}
            <div className="sc-featured-grid" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              {/* Left: Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'hsl(var(--foreground))', marginBottom: 6, letterSpacing: '-0.01em' }}>
                  UP Scholarship 2025-26 — Complete Guide
                </h2>
                <p style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', lineHeight: 1.6, marginBottom: 18, maxWidth: 480 }}>
                  Uttar Pradesh's state scholarship covers fee reimbursement and maintenance allowance for SC, ST, OBC, General, and Minority students studying in UP colleges.
                </p>

                {/* Meta grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginBottom: 22 }}>
                  {[
                    { label: 'Eligible Categories', val: 'SC / ST / OBC / General / Minority' },
                    { label: 'Application Period', val: 'July – December 2025' },
                    { label: 'Coverage', val: 'Fee Reimbursement + Maintenance Allowance' },
                    { label: 'Income Limit', val: '≤ ₹2L (Gen/OBC) · ≤ ₹2.5L (SC/ST)' },
                    { label: 'Official Portal', val: 'scholarship.up.gov.in' },
                    { label: 'Status Tracking', val: 'pfms.nic.in' },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'hsl(var(--muted-foreground))', marginBottom: 2, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: 'hsl(var(--foreground))', fontWeight: 500 }}>{item.val}</div>
                    </div>
                  ))}
                </div>

                {/* CTA row — Apply only; PDF actions are on the image widget */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                    background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)'
                  }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#10B981',
                      display: 'inline-block', animation: 'pulse-open 1.8s infinite'
                    }} />
                    Open — Jul to Dec 2025
                  </span>
                  <a href="https://scholarship.up.gov.in" target="_blank" rel="noreferrer" className="sc-link-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                    background: 'hsl(var(--primary))', color: '#fff', textDecoration: 'none'
                  }}>
                    Apply Now <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Right: Real Banner Image — transparent background, click = download, buttons below for Preview/Download */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10 }}>
                {/* Image wrapped in download link */}
                <a
                  href={UP_PDF_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="Click to download the UP Scholarship Guide"
                  style={{ display: 'block', cursor: 'pointer', transition: 'transform 0.18s ease', width: 220, position: 'relative', zIndex: 1 }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src="/images/study/UPScholarshipGuideBanner.png"
                    alt="UP Scholarship Guide — College Study"
                    style={{ width: '100%', display: 'block', objectFit: 'contain' }}
                    onError={e => {
                      // fallback if image doesn't load
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </a>
                {/* Two action buttons below */}
                <div style={{ display: 'flex', gap: 8, width: 200, marginTop: '-10px', position: 'relative', zIndex: 2 }}>
                  <a
                    href={UP_PDF_URL} target="_blank" rel="noreferrer"
                    title="Preview in browser"
                    className="sc-link-btn"
                    style={{
                      flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      padding: '7px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      background: 'hsl(var(--primary)/0.1)', color: 'hsl(var(--primary))',
                      border: '1px solid hsl(var(--primary)/0.3)', textDecoration: 'none'
                    }}
                  >
                    <Eye size={13} /> Preview
                  </a>
                  <a
                    href={UP_PDF_DOWNLOAD_URL} target="_blank" rel="noreferrer"
                    title="Download PDF"
                    className="sc-link-btn"
                    style={{
                      flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      padding: '7px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))',
                      border: '1px solid hsl(var(--border))', textDecoration: 'none'
                    }}
                  >
                    <Download size={13} /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              STICKY FILTER BAR
          ══════════════════════════════════════ */}
          <div ref={filterBarRef} style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'hsl(var(--background)/0.95)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid hsl(var(--border))',
            margin: '0 -4px', padding: '12px 4px', marginBottom: 24
          }}>
            {/* Desktop filters */}
            <div className="sc-filter-pills" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const }}>
              <Dropdown id="streams" label="Course Type" options={STREAM_OPTS} selected={filters.streams} />
              <Dropdown id="who" label="Category" options={WHO_OPTS} selected={filters.who} />
              <Dropdown id="type" label="Scholarship Type" options={TYPE_OPTS} selected={filters.type} />
              <Dropdown id="status" label="Status" options={STATUS_OPTS} selected={filters.status} />
              <Dropdown id="amount" label="Amount Range" options={AMOUNT_OPTS} selected={filters.amount} />

              {/* Search */}
              <div style={{ position: 'relative', marginLeft: 'auto' }}>
                <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
                <input
                  placeholder="Search scholarships…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 32, paddingRight: search ? 32 : 14, paddingTop: 8, paddingBottom: 8,
                    borderRadius: 8, fontSize: 13, outline: 'none',
                    background: 'hsl(var(--card))', color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))', width: 210, fontFamily: 'inherit'
                  }}
                />
                {search && (
                  <button aria-label="Clear search" title="Clear search" onClick={() => setSearch('')} style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))', padding: 0
                  }}>
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Reset */}
              {(totalFiltersApplied > 0 || search) && (
                <button onClick={resetFilters} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '8px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  background: 'transparent', color: 'hsl(var(--muted-foreground))',
                  border: '1px solid hsl(var(--border))', cursor: 'pointer', fontFamily: 'inherit'
                }}>
                  <X size={12} /> Reset
                </button>
              )}
            </div>


            {/* Count */}
            <div style={{ marginTop: 8, fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>
              Showing <strong style={{ color: 'hsl(var(--foreground))' }}>{filtered.length}</strong> of {scholarships.length} scholarships
            </div>
          </div>

          {/* ══════════════════════════════════════
              MAIN + SIDEBAR LAYOUT
          ══════════════════════════════════════ */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

            {/* ─── MAIN CARD LIST ─── */}
            <div className="sc-main" style={{ flex: 1, minWidth: 0 }}>

              {filtered.length === 0 && (
                <div style={{
                  textAlign: 'center' as const, padding: '60px 24px',
                  background: 'hsl(var(--card))', borderRadius: 12,
                  border: '1px solid hsl(var(--border))'
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'hsl(var(--foreground))', marginBottom: 6 }}>No scholarships match your filters</div>
                  <div style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', marginBottom: 20 }}>Try clearing some filters or changing your search</div>
                  <Button variant="outline" onClick={resetFilters}>Clear All Filters</Button>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {filtered.map(sc => {
                  const st = STATUS_DISPLAY[sc.status];
                  const isSaved = saved.has(sc.id);
                  return (
                    <div key={sc.id} className="sc-card-hover" style={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 12, padding: '18px 22px',
                    }}>
                      <div className="sc-card-cols" style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>

                        {/* LEFT: Name + org + description */}
                        <div style={{ flex: '1 1 45%', minWidth: 0, paddingRight: 20 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'hsl(var(--foreground))', letterSpacing: '-0.01em', lineHeight: 1.35, margin: 0 }}>
                              {sc.name}
                            </h3>
                            {/* Bookmark - desktop */}
                            <button onClick={() => toggleSave(sc.id)} style={{
                              background: 'none', border: 'none', cursor: 'pointer',
                              color: isSaved ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                              padding: '0 0 0 8px', flexShrink: 0, transition: 'color 0.15s'
                            }}>
                              {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                            </button>
                          </div>
                          <div style={{ fontSize: 12.5, color: 'hsl(var(--muted-foreground))', marginBottom: 10, fontWeight: 500 }}>
                            {sc.org}
                          </div>
                          <p style={{ fontSize: 13, color: 'hsl(var(--muted-foreground))', lineHeight: 1.55, margin: 0,
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                            {sc.description}
                          </p>
                        </div>

                        {/* MIDDLE: Tags + Eligibility */}
                        <div style={{
                          flex: '0 0 28%', minWidth: 0,
                          borderLeft: '1px solid hsl(var(--border))', paddingLeft: 20, paddingRight: 20
                        }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5, marginBottom: 10 }}>
                            {sc.tags.map(tag => (
                              <span key={tag} style={{
                                fontSize: 11, padding: '3px 8px', borderRadius: 5, fontWeight: 600,
                                background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))',
                                border: '1px solid hsl(var(--border))'
                              }}>{tag}</span>
                            ))}
                          </div>
                          <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
                            <div><span style={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}>Income:</span> {sc.income}</div>
                            <div><span style={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}>Marks:</span> {sc.marks}</div>
                          </div>
                        </div>

                        {/* RIGHT: Amount + Deadline + Status + CTA */}
                        <div className="sc-card-right" style={{
                          flex: '0 0 22%', minWidth: 0,
                          borderLeft: '1px solid hsl(var(--border))', paddingLeft: 20,
                          display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between'
                        }}>
                          <div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: 'hsl(var(--foreground))', marginBottom: 2 }}>
                              {sc.amount}
                            </div>
                            <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', marginBottom: 10 }}>
                              Deadline: <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>{sc.deadline}</span>
                            </div>
                            {/* Status badge */}
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              padding: '3px 9px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                              background: st.bg, color: st.color, border: `1px solid ${st.color}33`,
                              marginBottom: 14
                            }}>
                              {st.dot && <span style={{
                                width: 6, height: 6, borderRadius: '50%', background: st.color,
                                display: 'inline-block', animation: 'pulse-open 1.8s infinite'
                              }} />}
                              {st.label}
                            </span>
                          </div>
                          <a
                            href={sc.link} target="_blank" rel="noreferrer"
                            className="sc-link-btn"
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                              padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 600,
                              background: sc.status === 'closed' ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
                              color: sc.status === 'closed' ? 'hsl(var(--muted-foreground))' : '#fff',
                              textDecoration: 'none',
                              pointerEvents: sc.status === 'closed' ? 'none' as const : 'auto' as const,
                              opacity: sc.status === 'closed' ? 0.6 : 1
                            }}
                          >
                            {sc.status === 'closed' ? 'Closed' : 'View Details'} {sc.status !== 'closed' && <ExternalLink size={12} />}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── SIDEBAR ─── */}
            <div className="sc-sidebar" style={{ width: 240, flexShrink: 0, position: 'sticky' as const, top: 80 }}>

              {/* Closing Soon */}
              <div style={{
                background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
                borderRadius: 12, padding: '16px 18px', marginBottom: 14
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                  <Clock size={14} style={{ color: '#F59E0B' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--foreground))' }}>Closing Soon</span>
                </div>
                {closingSoon.map(sc => (
                  <a key={sc.id} href={sc.link} target="_blank" rel="noreferrer" style={{
                    display: 'block', marginBottom: 12, textDecoration: 'none',
                    paddingBottom: 12, borderBottom: '1px solid hsl(var(--border))'
                  }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: 'hsl(var(--foreground))', lineHeight: 1.3, marginBottom: 3 }}>{sc.name}</div>
                    <div style={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>Deadline: {sc.deadline}</div>
                  </a>
                ))}
              </div>

              {/* Highest Value */}
              <div style={{
                background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
                borderRadius: 12, padding: '16px 18px', marginBottom: 14
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                  <TrendingUp size={14} style={{ color: 'hsl(var(--primary))' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--foreground))' }}>Highest Value</span>
                </div>
                {highValue.map(sc => (
                  <a key={sc.id} href={sc.link} target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 10, textDecoration: 'none', gap: 8
                  }}>
                    <div style={{ fontSize: 12, color: 'hsl(var(--foreground))', fontWeight: 500, lineHeight: 1.3, flex: 1, minWidth: 0 }}>
                      {sc.name.split(' ').slice(0, 4).join(' ')}…
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'hsl(var(--primary))', flexShrink: 0 }}>
                      {sc.amountNum >= 100000 ? `₹${(sc.amountNum / 100000).toFixed(1)}L` : `₹${(sc.amountNum / 1000).toFixed(0)}K`}
                    </span>
                  </a>
                ))}
              </div>

              {/* Quick Links */}
              <div style={{
                background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
                borderRadius: 12, padding: '16px 18px'
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'hsl(var(--foreground))', marginBottom: 12 }}>
                  Official Portals
                </div>
                {[
                  { label: 'NSP — scholarships.gov.in', href: 'https://scholarships.gov.in' },
                  { label: 'UP Scholarship Portal', href: 'https://scholarship.up.gov.in' },
                  { label: 'Buddy4Study', href: 'https://www.buddy4study.com' },
                  { label: 'PFMS Status Check', href: 'https://pfms.nic.in' },
                  { label: 'INSPIRE Scholarship', href: 'https://online-inspire.gov.in' },
                ].map(lnk => (
                  <a key={lnk.label} href={lnk.href} target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontSize: 12, color: 'hsl(var(--muted-foreground))', textDecoration: 'none',
                    padding: '7px 0', borderBottom: '1px solid hsl(var(--border))',
                    transition: 'color 0.15s'
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'hsl(var(--primary))'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'hsl(var(--muted-foreground))'}
                  >
                    {lnk.label} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div style={{ marginTop: 40, padding: '16px 20px', borderRadius: 10, background: 'hsl(var(--muted)/0.5)', border: '1px solid hsl(var(--border))' }}>
            <p style={{ fontSize: 12.5, color: 'hsl(var(--muted-foreground))', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: 'hsl(var(--foreground))' }}>⚠ Disclaimer:</strong> Always verify deadlines and eligibility on official portals before applying.
              Data sourced from: scholarships.gov.in · scholarship.up.gov.in · buddy4study.com · official scholarship websites.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PDF VIEWER MODAL
      ══════════════════════════════════════ */}
      {showPdfModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}
          onClick={e => { if (e.target === e.currentTarget) setShowPdfModal(false); }}
        >
          <div style={{
            background: 'hsl(var(--card))', borderRadius: 16,
            border: '1px solid hsl(var(--border))',
            width: '100%', maxWidth: 860, maxHeight: '90vh',
            display: 'flex', flexDirection: 'column' as const,
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)'
          }}>
            {/* Modal header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 22px', borderBottom: '1px solid hsl(var(--border))'
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'hsl(var(--foreground))' }}>UP Scholarship Guide 2025-26</div>
                <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', marginTop: 2 }}>Step-by-step guide for fresh and renewal applicants</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {UP_PDF_URL !== '#' && (
                  <a href={UP_PDF_URL} download style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '7px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 600,
                    background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))', textDecoration: 'none',
                    border: '1px solid hsl(var(--border))'
                  }}>
                    <Download size={13} /> Download
                  </a>
                )}
                <button onClick={() => setShowPdfModal(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 34, height: 34, borderRadius: 8,
                  background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))',
                  cursor: 'pointer', color: 'hsl(var(--foreground))'
                }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PDF Content area */}
            <div style={{ flex: 1, overflow: 'auto', padding: 20, minHeight: 400 }}>
              {UP_PDF_URL !== '#' ? (
                <iframe
                  src={UP_PDF_URL}
                  title="UP Scholarship Guide"
                  style={{ width: '100%', height: '65vh', border: 'none', borderRadius: 8 }}
                />
              ) : (
                <div style={{
                  height: 400, display: 'flex', flexDirection: 'column' as const,
                  alignItems: 'center', justifyContent: 'center', gap: 16,
                  background: 'hsl(var(--muted)/0.4)', borderRadius: 10,
                  border: '1px dashed hsl(var(--border))'
                }}>
                  <FileText size={36} style={{ color: 'hsl(var(--muted-foreground))' }} />
                  <div style={{ textAlign: 'center' as const }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'hsl(var(--foreground))', marginBottom: 6 }}>PDF Not Configured</div>
                    <div style={{ fontSize: 13, color: 'hsl(var(--muted-foreground))', maxWidth: 360, lineHeight: 1.6 }}>
                      To enable the PDF viewer, open{' '}
                      <code style={{ background: 'hsl(var(--muted))', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>ScholarshipsPortal.tsx</code>
                      {' '}and update <code style={{ background: 'hsl(var(--muted))', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>UP_PDF_URL</code> at the top of the file with your Google Drive or Supabase PDF link.
                    </div>
                  </div>
                  <a
                    href="https://scholarship.up.gov.in"
                    target="_blank" rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                      background: 'hsl(var(--primary))', color: '#fff', textDecoration: 'none'
                    }}
                  >
                    Go to Official Portal <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
