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
  Sparkles
} from 'lucide-react';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

export interface PyqNoteItem {
  id?: string;
  title: string;
  url: string;
  recommended?: boolean;
  isCommunity?: boolean;
  fileName?: string;
  uploadedBy?: string;
  userName?: string;
  yearSession?: string;
  [key: string]: any;
}

interface SessionPyqAccordionProps {
  notes: PyqNoteItem[];
  title?: string;
  subtitle?: string;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

export function SessionPyqAccordion({
  notes,
  title = 'Previous Year Questions (PYQs)',
  subtitle = 'Curated session-wise exam question papers sorted descending with fast access.',
  onDelete,
  isOwner = false,
}: SessionPyqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSessions, setExpandedSessions] = useState<string[]>([
    '2026-27',
    '2025-26',
    '2024-25',
    '2023-24',
    '2022-23',
    'other'
  ]);

  const toggleSession = (key: string) => {
    setExpandedSessions(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleDownload = (url: string, noteTitle: string) => {
    smartDownload(url, noteTitle);
  };

  // Group notes descending by academic session
  const pyqGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? notes.filter(n => (n.title || '').toLowerCase().includes(q) || (n.fileName || '').toLowerCase().includes(q))
      : notes;

    const groups: Record<
      string,
      { key: string; label: string; badge: string; badgeColor: string; items: PyqNoteItem[] }
    > = {
      '2026-27': {
        key: '2026-27',
        label: '2026–2027 Academic Session (Current Session)',
        badge: 'Current / Ongoing',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        items: []
      },
      '2025-26': {
        key: '2025-26',
        label: '2025–2026 Academic Session',
        badge: 'Recent Past Session',
        badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
        items: []
      },
      '2024-25': {
        key: '2024-25',
        label: '2024–2025 Academic Session',
        badge: 'Previous Year',
        badgeColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
        items: []
      },
      '2023-24': {
        key: '2023-24',
        label: '2023–2024 Academic Session',
        badge: 'Past Exam Papers',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
        items: []
      },
      '2022-23': {
        key: '2022-23',
        label: '2022–2023 & Earlier Archives',
        badge: 'Archived Collection',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        items: []
      },
      'other': {
        key: 'other',
        label: 'Additional / Uncategorized Question Papers',
        badge: 'General Papers',
        badgeColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
        items: []
      }
    };

    filtered.forEach(note => {
      const t = (note.title || '').toLowerCase();
      const fn = (note.fileName || '').toLowerCase();
      const ys = (note.yearSession || '').toLowerCase();
      const combined = `${t} ${fn} ${ys}`;

      if (combined.includes('2026-27') || combined.includes('2026-2027') || combined.includes('26-27')) {
        groups['2026-27'].items.push(note);
      } else if (combined.includes('2025-26') || combined.includes('2025-2026') || combined.includes('25-26')) {
        groups['2025-26'].items.push(note);
      } else if (combined.includes('2024-25') || combined.includes('2024-2025') || combined.includes('24-25')) {
        groups['2024-25'].items.push(note);
      } else if (combined.includes('2023-24') || combined.includes('2023-2024') || combined.includes('23-24')) {
        groups['2023-24'].items.push(note);
      } else if (
        combined.includes('2022-23') ||
        combined.includes('2022-2023') ||
        combined.includes('22-23') ||
        combined.includes('2021') ||
        combined.includes('2020') ||
        combined.includes('2019') ||
        combined.includes('2018') ||
        combined.includes('archive')
      ) {
        groups['2022-23'].items.push(note);
      } else {
        // Fallback: don't lose ANY note
        groups['other'].items.push(note);
      }
    });

    // Return groups in descending order, omitting empty ones unless search active
    return Object.values(groups).filter(g => g.items.length > 0);
  }, [notes, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card border border-border p-3.5 rounded-2xl shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search exam papers (Mid Sem, End Sem, session year)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>{notes.length} Total Exam Question Papers</span>
        </div>
      </div>

      {pyqGroups.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-2xl bg-card">
          <p className="text-muted-foreground text-sm mb-1">No question papers match your query "{searchQuery}".</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-emerald-600 font-bold hover:underline mt-2"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pyqGroups.map(group => {
            const isOpen = expandedSessions.includes(group.key);
            return (
              <div
                key={group.key}
                className="border border-border/80 bg-card rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                {/* Collapsible Accordion Header */}
                <button
                  onClick={() => toggleSession(group.key)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/40 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-base sm:text-lg text-foreground tracking-tight">
                          {group.label}
                        </h3>
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${group.badgeColor}`}>
                          {group.badge}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {group.items.length} question paper{group.items.length === 1 ? '' : 's'} available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                    <span className="text-xs font-semibold hidden sm:inline">
                      {isOpen ? 'Collapse' : 'Expand'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Items Grid */}
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-border/50 bg-muted/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4">
                      {group.items.map((note, idx) => (
                        <motion.div
                          key={note.id || idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02, duration: 0.2 }}
                        >
                          <div className="border border-border bg-card hover:border-emerald-500/50 rounded-xl p-4 transition-all duration-200 hover:shadow-md flex flex-col h-full relative">
                            {note.recommended && (
                              <div className="absolute top-3 right-3 z-10 pointer-events-none">
                                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                                  ⭐ Recommended
                                </span>
                              </div>
                            )}

                            {note.isCommunity && isOwner && onDelete && (
                              <button
                                className={`absolute top-3 ${note.recommended ? 'left-3' : 'right-3'} text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-lg transition-colors z-10`}
                                onClick={() => onDelete(note.id!)}
                                title="Delete material"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}

                            <div className="flex items-center gap-2 mb-2.5">
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
                                onClick={() => handleDownload(note.url, note.title)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer"
                                disabled={note.url === '#'}
                              >
                                <Download className="h-3.5 w-3.5" /> Download
                              </button>
                              <button
                                onClick={() => viewInBrowser(note.url)}
                                className="inline-flex items-center justify-center p-2 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
                                disabled={note.url === '#'}
                                title="View in Browser"
                              >
                                <ExternalLink className="h-3.5 w-3.5 text-foreground" />
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
      )}
    </div>
  );
}
