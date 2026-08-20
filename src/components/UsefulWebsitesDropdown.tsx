import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  GraduationCap, 
  ShieldCheck, 
  CalendarCheck, 
  Award, 
  Sparkles, 
  Smartphone, 
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface UsefulWebsite {
  name: string;
  url: string;
  category: "HBTU Portals" | "Scholarships & Schemes";
  description: string;
  badge?: string;
  icon: React.ElementType;
}

export const USEFUL_WEBSITES: UsefulWebsite[] = [
  {
    name: "HBTU Official Website",
    url: "https://hbtu.ac.in/",
    category: "HBTU Portals",
    description: "Circulars, notices, syllabus & university updates",
    badge: "Official",
    icon: GraduationCap
  },
  {
    name: "Student Login (HBTU ERP)",
    url: "https://erp.hbtu.ac.in/NewIndex.html",
    category: "HBTU Portals",
    description: "Semester registration, fee receipts & results",
    badge: "ERP Portal",
    icon: ShieldCheck
  },
  {
    name: "HBTU Attendance Portal",
    url: "https://erp.hbtu.ac.in/StudentAttendance.aspx",
    category: "HBTU Portals",
    description: "Subject-wise & aggregate attendance (75% rule)",
    badge: "Attendance",
    icon: CalendarCheck
  },
  {
    name: "UP Scholarship Portal",
    url: "https://scholarship.up.gov.in/index.aspx",
    category: "Scholarships & Schemes",
    description: "Post-matric scholarship & fee reimbursement",
    badge: "Govt UP",
    icon: Award
  },
  {
    name: "Digi Shakti Portal (Tablet/Phone)",
    url: "https://digishakti.up.gov.in/",
    category: "Scholarships & Schemes",
    description: "UP Free Tablet Scheme — eKYC check & status",
    badge: "eKYC Check",
    icon: Smartphone
  },
  {
    name: "Buddy4Study Scholarships",
    url: "https://www.buddy4study.com/scholarships",
    category: "Scholarships & Schemes",
    description: "Pan-India corporate, CSR & merit scholarships",
    badge: "Scholarships",
    icon: Sparkles
  }
];

export const UsefulWebsitesDropdown = () => {
  const [open, setOpen] = useState(false);

  const hbtuPortals = USEFUL_WEBSITES.filter(site => site.category === "HBTU Portals");
  const scholarshipPortals = USEFUL_WEBSITES.filter(site => site.category === "Scholarships & Schemes");

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-1.5 px-3 rounded-lg group ${
            open 
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-slate-800' 
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Globe className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
          <span>Useful Websites</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="start" 
        sideOffset={8}
        className="w-[340px] p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95"
      >
        {/* Header banner */}
        <div className="bg-slate-900 dark:bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-bold tracking-wide uppercase">Official Portals & Schemes</span>
          </div>
          <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
            HBTU
          </span>
        </div>

        <div className="p-1.5 max-h-[420px] overflow-y-auto">
          {/* Section 1: HBTU Portals */}
          <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            HBTU Official Portals
          </div>
          <div className="space-y-0.5 mb-2">
            {hbtuPortals.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate leading-snug">{item.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.description}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

          {/* Section 2: Scholarships & Government Schemes */}
          <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Scholarships & Govt Schemes
          </div>
          <div className="space-y-0.5">
            {scholarshipPortals.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate leading-snug">{item.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.description}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-950/60 px-3 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
          <span>Verified direct links</span>
          <span className="font-medium text-indigo-600 dark:text-indigo-400">HBTU Kanpur</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
