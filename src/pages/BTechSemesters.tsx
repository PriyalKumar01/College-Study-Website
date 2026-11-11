// Navigation: semester selection grid and catalog binding
// B.Tech semester list portal
import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Share2,
  Search,
  Sparkles,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Check,
  FileText,
  Download,
  ExternalLink,
  Play,
  X
} from "lucide-react";
import { getSemesterSubjects, SemesterSubjectItem } from "@/data/semesterSubjectsCatalog";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlaylistModal } from "@/components/PlaylistModal";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { shareContent } from "@/utils/shareUtils";
import { smartDownload, viewInBrowser } from "@/lib/downloadUtils";
import thirdSemImg from "@/assets/sem3-thumbnail-new.png";
import fourthSemImg from "@/assets/sem4-thumbnail-new.png";
import fifthSemImg from "@/assets/5th-sem-thumbnail.jpg";
import sixthSemImg from "@/assets/6th-sem-thumbnail.jpg";
import seventhSemImg from "@/assets/7th-sem-thumbnail-new.png";
import eighthSemImg from "@/assets/8th-sem-thumbnail-new.png";

const BTechSemesters = () => {
  const navigate = useNavigate();
  const { year } = useParams<{ year: string }>();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownSearchQuery, setDropdownSearchQuery] = useState('');
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  // Playlist modal state
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [activePlaylistData, setActivePlaylistData] = useState<{
    subjectName: string;
    type: 'detailed' | 'oneshot';
    playlists: Record<string, { detailed: any[]; oneshot: any[] }>;
  }>({ subjectName: '', type: 'detailed', playlists: {} });

  const yearName = year?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "Academic Year";

  const semestersByYear: Record<string, any[]> = {
    "second-year": [
      {
        name: "3rd Semester",
        description: "Core branch subjects and practical applications",
        available: true,
        route: "/btech-notes/second-year/semester-3",
        thumbnail: thirdSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "PL", "FT", "OT", "BT"],
      },
      {
        name: "4th Semester",
        description: "Advanced core subjects with lab work",
        available: true,
        route: "/btech-notes/second-year/semester-4",
        thumbnail: fourthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "PL", "FT", "OT", "BT"],
      },
    ],
    "third-year": [
      {
        name: "5th Semester",
        description: "Specialization courses and electives",
        available: true,
        route: "/btech-notes/third-year/semester-5",
        thumbnail: fifthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "FT", "OT"],
      },
      {
        name: "6th Semester",
        description: "Advanced specialization and project work",
        available: true,
        route: "/btech-notes/third-year/semester-6",
        thumbnail: sixthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "FT", "OT"],
      },
    ],
    "fourth-year": [
      {
        name: "7th Semester",
        description: "Final year electives, Open Elective-II, and major project",
        available: true,
        route: "/btech-notes/fourth-year/semester-7",
        thumbnail: seventhSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "PL", "FT", "OT"],
      },
      {
        name: "8th Semester",
        description: "Project completion and placement preparation",
        available: true,
        route: "/btech-notes/fourth-year/semester-8",
        thumbnail: eighthSemImg,
        branches: ["CSE/IT", "ME", "CE", "CHE", "ET", "EE", "BE", "LFT", "PT", "PL", "FT", "OT"],
      },
    ],
  };

  const semesters = semestersByYear[year || ""] || [];

  // Determine active semesters for this year
  const semesterNumsForYear = useMemo(() => {
    if (year === 'second-year') return ['3', '4'];
    if (year === 'third-year') return ['5', '6'];
    if (year === 'fourth-year') return ['7', '8'];
    return [];
  }, [year]);

  // Aggregate all subjects across the semesters of this year with uniqueId
  const allYearSubjects = useMemo(() => {
    const list: (SemesterSubjectItem & { semesterNum: string; uniqueId: string })[] = [];
    semesterNumsForYear.forEach(num => {
      const subs = getSemesterSubjects(num);
      subs.forEach(s => {
        list.push({
          ...s,
          semesterNum: num,
          uniqueId: `${num}-${s.key}`
        });
      });
    });
    return list;
  }, [semesterNumsForYear]);

  // Persisted selected subjects in browser localStorage per year
  const storageKey = `csh_my_selected_${year || 'year'}_subjects`;
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage aligned when year changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`csh_my_selected_${year || 'year'}_subjects`);
      setSelectedSubjects(saved ? JSON.parse(saved) : []);
    } catch {
      setSelectedSubjects([]);
    }
    setSearchQuery('');
    setDropdownSearchQuery('');
  }, [year]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(e.target as Node)) {
        setIsSubjectDropdownOpen(false);
      }
    };
    if (isSubjectDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSubjectDropdownOpen]);

  const toggleSubject = (uniqueId: string) => {
    setSelectedSubjects(prev => {
      const updated = prev.includes(uniqueId)
        ? prev.filter(id => id !== uniqueId)
        : [...prev, uniqueId];
      try {
        localStorage.setItem(`csh_my_selected_${year || 'year'}_subjects`, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const clearAllSelectedSubjects = () => {
    setSelectedSubjects([]);
    try {
      localStorage.removeItem(`csh_my_selected_${year || 'year'}_subjects`);
    } catch (err) {
      console.error(err);
    }
  };

  const selectAllMySubjects = () => {
    const allIds = allYearSubjects.map(s => s.uniqueId);
    setSelectedSubjects(allIds);
    try {
      localStorage.setItem(`csh_my_selected_${year || 'year'}_subjects`, JSON.stringify(allIds));
    } catch (err) {
      console.error(err);
    }
  };

  // Dropdown internal filter list
  const dropdownFilteredList = useMemo(() => {
    const q = dropdownSearchQuery.trim().toLowerCase();
    if (!q) return allYearSubjects;
    return allYearSubjects.filter(sub => {
      return (
        sub.name.toLowerCase().includes(q) ||
        sub.branches.some(b => b.toLowerCase().includes(q)) ||
        sub.semesterNum.includes(q)
      );
    });
  }, [allYearSubjects, dropdownSearchQuery]);

  // Active subjects chosen via "My Subjects" filter
  const activeFilteredSubjects = useMemo(() => {
    if (selectedSubjects.length === 0) return [];
    return allYearSubjects.filter(sub => selectedSubjects.includes(sub.uniqueId));
  }, [allYearSubjects, selectedSubjects]);

  // Live searched subjects
  const searchedSubjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const pool = selectedSubjects.length > 0 ? activeFilteredSubjects : allYearSubjects;
    return pool.filter(sub => {
      const nameMatch = sub.name.toLowerCase().includes(q);
      const branchMatch = sub.branches.some(b => b.toLowerCase().includes(q));
      const noteMatch = sub.notes.some(n => n.title.toLowerCase().includes(q));
      return nameMatch || branchMatch || noteMatch;
    });
  }, [allYearSubjects, selectedSubjects, activeFilteredSubjects, searchQuery]);

  // Display pool calculation:
  // If search query is active -> searchedSubjects
  // Else if user selected specific subjects via dropdown -> activeFilteredSubjects ("like ek slect kare to ek hi dikhe")
  // Else -> null (show semester cards)
  const isDisplayingSubjectCards = searchQuery.trim().length > 0 || selectedSubjects.length > 0;
  const displayedSubjects = searchQuery.trim().length > 0 ? searchedSubjects : activeFilteredSubjects;

  const handleShare = async (semName: string, route: string) => {
    await shareContent({
      title: `${semName} B.Tech Notes`,
      text: `Check out ${semName} B.Tech Notes on College Study Hub:`,
      url: route,
      toast,
    });
  };

  const handleSemesterClick = (semester: any) => {
    if (semester.available) {
      navigate(semester.route);
    }
  };

  const handleDownload = (url: string, title: string) => {
    if (!url || url === "#") {
      toast({
        title: "Link Coming Soon",
        description: "Study material softcopy is being prepared.",
      });
      return;
    }
    smartDownload(url, title, toast);
  };

  const handleOpenPlaylist = (subject: SemesterSubjectItem, type: 'detailed' | 'oneshot') => {
    const playlistArr = (subject.playlists && (subject.playlists as any)[type]) || [];
    setActivePlaylistData({
      subjectName: subject.name,
      type,
      playlists: playlistArr
    });
    setShowPlaylistModal(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      {/* Page Header */}
      <div className="bg-slate-900 text-white pt-10 pb-8 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/btech-notes")}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-400 hover:text-white transition-colors mb-3 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Years
          </button>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">📚</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {yearName} Semesters
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Select a semester or choose specific subjects using the filter below to jump straight to notes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex-1 w-full space-y-6">
        {/* ══════════ UNIFIED SUBJECT FILTER & SEARCH BAR (EXACT 1ST YEAR STYLE) ══════════ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card border border-slate-300 dark:border-slate-800 p-3.5 rounded-2xl shadow-xs transition-all">
          {/* Left: My Subjects dropdown filter */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm" ref={subjectDropdownRef}>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                My Subjects:
              </label>
              <button
                type="button"
                onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                className="w-full flex items-center justify-between text-xs h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-background hover:bg-muted/40 transition-colors font-medium text-foreground cursor-pointer"
              >
                <span className="truncate">
                  {selectedSubjects.length === 0
                    ? `All Subjects (${allYearSubjects.length})`
                    : `${selectedSubjects.length} of ${allYearSubjects.length} Selected`}
                </span>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {selectedSubjects.length > 0 && (
                    <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                      Filtered
                    </span>
                  )}
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isSubjectDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
            </div>

            {/* Dropdown Menu Popup with Green Checkmarks */}
            {isSubjectDropdownOpen && (
              <div className="absolute left-0 top-11 z-50 w-full sm:w-88 bg-popover border border-slate-300 dark:border-slate-800 rounded-xl shadow-xl p-2.5 space-y-2 text-popover-foreground animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-border pb-2 px-1">
                  <span className="text-xs font-bold text-foreground">Filter {yearName} Subjects</span>
                  <div className="flex items-center gap-2">
                    {selectedSubjects.length < allYearSubjects.length && (
                      <button
                        type="button"
                        onClick={selectAllMySubjects}
                        className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Select All
                      </button>
                    )}
                    {selectedSubjects.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllSelectedSubjects}
                        className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Search input inside dropdown */}
                <div className="relative px-0.5">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={dropdownSearchQuery}
                    onChange={e => setDropdownSearchQuery(e.target.value)}
                    placeholder="Type to filter subjects..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {dropdownFilteredList.length === 0 ? (
                    <p className="text-center py-4 text-xs text-muted-foreground">No subjects found</p>
                  ) : (
                    dropdownFilteredList.map((sub) => {
                      const isChecked = selectedSubjects.includes(sub.uniqueId);
                      return (
                        <div
                          key={sub.uniqueId}
                          onClick={() => toggleSubject(sub.uniqueId)}
                          className={`flex items-center justify-between gap-2 p-2 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                            isChecked
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-foreground font-semibold border border-emerald-500/30'
                              : 'hover:bg-muted text-muted-foreground hover:text-foreground border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-sm shrink-0">{sub.icon}</span>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold leading-tight text-foreground">{sub.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate">
                                Sem {sub.semesterNum} • {sub.branches.join(', ')}
                              </p>
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
              </div>
            )}
          </div>

          {/* Middle: Search input bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${yearName} subjects, codes, or notes...`}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Right: Count indicator & quick reset */}
          <div className="text-xs text-muted-foreground font-semibold flex items-center gap-2 self-start sm:self-auto shrink-0">
            {isDisplayingSubjectCards ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Showing {displayedSubjects.length} subject{displayedSubjects.length !== 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    clearAllSelectedSubjects();
                    setSearchQuery('');
                  }}
                  className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </>
            ) : (
              <span>Showing {allYearSubjects.length} Subjects Total</span>
            )}
          </div>
        </div>

        {/* ══════════ CONTENT AREA ══════════ */}
        {isDisplayingSubjectCards ? (
          /* ── CASE 1: USER HAS SELECTED SUBJECTS OR IS SEARCHING ── */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card border border-emerald-500/30 p-4 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    {searchQuery.trim()
                      ? `Search Results for "${searchQuery}" (${displayedSubjects.length} subjects)`
                      : `Selected Subjects (${displayedSubjects.length} of ${allYearSubjects.length})`}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Direct access to notes, consolidated files, and playlists across branches.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  clearAllSelectedSubjects();
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/30 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset to Semesters
              </button>
            </div>

            {displayedSubjects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl bg-card/40">
                <p className="text-sm font-semibold">No subjects matched your selection.</p>
                <p className="text-xs mt-1">Try another search keyword or reset to view all semester courses.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedSubjects.map((sub, idx) => {
                  const hasDetailed = sub.playlists?.detailed && sub.playlists.detailed.length > 0;
                  const hasOneshot = sub.playlists?.oneshot && sub.playlists.oneshot.length > 0;

                  return (
                    <motion.div
                      key={sub.uniqueId}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.25 }}
                    >
                      <div className="group border border-border bg-card hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <span className="text-2xl p-2 rounded-xl bg-muted/60">{sub.icon}</span>
                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                                Sem {sub.semesterNum}
                              </span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                                {sub.notes.length} files
                              </span>
                            </div>
                          </div>

                          <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {sub.name}
                          </h3>

                          <div className="flex items-center gap-1 flex-wrap mb-4">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Offered in:</span>
                            {sub.branches.map(b => (
                              <span
                                key={b}
                                className="text-[10px] font-bold bg-muted text-foreground px-2 py-0.5 rounded-md"
                              >
                                {b}
                              </span>
                            ))}
                          </div>

                          {/* Quick note download / preview if available */}
                          {sub.notes.length > 0 && (
                            <div className="mb-4 p-2.5 rounded-xl bg-muted/30 border border-border/60 text-xs">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                                <FileText className="w-3 h-3 text-emerald-500" />
                                Available Notes:
                              </p>
                              <div className="space-y-1">
                                {sub.notes.slice(0, 2).map((n, i) => (
                                  <div key={i} className="flex items-center justify-between gap-1 text-[11px]">
                                    <span className="truncate text-foreground font-medium flex-1">{n.title}</span>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <button
                                        onClick={() => handleDownload(n.url, n.title)}
                                        className="p-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                                        title="Download Note"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => viewInBrowser(n.url)}
                                        className="p-1 text-muted-foreground hover:text-foreground"
                                        title="View in Browser"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                {sub.notes.length > 2 && (
                                  <p className="text-[10px] text-muted-foreground pt-0.5">
                                    +{sub.notes.length - 2} more files available
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Playlist buttons */}
                          {(hasDetailed || hasOneshot) && (
                            <div className="flex items-center gap-1.5 mb-4">
                              {hasDetailed && (
                                <button
                                  onClick={() => handleOpenPlaylist(sub, 'detailed')}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:opacity-85 transition-opacity cursor-pointer"
                                >
                                  <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" /> Lectures
                                </button>
                              )}
                              {hasOneshot && (
                                <button
                                  onClick={() => handleOpenPlaylist(sub, 'oneshot')}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:opacity-85 transition-opacity cursor-pointer"
                                >
                                  <Play className="w-3 h-3 text-amber-500 fill-amber-500" /> One-Shot
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-border mt-auto">
                          <button
                            onClick={() => navigate(`/btech-notes/${year}/semester-${sub.semesterNum}`)}
                            className="w-full text-xs font-bold tracking-wider uppercase py-2 px-3 rounded-xl bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Open Semester {sub.semesterNum} Notes</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ── CASE 2: DEFAULT SEMESTER CARDS VIEW ── */
          <div>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-6">Select Semester</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {semesters.map((semester, index) => (
                <motion.div
                  key={semester.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div
                    className={`group border border-border bg-card rounded-xl overflow-hidden flex flex-col transition-all duration-300 h-full relative hover:border-foreground/30 hover:shadow-lg`}
                    onClick={() => handleSemesterClick(semester)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Share button */}
                    <button
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 dark:bg-slate-900/90 hover:bg-emerald-600 hover:text-white text-emerald-600 dark:text-emerald-400 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); handleShare(semester.name, semester.route); }}
                      title={`Share ${semester.name} Notes`}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>

                    {/* Thumbnail */}
                    <div className="relative w-full h-48 overflow-hidden bg-muted">
                      <img
                        src={semester.thumbnail}
                        alt={semester.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={semester.available ? "default" : "secondary"} className="text-[10px] tracking-wide uppercase">
                            {semester.available ? "Available" : "Coming Soon"}
                          </Badge>
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                          {semester.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {semester.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {semester.branches.slice(0, 6).map((branch: string) => (
                          <Badge key={branch} variant="outline" className="text-[10px] py-0 px-2 font-medium">
                            {branch}
                          </Badge>
                        ))}
                        {semester.branches.length > 6 && (
                          <Badge variant="outline" className="text-[10px] py-0 px-2 font-medium text-muted-foreground">
                            +{semester.branches.length - 6} more
                          </Badge>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                          onClick={(e) => { e.stopPropagation(); handleSemesterClick(semester); }}
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Select Branch
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Playlist modal */}
      {showPlaylistModal && (
        <PlaylistModal
          isOpen={showPlaylistModal}
          onClose={() => setShowPlaylistModal(false)}
          title={activePlaylistData.subjectName}
          subjectName={activePlaylistData.subjectName}
          type={activePlaylistData.type}
          playlistType={activePlaylistData.type}
          playlists={activePlaylistData.playlists}
        />
      )}

      <Footer />
    </div>
  );
};

export default BTechSemesters;
// Reviewed: academic catalog & interface consistency check (v2.0.167)
