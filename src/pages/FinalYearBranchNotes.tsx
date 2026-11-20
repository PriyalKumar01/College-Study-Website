/** Final Year (7th & 8th Semester) specialized engineering branch view */
import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, Eye, FileText, Search, Sparkles, BookOpen,
  Plus, Pencil, Trash2, X, ExternalLink, Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { SubjectShareButton } from '@/components/SubjectShareButton';
import { RecommendationBadge } from '@/components/RecommendationBadge';
import { SessionPyqAccordion } from '@/components/SessionPyqAccordion';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { getSubjectsOnly, SubjectInfo } from '@/data/courseStructure';
import {
  extractDynamicSubjects,
  saveCustomSubject,
  saveRenamedSubject,
  deleteSubject
} from '@/lib/customSubjects';
import { matchesSubject } from '@/utils/subjectMatcher';
import { supabase } from '@/integrations/supabase/client';

const BRANCH_METADATA: Record<string, { fullName: string; dept: string; description: string }> = {
  'CSE/IT': { fullName: 'Computer Science, IT & CSE (AI & ML)', dept: 'Computer Science & Engineering', description: 'Computing systems, algorithms, AI/ML, and software engineering' },
  'CHE': { fullName: 'Chemical Engineering', dept: 'Chemical Engineering', description: 'Petrochemical processes, transport phenomena, and reaction engineering' },
  'ME': { fullName: 'Mechanical Engineering', dept: 'Mechanical Engineering', description: 'Automobile engineering, power plants, and advanced mechanics' },
  'CE': { fullName: 'Civil Engineering', dept: 'Civil Engineering', description: 'Bridge design, structural analysis, and earthquake engineering' },
  'ET': { fullName: 'Electronics Engineering', dept: 'Electronics Engineering', description: 'Wireless communication, VLSI, and embedded system design' },
  'EE': { fullName: 'Electrical Engineering', dept: 'Electrical Engineering', description: 'Electric drives, control systems, and renewable energy' },
  'BE': { fullName: 'Biochemical Engineering', dept: 'Biochemical Engineering', description: 'Downstream processing, bioprocess design, and biochemical systems' },
  'LFT': { fullName: 'Leather & Footwear Technology', dept: 'Leather & Fashion Technology', description: 'Footwear engineering, leather waste management, and fashion tech' },
  'PT': { fullName: 'Paint Technology', dept: 'Paint Technology', description: 'Corrosion science, coating formulation, and polymer surface chemistry' },
  'PL': { fullName: 'Plastic Technology', dept: 'Plastic Technology', description: 'Polymer blends, alloys, and advanced injection molding & processing' },
  'FT': { fullName: 'Food Technology', dept: 'Food Technology', description: 'Food biotechnology, plant layout, processing, and preservation' },
  'OT': { fullName: 'Oil Technology', dept: 'Oil Technology', description: 'Fat modification processes, oil refining, and industrial surfactants' },
  'BT': { fullName: 'BioTechnology', dept: 'BioTechnology', description: 'Stem cell technology, tissue engineering, and metabolic pathways' },
};

const FinalYearBranchNotes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isOwner } = useAuth();
  const [searchParams] = useSearchParams();

  const branchParam = (searchParams.get('branch') || 'PT').toUpperCase();
  const semParam = searchParams.get('sem') === '8' ? '8' : '7';
  const semesterStr = `${semParam}th Semester`;
  const branchMeta = BRANCH_METADATA[branchParam] || {
    fullName: `${branchParam} Engineering`,
    dept: `${branchParam} Department`,
    description: `Official HBTU final year curriculum for ${branchParam}.`
  };

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Owner custom subject management states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubFullName, setNewSubFullName] = useState('');
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [isSubmittingRename, setIsSubmittingRename] = useState(false);

  const [deletingSubject, setDeletingSubject] = useState<string | null>(null);

  // Fetch approved community notes for BTech
  const { communityNotes, loading: notesLoading, refreshNotes } = useCommunityNotes('btech');

  // Filter notes relevant to this branch and semester
  const relevantNotes = useMemo(() => {
    if (!communityNotes) return [];
    return communityNotes.filter(n => {
      if (n.material_type === 'subject_placeholder') return false;
      const sem = (n.semester || '').toLowerCase();
      const br = (n.branch || '').toLowerCase();
      const targetSem = `${semParam}th semester`.toLowerCase();
      const targetBranch = branchParam.toLowerCase();

      const semMatches = sem.includes(targetSem) || sem.includes(`${semParam}th`);
      const branchMatches = br ? br.includes(targetBranch) : (sem.includes(targetBranch));
      return semMatches && (branchMatches || sem.includes(`${targetBranch}-${targetSem}`));
    });
  }, [communityNotes, branchParam, semParam]);

  // Load static subjects from courseStructure
  const staticSubjects = useMemo(() => {
    const list = getSubjectsOnly('btech', semesterStr, branchParam);
    return list.map(s => ({
      id: s.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: s.name,
      fullName: s.fullName || s.name,
      icon: '📚',
      isCustom: false,
    }));
  }, [semesterStr, branchParam, refreshKey]);

  // Dynamic subjects added by Owner or through community notes
  const dynamicSubjects = useMemo(() => {
    return extractDynamicSubjects(communityNotes, staticSubjects);
  }, [communityNotes, staticSubjects, refreshKey]);

  // Merge subjects and add OE-II + PYQs + Assignments
  const allSubjects = useMemo(() => {
    const map = new Map<string, any>();

    // Add static subjects
    staticSubjects.forEach(s => map.set(s.name.toLowerCase(), s));

    // Add dynamic subjects
    dynamicSubjects.forEach(s => {
      if (!map.has(s.name.toLowerCase())) {
        map.set(s.name.toLowerCase(), s);
      }
    });

    // Ensure Open Elective-II is included for 7th Semester
    if (semParam === '7' && !map.has('open elective-ii') && !map.has('oe-ii')) {
      map.set('open elective-ii', {
        id: 'oe-ii',
        name: 'Open Elective-II',
        fullName: 'Open Elective-II (OE-II) across HBTU Departments',
        icon: '🌟',
        isOe: true,
        isCustom: false,
      });
    }

    // Add PYQs and Assignments
    map.set('pyqs', {
      id: 'pyqs',
      name: 'ALL MID & ESE PYQs',
      fullName: 'Mid Sem-1, Mid Sem-2 and End Sem Previous Year Question Papers',
      icon: '📚',
      isCustom: false,
    });

    map.set('assignments', {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      fullName: 'Lab assignments, tutorial problem sheets, and design reports',
      icon: '📝',
      isCustom: false,
    });

    const list = Array.from(map.values());

    // Associate notes with each subject
    return list.map(sub => {
      if (sub.id === 'pyqs') {
        const pyqNotes = relevantNotes.filter(n => n.material_type === 'pyqs' || (n.subject && n.subject.toLowerCase().includes('pyq')));
        return { ...sub, notes: pyqNotes };
      }
      if (sub.id === 'assignments') {
        const assignNotes = relevantNotes.filter(n => n.material_type === 'assignments' || (n.subject && n.subject.toLowerCase().includes('assignment')));
        return { ...sub, notes: assignNotes };
      }
      const matched = relevantNotes.filter(n => matchesSubject(n.subject, sub.name, sub.id));
      return { ...sub, notes: matched };
    });
  }, [staticSubjects, dynamicSubjects, relevantNotes, semParam]);

  // Filtered subjects by search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return allSubjects;
    const q = searchQuery.toLowerCase();
    return allSubjects.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.fullName && s.fullName.toLowerCase().includes(q))
    );
  }, [allSubjects, searchQuery]);

  // Handle Owner Add Subject
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) return;
    const trimmed = newSubName.trim();
    if (!trimmed) {
      toast({ title: 'Name required', description: 'Please enter a subject name.', variant: 'destructive' });
      return;
    }

    setIsSubmittingNew(true);
    try {
      await saveCustomSubject(
        'btech',
        semesterStr,
        branchParam,
        {
          name: trimmed,
          fullName: newSubFullName.trim() || trimmed,
        },
        user
      );
      toast({
        title: 'Subject Created! 🎓',
        description: `"${trimmed}" is now active in ${branchParam} ${semesterStr}. You and other admins can now upload notes for it!`,
      });
      setNewSubName('');
      setNewSubFullName('');
      setShowAddModal(false);
      setRefreshKey(k => k + 1);
      refreshNotes();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // Handle Owner Rename Subject
  const handleRenameSubject = async () => {
    if (!isOwner || !editingSubject) return;
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === editingSubject) {
      setEditingSubject(null);
      return;
    }

    setIsSubmittingRename(true);
    try {
      await saveRenamedSubject(editingSubject, trimmed);
      toast({
        title: 'Subject Renamed! ✏️',
        description: `Renamed "${editingSubject}" to "${trimmed}".`,
      });
      setEditingSubject(null);
      setRenameValue('');
      setRefreshKey(k => k + 1);
      refreshNotes();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmittingRename(false);
    }
  };

  // Handle Owner Delete Subject (Safety check: only if 0 notes)
  const handleDeleteSubject = async (subName: string, notesCount: number) => {
    if (!isOwner) return;

    if (subName === 'ALL MID & ESE PYQs' || subName === 'Assignments - All Subjects') {
      toast({ title: 'Cannot Delete', description: 'Core system sections cannot be deleted.', variant: 'destructive' });
      return;
    }

    if (notesCount > 0) {
      toast({
        title: 'Cannot Delete Subject ⚠️',
        description: `"${subName}" contains ${notesCount} note(s). Only subjects with 0 notes can be deleted to protect student resources.`,
        variant: 'destructive',
      });
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${subName}"? It currently has 0 notes.`)) {
      return;
    }

    setDeletingSubject(subName);
    try {
      await deleteSubject(subName, 'btech', semesterStr, branchParam);
      toast({
        title: 'Subject Deleted! 🗑️',
        description: `"${subName}" has been removed from ${branchParam} ${semesterStr}.`,
      });
      setRefreshKey(k => k + 1);
      refreshNotes();
      if (selectedSubject === subName) setSelectedSubject(null);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setDeletingSubject(null);
    }
  };

  const activeSubjectItem = allSubjects.find(s => s.name === selectedSubject);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-slate-900 text-slate-100 dark:bg-slate-950 pt-14 pb-12 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(`/btech-notes/fourth-year/semester-${semParam}`)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-4 cursor-pointer text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to {semParam}th Semester Branches
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              OFFICIAL HBTU CURRICULUM
            </span>
            <span className="text-xs text-slate-400">
              B.Tech {semParam === '7' ? 'VII' : 'VIII'} Semester • {branchParam}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2 text-white">
            {branchMeta.fullName}
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {branchMeta.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="text-xs font-semibold tracking-wider uppercase border border-slate-700 bg-slate-800/80 px-3 py-1 rounded-md text-slate-300">
              {branchMeta.dept}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-slate-700 bg-slate-800/80 px-3 py-1 rounded-md text-slate-300">
              {allSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Subjects & Electives
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-slate-700 bg-slate-800/80 px-3 py-1 rounded-md text-slate-300">
              {semesterStr}
            </span>

            {isOwner && (
              <button
                onClick={() => setShowAddModal(true)}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add New Subject (Owner)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 flex-1 w-full">
        {/* Search & Subject Stats Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap border-b border-border pb-4">
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-muted-foreground">
              {semesterStr} Subjects & Resources ({filteredSubjects.length})
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select any subject below to view or download verified notes, PYQs, and study materials.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search subjects or electives..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Subjects Grid (Responsive 4 in a row on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSubjects.map((subject, index) => {
            const isOe = subject.id === 'oe-ii' || subject.name.toLowerCase().includes('open elective');
            const isPyq = subject.id === 'pyqs';
            const isAssign = subject.id === 'assignments';
            const notesCount = subject.notes?.length || 0;

            return (
              <motion.div
                key={subject.id || subject.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.25 }}
                className="h-full"
              >
                <div
                  className={`group border rounded-xl p-4 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between ${
                    isOe
                      ? 'border-teal-500/40 bg-teal-500/5 hover:border-teal-500'
                      : isPyq
                      ? 'border-rose-500/30 bg-rose-500/5 hover:border-rose-500'
                      : isAssign
                      ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div>
                    {/* Card Header: Icon + Badges + Share + Owner Delete */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <span className="text-xl p-1.5 rounded-lg bg-muted/60">{subject.icon}</span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                            isOe
                              ? 'bg-teal-600'
                              : isPyq
                              ? 'bg-rose-600'
                              : isAssign
                              ? 'bg-amber-600'
                              : 'bg-emerald-600'
                          }`}
                        >
                          {notesCount} {notesCount === 1 ? 'file' : 'files'}
                        </span>

                        <SubjectShareButton subjectName={subject.name} subjectId={subject.id} />

                        {/* Owner Controls: Rename & Delete */}
                        {isOwner && !isPyq && !isAssign && (
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              onClick={() => {
                                setEditingSubject(subject.name);
                                setRenameValue(subject.name);
                              }}
                              className="p-1 rounded text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                              title="Rename subject"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>

                            {/* Delete allowed for any subject with 0 notes */}
                            {notesCount === 0 && (
                              <button
                                onClick={() => handleDeleteSubject(subject.name, notesCount)}
                                disabled={deletingSubject === subject.name}
                                className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Delete subject (0 notes)"
                              >
                                {deletingSubject === subject.name ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject Title */}
                    <h3 className="font-bold text-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {subject.fullName || subject.name}
                    </p>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-3 border-t border-border mt-3">
                    {isOe ? (
                      <button
                        onClick={() => navigate('/seventh-semester-open-electives')}
                        className="w-full text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>View Open Electives</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedSubject(subject.name)}
                        className="w-full text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Notes ({notesCount})</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Subject Detail Drawer / Modal */}
        <AnimatePresence>
          {selectedSubject && activeSubjectItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between gap-3 bg-muted/40">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{activeSubjectItem.icon}</span>
                      <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                        {activeSubjectItem.name}
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shrink-0">
                        {activeSubjectItem.notes?.length || 0} files
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {activeSubjectItem.fullName} • {branchParam} {semesterStr}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Content: Notes Cards Grid */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
                  {activeSubjectItem.id === 'pyqs' ? (
                    <SessionPyqAccordion
                      notes={activeSubjectItem.notes || []}
                      subjectName={`${branchParam} Final Year PYQs`}
                    />
                  ) : activeSubjectItem.notes && activeSubjectItem.notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                      {activeSubjectItem.notes.map((note: any, idx: number) => {
                        const noteUrl = note.file_url || note.url || '#';
                        const noteTitle = note.title || 'Untitled Document';
                        return (
                          <div
                            key={note.id || idx}
                            className="border border-border rounded-xl p-3.5 bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center shrink-0">
                                  <FileText className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-foreground line-clamp-2 leading-snug">
                                    {noteTitle}
                                  </p>
                                  {note.description && (
                                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                      {note.description}
                                    </p>
                                  )}
                                  <span className="text-[10px] text-muted-foreground/75 font-mono">
                                    Uploaded: {new Date(note.created_at || Date.now()).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <RecommendationBadge noteId={note.id || `${activeSubjectItem.id}-${idx}`} />
                            </div>

                            {/* View & Download Buttons */}
                            <div className="flex items-center gap-2 pt-2 border-t border-border">
                              <button
                                onClick={() => viewInBrowser(noteUrl, noteTitle)}
                                className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>VIEW</span>
                              </button>
                              <button
                                onClick={() => smartDownload(noteUrl, `${noteTitle}.pdf`)}
                                className="py-1.5 px-3 rounded-lg text-xs font-semibold border border-border hover:bg-muted text-foreground transition-all flex items-center justify-center gap-1 cursor-pointer"
                                title="Download PDF"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span>DOWNLOAD</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 border border-dashed border-border rounded-xl">
                      <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-bold text-foreground">No notes uploaded for {activeSubjectItem.name} yet</p>
                      <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
                        Admins and contributors can upload study material for this subject from the Admin Dashboard.
                      </p>
                      {isOwner && (
                        <button
                          onClick={() => {
                            setSelectedSubject(null);
                            navigate('/admin?tab=upload');
                          }}
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 transition-all cursor-pointer"
                        >
                          Upload Material Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Owner: Add Subject Modal */}
      {isOwner && showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <h3 className="font-bold text-foreground text-base">Add New Subject ({branchParam})</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Subject Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Specialty Coatings"
                  value={newSubName}
                  onChange={e => setNewSubName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Full Course Title / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Specialty & High Performance Coatings"
                  value={newSubFullName}
                  onChange={e => setNewSubFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  {isSubmittingNew ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Owner: Rename Subject Modal */}
      {isOwner && editingSubject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <h3 className="font-bold text-foreground text-base">Rename Subject</h3>
              <button onClick={() => setEditingSubject(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Current Name</label>
                <p className="text-sm font-bold text-foreground">{editingSubject}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">New Subject Name</label>
                <input
                  type="text"
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingSubject(null)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmittingRename}
                  onClick={handleRenameSubject}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  {isSubmittingRename ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Pencil className="h-3.5 w-3.5" />}
                  Save New Name
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FinalYearBranchNotes;
