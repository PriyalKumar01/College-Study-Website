import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  BookOpen,
  GraduationCap,
  FileText,
  Trophy,
  ArrowRight,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CuratedNotesMegaMenuProps {
  isActive: boolean;
}

export const CuratedNotesMegaMenu: React.FC<CuratedNotesMegaMenuProps> = ({ isActive }) => {
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
      {/* Trigger: Click goes directly to /notes; Hover opens menu */}
      <Link
        to="/notes"
        className={`text-sm font-medium transition-colors relative group py-1 inline-flex items-center gap-1 ${
          isActive || isOpen ? 'text-primary font-bold' : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        <span>Curated Notes</span>
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

      {/* Mega-Dropdown Panel across the screen */}
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
              {/* Column 1: Engineering Notes (B.Tech) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    B.Tech Engineering
                  </h4>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleItemClick('/notes')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group transition-colors"
                  >
                    <span className="group-hover:text-primary">All Courses Notes</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-blue-400 text-blue-600 dark:text-blue-400">All</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes?course=btech')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Computer Science & IT
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes?course=btech')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Electronics & Electrical (ET/EE)
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes?course=btech')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Mechanical & Civil (ME/CE)
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes?course=btech')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Chemical & Tech Branches (CHE/FT/PT/PL)
                  </button>
                </div>
              </div>

              {/* Column 2: Science & Management */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Science & Management
                  </h4>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleItemClick('/notes?course=bs-ms')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>BS-MS Science & Math</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0">5-Yr</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes?course=bba')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    BBA Management Notes
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes?course=mba')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    MBA Business Admin Notes
                  </button>

                  <button
                    onClick={() => handleItemClick('/cgpa-calculator')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    CGPA / SGPA Calculator
                  </button>
                </div>
              </div>

              {/* Column 3: GATE & Competitive Exam */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    GATE & Competitive
                  </h4>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleItemClick('/gate-study')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between group transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      GATE CSE & Engineering Hub
                    </span>
                    <Badge className="bg-emerald-600 text-white text-[9px] px-1 py-0 rounded-full">NEW</Badge>
                  </button>

                  <button
                    onClick={() => handleItemClick('/gate-study-quiz')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    GATE Topic Quizzes & PYQs
                  </button>

                  <button
                    onClick={() => handleItemClick('/coding-space')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Coding Space (Contests & DSA)
                  </button>

                  <button
                    onClick={() => handleItemClick('/notes-contributors')}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Contributors & Top Scorers
                  </button>
                </div>
              </div>

              {/* Column 4: Quick Launchpad Spotlight */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      Curated Notes Library
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Access 100% verified semester notes, past year papers (PYQs), official syllabi, and faculty reference books.
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => handleItemClick('/notes')}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/20 active:scale-95"
                  >
                    <span>Browse All Notes</span>
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
