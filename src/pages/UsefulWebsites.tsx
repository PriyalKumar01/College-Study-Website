// Useful Websites & Student Portals - Clean Professional Square Grid Design
import React, { useState, useMemo } from 'react';
import { 
  Globe, ExternalLink, Search, Sparkles, CheckCircle2, 
  GraduationCap, BookOpen, Award, FileText, Code2, 
  Building2, Briefcase, Shield, Layers, Laptop
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export interface UsefulPortal {
  id: string;
  name: string;
  url: string;
  category: 'All' | 'HBTU Portals' | 'Scholarships & Schemes' | 'AI & Student Tools' | 'Coding & Career' | 'Learning & Research';
  description: string;
  badge: string;
  highlights: string[];
  icon: React.ElementType;
}

export const USEFUL_PORTALS_DATA: UsefulPortal[] = [
  {
    id: 'ai-chat-to-pdf',
    name: 'AI Chat to PDF',
    url: 'https://www.ai-chat2pdf.live/',
    category: 'AI & Student Tools',
    description: 'Convert shared ChatGPT, Claude, DeepSeek & Gemini conversations into clean, private PDF documents in one click without watermarks.',
    badge: 'Student AI Tool',
    highlights: ['100% Free for Students', 'Private Client-Side PDF', 'No Account Required'],
    icon: Sparkles,
  },
  {
    id: 'hbtu-erp',
    name: 'Student Login (HBTU ERP)',
    url: 'https://erp.hbtu.ac.in/NewIndex.html',
    category: 'HBTU Portals',
    description: 'Official university student portal for semester registration, course choice submission, fee receipts, and semester results.',
    badge: 'Official ERP',
    highlights: ['Semester Registration', 'Fee Receipts', 'Grade Cards & Results'],
    icon: GraduationCap,
  },
  {
    id: 'hbtu-attendance',
    name: 'Student Attendance Portal',
    url: 'https://erp.hbtu.ac.in/StudentAttendance.aspx',
    category: 'HBTU Portals',
    description: 'Real-time daily and subject-wise lecture attendance tracking portal for all university students.',
    badge: 'Live Attendance',
    highlights: ['Daily Lecture Log', 'Subject-wise Percentage', 'Exam Eligibility Check'],
    icon: CheckCircle2,
  },
  {
    id: 'hbtu-official',
    name: 'HBTU Official Website',
    url: 'https://hbtu.ac.in/',
    category: 'HBTU Portals',
    description: 'Harcourt Butler Technical University official portal for notices, examination orders, circulars, and departmental updates.',
    badge: 'Main University Site',
    highlights: ['University Circulars', 'Examination Schedules', 'Department Notices'],
    icon: Building2,
  },
  {
    id: 'up-scholarship',
    name: 'UP Scholarship & Fee Reimbursement',
    url: 'https://scholarship.up.gov.in/index.aspx',
    category: 'Scholarships & Schemes',
    description: 'Uttar Pradesh government post-matric scholarship and fee reimbursement portal for technical and degree college students.',
    badge: 'State Govt. Scheme',
    highlights: ['Post-Matric Application', 'Application Status Check', 'Fee Reimbursement Tracking'],
    icon: Award,
  },
  {
    id: 'digi-shakti',
    name: 'Digi Shakti Portal (Tablet Scheme)',
    url: 'https://digishakti.up.gov.in/',
    category: 'Scholarships & Schemes',
    description: 'UP Government Free Smartphone and Tablet Distribution Scheme (Swami Vivekanand Yuva Sashaktikaran Yojana) portal.',
    badge: 'Device Scheme',
    highlights: ['Student Verification', 'Distribution Status', 'College Mapping'],
    icon: Laptop,
  },
  {
    id: 'nsp-portal',
    name: 'National Scholarship Portal (NSP)',
    url: 'https://scholarships.gov.in/',
    category: 'Scholarships & Schemes',
    description: 'Government of India central gateway for Central Sector Schemes, AICTE Pragati & Saksham scholarships, and minority aids.',
    badge: 'National Portal',
    highlights: ['Central Sector Scheme', 'AICTE Scholarships', 'Direct Benefit Transfer (DBT)'],
    icon: Shield,
  },
  {
    id: 'buddy4study',
    name: 'Buddy4Study Scholarship Portal',
    url: 'https://www.buddy4study.com/scholarships',
    category: 'Scholarships & Schemes',
    description: 'Scholarship discovery portal featuring corporate CSR grants, merit-based scholarships, and financial assistance.',
    badge: 'CSR Scholarships',
    highlights: ['Corporate CSR Grants', 'Merit Fellowships', 'Application Alerts'],
    icon: Award,
  },
  {
    id: 'swayam-nptel',
    name: 'SWAYAM & NPTEL Portal',
    url: 'https://swayam.gov.in/',
    category: 'Learning & Research',
    description: 'Ministry of Education initiative offering free high-quality video courses and credit-transfer certifications curated by IITs and IISc.',
    badge: 'IIT / NPTEL',
    highlights: ['Free Video Lectures', 'Credit-Transfer System', 'IIT Proctored Certificates'],
    icon: BookOpen,
  },
  {
    id: 'virtual-labs',
    name: 'Virtual Labs (Ministry of Education)',
    url: 'https://www.vlab.co.in/',
    category: 'Learning & Research',
    description: 'Remote-access simulation laboratories for engineering and science subjects to perform experiments virtually anytime.',
    badge: 'Remote Simulation',
    highlights: ['Interactive Simulations', 'All Engineering Branches', 'Lab Manuals & Quizzes'],
    icon: Layers,
  },
  {
    id: 'overleaf',
    name: 'Overleaf (LaTeX Editor)',
    url: 'https://www.overleaf.com/',
    category: 'Learning & Research',
    description: 'Cloud-based collaborative LaTeX editor for writing academic research papers, project reports, and IEEE/ACM publications.',
    badge: 'LaTeX Editor',
    highlights: ['IEEE & ACM Templates', 'Real-time Collaboration', 'Cloud Sync'],
    icon: FileText,
  },
  {
    id: 'roadmap-sh',
    name: 'Roadmap.sh Developer Guides',
    url: 'https://roadmap.sh/',
    category: 'Coding & Career',
    description: 'Community-driven interactive career roadmaps, guides, and learning paths for software engineering and modern technology stacks.',
    badge: 'Developer Roadmaps',
    highlights: ['Frontend, Backend, DevOps', 'Computer Science Paths', 'System Design Guides'],
    icon: Code2,
  },
  {
    id: 'leetcode',
    name: 'LeetCode DSA Platform',
    url: 'https://leetcode.com/',
    category: 'Coding & Career',
    description: 'Practice coding interview questions, algorithms, and data structures with an extensive community-curated problem bank.',
    badge: 'DSA & Coding',
    highlights: ['Algorithm Problems', 'Company-Tagged Sets', 'Contest Rating'],
    icon: Code2,
  },
  {
    id: 'internshala',
    name: 'Internshala Student Internships',
    url: 'https://internshala.com/',
    category: 'Coding & Career',
    description: 'Verified internship portal connecting college students with paid software engineering, research, and core engineering internships.',
    badge: 'Internships',
    highlights: ['Verified Companies', 'Stipend Guarantee', 'Summer & Winter Internships'],
    icon: Briefcase,
  },
  {
    id: 'digilocker',
    name: 'DigiLocker Government Vault',
    url: 'https://www.digilocker.gov.in/',
    category: 'AI & Student Tools',
    description: 'Official digital document repository by MeitY to access, store, and legally verify marksheets, Aadhaar, PAN, and academic degrees.',
    badge: 'Govt. Locker',
    highlights: ['Legally Valid Degrees', 'Issued Marksheets', 'Instant Verification'],
    icon: Shield,
  },
];

const CATEGORIES = [
  'All',
  'HBTU Portals',
  'Scholarships & Schemes',
  'AI & Student Tools',
  'Coding & Career',
  'Learning & Research',
] as const;

export const UsefulWebsites: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortals = useMemo(() => {
    return USEFUL_PORTALS_DATA.filter((portal) => {
      const matchesCategory =
        selectedCategory === 'All' || portal.category === selectedCategory;
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Dark Technical Header Section */}
      <div className="bg-slate-900/80 border-b border-slate-800 pt-8 pb-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-400">
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span>DIRECT STUDENT RESOURCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Useful Websites & Student Portals
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Direct, verified links to university ERP portals, state and central scholarship schemes, 
            academic utilities, and developer tools curated for students.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* Controls: Search and Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills (Square-edged) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-none sm:rounded-[3px] border whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-emerald-500/50 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box (Square-edged) */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search website, portal or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-none sm:rounded-[3px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
            />
          </div>
        </div>

        {/* Portals Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800/80 pb-2">
          <span>
            Showing <strong className="text-slate-200">{filteredPortals.length}</strong> resources
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Square Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className="group border border-slate-800 bg-slate-900/90 hover:border-emerald-500/60 transition-all duration-200 p-5 rounded-none sm:rounded-[4px] flex flex-col justify-between hover:shadow-[0_4px_24px_rgba(16,185,129,0.08)] relative"
              >
                <div className="space-y-3.5">
                  {/* Top Row: Square Icon + Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-9 h-9 rounded-none sm:rounded-[3px] bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none sm:rounded-[2px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      {portal.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {portal.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                      {portal.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1 pt-1 border-t border-slate-800/60">
                    {portal.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="w-1 h-1 rounded-none bg-emerald-500/70 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action: Direct Square Link Button */}
                <div className="pt-4 mt-3 border-t border-slate-800">
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-none sm:rounded-[3px] bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-150 border border-slate-700/80 hover:border-emerald-500 cursor-pointer shadow-xs"
                  >
                    <span>Open Website</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPortals.length === 0 && (
          <div className="text-center py-16 border border-slate-800 bg-slate-900/50 rounded-none sm:rounded-[4px] space-y-2">
            <Globe className="h-8 w-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No portals found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-500">Try searching for university ERP, scholarships, or developer tools.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default UsefulWebsites;
