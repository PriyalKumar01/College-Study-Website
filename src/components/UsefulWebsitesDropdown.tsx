import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
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
}

export const USEFUL_WEBSITES: UsefulWebsite[] = [
  {
    name: "Student Login (HBTU ERP)",
    url: "https://erp.hbtu.ac.in/NewIndex.html",
    category: "HBTU Portals",
    description: "Semester registration, fee receipts & results",
  },
  {
    name: "Student Attendance (HBTU)",
    url: "https://erp.hbtu.ac.in/StudentAttendance.aspx",
    category: "HBTU Portals",
    description: "Live subject-wise & daily attendance check",
  },
  {
    name: "HBTU Official Website",
    url: "https://hbtu.ac.in/",
    category: "HBTU Portals",
    description: "Circulars, notices, syllabus & university updates",
  },
  {
    name: "UP Scholarship Portal",
    url: "https://scholarship.up.gov.in/index.aspx",
    category: "Scholarships & Schemes",
    description: "Post-matric scholarship & fee reimbursement",
  },
  {
    name: "Digi Shakti Portal (Tablet Scheme)",
    url: "https://digishakti.up.gov.in/",
    category: "Scholarships & Schemes",
    description: "UP Free Tablet / Smartphone Scheme eKYC",
  },
  {
    name: "Buddy4Study Scholarships",
    url: "https://www.buddy4study.com/scholarships",
    category: "Scholarships & Schemes",
    description: "Corporate, CSR & merit scholarships",
  }
];

export const UsefulWebsitesDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1 text-sm font-semibold transition-all py-1.5 px-3 rounded group ${
            open 
              ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' 
              : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <span>Useful Websites</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180 text-slate-900 dark:text-white' : 'text-slate-400'}`} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="start" 
        sideOffset={6}
        className="w-[260px] p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-sm z-50 overflow-hidden"
      >
        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {USEFUL_WEBSITES.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 text-[13px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-[#0a1931] hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors group cursor-pointer"
            >
              <span className="truncate">{item.name}</span>
              <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-white shrink-0 ml-2 opacity-50 group-hover:opacity-100 transition-all" />
            </a>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
