import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Calendar as CalendarIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  CalendarPlus,
  AlertTriangle,
  RotateCcw,
  X,
  Globe,
  Check,
  ListFilter,
  LayoutGrid,
  Users,
  CheckCircle2
} from 'lucide-react';
import { ContestEvent } from '@/types/codingProfile';
import { buildGoogleCalendarUrl } from '@/lib/codingProfileUtils';
import {
  LeetCodeLogo,
  CodeforcesLogo,
  CodeChefLogo,
  AtCoderLogo,
  Code360Logo,
  GfgLogo
} from './BrandLogos';

interface ContestCalendarViewProps {
  contests: ContestEvent[];
  onOpenCompanyKits?: () => void;
}

interface PopoverAnchor {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ContestCalendarView: React.FC<ContestCalendarViewProps> = ({
  contests,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'agenda'>('month');

  // "Select Platform" Filter Popover
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // GFG is unticked by default as requested: "gfg untick rahe calender me kyuki usme contest hona abhi band hai"
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'LeetCode',
    'CodeChef',
    'CodeForces',
    'AtCoder',
    'Code360',
  ]);

  const filterRef = useRef<HTMLDivElement>(null);

  // Active Contest Popover (Anchored near click target, Codolio style)
  const [activeContest, setActiveContest] = useState<ContestEvent | null>(null);
  const [activeDayContests, setActiveDayContests] = useState<{
    date: Date;
    contests: ContestEvent[];
  } | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<PopoverAnchor | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  const allPlatforms = [
    { name: 'LeetCode', label: 'LeetCode' },
    { name: 'CodeForces', label: 'Codeforces' },
    { name: 'CodeChef', label: 'CodeChef' },
    { name: 'AtCoder', label: 'AtCoder' },
    { name: 'Code360', label: 'Code360 (Naukri)' },
    { name: 'GeeksForGeeks', label: 'GeeksforGeeks' },
  ];

  const togglePlatform = (plat: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(plat)) {
        if (prev.length === 1) return prev;
        return prev.filter((p) => p !== plat);
      }
      return [...prev, plat];
    });
  };

  const resetPlatforms = () => {
    setSelectedPlatforms(['LeetCode', 'CodeChef', 'CodeForces', 'AtCoder', 'Code360']);
  };

  // Month navigation
  const prevMonth = () => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Filtered contests
  const filteredContests = useMemo(() => {
    return contests.filter((c) => {
      const pNorm = c.platform.toLowerCase();
      return selectedPlatforms.some((sp) => {
        const spNorm = sp.toLowerCase();
        if (spNorm === 'codeforces') return pNorm.includes('codeforces');
        if (spNorm === 'codechef') return pNorm.includes('codechef');
        if (spNorm === 'leetcode') return pNorm.includes('leetcode');
        if (spNorm === 'atcoder') return pNorm.includes('atcoder');
        if (spNorm === 'code360') return pNorm.includes('code360') || pNorm.includes('naukri') || pNorm.includes('ninja');
        if (spNorm === 'geeksforgeeks') return pNorm.includes('geeks');
        return pNorm === spNorm;
      });
    });
  }, [contests, selectedPlatforms]);

  // Calendar Days calculation for Month view
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Prev month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        dayNumber: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, i),
      });
    }

    // Next month padding
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        dayNumber: i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  const getContestsForDate = (date: Date) => {
    return filteredContests.filter((c) => {
      const d = new Date(c.startTime);
      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    });
  };

  const isPastContest = (endTimeStr: string) => {
    return new Date(endTimeStr).getTime() < Date.now();
  };

  const isLiveContest = (startTimeStr: string, endTimeStr: string) => {
    const now = Date.now();
    return now >= new Date(startTimeStr).getTime() && now <= new Date(endTimeStr).getTime();
  };

  const isTodayDate = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDay = (date: Date) => {
    const today = new Date();
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const targetZero = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return targetZero < todayZero;
  };

  const isFutureDay = (date: Date) => {
    const today = new Date();
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const targetZero = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return targetZero > todayZero;
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  const renderPlatformLogo = (platform: string, size = 'w-4 h-4') => {
    const p = platform.toLowerCase();
    if (p.includes('leetcode')) return <LeetCodeLogo className={size} />;
    if (p.includes('codeforces')) return <CodeforcesLogo className={size} />;
    if (p.includes('codechef')) return <CodeChefLogo className={size} />;
    if (p.includes('atcoder')) return <AtCoderLogo className={size} />;
    if (p.includes('code360') || p.includes('naukri') || p.includes('ninja')) return <Code360Logo className={size} />;
    if (p.includes('geeks')) return <GfgLogo className={size} />;
    return <Globe className={size} />;
  };

  // Popover positioning calculation anchored near clicked element
  const getPopoverStyle = () => {
    if (!popoverAnchor) return {};
    if (typeof window === 'undefined') return {};

    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      return {
        position: 'fixed' as const,
        left: '16px',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: '380px',
        margin: '0 auto',
        zIndex: 60,
      };
    }

    const popoverWidth = 350;
    const popoverEstimatedHeight = 290;
    const margin = 12;

    let left = popoverAnchor.x;
    if (left + popoverWidth > window.innerWidth - margin) {
      left = window.innerWidth - popoverWidth - margin;
    }
    if (left < margin) left = margin;

    let top = popoverAnchor.y + 6;
    if (top + popoverEstimatedHeight > window.innerHeight - margin) {
      top = Math.max(margin, popoverAnchor.y - popoverAnchor.height - popoverEstimatedHeight - 6);
    }

    return {
      position: 'fixed' as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${popoverWidth}px`,
      zIndex: 60,
    };
  };

  return (
    <div className="space-y-4">
      {/* ------------------------------------------------------------- */}
      {/* PROFESSIONAL TOOLBAR (Solid, Clean, Minimalist) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-3 sm:p-3.5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left: Month Navigation & Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={goToToday}
            className="rounded-sm text-xs font-black border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-8 px-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors shadow-xs"
          >
            Today
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight ml-1">
            {monthName} {currentYear}
          </h3>
        </div>

        {/* Right: Select Platform Filter & View Mode Toggle */}
        <div className="flex items-center gap-2.5 justify-end">
          {/* Select Platform Popover */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`h-8 px-3 rounded-sm text-xs font-bold flex items-center gap-1.5 transition-colors border shadow-xs ${
                selectedPlatforms.length < allPlatforms.length
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Select Platform</span>
              {selectedPlatforms.length < allPlatforms.length && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              )}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  className="absolute right-0 top-10 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-xl p-3 z-30 space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                      Select Platforms
                    </span>
                    <button
                      onClick={resetPlatforms}
                      className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>

                  <div className="space-y-1">
                    {allPlatforms.map((plat) => {
                      const isChecked = selectedPlatforms.includes(plat.name);
                      return (
                        <button
                          key={plat.name}
                          onClick={() => togglePlatform(plat.name)}
                          className={`w-full flex items-center justify-between p-2 rounded-sm text-xs font-bold transition-all ${
                            isChecked
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {renderPlatformLogo(plat.name)}
                            <span>{plat.label}</span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Mode Toggle: Grid vs Agenda List */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-sm border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setCalendarView('month')}
              className={`p-1.5 rounded-sm transition-all ${
                calendarView === 'month'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Month Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCalendarView('agenda')}
              className={`p-1.5 rounded-sm transition-all ${
                calendarView === 'agenda'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Schedule Agenda List"
            >
              <ListFilter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN VIEW: SQUARE CALENDAR GRID */}
      {/* ------------------------------------------------------------- */}
      {calendarView === 'month' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden shadow-xs">
          {/* Day of Week Column Headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 py-2.5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="tracking-wider">{d}</div>
            ))}
          </div>

          {/* Square Day Boxes Matrix */}
          <div className="grid grid-cols-7 divide-x divide-y divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
            {calendarDays.map((cd, idx) => {
              const dayContests = getContestsForDate(cd.date);
              const isToday = isTodayDate(cd.date);
              const isPast = isPastDay(cd.date);
              const isFuture = isFutureDay(cd.date);

              let cellBg = 'bg-white dark:bg-slate-900';
              if (!cd.isCurrentMonth) {
                cellBg = 'bg-slate-50/50 dark:bg-slate-950/40 opacity-35';
              } else if (isToday) {
                cellBg = 'bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/80 ring-inset';
              } else if (isPast) {
                cellBg = 'bg-rose-50/30 dark:bg-rose-950/15 hover:bg-rose-50/60 dark:hover:bg-rose-950/25';
              } else if (isFuture) {
                cellBg = 'bg-emerald-50/20 dark:bg-emerald-950/10 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20';
              }

              return (
                <div
                  key={idx}
                  className={`min-h-[110px] sm:min-h-[125px] p-1.5 flex flex-col justify-between transition-colors overflow-hidden ${cellBg}`}
                >
                  {/* Day Number Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-black inline-flex items-center justify-center w-6 h-6 rounded-sm ${
                        isToday
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : cd.isCurrentMonth
                          ? isPast
                            ? 'text-rose-700/80 dark:text-rose-300/80 font-bold'
                            : 'text-slate-800 dark:text-slate-200 font-bold'
                          : 'text-slate-400 font-medium'
                      }`}
                    >
                      {cd.dayNumber}
                    </span>

                    {dayContests.length > 0 && (
                      <span className="text-[9px] font-bold text-slate-400">
                        {dayContests.length} {dayContests.length === 1 ? 'event' : 'events'}
                      </span>
                    )}
                  </div>

                  {/* Contest Event Pills (Zero internal scroller, clean presentation) */}
                  <div className="space-y-1 flex-1 overflow-hidden">
                    {dayContests.slice(0, 2).map((contest) => {
                      const contestPassed = isPastContest(contest.endTime);

                      return (
                        <button
                          key={contest.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setPopoverAnchor({
                              x: rect.left,
                              y: rect.bottom,
                              width: rect.width,
                              height: rect.height,
                            });
                            setActiveContest(contest);
                            setActiveDayContests(null);
                          }}
                          className={`w-full text-left px-1.5 py-1 rounded-sm text-[10px] font-bold truncate flex items-center gap-1.5 border transition-all ${
                            contestPassed
                              ? 'bg-slate-100 dark:bg-slate-800/70 text-slate-500 border-slate-200 dark:border-slate-700 opacity-60'
                              : 'bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30'
                          }`}
                          title={`${contest.title} (${formatTime(contest.startTime)})`}
                        >
                          {renderPlatformLogo(contest.platform, 'w-3 h-3 shrink-0')}
                          <span className="truncate">{contest.title}</span>
                        </button>
                      );
                    })}

                    {/* "+X more" button: Opens full day list popover near clicked position */}
                    {dayContests.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setPopoverAnchor({
                            x: rect.left,
                            y: rect.bottom,
                            width: rect.width,
                            height: rect.height,
                          });
                          setActiveDayContests({ date: cd.date, contests: dayContests });
                          setActiveContest(null);
                        }}
                        className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 hover:underline pl-1 block text-left"
                      >
                        +{dayContests.length - 2} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* AGENDA LIST VIEW (Chronological Daily Schedule) */
        /* ------------------------------------------------------------- */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm divide-y divide-slate-100 dark:divide-slate-800 shadow-xs p-4 space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Chronological Contest Schedule
          </h4>

          {filteredContests.slice(0, 30).map((c) => {
            const isPast = isPastContest(c.endTime);

            return (
              <div
                key={c.id}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setPopoverAnchor({
                    x: rect.left,
                    y: rect.bottom,
                    width: rect.width,
                    height: rect.height,
                  });
                  setActiveContest(c);
                  setActiveDayContests(null);
                }}
                className={`pt-3 pb-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 px-3 rounded-sm transition-colors ${
                  isPast ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    {renderPlatformLogo(c.platform, 'w-4 h-4')}
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {c.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{formatDate(c.startTime)}</span>
                      <span>•</span>
                      <span>{formatTime(c.startTime)} - {formatTime(c.endTime)} (IST)</span>
                      <span>•</span>
                      <span>{formatDuration(c.durationMinutes)}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isPast ? (
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      Ended
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      Upcoming
                    </span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 1. SINGLE CONTEST DETAILS POPOVER (Anchored right at click position) */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {activeContest && (
          <>
            {/* Click-away backdrop */}
            <div
              className="fixed inset-0 z-50 bg-black/20"
              onClick={() => setActiveContest(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 4 }}
              transition={{ duration: 0.15 }}
              style={getPopoverStyle()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-2xl p-4 space-y-3.5 text-slate-900 dark:text-slate-100"
            >
              {/* Header with Title & Platform Icon & Close 'X' */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    {renderPlatformLogo(activeContest.platform, 'w-4 h-4')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-black leading-snug break-words">
                      {activeContest.title}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setActiveContest(null)}
                  className="p-1 rounded-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Timing & Details Box (Codolio Style) */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-sm p-3 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
                {/* Date */}
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{formatDate(activeContest.startTime)}</span>
                </div>

                {/* Time & Duration */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {formatTime(activeContest.startTime)} – {formatTime(activeContest.endTime)} (Duration: {formatDuration(activeContest.durationMinutes)})
                  </span>
                </div>

                {/* Hosted on Platform with Direct Link */}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Hosted On {activeContest.platform}</span>
                  </div>
                  <a
                    href={activeContest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Visit Contest</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Users subscribed */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Users className="w-3 h-3" />
                  <span>{activeContest.subscribersCount?.toLocaleString('en-IN') || 14500} students tracking this contest</span>
                </div>
              </div>

              {/* Status Alert & Action */}
              {isPastContest(activeContest.endTime) ? (
                <div className="space-y-2 pt-1">
                  <div className="p-2 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Contest Ended</span>
                  </div>
                  <a
                    href={activeContest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-sm bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>View Problems / Editorial ↗</span>
                  </a>
                </div>
              ) : isLiveContest(activeContest.startTime, activeContest.endTime) ? (
                <div className="space-y-2 pt-1">
                  <div className="p-2 rounded-sm bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    <span>Live Contest Ongoing Now</span>
                  </div>
                  <a
                    href={activeContest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-sm bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Enter Live Contest</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <a
                    href={activeContest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Register / Participate in Contest</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={buildGoogleCalendarUrl(activeContest)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-sm bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Google Calendar</span>
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 2. DAY CONTESTS LIST POPOVER (When "+X more" is clicked) */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {activeDayContests && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/20"
              onClick={() => setActiveDayContests(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 4 }}
              transition={{ duration: 0.15 }}
              style={getPopoverStyle()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm shadow-2xl p-4 space-y-3 text-slate-900 dark:text-slate-100 max-h-[380px] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    {formatDate(activeDayContests.date.toISOString())}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-500">
                    {activeDayContests.contests.length} Scheduled Contests
                  </p>
                </div>
                <button
                  onClick={() => setActiveDayContests(null)}
                  className="p-1 rounded-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {activeDayContests.contests.map((c) => {
                  const ended = isPastContest(c.endTime);
                  return (
                    <div
                      key={c.id}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setPopoverAnchor({
                          x: rect.left,
                          y: rect.bottom,
                          width: rect.width,
                          height: rect.height,
                        });
                        setActiveContest(c);
                        setActiveDayContests(null);
                      }}
                      className="p-2.5 rounded-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-all space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {renderPlatformLogo(c.platform, 'w-3.5 h-3.5 shrink-0')}
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {c.title}
                          </span>
                        </div>
                        {ended ? (
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-amber-500/30 text-amber-600 shrink-0">
                            Ended
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-emerald-500/30 text-emerald-600 shrink-0">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{formatTime(c.startTime)} – {formatTime(c.endTime)}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                          Details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
