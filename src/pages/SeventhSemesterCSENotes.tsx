// 7th semester CSE branch notes
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Share2, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { SubjectShareButton } from '@/components/SubjectShareButton';
import { useSubjectAutoScroll } from '@/hooks/useSubjectAutoScroll';
import { SessionPyqAccordion } from '@/components/SessionPyqAccordion';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

interface SubjectItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  playlists: {
    detailed: { title: string; url: string; recommended?: boolean }[];
    oneshot: { title: string; url: string; recommended?: boolean }[];
  };
  notes: any[];
}

const SeventhSemesterCSENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
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

  const staticSubjects: SubjectItem[] = [
    {
      id: 'seminar',
      name: 'SEMINAR',
      icon: '🎓',
      color: 'bg-blue-600',
      description: 'Technical Seminar, Presentation & Research Review',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'industrial_training',
      name: 'INDUSTRIAL TRAINING',
      icon: '🏭',
      color: 'bg-amber-600',
      description: 'Industrial Summer Training, Internship Report & Viva',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'minor_project',
      name: 'MINOR PROJECT',
      icon: '💻',
      color: 'bg-indigo-600',
      description: 'Pre-final Year Capstone Project, System Design & Implementation',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'ml_pe4',
      name: 'MACHINE LEARNING (PE-IV)',
      icon: '🤖',
      color: 'bg-emerald-600',
      description: 'Supervised & Unsupervised Learning, Neural Nets, Model Evaluation',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'spm_pe3',
      name: 'SOFTWARE PROJECT MANAGEMENT (PE-III)',
      icon: '📊',
      color: 'bg-purple-600',
      description: 'Agile & Waterfall Lifecycle, Effort Estimation, Quality Assurance',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'st_pe2',
      name: 'SOFTWARE TESTING (PE-II)',
      icon: '🧪',
      color: 'bg-rose-600',
      description: 'Black-box, White-box Testing, Automation & Test Case Design',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'oe2',
      name: 'OE-II',
      icon: '🌟',
      color: 'bg-teal-600',
      description: 'Open Elective-II across 15 Departments (OBE401, OCS401, OMA401...)',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'pyqs',
      name: 'ALL MID & ESE PYQs',
      icon: '📚',
      color: 'bg-red-500',
      description: 'Mid Sem-1, Mid Sem-2 and End Sem Previous Year Papers',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      description: 'Lab assignments, tutorial problem sheets and tutorials',
      playlists: { detailed: [], oneshot: [] },
      notes: [],
    },
  ];

  const syllabus = {
    title: '7th Semester CSE Syllabus',
    url: '#',
  };

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', [
    'CSE-7th Semester',
    'IT-7th Semester',
    'CSE-AIML-7th Semester',
    'ALL-7th Semester',
    'OE-II',
    'Open Elective-II',
  ]);

  const normalizeSub = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const subjects = staticSubjects.map(sub => {
    const matchedCommunity = (communityNotes || [])
      .filter(cn => {
        const cnSub = (cn.subject || '').trim();
        const cnDesc = (cn.description || '').trim();
        const cnSubNorm = normalizeSub(cnSub);
        const cnDescNorm = normalizeSub(cnDesc);
        const subNameNorm = normalizeSub(sub.name);

        if (sub.id === 'oe2') {
          return (
            cnSubNorm.includes('oe2') ||
            cnSubNorm.includes('oeii') ||
            cnSubNorm.includes('openelective') ||
            cnDescNorm.includes('oe2') ||
            cnDescNorm.includes('oeii') ||
            cnDescNorm.includes('openelective')
          );
        }
        if (sub.id === 'seminar') {
          return cnSubNorm.includes('seminar');
        }
        if (sub.id === 'industrial_training') {
          return cnSubNorm.includes('industrialtraining') || cnSubNorm.includes('training');
        }
        if (sub.id === 'minor_project') {
          return cnSubNorm.includes('minorproject');
        }
        if (sub.id === 'ml_pe4') {
          return cnSubNorm.includes('machinelearning') || cnSubNorm.includes('peiv') || cnSubNorm.includes('pe4');
        }
        if (sub.id === 'spm_pe3') {
          return (
            cnSubNorm.includes('softwareprojectmanagement') ||
            cnSubNorm.includes('spm') ||
            cnSubNorm.includes('peiii') ||
            cnSubNorm.includes('pe3')
          );
        }
        if (sub.id === 'st_pe2') {
          return (
            cnSubNorm.includes('softwaretesting') ||
            cnSubNorm.includes('peii') ||
            cnSubNorm.includes('pe2')
          );
        }
        if (sub.id === 'pyqs') {
          return cn.material_type === 'pyqs' || cnSubNorm.includes('pyq') || cnSubNorm.includes('previousyear');
        }
        if (sub.id === 'assignments') {
          return cn.material_type === 'assignments' || cnSubNorm.includes('assignment');
        }
        return cnSubNorm === subNameNorm || cnSubNorm.includes(subNameNorm) || subNameNorm.includes(cnSubNorm);
      })
      .map(cn => ({
        id: cn.id,
        title: cn.title,
        url: cn.file_url,
        isCommunity: true,
        fileName: cn.file_name,
        uploadedBy: cn.uploaded_by,
        userName: cn.user_name,
      }));

    return {
      ...sub,
      notes: [...sub.notes, ...matchedCommunity],
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
              <ArrowLeft className="h-3.5 w-3.5" /> Back to 7th Semester Subjects
            </button>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-3xl">{subject.icon}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{subject.name}</h1>
            </div>
            <p className="opacity-60 text-xs">
              {subject.notes.length} file{subject.notes.length !== 1 ? 's' : ''} available · 7th Semester CSE (B.Tech)
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full">
          {subject.id === 'pyqs' || subject.name.toLowerCase().includes('previous year') || subject.name.toLowerCase().includes('pyq') ? (
            <SessionPyqAccordion
              notes={subject.notes}
              title={`${subject.name} - Semester 7`}
              onDelete={handleDeleteCommunityNote}
              isOwner={isOwner}
            />
          ) : subject.notes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl bg-card/50">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-30 text-emerald-500" />
              <p className="text-lg font-bold text-foreground">0 Files Uploaded</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                No materials uploaded yet for {subject.name}. Admins can upload notes from the Admin Portal.
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
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-14 pb-12 px-4 sm:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/btech-notes/fourth-year/semester-7')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 7th Semester Branches
          </button>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              OFFICIAL HBTU CURRICULUM
            </span>
            <span className="text-xs opacity-75">B.Tech VII Semester</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
            Computer Science & Engineering
          </h1>
          <p className="text-sm opacity-70 max-w-2xl leading-relaxed">
            Seminar, Industrial Training, Minor Project, Machine Learning (PE-IV), Software Project Management (PE-III), Software Testing (PE-II), and Open Elective-II.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1 rounded-md">
              CSE & IT Department
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1 rounded-md">
              {staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects & Electives
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1 rounded-md">
              7th Semester
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1 w-full">
        {/* Syllabus Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="border border-border rounded-2xl p-5 bg-card flex items-center justify-between gap-4 flex-wrap shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">{syllabus.title}</p>
              <p className="text-xs text-muted-foreground">Official syllabus structure for 7th semester CSE (HBTU Kanpur)</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(syllabus.url, syllabus.title)}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase py-2.5 px-5 rounded-xl bg-foreground text-background hover:opacity-85 transition-opacity cursor-pointer"
            disabled={syllabus.url === '#'}
          >
            <Download className="h-3.5 w-3.5" /> Download Syllabus
          </button>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground">
              7th Semester Subjects & Electives ({subjects.length})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject, index) => {
              const isOe = subject.id === 'oe2';

              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                >
                  <div
                    className={`group border rounded-2xl p-5 transition-all duration-200 hover:shadow-md h-full flex flex-col justify-between ${
                      isOe
                        ? 'border-teal-500/40 bg-teal-500/5 hover:border-teal-500'
                        : 'border-border bg-card hover:border-emerald-500/60'
                    }`}
                    id={`subject-${subject.id}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-2xl p-2 rounded-xl bg-muted/60">{subject.icon}</span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white ${
                              isOe ? 'bg-teal-600' : 'bg-emerald-600'
                            }`}
                          >
                            {subject.notes.length} files
                          </span>
                          <SubjectShareButton subjectName={subject.name} subjectId={subject.id} />
                        </div>
                      </div>

                      <h3 className="font-bold text-foreground text-base leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {subject.name}
                      </h3>
                      {subject.description && (
                        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                          {subject.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border mt-auto">
                      {isOe ? (
                        <button
                          onClick={() => navigate('/seventh-semester-open-electives')}
                          className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>View Electives (15 Courses)</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedSubject(subject.id)}
                          className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-xl border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer"
                        >
                          View Notes
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
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

export default SeventhSemesterCSENotes;
