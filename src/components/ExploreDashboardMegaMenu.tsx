import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  BookOpen,
  GraduationCap,
  FileText,
  Trophy,
  Calculator,
  Code,
  Lock,
  Briefcase,
  Sparkles,
  Brain,
  Users,
  Info,
  ArrowRight,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MegaMenuProps {
  isActive: boolean;
}

export const ExploreDashboardMegaMenu: React.FC<MegaMenuProps> = ({ isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const handleItemClick = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navbar Trigger Button: Click navigates to /dashboard; Hover opens mega-menu */}
      <Link
        to="/dashboard"
        className={`text-sm font-medium transition-colors relative group py-1 inline-flex items-center gap-1 ${
          isActive || isOpen ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        <span>Explore Dashboard</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
            isActive || isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </Link>

      {/* Mega-Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-auto xl:right-auto xl:w-[1200px] xl:-translate-x-1/2 xl:left-1/2 top-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-6 sm:p-7 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Column 1: Academics & Study Hub */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <GraduationCap className="h-4 w-4 text-indigo-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Academics & Notes
                  </h4>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleItemClick('/notes')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group transition-colors"
                  >
                    <span className="group-hover:text-primary">All Courses Notes</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-indigo-400 text-indigo-600 dark:text-indigo-400">All</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/btech-notes')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    B.Tech Engineering Notes
                  </button>

                  <button
                    onClick={() => handleItemClick('/bsms-notes')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    BS-MS Science Notes
                  </button>

                  <button
                    onClick={() => handleItemClick('/bba-notes')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    BBA & MBA Management
                  </button>

                  <button
                    onClick={() => handleItemClick('/gate-study')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between group transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Trophy className="h-3.5 w-3.5" />
                      GATE Study Exam Hub
                    </span>
                    <Badge className="bg-emerald-600 text-white text-[9px] px-1 py-0 rounded-xs">NEW</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/cgpa-calculator')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    CGPA / SGPA Calculator
                  </button>
                </div>
              </div>

              {/* Column 2: Career & Coding */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Code className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Coding & Career
                  </h4>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleItemClick('/coding-space')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between group transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Code className="h-3.5 w-3.5" />
                      Coding Space (Contests)
                    </span>
                    <Badge className="bg-emerald-600 text-white text-[9px] px-1 py-0 rounded-xs">LIVE</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/coding-space?tab=sheets')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Curated DSA Sheets Hub
                  </button>

                  <button
                    onClick={() => handleItemClick('/opportunities')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>Off-Campus Opportunities</span>
                    <Briefcase className="h-3 w-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => handleItemClick('/scholarship-portal')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Scholarships & Grants
                  </button>

                  <button
                    onClick={() => handleItemClick('/premium-content')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center justify-between group transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" />
                      Premium Content
                    </span>
                    <Badge className="bg-amber-600 text-white text-[9px] px-1 py-0 rounded-xs">PRO</Badge>
                  </button>
                </div>
              </div>

              {/* Column 3: Tools & Community */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Tools & Community
                  </h4>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleItemClick('/useful-ai-tools')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group transition-colors"
                  >
                    <span>500+ Curated AI Tools</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-purple-400 text-purple-600 dark:text-purple-400">AI</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes-contributors')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Notes Contributors & Admins
                  </button>

                  <button
                    onClick={() => handleItemClick('/about')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    About College Study Hub
                  </button>

                  <button
                    onClick={() => handleItemClick('/useful-websites')}
                    className="w-full text-left p-1.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Recommended Dev Websites
                  </button>
                </div>
              </div>

              {/* Column 4: Quick Launchpad Spotlight */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-sm bg-indigo-600 flex items-center justify-center text-white">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      Explore Dashboard
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Access your complete academic hub: curated notes, GATE prep, live coding contests, and verified hiring roadmaps.
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => handleItemClick('/dashboard')}
                    className="w-full py-2 px-3 rounded-sm bg-slate-900 hover:bg-black text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Open Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
