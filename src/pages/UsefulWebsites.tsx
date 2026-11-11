// Architecture: curated student web resources and external portal routing
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, ExternalLink, Search, Sparkles, CheckCircle2, ShieldCheck, 
  GraduationCap, BookOpen, Award, ArrowUpRight, Copy, Check, FileText,
  Building2, Layers, Laptop, Share2, Compass
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/providers/ThemeProvider';

export interface UsefulPortal {
  id: string;
  name: string;
  url: string;
  category: 'HBTU Portals' | 'Scholarships & Schemes' | 'AI & Student Tools' | 'Learning & Research';
  description: string;
  badge?: string;
  highlights: string[];
  isFeatured?: boolean;
}

export const USEFUL_PORTALS_DATA: UsefulPortal[] = [
  {
    id: 'ai-chat-to-pdf',
    name: 'AI Chat to PDF',
    url: 'https://www.ai-chat2pdf.live/',
    category: 'AI & Student Tools',
    description: 'Transform ChatGPT, Claude, Gemini & DeepSeek chats into beautifully formatted, readable PDF documents in one click.',
    badge: 'Creator Tool',
    highlights: ['No Account Required', '100% Free for Students', 'Private & Client-Side PDF'],
    isFeatured: true,
  },
  {
    id: 'hbtu-erp',
    name: 'Student Login (HBTU ERP)',
    url: 'https://erp.hbtu.ac.in/NewIndex.html',
    category: 'HBTU Portals',
    description: 'Official university student portal for semester registration, course choice submission, fee receipts, admit cards and semester results.',
    badge: 'Official ERP',
    highlights: ['Semester Registration', 'Fee Receipts', 'Grade Cards & Results'],
  },
  {
    id: 'hbtu-attendance',
    name: 'Student Attendance Portal (HBTU)',
    url: 'https://erp.hbtu.ac.in/StudentAttendance.aspx',
    category: 'HBTU Portals',
    description: 'Real-time daily and subject-wise lecture attendance tracking portal for all university students.',
    badge: 'Live Attendance',
    highlights: ['Daily Lecture Log', 'Subject-wise Percentage', 'Eligibility Verification'],
  },
  {
    id: 'hbtu-official',
    name: 'HBTU Official Website',
    url: 'https://hbtu.ac.in/',
    category: 'HBTU Portals',
    description: 'Harcourt Butler Technical University official portal for notices, examination orders, circulars, department events, and syllabus updates.',
    badge: 'Main Portal',
    highlights: ['University Circulars', 'Exam Schedules', 'Department Notices'],
  },
  {
    id: 'up-scholarship',
    name: 'UP Scholarship & Fee Reimbursement',
    url: 'https://scholarship.up.gov.in/index.aspx',
    category: 'Scholarships & Schemes',
    description: 'Uttar Pradesh government post-matric scholarship and fee reimbursement portal for technical and degree college students.',
    badge: 'Govt. Scheme',
    highlights: ['Post-Matric Application', 'Application Status Check', 'Fee Reimbursement Tracking'],
  },
  {
    id: 'digi-shakti',
    name: 'Digi Shakti Portal (Tablet Scheme)',
    url: 'https://digishakti.up.gov.in/',
    category: 'Scholarships & Schemes',
    description: 'UP Government Free Smartphone and Tablet Distribution Scheme (Swami Vivekanand Yuva Sashaktikaran Yojana) portal.',
    badge: 'Device Scheme',
    highlights: ['Student Verification', 'Distribution Status', 'College Mapping'],
  },
  {
    id: 'buddy4study',
    name: 'Buddy4Study Scholarship Portal',
    url: 'https://www.buddy4study.com/scholarships',
    category: 'Scholarships & Schemes',
    description: 'India’s largest scholarship discovery portal featuring corporate CSR grants, merit-based scholarships, and financial aid for engineering students.',
    badge: 'CSR Scholarships',
    highlights: ['Corporate CSR Grants', 'Merit Fellowships', 'Application Deadlines & Alerts'],
  },
  {
    id: 'nsp-portal',
    name: 'National Scholarship Portal (NSP)',
    url: 'https://scholarships.gov.in/',
    category: 'Scholarships & Schemes',
    description: 'Government of India central gateway for Central Sector Schemes, AICTE Pragati & Saksham scholarships, and minority education aids.',
    badge: 'National Portal',
    highlights: ['Central Sector Scheme', 'AICTE Scholarships', 'Direct Benefit Transfer (DBT)'],
  },
  {
    id: 'swayam-nptel',
    name: 'SWAYAM & NPTEL Portal',
    url: 'https://swayam.gov.in/',
    category: 'Learning & Research',
    description: 'Ministry of Education initiative offering free high-quality video courses and credit-transfer certifications curated by IITs and IISc.',
    badge: 'IIT / NPTEL',
    highlights: ['Free Video Lectures', 'Credit-Transfer System', 'IIT Proctored Certificates'],
  },
  {
    id: 'virtual-labs',
    name: 'Virtual Labs (Ministry of Education)',
    url: 'https://www.vlab.co.in/',
    category: 'Learning & Research',
    description: 'Remote-access simulation laboratories for engineering and science subjects to perform experiments virtually anytime.',
    badge: 'Remote Lab',
    highlights: ['Interactive Simulations', 'All Engineering Branches', 'Lab Manuals & Quizzes'],
  },
  {
    id: 'internshala',
    name: 'Internshala Student Internships',
    url: 'https://internshala.com/',
    category: 'AI & Student Tools',
    description: 'Verified internship platform connecting college students with paid software engineering, research, and core engineering internships.',
    badge: 'Internships',
    highlights: ['Verified Tech Companies', 'Stipend Guarantee', 'Summer & Winter Internships'],
  },
  {
    id: 'digilocker',
    name: 'DigiLocker Government Vault',
    url: 'https://www.digilocker.gov.in/',
    category: 'AI & Student Tools',
    description: 'Official digital document repository by MeitY to access, store, and legally verify marksheets, Aadhaar, PAN, and academic degrees.',
    badge: 'Govt. Locker',
    highlights: ['Legally Valid Degrees', 'Issued Marksheets', 'Instant Verification'],
  },
];

const CATEGORIES = [
  'All Websites',
  'HBTU Portals',
  'Scholarships & Schemes',
  'AI & Student Tools',
  'Learning & Research',
] as const;

export const UsefulWebsites: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Websites');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (url: string, id: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast({
      title: 'Link Copied!',
      description: `${name} direct URL copied to clipboard.`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPortals = useMemo(() => {
    return USEFUL_PORTALS_DATA.filter((portal) => {
      const matchesCategory =
        selectedCategory === 'All Websites' || portal.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        portal.name.toLowerCase().includes(q) ||
        portal.description.toLowerCase().includes(q) ||
        portal.category.toLowerCase().includes(q) ||
        portal.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8faff] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        
        {/* Page Hero Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide">
            <Globe className="h-3.5 w-3.5" />
            <span>OFFICIAL STUDENT RESOURCE DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Useful Websites & Student Portals
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Direct, verified links to university ERP portals, state and central scholarship schemes, 
            academic utilities, and developer tools curated for students.
          </p>
        </div>

        {/* ── FEATURED SPOTLIGHT: AI Chat to PDF (User's Tool) ── */}
        <section aria-label="Featured Tool: AI Chat to PDF">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-blue-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md sm:shadow-lg transition-all hover:border-blue-400/80">
            {/* Top Accent Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

            <div className="p-4 sm:p-7 md:p-8 space-y-6">
              
              {/* Header row with Logo, Title, Badge and Action */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* AI Chat to PDF Custom Visual Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-sm">
                        <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 bg-red-600 text-white font-black text-[9px] px-1 py-0.2 rounded shadow-xs">
                        PDF
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        AI Chat to PDF
                      </h2>
                      <span className="bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 font-extrabold text-[11px] px-2 py-0.5 rounded">
                        PDF
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-[10px] sm:text-[11px] px-2 py-0.5 rounded uppercase tracking-wider">
                        Platform Creator Tool ⭐
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      Convert Chats to Documents
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink('https://www.ai-chat2pdf.live/', 'ai-chat-to-pdf-feat', 'AI Chat to PDF')}
                    className="h-10 px-3.5 border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {copiedId === 'ai-chat-to-pdf-feat' ? (
                      <Check className="h-4 w-4 text-emerald-600 mr-1.5" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-500 mr-1.5" />
                    )}
                    {copiedId === 'ai-chat-to-pdf-feat' ? 'Copied' : 'Copy Link'}
                  </Button>

                  <a
                    href="https://www.ai-chat2pdf.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all"
                  >
                    <span>Paste Your Link Now</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Value proposition badges matching the screenshots */}
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 px-2.5 py-1 rounded">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  No account required
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 px-2.5 py-1 rounded">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  100% Free for students
                </span>
                <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/80 px-2.5 py-1 rounded">
                  <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                  Private & client-side PDF
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Easily convert your shared AI conversations from ChatGPT, Claude, Microsoft Copilot, DeepSeek, and Google Gemini 
                into clean, publication-ready PDF documents without watermarks, subscriptions, or privacy concerns.
              </p>

              {/* Partnership Banner (Exact match to user's uploaded banner screenshot) */}
              <div className="rounded-lg border border-blue-100 dark:border-blue-900/40 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 dark:from-slate-800/70 dark:via-slate-900 dark:to-slate-800/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-slate-700 p-2 shadow-xs shrink-0 flex items-center justify-center">
                    <img
                      src="/lovable-uploads/f3b6ce00-a0ff-4b44-bbdb-ab5640339741.png"
                      alt="College Study Hub"
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <GraduationCap className="h-6 w-6 text-blue-600 fallback-icon hidden" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                      OFFICIAL ACADEMIC PARTNER
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Partnered with College Study – Your Study Hub
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                      Apne semester exams ki poori taiyari karo! Get free access to university semester notes, 
                      branch-wise previous year question papers (PYQs), engineering syllabi, and curated study materials.
                    </p>
                    <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      <span className="text-blue-600 dark:text-blue-400">📖 Free Semester Notes</span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400">📄 Solved PYQ Papers</span>
                      <span>•</span>
                      <span className="text-indigo-600 dark:text-indigo-400">🎓 Engineering Syllabus</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.ai-chat2pdf.live/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-md shadow-xs transition-all shrink-0 self-start sm:self-center"
                >
                  <span>Explore AI Chat to PDF</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── Search Bar & Category Filter Pills ── */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[240px] sm:w-72 shrink-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search portals, ERP, scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-md focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ── Portals Grid (Square Corners & Professional Box Manner) ── */}
        <section aria-label="Portal Directory Grid">
          {filteredPortals.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8">
              <Compass className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No websites found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try searching for different keywords or clear the category filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSelectedCategory('All Websites'); setSearchQuery(''); }}
                className="mt-4 text-xs"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredPortals.map((portal) => {
                const isCopied = copiedId === portal.id;
                return (
                  <div
                    key={portal.id}
                    className="flex flex-col justify-between bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-lg p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-blue-400/80 dark:hover:border-blue-500/50 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Top Row: Category & Status Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {portal.category}
                        </span>
                        {portal.badge && (
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                            portal.badge === 'Creator Tool'
                              ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                              : portal.badge === 'Live Attendance'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                              : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                          }`}>
                            {portal.badge}
                          </span>
                        )}
                      </div>

                      {/* Portal Title */}
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {portal.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {portal.description}
                      </p>

                      {/* Feature Bullet Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {portal.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[10px] font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 px-2 py-0.5 rounded"
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => handleCopyLink(portal.url, portal.id, portal.name)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Copy direct URL"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-emerald-600 text-[11px] font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span className="text-[11px]">Copy Link</span>
                          </>
                        )}
                      </button>

                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-md shadow-xs transition-all group-hover:translate-x-0.5"
                      >
                        <span>Visit Portal</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default UsefulWebsites;
// Reviewed: academic catalog & interface consistency check (v2.0.120)
