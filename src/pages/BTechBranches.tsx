import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  Play,
  Download,
  ExternalLink,
  BookOpen,
  Sparkles,
  RotateCcw,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { SubjectShareButton } from "@/components/SubjectShareButton";
import { useToast } from "@/hooks/use-toast";
import { shareContent } from "@/utils/shareUtils";
import { Share2 } from "lucide-react";
import Footer from "@/components/Footer";
import { PlaylistModal } from "@/components/PlaylistModal";
import { smartDownload, viewInBrowser } from "@/lib/downloadUtils";
import { motion, AnimatePresence } from "framer-motion";
import {
  getSemesterSubjects,
  SemesterSubjectItem
} from "@/data/semesterSubjectsCatalog";

import cseItAimlImg from "@/assets/cse-it-aiml-thumbnail-new.png";
import meImg from "@/assets/me-thumbnail-new.png";
import ceImg from "@/assets/ce-thumbnail-new.png";
import cheImg from "@/assets/che-thumbnail-new.png";
import etImg from "@/assets/et-thumbnail-new.png";
import eeImg from "@/assets/ee-thumbnail-new.png";
import beImg from "@/assets/be-thumbnail-new.png";
import lftImg from "@/assets/lft-thumbnail-new.png";
import ptImg from "@/assets/pt-thumbnail-new.png";
import plImg from "@/assets/pl-thumbnail-new.png";
import ftImg from "@/assets/ft-thumbnail-new.png";
import otImg from "@/assets/ot-thumbnail-new.png";
import btImg from "@/assets/bt-thumbnail-new.png";

const BTechBranches = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { year, semester } = useParams<{ year: string; semester: string }>();
  const semesterNum = semester?.replace("semester-", "") || "3";

  // Branch routing mapping
  const getRoute = (branchKey: string) => {
    const routes: Record<string, Record<string, string>> = {
      'CSE/IT': {
        'semester-3': '/third-semester-cse',
        'semester-4': '/fourth-semester-cse',
        'semester-5': '/fifth-semester-cse',
        'semester-6': '/sixth-semester-cse',
        'semester-7': '/seventh-semester-cse',
        'semester-8': '/eighth-semester-cse',
      },
      'CHE': {
        'semester-3': '/third-semester-che',
        'semester-4': '/fourth-semester-che',
        'semester-5': '/fifth-semester-che',
        'semester-6': '/sixth-semester-che',
      },
      'ME': {
        'semester-3': '/third-semester-me',
        'semester-4': '/fourth-semester-me',
        'semester-5': '/fifth-semester-me',
        'semester-6': '/sixth-semester-me',
      },
      'CE': {
        'semester-3': '/third-semester-ce',
        'semester-4': '/fourth-semester-ce',
        'semester-5': '/fifth-semester-ce',
        'semester-6': '/sixth-semester-ce',
      },
      'ET': {
        'semester-3': '/third-semester-et',
        'semester-4': '/fourth-semester-et',
        'semester-5': '/fifth-semester-et',
        'semester-6': '/sixth-semester-et',
      },
      'EE': {
        'semester-3': '/third-semester-ee',
        'semester-4': '/fourth-semester-ee',
        'semester-5': '/fifth-semester-ee',
        'semester-6': '/sixth-semester-ee',
      },
      'BE': {
        'semester-3': '/third-semester-be',
        'semester-4': '/fourth-semester-be',
        'semester-5': '/fifth-semester-be',
        'semester-6': '/sixth-semester-be',
      },
      'LFT': {
        'semester-3': '/third-semester-lft',
        'semester-4': '/fourth-semester-lft',
        'semester-5': '/fifth-semester-lft',
        'semester-6': '/sixth-semester-lft',
      },
      'PT': { 
        'semester-3': '/third-semester-pt', 
        'semester-4': '/fourth-semester-pt', 
        'semester-5': '/fifth-semester-pt', 
        'semester-6': '/sixth-semester-pt' 
      },
      'FT': { 
        'semester-3': '/third-semester-ft', 
        'semester-4': '/fourth-semester-ft', 
        'semester-5': '/fifth-semester-ft', 
        'semester-6': '/sixth-semester-ft' 
      },
      'OT': { 
        'semester-3': '/third-semester-ot', 
        'semester-4': '/fourth-semester-ot', 
        'semester-5': '/fifth-semester-ot', 
        'semester-6': '/sixth-semester-ot' 
      },
      'BT': { 
        'semester-3': '/third-semester-bt', 
        'semester-4': '/fourth-semester-bt',
        'semester-5': '/fifth-semester-bt',
        'semester-6': '/sixth-semester-bt'
      },
      'PL': { 
        'semester-3': '/third-semester-pl', 
        'semester-4': '/fourth-semester-pl',
        'semester-5': '/fifth-semester-pl',
        'semester-6': '/sixth-semester-pl'
      },
    };
    return routes[branchKey]?.[semester || ''] || '#';
  };

  const isAvailable = (branchKey: string) => getRoute(branchKey) !== '#';

  const branches = [
    { name: "CSE/IT", fullName: "Computer Science, IT & CSE (AI & ML)", description: "Software development, algorithms, AI & Machine Learning, and computing systems", thumbnail: cseItAimlImg },
    { name: "CHE", fullName: "Chemical Engineering", description: "Chemical processes, reaction engineering, and material transformation", thumbnail: cheImg },
    { name: "ME", fullName: "Mechanical Engineering", description: "Machines, thermodynamics, fluid mechanics, and manufacturing", thumbnail: meImg },
    { name: "CE", fullName: "Civil Engineering", description: "Infrastructure, construction, and structural design", thumbnail: ceImg },
    { name: "ET", fullName: "Electronics Engineering", description: "Electronic circuits, embedded systems, and communication devices", thumbnail: etImg },
    { name: "EE", fullName: "Electrical Engineering", description: "Power systems, control engineering, and electrical networks", thumbnail: eeImg },
    { name: "BE", fullName: "Biochemical Engineering", description: "Bioprocesses, fermentation, and biochemical system design", thumbnail: beImg },
    { name: "LFT", fullName: "Leather & Fashion Technology", description: "Leather processing, footwear design, and fashion manufacturing", thumbnail: lftImg },
    { name: "PT", fullName: "Paint Technology", description: "Paint formulation, coatings, and polymer surface science", thumbnail: ptImg },
    { name: "PL", fullName: "Plastic Technology", description: "Plastic processing, polymer science, and materials engineering", thumbnail: plImg },
    { name: "FT", fullName: "Food Technology", description: "Food processing, preservation, and quality management", thumbnail: ftImg },
    { name: "OT", fullName: "Oil Technology", description: "Edible oil processing, refining, and surface-active agents", thumbnail: otImg },
    { name: "BT", fullName: "BioTechnology", description: "Genetic engineering, cell culture, and biotechnology applications", thumbnail: btImg },
  ];

  const handleBranchClick = (branch: typeof branches[0]) => {
    const route = getRoute(branch.name);
    if (route !== '#') navigate(route);
  };

  const handleShareBranch = async (branch: typeof branches[0]) => {
    const route = getRoute(branch.name);
    if (route !== '#') {
      await shareContent({
        title: `${branch.name} - Semester ${semesterNum} Notes`,
        text: `Check out ${branch.fullName} Semester ${semesterNum} Notes on College Study Hub:`,
        url: route,
        toast,
      });
    }
  };

  // ════════════ SUBJECT FILTER ACROSS BRANCHES ════════════
  const allSemesterSubjects = useMemo(() => {
    return getSemesterSubjects(semesterNum);
  }, [semesterNum]);

  // Persisted selected subjects in browser localStorage
  const storageKey = `csh_selected_subjects_sem_${semesterNum}`;
  const [selectedSubjectKeys, setSelectedSubjectKeys] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [searchFilterQuery, setSearchFilterQuery] = useState("");
  const [expandedPlaylists, setExpandedPlaylists] = useState<string[]>([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [activePlaylistData, setActivePlaylistData] = useState<{
    subjectName: string;
    type: 'detailed' | 'oneshot';
    playlists: Record<string, { detailed: any[]; oneshot: any[] }>;
  }>({ subjectName: '', type: 'detailed', playlists: {} });

  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(e.target as Node)) {
        setIsSubjectDropdownOpen(false);
      }
    };
    if (isSubjectDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSubjectDropdownOpen]);

  // Reset or update selected keys if semester changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`csh_selected_subjects_sem_${semesterNum}`);
      setSelectedSubjectKeys(saved ? JSON.parse(saved) : []);
    } catch {
      setSelectedSubjectKeys([]);
    }
    setSearchFilterQuery("");
  }, [semesterNum]);

  const toggleSubjectSelect = (subKey: string) => {
    setSelectedSubjectKeys(prev => {
      const updated = prev.includes(subKey)
        ? prev.filter(k => k !== subKey)
        : [...prev, subKey];
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const selectAllSubjects = () => {
    const allKeys = allSemesterSubjects.map(s => s.key);
    setSelectedSubjectKeys(allKeys);
    try {
      localStorage.setItem(storageKey, JSON.stringify(allKeys));
    } catch (err) {
      console.error(err);
    }
  };

  const resetSubjectSelection = () => {
    setSelectedSubjectKeys([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (err) {
      console.error(err);
    }
  };

  // Live filtered subjects for the dropdown search
  const dropdownFilteredSubjects = useMemo(() => {
    const q = searchFilterQuery.trim().toLowerCase();
    if (!q) return allSemesterSubjects;
    return allSemesterSubjects.filter(sub => {
      const nameMatch = sub.name.toLowerCase().includes(q);
      const branchMatch = sub.branches.some(b => b.toLowerCase().includes(q));
      const noteMatch = sub.notes.some(n => n.title.toLowerCase().includes(q));
      return nameMatch || branchMatch || noteMatch;
    });
  }, [allSemesterSubjects, searchFilterQuery]);

  // Active subjects displayed in cards when filtered
  const activeFilteredSubjects = useMemo(() => {
    if (selectedSubjectKeys.length === 0) return [];
    return allSemesterSubjects.filter(sub => selectedSubjectKeys.includes(sub.key));
  }, [allSemesterSubjects, selectedSubjectKeys]);

  const togglePlaylistExpansion = (subKey: string) => {
    setExpandedPlaylists(prev =>
      prev.includes(subKey) ? prev.filter(k => k !== subKey) : [...prev, subKey]
    );
  };

  const handleOpenPlaylist = (subject: SemesterSubjectItem, type: 'detailed' | 'oneshot') => {
    setActivePlaylistData({
      subjectName: subject.name,
      type,
      playlists: {
        [subject.name]: {
          detailed: subject.playlists.detailed,
          oneshot: subject.playlists.oneshot,
        }
      }
    });
    setShowPlaylistModal(true);
  };

  const navigateToBranchForSubject = (branchName: string) => {
    const route = getRoute(branchName);
    if (route !== '#') navigate(route);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      {/* ══════════ CLEAN HERO HEADER (MATCHING 1ST YEAR) ══════════ */}
      <div className="bg-slate-900 text-white pt-8 pb-8 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(`/btech-notes/${year}`)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Semesters
            </button>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>Semester {semesterNum} Notes & Branches</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your branch or search common subjects across all engineering disciplines.
            </p>
          </div>

          {/* Top Right Action: Filter Subjects Across Branches */}
          <div className="relative" ref={subjectDropdownRef}>
            <button
              onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                selectedSubjectKeys.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                {selectedSubjectKeys.length > 0
                  ? `Filtered (${selectedSubjectKeys.length} Subjects)`
                  : `Filter Subjects (${allSemesterSubjects.length})`}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSubjectDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu with Live Typeahead Search and Green Ticks */}
            {isSubjectDropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-popover border border-border rounded-2xl shadow-2xl p-3.5 space-y-3 text-popover-foreground animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Semester {semesterNum} Subjects</h4>
                    <p className="text-[10px] text-muted-foreground">Unique subjects across all branches</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedSubjectKeys.length < allSemesterSubjects.length && (
                      <button
                        type="button"
                        onClick={selectAllSubjects}
                        className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Select All
                      </button>
                    )}
                    {selectedSubjectKeys.length > 0 && (
                      <button
                        type="button"
                        onClick={resetSubjectSelection}
                        className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Search Input (Type-ahead like Google/YouTube) */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchFilterQuery}
                    onChange={e => setSearchFilterQuery(e.target.value)}
                    placeholder="Search any subject (e.g. Entrepreneur, Math)..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    autoFocus
                  />
                </div>

                {/* Subjects List with Green Ticks */}
                <div className="max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {dropdownFilteredSubjects.length === 0 ? (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                      No subjects match "{searchFilterQuery}".
                    </div>
                  ) : (
                    dropdownFilteredSubjects.map(sub => {
                      const isChecked = selectedSubjectKeys.includes(sub.key);
                      return (
                        <div
                          key={sub.key}
                          onClick={() => toggleSubjectSelect(sub.key)}
                          className={`flex items-center justify-between gap-2 p-2 rounded-xl text-xs cursor-pointer select-none transition-all ${
                            isChecked
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-foreground font-semibold border border-emerald-500/30'
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-sm shrink-0">{sub.icon}</span>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold leading-tight text-foreground">
                                {sub.name}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                                  {sub.branches.join(', ')}
                                </span>
                                {sub.notes.length > 0 && (
                                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                                    • {sub.notes.length} notes
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-muted-foreground/40 bg-background'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {selectedSubjectKeys.length > 0 && (
                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {selectedSubjectKeys.length} selected
                    </span>
                    <button
                      onClick={() => setIsSubjectDropdownOpen(false)}
                      className="text-xs font-bold px-3 py-1 bg-foreground text-background rounded-lg hover:opacity-90"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ MAIN CONTENT AREA ══════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full mb-12 space-y-8">
        
        {/* ── CASE 1: USER HAS SELECTED SUBJECTS VIA FILTER ── */}
        {selectedSubjectKeys.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card border border-emerald-500/30 p-4 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    Filtered Subjects ({activeFilteredSubjects.length} of {allSemesterSubjects.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Direct access to notes, consolidated files, and curated playlists across branches.
                  </p>
                </div>
              </div>

              <button
                onClick={resetSubjectSelection}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/30 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset to All Branches
              </button>
            </div>

            {/* Filtered Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeFilteredSubjects.map((sub, idx) => {
                const hasDetailed = sub.playlists.detailed && sub.playlists.detailed.length > 0;
                const hasOneshot = sub.playlists.oneshot && sub.playlists.oneshot.length > 0;
                const hasAnyPlaylist = hasDetailed || hasOneshot;
                const isExpanded = expandedPlaylists.includes(sub.key);

                return (
                  <motion.div
                    key={sub.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.25 }}
                  >
                    <div className="group border border-border bg-card hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between">
                      <div>
                        {/* Top Row: Icon + Branch Badges + Notes Count */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-2xl p-2 rounded-xl bg-muted/60">{sub.icon}</span>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                              {sub.notes.length} files
                            </span>
                            <SubjectShareButton
                              subjectName={sub.name}
                              subjectId={sub.key}
                              semesterName={`Semester ${semesterNum}`}
                              route={`/btech-notes/${year}/${semester}`}
                            />
                          </div>
                        </div>

                        {/* Subject Title */}
                        <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {sub.name}
                        </h3>

                        {/* Available branches badge */}
                        <div className="flex items-center gap-1 flex-wrap mb-3">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Offered in:</span>
                          {sub.branches.map(b => (
                            <span
                              key={b}
                              onClick={() => navigateToBranchForSubject(b)}
                              className="text-[10px] font-bold bg-muted hover:bg-emerald-500/20 hover:text-emerald-700 dark:hover:text-emerald-300 text-foreground px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                              title={`Open ${b} semester page`}
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        {/* Notes List preview (up to 4 notes, or full) */}
                        <div className="space-y-1.5 mb-4 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                          {sub.notes.length === 0 ? (
                            <p className="text-xs text-muted-foreground italic py-2">
                              No PDF files directly linked. Check branch notes page.
                            </p>
                          ) : (
                            sub.notes.map((note, nIdx) => (
                              <div
                                key={nIdx}
                                className="flex items-center justify-between gap-2 p-2 rounded-lg border border-border/70 bg-background hover:bg-muted/50 transition-colors text-xs"
                              >
                                <span className="truncate font-medium text-foreground flex-1">
                                  {note.title}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => smartDownload(note.url, note.title)}
                                    className="p-1 rounded text-foreground hover:bg-muted cursor-pointer"
                                    title="Download Note"
                                    disabled={note.url === '#'}
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => viewInBrowser(note.url)}
                                    className="p-1 rounded text-foreground hover:bg-muted cursor-pointer"
                                    title="View in Browser"
                                    disabled={note.url === '#'}
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Highlighted Curated Playlists Button (Matching 1st Year) */}
                      <div>
                        {hasAnyPlaylist && (
                          <div className="pt-3 border-t border-border">
                            <button
                              className={`flex items-center justify-between w-full text-xs font-bold px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-2xs ${
                                isExpanded
                                  ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/40 shadow-xs'
                                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/40'
                              }`}
                              onClick={() => togglePlaylistExpansion(sub.key)}
                            >
                              <span className="flex items-center gap-1.5">
                                <Play className="h-3 w-3 fill-emerald-600/30 text-emerald-600 dark:text-emerald-400" /> Curated Playlists
                              </span>
                              {isExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="mt-2 space-y-1">
                                {hasDetailed && (
                                  <button
                                    className="w-full text-left text-xs py-2 px-2.5 rounded-lg border border-border/70 bg-card hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-500/30 transition-all text-foreground flex items-center justify-between cursor-pointer font-medium group/pl shadow-2xs"
                                    onClick={() => handleOpenPlaylist(sub, 'detailed')}
                                  >
                                    <span className="flex items-center gap-1.5">📚 Detailed Topics</span>
                                    <span className="text-[10px] font-mono font-bold bg-muted group-hover/pl:bg-emerald-500/20 group-hover/pl:text-emerald-700 dark:group-hover/pl:text-emerald-300 px-1.5 py-0.5 rounded">
                                      {sub.playlists.detailed.length}
                                    </span>
                                  </button>
                                )}
                                {hasOneshot && (
                                  <button
                                    className="w-full text-left text-xs py-2 px-2.5 rounded-lg border border-border/70 bg-card hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-500/30 transition-all text-foreground flex items-center justify-between cursor-pointer font-medium group/pl shadow-2xs"
                                    onClick={() => handleOpenPlaylist(sub, 'oneshot')}
                                  >
                                    <span className="flex items-center gap-1.5">⚡ One Shot</span>
                                    <span className="text-[10px] font-mono font-bold bg-muted group-hover/pl:bg-emerald-500/20 group-hover/pl:text-emerald-700 dark:group-hover/pl:text-emerald-300 px-1.5 py-0.5 rounded">
                                      {sub.playlists.oneshot.length}
                                    </span>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Open Branch Notes Button */}
                        <div className="pt-2">
                          <button
                            onClick={() => navigateToBranchForSubject(sub.branches[0])}
                            className="w-full text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer mt-2"
                          >
                            Open in {sub.branches[0]} Page
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── CASE 2: DEFAULT VIEW (ALL ENGINEERING BRANCHES GRID) ── */
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground">
                Engineering Branches
              </p>
              <button
                onClick={() => setIsSubjectDropdownOpen(true)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="h-3 w-3" /> Search by Subjects
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch, index) => {
                const available = isAvailable(branch.name);
                return (
                  <motion.div
                    key={branch.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                  >
                    <div
                      className={`group border border-border rounded-xl overflow-hidden bg-card transition-all duration-300 ${
                        available
                          ? 'cursor-pointer hover:border-foreground/30 hover:shadow-lg'
                          : 'opacity-55 cursor-default'
                      }`}
                      onClick={() => available && handleBranchClick(branch)}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full h-44 overflow-hidden bg-muted">
                        <img
                          src={branch.thumbnail}
                          alt={branch.fullName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          {available && (
                            <button
                              type="button"
                              className="w-7 h-7 bg-black/60 hover:bg-emerald-600 text-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShareBranch(branch);
                              }}
                              title={`Share ${branch.name} Semester ${semesterNum} Notes`}
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {available ? (
                            <span className="text-[9px] font-bold tracking-wider uppercase bg-emerald-500/90 text-white px-2 py-0.5 rounded-full">
                              Available
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold tracking-wider uppercase bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-4 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                            {branch.fullName}
                          </h3>
                          {available && (
                            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                          {branch.description}
                        </p>
                        
                        <div className="pt-2">
                          {available ? (
                            <button
                              className="w-full text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); handleBranchClick(branch); }}
                            >
                              View Notes
                            </button>
                          ) : (
                            <button disabled className="w-full text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-lg border border-border text-muted-foreground cursor-default">
                              Coming Soon
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <PlaylistModal
          isOpen={showPlaylistModal}
          onClose={() => setShowPlaylistModal(false)}
          subjectName={activePlaylistData.subjectName}
          playlistType={activePlaylistData.type}
          subjectPlaylists={activePlaylistData.playlists}
        />
      )}

      <Footer />
    </div>
  );
};

export default BTechBranches;
