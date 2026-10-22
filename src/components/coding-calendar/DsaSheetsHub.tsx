import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Search,
  Bookmark,
  Shuffle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ExternalLink,
  CheckCircle2,
  Circle,
  Star,
  FileText,
  Building2,
  Users,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  DsaSheet,
  DsaProblem,
  SheetCategory,
  ProblemDifficulty
} from '@/types/dsaSheets';
import { ALL_DSA_SHEETS } from '@/data/dsaSheetsData';
import {
  LeetCodeLogo,
  GfgLogo,
  Code360Logo,
  YouTubeLogo,
  OverlappingCompanyStack
} from './BrandLogos';
import confetti from 'canvas-confetti';

interface DsaSheetsHubProps {
  initialSheetId?: string | null;
  initialCategory?: SheetCategory;
  onOpenCompanyKits?: () => void;
}

export const DsaSheetsHub: React.FC<DsaSheetsHubProps> = ({
  initialSheetId = null,
  initialCategory = 'All',
}) => {
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<SheetCategory>(initialCategory);
  const [hubSearchQuery, setHubSearchQuery] = useState('');

  // Active Sheet State (if viewing a single sheet)
  const [activeSheet, setActiveSheet] = useState<DsaSheet | null>(() => {
    if (initialSheetId) {
      return ALL_DSA_SHEETS.find((s) => s.id === initialSheetId) || null;
    }
    return null;
  });

  // User LocalStorage States
  const [followedSheets, setFollowedSheets] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('csh_followed_sheets');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedProblems, setCompletedProblems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('csh_completed_problems');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarkedProblems, setBookmarkedProblems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('csh_bookmarked_problems');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [problemNotes, setProblemNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('csh_problem_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active Sheet View Filters
  const [sheetSearchQuery, setSheetSearchQuery] = useState('');
  const [problemStatusFilter, setProblemStatusFilter] = useState<'All' | 'Unsolved' | 'Solved' | 'Bookmarked'>('All');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [expandedLectures, setExpandedLectures] = useState<Record<string, boolean>>({});

  // Focused Random Challenge Mode (Isolates a single problem)
  const [randomChallengeProblem, setRandomChallengeProblem] = useState<DsaProblem | null>(null);

  // Unenroll Confirmation Dialog State
  const [unenrollSheetTarget, setUnenrollSheetTarget] = useState<DsaSheet | null>(null);

  // Active Note Modal
  const [activeNoteProblem, setActiveNoteProblem] = useState<DsaProblem | null>(null);
  const [currentNoteText, setCurrentNoteText] = useState('');

  // Enroll in sheet
  const handleEnrollSheet = (sheetId: string) => {
    setFollowedSheets((prev) => {
      const updated = { ...prev, [sheetId]: true };
      try {
        localStorage.setItem('csh_followed_sheets', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563eb', '#10b981', '#f59e0b'],
      });
    } catch {}
  };

  // Confirm unenroll & clear sheet progress
  const handleConfirmUnenroll = () => {
    if (!unenrollSheetTarget) return;
    const sheet = unenrollSheetTarget;

    // Erase completed problems belonging to this sheet
    const updatedCompleted = { ...completedProblems };
    sheet.steps.forEach((s) => {
      s.lectures.forEach((l) => {
        l.problems.forEach((p) => {
          delete updatedCompleted[p.id];
        });
      });
    });

    setCompletedProblems(updatedCompleted);
    try {
      localStorage.setItem('csh_completed_problems', JSON.stringify(updatedCompleted));
    } catch {}

    // Unenroll sheet
    setFollowedSheets((prev) => {
      const updated = { ...prev, [sheet.id]: false };
      try {
        localStorage.setItem('csh_followed_sheets', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setUnenrollSheetTarget(null);
  };

  // Toggle Complete Problem
  const toggleProblemCompleted = (problemId: string) => {
    setCompletedProblems((prev) => {
      const isNowCompleted = !prev[problemId];
      const updated = { ...prev, [problemId]: isNowCompleted };
      try {
        localStorage.setItem('csh_completed_problems', JSON.stringify(updated));
      } catch {}

      if (isNowCompleted) {
        try {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.7 },
          });
        } catch {}
      }

      return updated;
    });
  };

  // Toggle Bookmark Problem
  const toggleProblemBookmark = (problemId: string) => {
    setBookmarkedProblems((prev) => {
      const updated = { ...prev, [problemId]: !prev[problemId] };
      try {
        localStorage.setItem('csh_bookmarked_problems', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Open Notes Modal
  const handleOpenNote = (problem: DsaProblem) => {
    setActiveNoteProblem(problem);
    setCurrentNoteText(problemNotes[problem.id] || '');
  };

  // Save Note
  const handleSaveNote = () => {
    if (!activeNoteProblem) return;
    const updated = { ...problemNotes, [activeNoteProblem.id]: currentNoteText };
    setProblemNotes(updated);
    try {
      localStorage.setItem('csh_problem_notes', JSON.stringify(updated));
    } catch {}
    setActiveNoteProblem(null);
  };

  // Pick Random Unsolved Problem in current sheet (Enters Isolated Mode)
  const handlePickRandomProblem = () => {
    if (!activeSheet) return;
    const allProblems: DsaProblem[] = [];
    activeSheet.steps.forEach((step) => {
      step.lectures.forEach((lec) => {
        lec.problems.forEach((p) => {
          if (!completedProblems[p.id]) {
            allProblems.push(p);
          }
        });
      });
    });

    if (allProblems.length === 0) {
      alert('🎉 You have already solved all problems in this sheet! Reset to practice again.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * allProblems.length);
    setRandomChallengeProblem(allProblems[randomIndex]);
  };

  // Calculate Sheet Completion Stats with Easy, Medium, Hard breakdown
  const getSheetStats = (sheet: DsaSheet) => {
    let total = 0;
    let completed = 0;
    let easyTotal = 0;
    let easyCompleted = 0;
    let medTotal = 0;
    let medCompleted = 0;
    let hardTotal = 0;
    let hardCompleted = 0;

    sheet.steps.forEach((s) => {
      s.lectures.forEach((l) => {
        l.problems.forEach((p) => {
          total++;
          const isDone = Boolean(completedProblems[p.id]);
          if (isDone) completed++;

          const diff = (p.difficulty || '').toLowerCase();
          if (diff === 'easy' || diff === 'basic') {
            easyTotal++;
            if (isDone) easyCompleted++;
          } else if (diff === 'medium') {
            medTotal++;
            if (isDone) medCompleted++;
          } else if (diff === 'hard') {
            hardTotal++;
            if (isDone) hardCompleted++;
          }
        });
      });
    });
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      percentage,
      easyTotal,
      easyCompleted,
      medTotal,
      medCompleted,
      hardTotal,
      hardCompleted,
    };
  };

  // Filter sheets in Hub view
  const filteredSheets = useMemo(() => {
    return ALL_DSA_SHEETS.filter((sheet) => {
      if (selectedCategory === 'All') return true;
      return sheet.category.includes(selectedCategory);
    });
  }, [selectedCategory]);

  // Split into Enrolled & Other
  const enrolledSheets = useMemo(() => {
    return ALL_DSA_SHEETS.filter((s) => Boolean(followedSheets[s.id]));
  }, [followedSheets]);

  const nonEnrolledSheets = useMemo(() => {
    return filteredSheets.filter((s) => !followedSheets[s.id]);
  }, [filteredSheets, followedSheets]);

  // Categories list
  const categoriesList: SheetCategory[] = [
    'Company Wise',
    'All',
    'Popular',
    'Quick Revision',
    'Complete DSA',
    'Topic Specific',
    'Competitive',
  ];

  // Helper for difficulty colors
  const getDifficultyBadge = (difficulty: ProblemDifficulty) => {
    switch (difficulty) {
      case 'Basic':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300/40';
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300/40';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LeetCode':
        return <LeetCodeLogo className="w-4 h-4" />;
      case 'Code360':
        return <Code360Logo className="w-4 h-4" />;
      case 'GeeksforGeeks':
        return <GfgLogo className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // -----------------------------------------------------------------
  // VIEW 1: INTERACTIVE SINGLE SHEET VIEW
  // -----------------------------------------------------------------
  if (activeSheet) {
    const stats = getSheetStats(activeSheet);
    const isEnrolled = Boolean(followedSheets[activeSheet.id]);

    // Concentric Circular Gauge parameters
    // Track 1 (Easy): radius 27
    // Track 2 (Med): radius 20
    // Track 3 (Hard): radius 13
    const cEasy = 2 * Math.PI * 27;
    const offsetEasy = stats.easyTotal > 0
      ? cEasy - (stats.easyCompleted / stats.easyTotal) * cEasy
      : cEasy;

    const cMed = 2 * Math.PI * 20;
    const offsetMed = stats.medTotal > 0
      ? cMed - (stats.medCompleted / stats.medTotal) * cMed
      : cMed;

    const cHard = 2 * Math.PI * 13;
    const offsetHard = stats.hardTotal > 0
      ? cHard - (stats.hardCompleted / stats.hardTotal) * cHard
      : cHard;

    return (
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <button
                onClick={() => {
                  setActiveSheet(null);
                  setRandomChallengeProblem(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back to All Sheets
              </button>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {activeSheet.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
                {activeSheet.description}
              </p>
            </div>

            {/* Top Right: Multi-Tier Circular Progress Gauge (Easy, Medium, Hard breakdown) */}
            <div className="flex items-center gap-3.5 shrink-0 bg-slate-50 dark:bg-slate-950/70 p-2.5 rounded-sm border border-slate-200 dark:border-slate-800">
              {/* Concentric Gauge */}
              <div
                className="relative flex items-center justify-center cursor-pointer"
                title={`Total Solved: ${stats.completed}/${stats.total} (${stats.percentage}%) | Easy: ${stats.easyCompleted}/${stats.easyTotal} | Med: ${stats.medCompleted}/${stats.medTotal} | Hard: ${stats.hardCompleted}/${stats.hardTotal}`}
              >
                <svg className="w-16 h-16 transform -rotate-90">
                  {/* Outer track: Easy (Emerald) */}
                  <circle cx="32" cy="32" r="27" className="text-slate-200 dark:text-slate-800" strokeWidth="3" stroke="currentColor" fill="transparent" />
                  <circle
                    cx="32" cy="32" r="27"
                    className="text-emerald-500 transition-all duration-500 ease-out"
                    strokeWidth="3"
                    strokeDasharray={cEasy}
                    strokeDashoffset={offsetEasy}
                    strokeLinecap="round" stroke="currentColor" fill="transparent"
                  />
                  {/* Middle track: Medium (Amber) */}
                  <circle cx="32" cy="32" r="20" className="text-slate-200 dark:text-slate-800" strokeWidth="3" stroke="currentColor" fill="transparent" />
                  <circle
                    cx="32" cy="32" r="20"
                    className="text-amber-500 transition-all duration-500 ease-out"
                    strokeWidth="3"
                    strokeDasharray={cMed}
                    strokeDashoffset={offsetMed}
                    strokeLinecap="round" stroke="currentColor" fill="transparent"
                  />
                  {/* Inner track: Hard (Rose) */}
                  <circle cx="32" cy="32" r="13" className="text-slate-200 dark:text-slate-800" strokeWidth="3" stroke="currentColor" fill="transparent" />
                  <circle
                    cx="32" cy="32" r="13"
                    className="text-rose-500 transition-all duration-500 ease-out"
                    strokeWidth="3"
                    strokeDasharray={cHard}
                    strokeDashoffset={offsetHard}
                    strokeLinecap="round" stroke="currentColor" fill="transparent"
                  />
                </svg>

                {/* Center text: Percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white">
                    {stats.percentage}%
                  </span>
                </div>
              </div>

              {/* Breakdown Labels next to the circle */}
              <div className="flex flex-col gap-0.5 text-[11px] font-bold">
                <div className="flex items-center justify-between gap-2.5">
                  <span className="flex items-center gap-1 text-slate-500 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Easy
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">
                    {stats.easyCompleted}/{stats.easyTotal}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="flex items-center gap-1 text-slate-500 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Med
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold text-[10px]">
                    {stats.medCompleted}/{stats.medTotal}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="flex items-center gap-1 text-slate-500 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> Hard
                  </span>
                  <span className="text-rose-600 dark:text-rose-400 font-extrabold text-[10px]">
                    {stats.hardCompleted}/{stats.hardTotal}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Enroll & Pick Random */}
              <div className="flex flex-col sm:flex-row items-center gap-1.5 pl-2.5 border-l border-slate-200 dark:border-slate-800">
                {isEnrolled ? (
                  <button
                    onClick={() => setUnenrollSheetTarget(activeSheet)}
                    className="h-8 px-2.5 rounded-sm text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-colors flex items-center shadow-xs"
                    title="Click to unenroll"
                  >
                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnrollSheet(activeSheet.id)}
                    className="h-8 px-3 rounded-sm text-xs font-black bg-slate-900 hover:bg-black text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors shadow-xs"
                  >
                    Enroll Now
                  </button>
                )}

                <button
                  onClick={handlePickRandomProblem}
                  className="h-8 px-2.5 rounded-sm text-xs font-black bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center shadow-xs"
                >
                  <Shuffle className="w-3.5 h-3.5 mr-1" />
                  Random
                </button>
              </div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500">Filter Problems:</span>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg text-xs font-bold">
              {(['All', 'Unsolved', 'Solved', 'Bookmarked'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setProblemStatusFilter(status)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    problemStatusFilter === status
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* FOCUSED RANDOM CHALLENGE MODE (Isolates single problem when active) */}
        {/* ----------------------------------------------------------------- */}
        {randomChallengeProblem ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <Shuffle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Random Challenge Problem
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Solve this isolated question without distractions.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePickRandomProblem}
                  className="h-8 px-3 rounded-sm text-xs font-bold bg-slate-900 hover:bg-black text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors flex items-center shadow-xs"
                >
                  <Shuffle className="w-3.5 h-3.5 mr-1" /> Pick Another
                </button>
                <button
                  onClick={() => setRandomChallengeProblem(null)}
                  className="h-8 px-3 rounded-sm text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center shadow-xs"
                >
                  <X className="w-3.5 h-3.5 mr-1" /> Exit Random Mode
                </button>
              </div>
            </div>

            {/* The Isolated Problem Card */}
            <div className="p-4 sm:p-5 rounded-sm border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleProblemCompleted(randomChallengeProblem.id)}
                  className="shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {completedProblems[randomChallengeProblem.id] ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {randomChallengeProblem.title}
                    </h4>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm border ${getDifficultyBadge(
                        randomChallengeProblem.difficulty
                      )}`}
                    >
                      {randomChallengeProblem.difficulty}
                    </span>
                  </div>

                  {randomChallengeProblem.companies && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <OverlappingCompanyStack companies={randomChallengeProblem.companies} />
                      <span className="text-[10px] font-bold text-slate-500">
                        Frequently asked in {randomChallengeProblem.companies.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                {randomChallengeProblem.youtubeUrl && (
                  <a
                    href={randomChallengeProblem.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-sm bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5"
                  >
                    <YouTubeLogo className="w-4 h-4" /> Watch Video
                  </a>
                )}

                <a
                  href={randomChallengeProblem.problemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {getPlatformIcon(randomChallengeProblem.platform)} Solve on {randomChallengeProblem.platform} ↗
                </a>

                <button
                  onClick={() => toggleProblemBookmark(randomChallengeProblem.id)}
                  className="p-1.5 rounded-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-amber-500"
                >
                  <Star
                    className={`w-4 h-4 ${
                      bookmarkedProblems[randomChallengeProblem.id]
                        ? 'fill-amber-400 text-amber-500'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ----------------------------------------------------------------- */
          /* FULL STEP & LECTURE ACCORDION TREE (No duplicated string counts!) */
          /* ----------------------------------------------------------------- */
          <div className="space-y-4">
            {activeSheet.steps.map((step, sIdx) => {
              // Dynamic Step Completed / Total calculation
              let stepTotal = 0;
              let stepCompleted = 0;
              step.lectures.forEach((l) => {
                l.problems.forEach((p) => {
                  stepTotal++;
                  if (completedProblems[p.id]) stepCompleted++;
                });
              });

              const isStepDone = stepTotal > 0 && stepCompleted === stepTotal;
              const isStepExpanded = expandedSteps[step.id] ?? sIdx === 0;

              return (
                <div
                  key={step.id}
                  className={`border rounded-xl overflow-hidden shadow-sm transition-all ${
                    isStepDone
                      ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  {/* Step Header Accordion Toggle */}
                  <button
                    onClick={() =>
                      setExpandedSteps((prev) => ({
                        ...prev,
                        [step.id]: !isStepExpanded,
                      }))
                    }
                    className={`w-full p-4 sm:p-4.5 flex items-center justify-between text-left transition-colors border-b ${
                      isStepDone
                        ? 'bg-emerald-500/15 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-900 dark:text-emerald-100'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-black">
                        {step.title}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold ${
                          isStepDone
                            ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60'
                            : 'border-slate-300 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        {stepCompleted} / {stepTotal}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {isStepDone && (
                        <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 fill-emerald-500/20 text-emerald-600 dark:text-emerald-400" />
                          <span>Completed</span>
                        </span>
                      )}
                      {isStepExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Step Content: Lectures list */}
                  {isStepExpanded && (
                    <div className="p-3 sm:p-4 space-y-3 bg-slate-50/30 dark:bg-slate-950/20">
                      {step.lectures.map((lec, lIdx) => {
                        let lecTotal = 0;
                        let lecCompleted = 0;
                        lec.problems.forEach((p) => {
                          lecTotal++;
                          if (completedProblems[p.id]) lecCompleted++;
                        });

                        const isLecDone = lecTotal > 0 && lecCompleted === lecTotal;
                        const isLecExpanded = expandedLectures[lec.id] ?? lIdx === 0;

                        // Filter problems by search & status
                        const visibleProblems = lec.problems.filter((p) => {
                          const matchesSearch =
                            p.title.toLowerCase().includes(sheetSearchQuery.toLowerCase()) ||
                            p.tags?.some((t) => t.toLowerCase().includes(sheetSearchQuery.toLowerCase())) ||
                            p.companies?.some((c) => c.toLowerCase().includes(sheetSearchQuery.toLowerCase()));

                          if (!matchesSearch) return false;

                          if (problemStatusFilter === 'Solved') return completedProblems[p.id];
                          if (problemStatusFilter === 'Unsolved') return !completedProblems[p.id];
                          if (problemStatusFilter === 'Bookmarked') return bookmarkedProblems[p.id];
                          return true;
                        });

                        if (visibleProblems.length === 0 && (sheetSearchQuery || problemStatusFilter !== 'All')) {
                          return null;
                        }

                        return (
                          <div
                            key={lec.id}
                            className={`border rounded-lg overflow-hidden shadow-sm ${
                              isLecDone
                                ? 'border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                            }`}
                          >
                            {/* Lecture Header Accordion */}
                            <button
                              onClick={() =>
                                setExpandedLectures((prev) => ({
                                  ...prev,
                                  [lec.id]: !isLecExpanded,
                                }))
                              }
                              className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors border-b ${
                                isLecDone
                                  ? 'bg-emerald-500/15 dark:bg-emerald-950/30 border-emerald-500/30 text-emerald-900 dark:text-emerald-100 font-bold'
                                  : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-xs sm:text-sm font-bold">
                                  {lec.title}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  isLecDone
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                    : 'text-slate-500 bg-slate-200/50 dark:bg-slate-800'
                                }`}>
                                  {lecCompleted} / {lecTotal}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {isLecDone && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20 shrink-0" />
                                )}
                                {isLecExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                )}
                              </div>
                            </button>

                            {/* Problem Rows List */}
                            {isLecExpanded && (
                              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                                {visibleProblems.map((p) => {
                                  const isSolved = Boolean(completedProblems[p.id]);
                                  const isStarred = Boolean(bookmarkedProblems[p.id]);
                                  const hasNote = Boolean(problemNotes[p.id]);

                                  return (
                                    <div
                                      key={p.id}
                                      className={`px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                                        isSolved
                                          ? 'bg-emerald-500/5 dark:bg-emerald-950/10'
                                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'
                                      }`}
                                    >
                                      {/* Left: Checkbox + Title + Company Badges */}
                                      <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <button
                                          onClick={() => toggleProblemCompleted(p.id)}
                                          className="shrink-0 text-slate-400 hover:text-emerald-600 transition-colors"
                                          title={isSolved ? 'Mark as Unsolved' : 'Mark as Completed'}
                                        >
                                          {isSolved ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                          ) : (
                                            <Circle className="w-5 h-5" />
                                          )}
                                        </button>

                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <a
                                              href={p.problemUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className={`text-xs sm:text-sm font-semibold truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                                                isSolved
                                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                                  : 'text-slate-800 dark:text-slate-100'
                                              }`}
                                            >
                                              {p.title}
                                            </a>
                                          </div>

                                          {/* Company Stack & Tags */}
                                          {p.companies && p.companies.length > 0 && (
                                            <div className="flex items-center gap-1.5 mt-1">
                                              <OverlappingCompanyStack companies={p.companies} />
                                              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                                                {p.companies.join(', ')}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Right: Difficulty + Action Icons (Original Logos) */}
                                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                        {/* Difficulty Badge */}
                                        <span
                                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${getDifficultyBadge(
                                            p.difficulty
                                          )}`}
                                        >
                                          {p.difficulty}
                                        </span>

                                        {/* YouTube Video Link */}
                                        {p.youtubeUrl ? (
                                          <a
                                            href={p.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                            title="Watch Video Solution"
                                          >
                                            <YouTubeLogo className="w-4 h-4" />
                                          </a>
                                        ) : (
                                          <div className="w-4" />
                                        )}

                                        {/* Original Problem Platform Link */}
                                        <a
                                          href={p.problemUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                          title={`Practice on ${p.platform}`}
                                        >
                                          {getPlatformIcon(p.platform)}
                                        </a>

                                        {/* Star Bookmark */}
                                        <button
                                          onClick={() => toggleProblemBookmark(p.id)}
                                          className={`p-1 rounded-md transition-colors ${
                                            isStarred
                                              ? 'text-amber-500'
                                              : 'text-slate-400 hover:text-amber-500'
                                          }`}
                                          title={isStarred ? 'Remove Bookmark' : 'Bookmark Problem'}
                                        >
                                          <Star
                                            className={`w-4 h-4 ${
                                              isStarred ? 'fill-amber-400 text-amber-500' : ''
                                            }`}
                                          />
                                        </button>

                                        {/* Personal Revision Note */}
                                        <button
                                          onClick={() => handleOpenNote(p)}
                                          className={`p-1 rounded-md transition-colors ${
                                            hasNote
                                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                                              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                          }`}
                                          title={hasNote ? 'Edit Notes' : 'Add Revision Notes'}
                                        >
                                          <FileText className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* UNENROLL CONFIRMATION MODAL */}
        {/* ----------------------------------------------------------------- */}
        {unenrollSheetTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
              onClick={() => setUnenrollSheetTarget(null)}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 z-10 space-y-4">
              <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Reset & Unenroll Roadmap?
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Are you sure you want to unenroll from <strong>{unenrollSheetTarget.title}</strong>? All your checked problems and progress data for this sheet will be completely erased.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUnenrollSheetTarget(null)}
                  className="rounded-lg text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirmUnenroll}
                  className="rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                >
                  Yes, Erase & Unenroll
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Problem Notes Modal */}
        {activeNoteProblem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
              onClick={() => setActiveNoteProblem(null)}
            />
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-2xl p-6 z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                    Personal Revision Notes
                  </Badge>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                    {activeNoteProblem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveNoteProblem(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>

              <textarea
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                placeholder="Write your approach notes, time complexity caveats, edge cases, or tricky bit patterns here..."
                rows={6}
                className="w-full text-xs p-3 rounded-sm bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveNoteProblem(null)}
                  className="h-8 px-3 rounded-sm text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="h-8 px-3.5 rounded-sm text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -----------------------------------------------------------------
  // VIEW 2: SHEETS HUB DIRECTORY (Enrolled vs Explore All)
  // -----------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Top Categories Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 sm:p-3 rounded-sm shadow-sm">
        {/* Category Pills (Negligible rounding: rounded-sm) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: MY ENROLLED ROADMAPS (Active Recent Trackers) */}
      {/* ------------------------------------------------------------- */}
      {enrolledSheets.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              My Enrolled Roadmaps ({enrolledSheets.length})
            </h3>
            <span className="text-xs text-slate-400">
              Pick up where you left off
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {enrolledSheets.map((sheet) => {
              const stats = getSheetStats(sheet);

              return (
                <div
                  key={sheet.id}
                  onClick={() => setActiveSheet(sheet)}
                  className="bg-emerald-50/20 dark:bg-emerald-950/15 border-2 border-emerald-500/60 dark:border-emerald-500/50 ring-1 ring-emerald-500/20 rounded-sm p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-3.5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded-sm border border-emerald-500/40 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Enrolled
                      </span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {stats.percentage}% Solved
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">
                      {sheet.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {sheet.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-emerald-500/20">
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-sm transition-all"
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span>{stats.completed} of {stats.total} Completed</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 hover:underline">
                        Continue ➔
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: EXPLORE CURATED ROADMAPS */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'All Roadmaps' : `${selectedCategory} Roadmaps`}
          </h3>
          <span className="text-xs text-slate-400">
            {nonEnrolledSheets.length} available to enroll
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {nonEnrolledSheets.map((sheet) => {
            return (
              <div
                key={sheet.id}
                onClick={() => setActiveSheet(sheet)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-4 sm:p-5 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between cursor-pointer space-y-3.5 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">
                      {sheet.creator}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      👥 {sheet.followersCount.toLocaleString()}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {sheet.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    {sheet.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    {sheet.totalQuestions} questions
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnrollSheet(sheet.id);
                    }}
                    className="h-8 px-3 rounded-sm text-xs font-black bg-slate-900 hover:bg-black text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors shadow-xs"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
