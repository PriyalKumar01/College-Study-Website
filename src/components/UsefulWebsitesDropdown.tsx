import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  GraduationCap, 
  ShieldCheck, 
  CalendarCheck, 
  Award, 
  Sparkles, 
  Tablet, 
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
  category: "HBTU Portals" | "Scholarships" | "Student Schemes";
  description: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ElementType;
}

export const USEFUL_WEBSITES: UsefulWebsite[] = [
  {
    name: "HBTU Official Website",
    url: "https://hbtu.ac.in/",
    category: "HBTU Portals",
    description: "Official circulars, notifications, notices & academic news",
    badge: "Official",
    badgeColor: "bg-blue-500/15 text-blue-500 dark:text-blue-400 border-blue-500/30",
    icon: GraduationCap
  },
  {
    name: "HBTU ERP Portal",
    url: "https://erp.hbtu.ac.in/NewIndex.html",
    category: "HBTU Portals",
    description: "Student login, semester registration, fee receipts & results",
    badge: "ERP Login",
    badgeColor: "bg-indigo-500/15 text-indigo-500 dark:text-indigo-400 border-indigo-500/30",
    icon: ShieldCheck
  },
  {
    name: "HBTU Attendance Portal",
    url: "https://erp.hbtu.ac.in/StudentAttendance.aspx",
    category: "HBTU Portals",
    description: "Direct subject-wise & daily attendance percentage check",
    badge: "Live Check",
    badgeColor: "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30",
    icon: CalendarCheck
  },
  {
    name: "UP Scholarship Portal",
    url: "https://scholarship.up.gov.in/index.aspx",
    category: "Scholarships",
    description: "UP State post-matric scholarship & fee reimbursement portal",
    badge: "Gov UP",
    badgeColor: "bg-purple-500/15 text-purple-500 dark:text-purple-400 border-purple-500/30",
    icon: Award
  },
  {
    name: "Buddy4Study Scholarships",
    url: "https://www.buddy4study.com/scholarships",
    category: "Scholarships",
    description: "Pan-India private, CSR & merit-cum-means scholarship opportunities",
    badge: "Scholarships",
    badgeColor: "bg-amber-500/15 text-amber-500 dark:text-amber-400 border-amber-500/30",
    icon: Sparkles
  },
  {
    name: "Digi Shakti Portal (Tablet/Mobile)",
    url: "https://digishakti.up.gov.in/",
    category: "Student Schemes",
    description: "UP Free Smartphone/Tablet Scheme — eKYC check & status",
    badge: "eKYC / Tablet",
    badgeColor: "bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30",
    icon: Tablet
  }
];

export const UsefulWebsitesDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1.5 text-sm font-medium transition-all py-1 px-2.5 rounded-lg group ${
            open 
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-slate-800/80' 
              : 'text-foreground/80 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Globe className="h-4 w-4 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
          <span>Useful Websites</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180 text-blue-500' : 'text-muted-foreground'}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="start" 
        sideOffset={8}
        className="w-[360px] p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 mb-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Essential Portals</p>
              <p className="text-[10px] text-muted-foreground">Quick access for college students</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
            6 Verified
          </span>
        </div>

        <div className="space-y-1 max-h-[380px] overflow-y-auto custom-scrollbar py-1">
          {USEFUL_WEBSITES.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all group relative border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60"
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 mt-0.5 shadow-sm">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md border shrink-0 ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                    {item.description}
                  </p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all shrink-0 mt-1" />
              </a>
            );
          })}
        </div>

        <div className="mt-1 pt-2 border-t border-slate-100 dark:border-slate-800/80 px-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Official & verified URLs</span>
          <span className="text-blue-500 hover:underline cursor-default">College Study Hub</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
