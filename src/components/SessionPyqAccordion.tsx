// Accordion: academic examination year grouping with animated chevron
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Search,
  FileText,
  Trash2,
  Calendar,
  Sparkles,
  Eye,
} from 'lucide-react';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { RecommendationBadge } from '@/components/RecommendationBadge';
import { PdfCardBadge } from '@/components/PdfCardBadge';

export interface PyqNoteItem {
  id?: string;
  title: string;
  url: string;
  recommended?: boolean;
  isCommunity?: boolean;
  fileName?: string;
  userName?: string;
  academicYear?: string;
  materialType?: string;
}

export interface SessionPyqAccordionProps {
  notes: PyqNoteItem[];
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  defaultExpanded?: boolean;
  className?: string;
}

interface YearGroup {
  year: string;
  label: string;
  items: PyqNoteItem[];
  count: number;
}

const extractYearFromTitle = (title: string): string => {
  if (!title) return 'Other';
  const match = title.match(/\b(20[12]\d)\b/);
  if (match) return match[1];
  const academicMatch = title.match(/\b(20\d{2})\s*[-–/]\s*(\d{2,4})\b/);
  if (academicMatch) return academicMatch[1];
  return 'General';
};

export const SessionPyqAccordion: React.FC<SessionPyqAccordionProps> = ({
  notes,
  isOwner = false,
  onDelete,
  defaultExpanded = true,
  className = '',
}) => {
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = (url: string, noteTitle: string) => {
    smartDownload(url, noteTitle);
  };

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase().trim();
    return notes.filter((n) => n.title.toLowerCase().includes(q));
  }, [notes, searchQuery]);

  const yearGroups: YearGroup[] = useMemo(() => {
    const groupsMap = new Map<string, PyqNoteItem[]>();

    filteredNotes.forEach((note) => {
      const year = note.academicYear || extractYearFromTitle(note.title);
      if (!groupsMap.has(year)) {
        groupsMap.set(year, []);
      }
      groupsMap.get(year)!.push(note);
    });

    const groups: YearGroup[] = [];
    groupsMap.forEach((items, year) => {
      groups.push({
        year,
        label: year === 'General' || year === 'Other' ? 'Miscellaneous PYQ Papers' : `Batch / Examination Year ${year}`,
        items,
        count: items.length,
      });
    });

    groups.sort((a, b) => {
      const aIsNum = /^\d+$/.test(a.year);
      const bIsNum = /^\d+$/.test(b.year);
      if (aIsNum && bIsNum) return Number(b.year) - Number(a.year);
      if (aIsNum) return -1;
      if (bIsNum) return 1;
      return a.year.localeCompare(b.year);
    });

    return groups;
  }, [filteredNotes]);

  const isYearOpen = (year: string): boolean => {
    if (expandedYears[year] !== undefined) return expandedYears[year];
    return defaultExpanded;
  };

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !isYearOpen(year),
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    yearGroups.forEach((g) => {
      all[g.year] = true;
    });
    setExpandedYears(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    yearGroups.forEach((g) => {
      all[g.year] = false;
    });
    setExpandedYears(all);
  };

  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header controls: Search & expand/collapse buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card border border-border p-3.5 rounded-2xl shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search question papers by subject, year..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={expandAll}
            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion Panels */}
      <div className="space-y-3">
        {yearGroups.map((group) => {
          const isOpen = isYearOpen(group.year);
          return (
            <div
              key={group.year}
              className="border border-border/80 rounded-2xl bg-card overflow-hidden shadow-xs transition-colors"
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleYear(group.year)}
                className="w-full px-5 py-3.5 flex items-center justify-between gap-4 text-left hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                      {group.label}
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {group.count} {group.count === 1 ? 'Paper' : 'Papers'}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs font-semibold hidden sm:inline">
                    {isOpen ? 'Hide papers' : 'View papers'}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  )}
                </div>
              </button>

              {/* Collapsible Items Grid */}
              {isOpen && (
                <div className="p-4 sm:p-5 pt-0 border-t border-border/50 bg-muted/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pt-4">
                    {group.items.map((note, idx) => (
                      <motion.div
                        key={note.id || idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02, duration: 0.2 }}
                      >
                        <div className="border border-border bg-card hover:border-emerald-500/50 rounded-xl p-4 transition-all duration-200 hover:shadow-md flex flex-col h-full relative">
                          <RecommendationBadge note={note} isOwner={isOwner} />

                          {note.isCommunity && isOwner && onDelete && (
                            <button
                              className="absolute top-3 left-3 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-lg transition-colors z-10"
                              onClick={() => onDelete(note.id!)}
                              title="Delete material"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}

                          <div className="flex items-center gap-2 mb-2.5 flex-wrap pr-14">
                            <PdfCardBadge />
                            <span className="text-[10px] font-bold tracking-wider uppercase bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                              PYQ Paper ❓
                            </span>
                            {note.isCommunity && (
                              <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                                Community
                              </span>
                            )}
                          </div>

                          <h4 className="font-semibold text-foreground text-sm leading-snug flex-1 mb-3">
                            {note.title}
                          </h4>

                          {note.userName && (
                            <p className="text-[10px] text-muted-foreground mb-3">
                              Uploaded by: {note.userName}
                            </p>
                          )}

                          <div className="flex gap-2 pt-2 border-t border-border/50">
                            <button
                              onClick={() => viewInBrowser(note.url)}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer"
                              disabled={note.url === '#'}
                            >
                              <Eye className="h-3.5 w-3.5" /> View
                            </button>
                            <button
                              onClick={() => handleDownload(note.url, note.title)}
                              className="inline-flex items-center justify-center p-2 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
                              disabled={note.url === '#'}
                              title="Download PDF"
                            >
                              <Download className="h-3.5 w-3.5 text-foreground" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionPyqAccordion;
