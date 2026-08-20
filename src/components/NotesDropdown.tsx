import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface NoteCategory {
  name: string;
  href: string;
}

export const NOTE_CATEGORIES: NoteCategory[] = [
  { name: "B.Tech Notes", href: "/btech-notes" },
  { name: "BS-MS Notes", href: "/bsms-notes" },
  { name: "BBA Notes", href: "/bba-notes" },
  { name: "MBA Notes", href: "/mba-notes" },
  { name: "DSA Notes", href: "/dsa-notes" },
  { name: "Development Notes", href: "/web-development-notes" },
  { name: "Coding Notes", href: "/coding-study-material" },
  { name: "All Notes", href: "/notes" },
];

export const NotesDropdown = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const isNotesActive = location.pathname.startsWith('/notes') || 
    NOTE_CATEGORIES.some(cat => location.pathname === cat.href);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Link
            to="/notes"
            className={`text-sm font-medium transition-colors relative group py-1 flex items-center gap-1 outline-none ${
              isNotesActive || open ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            <span>Notes</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180 text-primary' : 'text-foreground/60'}`} />
            {/* Animated Bottom Line */}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
              isNotesActive || open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </Link>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          align="start" 
          sideOffset={6}
          className="w-[240px] p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-sm z-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {NOTE_CATEGORIES.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 text-[13px] font-semibold text-slate-800 dark:text-slate-100 hover:bg-[#0a1931] hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors group cursor-pointer"
              >
                <span className="truncate">{item.name}</span>
                <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-white shrink-0 ml-2 opacity-50 group-hover:opacity-100 transition-all" />
              </Link>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotesDropdown;
