/** HBTU BBA 3-year semester course materials and syllabus viewer */
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, ArrowLeft, FileText, ChevronRight,
  ExternalLink, Search, Plus, Pencil, Trash2, X, Eye, BookOpen,
  Briefcase, Sparkles, Loader2, Share2, MessageCircle
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { SubjectShareButton } from '@/components/SubjectShareButton';
import { RecommendationBadge } from '@/components/RecommendationBadge';
import { PdfCardBadge } from '@/components/PdfCardBadge';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { getSubjectsOnly } from '@/data/courseStructure';
import {
  extractDynamicSubjects,
  saveCustomSubject,
  saveRenamedSubject,
  deleteSubject
} from '@/lib/customSubjects';
import { matchesSubject } from '@/utils/subjectMatcher';
import { shareContent } from '@/utils/shareUtils';
import { supabase } from '@/integrations/supabase/client';

// Thumbnails for BBA semesters
import sem1Img from '@/assets/sem1-thumbnail-new.png';
import sem2Img from '@/assets/sem2-thumbnail-new.png';
import sem3Img from '@/assets/sem3-thumbnail-new.png';
import sem4Img from '@/assets/sem4-thumbnail-new.png';
import fifthSemImg from '@/assets/5th-sem-thumbnail.jpg';
import sixthSemImg from '@/assets/6th-sem-thumbnail.jpg';

// Curated legacy notes for HBTU BBA 1st Year subjects
const LEGACY_BBA_NOTES: Record<string, { title: string; url: string }[]> = {
  'Principles and Practices of Management (BBA 101)': [
    { title: 'Concept & Definition of Management', url: 'https://drive.google.com/uc?export=download&id=1ezrP5fk_2rh2NjbweI6qs9JFa3XplZMH' },
    { title: 'Principles of Management Full Notes', url: 'https://drive.google.com/uc?export=download&id=13YKzgPOmWxlwAlQNT1L3Aez66OmvntSX' },
  ],
  'Micro Economics (BBA 103)': [
    { title: 'Business Economics Reference Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
    { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' },
    { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' },
    { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
    { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' },
    { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' },
    { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' },
    { title: 'Micro Economics Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' },
    { title: 'Last Min. Exam Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' },
  ],
  'Business Environment (BBA 105)': [
    { title: 'Unit-1 Preamble & Business Policy PDF', url: 'https://drive.google.com/uc?export=download&id=1e2zbkhTSLRzaR_WyJrpStQ4yA4DrVqfa' },
    { title: 'Unit-2 Legal & Economic Environment Notes', url: 'https://drive.google.com/uc?export=download&id=1praW_irxDoN--7CNsG_ZGM2ymgNUCUTt' },
    { title: 'Unit-4 Socio-Cultural Environment Notes', url: 'https://drive.google.com/uc?export=download&id=1TmjNFBsL4FneJFKpvzDM6jyp12NzPV-A' },
    { title: 'Keshavanand Bharti Benchmark Case PDF', url: 'https://drive.google.com/uc?export=download&id=1oYSTGRVg5Yr3d40s-JGBG6rBg_YWbbTB' },
  ],
  'Accounting-I (BBA 107)': [
    { title: 'Unit-1 Fundamentals of Accounting Notes', url: 'https://drive.google.com/uc?export=download&id=1EA5gKb4RwXJMqy1M9PmNrqqHefCln6L3' },
    { title: 'Unit-2 Journal & Ledger Notes', url: 'https://drive.google.com/uc?export=download&id=1DPvXTzFwopVuDBCl3V4vTB-X8QnwOVB-' },
    { title: 'Normal Distribution & Statistical Accounting Notes', url: 'https://drive.google.com/uc?export=download&id=14JC6zEI5r1laIR0MQZT9w7-bRXac7qCy' },
  ],
  'Computer Applications in Management (BBA 109)': [
    { title: 'Unit-1 IT in Business Full Notes', url: 'https://drive.google.com/uc?export=download&id=1aRcSfppNYSjYH9BwGjqOORSTFrueWxBc' },
    { title: 'Unit-2 Types of OS & Office Tools Notes', url: 'https://drive.google.com/uc?export=download&id=1OqT3XBqf6P05jgAJSM6hGZZvniIy-9bS' },
    { title: 'Unit-4 Part-1 DBMS in Management Notes', url: 'https://drive.google.com/uc?export=download&id=17yx1tH3FE2bXp0Aq9-z4wCOyXtCzTMoh' },
    { title: 'Unit-4 Part-2 Network & Security Notes', url: 'https://drive.google.com/uc?export=download&id=1jsD77T9K75mQ_vZ_WIY7qMs6eBYHoSLJ' },
    { title: 'MS Office Practical Guide (Word, Excel, Window)', url: 'https://drive.google.com/uc?export=download&id=16OuKsOaN9ZR3q5tNbh_VstT_pJ5FR5Xu' },
  ],
  'Business Communication (BBA 106)': [
    { title: 'Unit-1 Principles of Business Communication Notes', url: 'https://drive.google.com/uc?export=download&id=1WI-eXtUiW-rqj25KXPChkKbjDscNwUtA' },
    { title: 'Unit-2 Business Letters & Reports Notes', url: 'https://drive.google.com/uc?export=download&id=1oIjxOmyD6jwDTneOaa_sEX7o7M8GqSgO' },
    { title: 'Unit-2 Sample Professional Business Letter PDF', url: 'https://drive.google.com/uc?export=download&id=1Y4BC0ijoUl9ZyHElbxBOjAydqkeHjKpw' },
    { title: 'Professional Resume & CV Templates PDF', url: 'https://drive.google.com/uc?export=download&id=1nyL84z6M-l_f-mxhRnmMlUtwRUqWEIag' },
  ],
};

// 6 Official BBA Semesters with full descriptions and metadata
const BBA_SEMESTERS = [
  {
    id: '1st Semester',
    name: '1st Semester',
    shortName: 'Sem 1',
    year: '1st Year',
    description: 'Principles of Management, Micro Economics, Business Environment, Accounting-I, CAM & Personality Dev',
    thumbnail: sem1Img,
    subjectsCount: 6,
    tags: ['BBA 101', 'BBA 103', 'BBA 105', 'BBA 107', 'BBA 109', 'BBA 191'],
  },
  {
    id: '2nd Semester',
    name: '2nd Semester',
    shortName: 'Sem 2',
    year: '1st Year',
    description: 'Organizational Behaviour, Macro Economics, Business Communication, Accounting-II, Quantitative Tech & Comm Skills-I',
    thumbnail: sem2Img,
    subjectsCount: 6,
    tags: ['BBA 102', 'BBA 104', 'BBA 106', 'BBA 108', 'BBA 110', 'BBA 192'],
  },
  {
    id: '3rd Semester',
    name: '3rd Semester',
    shortName: 'Sem 3',
    year: '2nd Year',
    description: 'Finance Management, Marketing Management, HRM, Operations Management, IT Applications & GD/Public Speaking',
    thumbnail: sem3Img,
    subjectsCount: 6,
    tags: ['BBA 201', 'BBA 203', 'BBA 205', 'BBA 207', 'BBA 209', 'BBA 291'],
  },
  {
    id: '4th Semester',
    name: '4th Semester',
    shortName: 'Sem 4',
    year: '2nd Year',
    description: 'Taxation Management, CRM, Industrial Relations, Logistics & SCM, Business Statistics & Comm Skills-II',
    thumbnail: sem4Img,
    subjectsCount: 6,
    tags: ['BBA 202', 'BBA 204', 'BBA 206', 'BBA 208', 'BBA 210', 'BBA 292'],
  },
  {
    id: '5th Semester',
    name: '5th Semester',
    shortName: 'Sem 5',
    year: '3rd Year',
    description: 'Entrepreneurship & Startup, Business Policy, Ethics & Corporate Governance, Business Laws, Electives & Internship',
    thumbnail: fifthSemImg,
    subjectsCount: 6,
    tags: ['BBA 301', 'BBA 303', 'BBA 305', 'BBA 307', 'Elective-I', 'BBA 391'],
  },
  {
    id: '6th Semester',
    name: '6th Semester',
    shortName: 'Sem 6',
    year: '3rd Year',
    description: 'Family Business Management, Strategic Management, E-Commerce, MIS, Electives & Major Project/Seminar',
    thumbnail: sixthSemImg,
    subjectsCount: 6,
    tags: ['BBA 302', 'BBA 304', 'BBA 306', 'BBA 308', 'Elective-II', 'BBA 392'],
  },
];

const BBANotes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, isOwner } = useAuth();

  // URL state synchronization
  const initialSem = searchParams.get('sem');
  const initialSub = searchParams.get('subject');

  const [selectedSemester, setSelectedSemester] = useState<string | null>(initialSem);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(initialSub);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedSemester) params.set('sem', selectedSemester);
    if (selectedSubject) params.set('subject', selectedSubject);
    setSearchParams(params, { replace: true });
  }, [selectedSemester, selectedSubject]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSemester, selectedSubject]);

  // Owner custom subject management states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubFullName, setNewSubFullName] = useState('');
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [isSubmittingRename, setIsSubmittingRename] = useState(false);

  const [deletingSubject, setDeletingSubject] = useState<string | null>(null);

  // Fetch approved community notes for BBA
  const { communityNotes, loading: notesLoading, refreshNotes } = useCommunityNotes('bba');

  // Extract static subjects for the active semester
  const staticSubjects = useMemo(() => {
    if (!selectedSemester) return [];
    const list = getSubjectsOnly('bba', selectedSemester);
    return list.map(s => {
      // Extract code from name e.g. "Principles and Practices of Management (BBA 101)" -> code: "BBA 101"
      const match = s.name.match(/\((BBA\s*\d+[^)]*)\)/i);
      const code = match ? match[1] : '';
      return {
        id: s.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: s.name,
        code,
        fullName: s.fullName || s.name,
        icon: '📊',
        isCustom: false,
      };
    });
  }, [selectedSemester, refreshKey]);

  // Extract dynamic subjects added by Owner
  const dynamicSubjects = useMemo(() => {
    return extractDynamicSubjects(communityNotes, staticSubjects);
  }, [communityNotes, staticSubjects, refreshKey]);

  // Filter notes relevant to the active semester
  const relevantNotes = useMemo(() => {
    if (!communityNotes || !selectedSemester) return [];
    return communityNotes.filter(n => {
      if (n.material_type === 'subject_placeholder') return false;
      const sem = (n.semester || '').toLowerCase();
      const targetSem = selectedSemester.toLowerCase();
      return sem.includes(targetSem) || sem.includes(selectedSemester.replace(' Semester', '').toLowerCase());
    });
  }, [communityNotes, selectedSemester]);

  // Combined subjects with legacy + community notes
  const allSubjects = useMemo(() => {
    if (!selectedSemester) return [];
    const map = new Map<string, any>();

    staticSubjects.forEach(s => map.set(s.name.toLowerCase(), s));

    dynamicSubjects.forEach(s => {
      if (!map.has(s.name.toLowerCase())) {
        map.set(s.name.toLowerCase(), s);
      }
    });

    const list = Array.from(map.values());

    return list.map(sub => {
      let legacy: any[] = [];
      Object.keys(LEGACY_BBA_NOTES).forEach(key => {
        if (
          key.toLowerCase() === sub.name.toLowerCase() ||
          sub.name.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(sub.name.toLowerCase())
        ) {
          legacy = [...legacy, ...LEGACY_BBA_NOTES[key]];
        }
      });

      const community = relevantNotes.filter(n => matchesSubject(n.subject, sub.name, sub.id));

      const mergedNotes = [
        ...legacy.map((l, i) => ({
          id: `legacy-${sub.id}-${i}`,
          title: l.title,
          file_url: l.url,
          isLegacy: true,
          created_at: '2024-01-01',
        })),
        ...community,
      ];

      return {
        ...sub,
        notes: mergedNotes,
      };
    });
  }, [selectedSemester, staticSubjects, dynamicSubjects, relevantNotes]);

  // Filtered subjects by search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return allSubjects;
    const q = searchQuery.toLowerCase();
    return allSubjects.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.code && s.code.toLowerCase().includes(q)) ||
      (s.fullName && s.fullName.toLowerCase().includes(q))
    );
  }, [allSubjects, searchQuery]);

  // Active selected subject item
  const activeSubjectItem = useMemo(() => {
    if (!selectedSubject) return null;
    const q = selectedSubject.toLowerCase().trim();
    return allSubjects.find(s =>
      s.name.toLowerCase().trim() === q ||
      s.id === q ||
      (s.code && s.code.toLowerCase().trim() === q)
    ) || null;
  }, [allSubjects, selectedSubject]);

  // Handle Owner Add Subject
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner || !selectedSemester) return;
    const trimmed = newSubName.trim();
    if (!trimmed) {
      toast({ title: 'Name required', description: 'Please enter a subject name.', variant: 'destructive' });
      return;
    }

    setIsSubmittingNew(true);
    try {
      await saveCustomSubject(
        'bba',
        selectedSemester,
        undefined,
        {
          name: trimmed,
          fullName: newSubFullName.trim() || trimmed,
        },
        user
      );
      toast({
        title: 'Subject Created! 🎓',
        description: `"${trimmed}" is now active in BBA ${selectedSemester}.`,
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
        description: `Renamed to "${trimmed}".`,
      });
      setEditingSubject(null);
      setRefreshKey(k => k + 1);
      refreshNotes();
    } catch (err: any) {
      toast({ title: 'Rename Failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmittingRename(false);
    }
  };

  // Handle Owner Delete Subject (only if 0 notes)
  const handleDeleteSubject = async (subName: string, notesCount: number) => {
    if (!isOwner || !selectedSemester) return;

    if (notesCount > 0) {
      toast({
        title: 'Cannot Delete Subject',
        description: `"${subName}" has ${notesCount} active note(s). Please delete all notes first.`,
        variant: 'destructive',
      });
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${subName}" from BBA ${selectedSemester}?`)) {
      return;
    }

    setDeletingSubject(subName);
    try {
      await deleteSubject(subName, 'bba', selectedSemester);
      toast({
        title: 'Subject Deleted 🗑️',
        description: `"${subName}" has been removed from BBA ${selectedSemester}.`,
      });
      setRefreshKey(k => k + 1);
      refreshNotes();
    } catch (err: any) {
      toast({ title: 'Delete Failed', description: err.message, variant: 'destructive' });
    } finally {
      setDeletingSubject(null);
    }
  };

  // Handle Community Note Deletion
  const handleDeleteCommunityNote = async (id: string, fileName?: string) => {
    if (!user || !isOwner) return;
    if (!window.confirm('Delete this study material?')) return;

    try {
      if (fileName) {
        await supabase.storage.from('study-materials').remove([fileName]);
      }
      const { error } = await supabase.from('study_materials').delete().eq('id', id);
      if (error) throw error;

      toast({ title: 'Material Deleted', description: 'The study material has been removed.' });
      refreshNotes();
    } catch (err: any) {
      toast({ title: 'Error deleting', description: err.message, variant: 'destructive' });
    }
  };

  // Handle Semester WhatsApp Share
  const handleShareSemester = (sem: typeof BBA_SEMESTERS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/bba-notes?sem=${encodeURIComponent(sem.id)}`;
    shareContent({
      title: `${sem.name} BBA Notes - College Study Hub`,
      text: `Check out BBA ${sem.name} notes, study material and syllabus on College Study Hub!`,
      url: shareUrl,
    });
  };

  // =========================================================================
  // LEVEL 3: INDIVIDUAL SUBJECT PDF VIEW
  // =========================================================================
  if (selectedSemester && selectedSubject) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />

        {/* Header Breadcrumb */}
        <div className="bg-slate-900 text-white pt-10 pb-8 px-4 sm:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setSelectedSubject(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-4 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to {selectedSemester} Subjects
            </button>

            {activeSubjectItem ? (
              <>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-3xl">{activeSubjectItem.icon || '📊'}</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    {activeSubjectItem.name}
                  </h1>
                  {activeSubjectItem.code && (
                    <span className="text-xs font-mono font-bold uppercase bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                      {activeSubjectItem.code}
                    </span>
                  )}
                  <span className="text-xs font-bold uppercase bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    {activeSubjectItem.notes?.length || 0} Files Available
                  </span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  HBTU Kanpur • BBA {selectedSemester} • {activeSubjectItem.fullName || activeSubjectItem.name}
                </p>
              </>
            ) : (
              <h1 className="text-xl font-bold">Subject Not Found</h1>
            )}
          </div>
        </div>

        {/* Content Container (Full Width, 4 Cards in a Row on Desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full mb-16">
          {!activeSubjectItem ? (
            <div className="text-center py-16">
              <p className="text-base font-bold text-foreground">Subject could not be loaded</p>
              <button
                onClick={() => setSelectedSubject(null)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-foreground text-background"
              >
                Back to {selectedSemester} Subjects
              </button>
            </div>
          ) : activeSubjectItem.notes && activeSubjectItem.notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activeSubjectItem.notes.map((note: any, index: number) => {
                const noteUrl = note.file_url || note.url || '#';
                const noteTitle = note.title || 'Untitled Document';

                return (
                  <motion.div
                    key={note.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.25 }}
                  >
                    <div className="group border border-border bg-card hover:border-primary/60 rounded-xl p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between h-full relative">
                      {/* Top Badges & Recommendation Star */}
                      <RecommendationBadge note={note} />

                      <div>
                        <div className="flex items-center gap-2 mb-3 flex-wrap pr-16">
                          <PdfCardBadge />
                          {note.isCommunity && (
                            <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">
                              Community
                            </span>
                          )}
                          {note.material_type && (
                            <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                              {note.material_type === 'pyqs' ? 'PYQ ❓' : note.material_type === 'book' ? 'Book 📚' : 'Notes 📖'}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-foreground text-sm leading-snug flex-1 mb-2">
                          {noteTitle}
                        </h3>

                        {note.user_name && (
                          <p className="text-[10px] text-muted-foreground mb-3">
                            Uploaded by: {note.user_name}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons: VIEW (Wide) + DOWNLOAD (Side) */}
                      <div className="flex gap-2 pt-3 border-t border-border mt-3">
                        <button
                          onClick={() => viewInBrowser(noteUrl, noteTitle)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer"
                          disabled={noteUrl === '#'}
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </button>

                        <button
                          onClick={() => smartDownload(noteUrl, `${noteTitle}.pdf`)}
                          className="inline-flex items-center justify-center p-2 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer"
                          disabled={noteUrl === '#'}
                          title="Download PDF"
                        >
                          <Download className="h-3.5 w-3.5 text-foreground" />
                        </button>

                        {note.isCommunity && isOwner && (
                          <button
                            onClick={() => handleDeleteCommunityNote(note.id, note.file_name)}
                            className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                            title="Delete Material"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-6 border-2 border-dashed border-border rounded-2xl bg-card">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <h3 className="text-foreground font-bold text-lg mb-1">
                Study materials coming soon for {activeSubjectItem.name}!
              </h3>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
                This course is part of the official HBTU BBA curriculum. If you have classroom notes, presentations, or previous exam papers, share them to help your fellow students!
              </p>
              <button
                onClick={() => window.open(
                  "https://wa.me/918957221543?text=" + encodeURIComponent(`Hello Priyal Sir (HBTU), I have notes / study material for BBA ${selectedSemester} - ${activeSubjectItem.name} and would like to contribute.`),
                  "_blank"
                )}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                Message Priyal Sir (CSE'27 HBTU) to Contribute
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }

  // =========================================================================
  // LEVEL 2: SEMESTER SUBJECTS DIRECTORY
  // =========================================================================
  if (selectedSemester && !selectedSubject) {
    const semInfo = BBA_SEMESTERS.find(s => s.id === selectedSemester);

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />

        {/* Hero Header */}
        <div className="bg-slate-900 text-white pt-12 pb-10 px-4 sm:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => {
                setSelectedSemester(null);
                setSelectedSubject(null);
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-4 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to BBA Semesters
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    OFFICIAL HBTU CURRICULUM
                  </span>
                  <span className="text-xs text-slate-400">
                    BBA • {semInfo?.year || 'Program'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                  {selectedSemester} Subjects
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {semInfo?.description || 'Select any course to view all available lecture notes, reference books, and PYQs.'}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://hbtu.ac.in/wp-content/uploads/2024/11/BBA-Syllbus-HBTU-Kanpur.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  <span>HBTU Syllabus (PDF)</span>
                </a>

                {isOwner && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Subject (Owner)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Container (4 Subjects in a Row on Desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full">
          {/* Controls: Search Bar + Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card border border-border p-3.5 rounded-2xl shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${selectedSemester} subjects...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-muted-foreground font-semibold flex items-center gap-2">
              <span className="text-foreground font-bold">{filteredSubjects.length}</span> subjects available
            </div>
          </div>

          {/* Subjects Grid (Responsive 4 in a row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSubjects.map((subject, index) => {
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
                    onClick={() => setSelectedSubject(subject.name)}
                    className="group border border-border bg-card hover:border-primary/60 rounded-xl p-4 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Header: Icon + File Count + Owner Controls */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-xl p-1.5 rounded-lg bg-muted/60">{subject.icon}</span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${notesCount > 0 ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                            {notesCount} {notesCount === 1 ? 'file' : 'files'}
                          </span>

                          <div onClick={e => e.stopPropagation()}>
                            <SubjectShareButton subjectName={subject.name} subjectId={subject.id} />
                          </div>

                          {/* Owner Controls */}
                          {isOwner && (
                            <div className="flex items-center gap-1 ml-1" onClick={e => e.stopPropagation()}>
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

                      {/* Subject Name & Code */}
                      <h3 className="font-bold text-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {subject.fullName || subject.name}
                      </p>
                    </div>

                    {/* Card Action Button */}
                    <div className="pt-3 border-t border-border mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubject(subject.name);
                        }}
                        className="w-full text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Notes ({notesCount})</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Owner Add Subject Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-foreground">Add Subject to BBA {selectedSemester}</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <form onSubmit={handleAddSubject} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Subject Name & Code</label>
                    <input
                      type="text"
                      placeholder="e.g. Digital Marketing (BBA 315)"
                      value={newSubName}
                      onChange={e => setNewSubName(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Full Subject Title (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Advanced Digital Marketing & Social Media Strategy"
                      value={newSubFullName}
                      onChange={e => setNewSubFullName(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-3 py-2 text-xs rounded-lg border border-border hover:bg-muted font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingNew}
                      className="px-4 py-2 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      {isSubmittingNew ? 'Creating...' : 'Create Subject'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Owner Rename Subject Modal */}
        <AnimatePresence>
          {editingSubject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-foreground">Rename Subject</h3>
                  <button onClick={() => setEditingSubject(null)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">New Subject Name</label>
                    <input
                      type="text"
                      value={renameValue}
                      onChange={e => setRenameValue(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingSubject(null)}
                      className="px-3 py-2 text-xs rounded-lg border border-border hover:bg-muted font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleRenameSubject}
                      disabled={isSubmittingRename}
                      className="px-4 py-2 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                    >
                      {isSubmittingRename ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    );
  }

  // =========================================================================
  // LEVEL 1: BBA SEMESTERS DIRECTORY (Initial View, Exactly Like B.Tech!)
  // =========================================================================
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white pt-16 pb-14 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Notes Categories
          </button>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              OFFICIAL HBTU CURRICULUM
            </span>
            <span className="text-xs text-slate-400">
              Department of Business Administration • HBTU Kanpur
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white">
            Bachelor of Business Administration (BBA) Notes
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Select your semester to access curated classroom notes, faculty presentations, reference books, and previous years' exam papers (PYQs).
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            <a
              href="https://hbtu.ac.in/wp-content/uploads/2024/11/BBA-Syllbus-HBTU-Kanpur.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-xs cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
              <span>Official HBTU Syllabus (PDF)</span>
            </a>

            <span className="text-xs font-semibold tracking-wider uppercase border border-slate-700 bg-slate-800/80 px-3 py-1 rounded-md text-slate-300">
              6 Semesters • 36 Core Subjects
            </span>

            <span className="text-xs font-semibold tracking-wider uppercase border border-slate-700 bg-slate-800/80 px-3 py-1 rounded-md text-slate-300">
              3-Year Degree Program
            </span>
          </div>
        </div>
      </div>

      {/* Main Container: 6 Semester Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1 w-full">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Select Academic Semester</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Choose your semester to explore subjects, faculty notes, and study material.
            </p>
          </div>
          <span className="text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            6 Semesters Total
          </span>
        </div>

        {/* 6 Semester Cards (Just like B.Tech Semesters!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BBA_SEMESTERS.map((sem, index) => (
            <motion.div
              key={sem.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="h-full"
            >
              <div
                onClick={() => {
                  setSelectedSemester(sem.id);
                  setSelectedSubject(null);
                }}
                className="group border border-border bg-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 h-full relative hover:border-foreground/30 hover:shadow-xl cursor-pointer"
              >
                {/* Top Right WhatsApp Share Button */}
                <button
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 hover:bg-emerald-600 text-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  onClick={(e) => handleShareSemester(sem, e)}
                  title={`Share ${sem.name} Notes`}
                >
                  <Share2 className="h-4 w-4" />
                </button>

                {/* AI-Generated / Graphic Centered Thumbnail with smooth hover zoom */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <img
                    src={sem.thumbnail}
                    alt={sem.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600">
                      {sem.year}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        {sem.subjectsCount} Core Subjects
                      </span>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                      {sem.name}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {sem.description}
                    </p>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {sem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-border bg-muted/60 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <div className="pt-2 border-t border-border mt-auto">
                    <button
                      className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-xl bg-foreground text-background hover:opacity-85 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSemester(sem.id);
                        setSelectedSubject(null);
                      }}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Select Semester →</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BBANotes;
