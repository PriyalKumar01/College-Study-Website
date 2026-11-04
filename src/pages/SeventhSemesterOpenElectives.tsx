// 7th semester open electives notes
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { SubjectShareButton } from '@/components/SubjectShareButton';
import { useSubjectAutoScroll } from '@/hooks/useSubjectAutoScroll';
import { SessionPyqAccordion } from '@/components/SessionPyqAccordion';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { matchesSubject } from '@/utils/subjectMatcher';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OeSubjectDefinition {
  id: string;
  code: string;
  name: string;
  offeredBy: string;
  icon: string;
  color: string;
  playlists: {
    detailed: { title: string; url: string; recommended?: boolean }[];
    oneshot: { title: string; url: string; recommended?: boolean }[];
  };
  notes: { title: string; url: string; recommended?: boolean }[];
}

const OE_II_COURSES: OeSubjectDefinition[] = [
  {
    id: 'obe401',
    code: 'OBE401',
    name: 'Fundamentals of Enzyme Engineering',
    offeredBy: 'Biochemical Engineering',
    icon: '🧬',
    color: 'bg-emerald-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'och401',
    code: 'OCH401',
    name: 'Energy Resources and Utilization',
    offeredBy: 'Chemical Engineering',
    icon: '⚡',
    color: 'bg-amber-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'oce401',
    code: 'OCE401',
    name: 'Environmental Pollution and Management',
    offeredBy: 'Civil Engineering',
    icon: '🌱',
    color: 'bg-teal-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'ocs401',
    code: 'OCS401',
    name: 'Artificial Intelligence',
    offeredBy: 'Computer Science & Engineering',
    icon: '🤖',
    color: 'bg-indigo-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'oee401',
    code: 'OEE401',
    name: 'Power Plant Engineering',
    offeredBy: 'Electrical Engineering',
    icon: '🏭',
    color: 'bg-yellow-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'oet403',
    code: 'OET403',
    name: 'Communication Systems',
    offeredBy: 'Electronics Engineering',
    icon: '📡',
    color: 'bg-sky-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'oft401',
    code: 'OFT401',
    name: 'Nutritional Aspects of Natural & Processed Foods',
    offeredBy: 'Food Technology',
    icon: '🍎',
    color: 'bg-orange-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'olt401',
    code: 'OLT401',
    name: 'Entrepreneurship for Leather Sector',
    offeredBy: 'Leather Technology',
    icon: '👞',
    color: 'bg-stone-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'ome401',
    code: 'OME401',
    name: 'Composite Material',
    offeredBy: 'Mechanical Engineering',
    icon: '⚙️',
    color: 'bg-slate-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'oot401',
    code: 'OOT401',
    name: 'Technology of Soaps',
    offeredBy: 'Oil Technology',
    icon: '🧼',
    color: 'bg-cyan-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'opt401',
    code: 'OPT401',
    name: 'Basics of Paint Manufacturing',
    offeredBy: 'Paint Technology',
    icon: '🎨',
    color: 'bg-violet-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'opl401',
    code: 'OPL401',
    name: 'Basics of Polymer Processing',
    offeredBy: 'Plastic Technology',
    icon: '🔬',
    color: 'bg-blue-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'oma401',
    code: 'OMA401',
    name: 'Operation Research',
    offeredBy: 'Mathematics',
    icon: '📐',
    color: 'bg-red-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'ohs401',
    code: 'OHS401',
    name: 'Business Intelligence',
    offeredBy: 'Humanities & Social Sciences',
    icon: '📊',
    color: 'bg-purple-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
  {
    id: 'ohs403',
    code: 'OHS403',
    name: 'Human Resource Management',
    offeredBy: 'Humanities & Social Sciences',
    icon: '👥',
    color: 'bg-pink-600',
    playlists: { detailed: [], oneshot: [] },
    notes: [],
  },
];

const SeventhSemesterOpenElectives = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', [
    'CSE-7th Semester',
    'IT-7th Semester',
    'CSE-AIML-7th Semester',
    'ALL-7th Semester',
    'OE-II',
    'Open Elective-II'
  ]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot') => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject?.playlists?.[type]?.length) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.playlists || { detailed: [], oneshot: [] };
  };

  const subjects = OE_II_COURSES.map(course => {
    const matchedNotes = (communityNotes || [])
      .filter(cn => {
        const cnSub = (cn.subject || '').toLowerCase();
        const cnDesc = (cn.description || '').toLowerCase();
        const codeMatch = cnSub.includes(course.code.toLowerCase()) || cnDesc.includes(course.code.toLowerCase());
        const nameMatch = matchesSubject(cn.subject || '', course.name);
        return codeMatch || nameMatch;
      })
      .map(cn => ({
        id: cn.id,
        title: cn.title,
        url: cn.file_url,
        isCommunity: true,
        fileName: cn.file_name,
        uploadedBy: cn.uploaded_by,
        userName: cn.user_name
      }));

    return {
      ...course,
      notes: [...course.notes, ...matchedNotes],
    };
  });

  useSubjectAutoScroll(subjects, matched => {
    if (matched.id) {
      setExpandedSubjects(prev => (prev.includes(matched.id) ? prev : [...prev, matched.id]));
    }
  });

  const handleDeleteCommunityNote = async (id: string, fileName?: string) => {
    if (!user || !isOwner) return;
    if (!window.confirm('Delete this material?')) return;
    try {
      if (fileName) await supabase.storage.from('study-materials').remove([fileName]);
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Material removed successfully.' });
      refreshNotes();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  const filteredSubjects = subjects.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.offeredBy.toLowerCase().includes(q)
    );
  });

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Navbar />
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedSubject(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-6 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to All Open Electives
            </button>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-3xl">{subject.icon}</span>
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mr-2">
                  {subject.code}
                </span>
                <span className="text-xs opacity-75 font-medium">Offered by {subject.offeredBy}</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">{subject.name}</h1>
            <p className="opacity-60 text-xs mt-1">
              {subject.notes.length} file{subject.notes.length !== 1 ? 's' : ''} available · 7th Semester Open Elective-II (OE-II)
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full">
          {subject.notes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl bg-card/50">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-30 text-emerald-500" />
              <p className="text-lg font-bold text-foreground">No notes uploaded yet</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Admins can upload notes for this course from the Admin Portal under 7th Semester &gt; OE-II.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.notes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-card hover:border-emerald-500/40 transition-all duration-200 p-4 gap-3 shadow-xs hover:shadow-md">
                    <div>
                      {(note as any).isCommunity && (
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full mb-2">
                          Community
                        </span>
                      )}
                      <p className="text-sm font-semibold text-foreground leading-snug">{note.title}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-border mt-auto">
                      <button
                        onClick={() => handleDownload(note.url, note.title)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer"
                        disabled={(note as any).url === '#'}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </button>
                      <button
                        onClick={() => viewInBrowser(note.url)}
                        className="inline-flex items-center justify-center py-2 px-3 rounded-xl border border-border hover:bg-muted transition-colors cursor-pointer text-foreground"
                        title="View in Browser"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                      {(note as any).isCommunity && isOwner && (
                        <button
                          onClick={() => handleDeleteCommunityNote((note as any).id, (note as any).fileName)}
                          className="inline-flex items-center justify-center py-2 px-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-xs cursor-pointer"
                          title="Delete Note"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-14 pb-10 px-4 sm:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/seventh-semester-cse')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 7th Semester CSE
          </button>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              OFFICIAL HBTU NOTICE 2026
            </span>
            <span className="text-xs opacity-75">B.Tech VII Semester</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
            Open Elective-II (OE-II)
          </h1>
          <p className="text-sm opacity-70 max-w-2xl leading-relaxed">
            All 15 inter-departmental elective courses offered across engineering and science departments in Semester VII.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-6">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card border border-border p-3.5 rounded-2xl shadow-xs">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search course name, code (e.g. OCS401, OBE401) or department..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
            <span>Showing {filteredSubjects.length} of {OE_II_COURSES.length} Open Electives</span>
          </div>
        </div>

        {/* Electives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
            >
              <div className="group border border-border bg-card hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-muted/60">{sub.icon}</span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-muted text-foreground border border-border">
                        {sub.code}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        {sub.notes.length} files
                      </span>
                      <SubjectShareButton subjectName={sub.name} subjectId={sub.id} />
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground mb-4">
                    Offered by: <span className="text-foreground">{sub.offeredBy}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-border mt-auto">
                  <button
                    onClick={() => setSelectedSubject(sub.id)}
                    className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-xl border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer"
                  >
                    View Notes
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />

      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
        playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] : []}
        type={selectedPlaylistType}
      />
    </div>
  );
};

export default SeventhSemesterOpenElectives;
