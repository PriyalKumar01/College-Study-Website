import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const ThirdSemesterEENotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'EE-3rd Semester');
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleDeleteCommunityNote = async (id: string) => {
    if (!window.confirm('Delete this user-uploaded material?')) return;
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Material removed successfully.' });
      refreshNotes();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Playlist data for EE subjects
  const subjectPlaylists = {
    bsa: {
      detailed: [],
      oneshot: []
    },
    'electrical-machines-1': {
      detailed: [],
      oneshot: []
    },
    eemi: {
      detailed: [],
      oneshot: []
    },
    ssd: {
      detailed: [],
      oneshot: []
    },
    emft: {
      detailed: [],
      oneshot: []
    },
    math2: {
      detailed: [
        { title: 'Unit 1 Differential Equation- Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy' },
        { title: 'Unit 3 Laplace Transform - Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB' },
        { title: 'Fourier Series -Pradeep Giri Playlist', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7' },
        { title: 'Fourier Series - MKS Playlist', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8' },
        { title: 'Partial Diff. Eq.- Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k', recommended: true },
        { title: 'Complete Engg Math-II -By: Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx', recommended: true }
      ],
      oneshot: []
    }
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot') => {
    const playlistKey = subjectId as keyof typeof subjectPlaylists;
    if (subjectPlaylists[playlistKey] && subjectPlaylists[playlistKey][type].length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const playlistKey = subjectId as keyof typeof subjectPlaylists;
    return subjectPlaylists[playlistKey] || { detailed: [], oneshot: [] };
  };

  const staticSubjects = [
       {
      id: 'ssd',
      name: 'Solid State Devices & Circuit (SSDC)',
      icon: '🧲',
      color: 'bg-red-500',
      notes: [
        { title: 'SSD Unit-1 & 2 Notes', url: 'https://drive.google.com/file/d/1X-NSopwUOC9A6BsD__AhnjmnFEg7TSkE/view?usp=drivesdk' , recommended : true},
        { title: 'SSD Unit- 2 (Rest Part) Notes', url: 'https://drive.google.com/file/d/16KAdJDK18p5DkKFfkKkdZZFGpDX37Eyz/view?usp=drivesdk' , recommended : true},
        { title: 'SSD Unit-3 Notes', url: 'https://drive.google.com/file/d/1XTvScS9PfCq7Nmwfvbb6lmdLhINN7vt0/view?usp=drivesdk' , recommended : true},
        { title: 'SSD Unit-4 Notes', url: 'https://drive.google.com/file/d/1HY1UPSAbC8ortyoHtNx1EiFAL6ik2fc_/view?usp=drivesdk' , recommended : true},
        { title: 'SSD Unit-5 Notes', url: 'https://drive.google.com/file/d/1IpAE2s8LN6DkuHgQtx2EtATV6l3DoUr-/view?usp=drivesdk' , recommended : true},
        { title: 'Microelectronic Circuit Book', url: 'https://drive.google.com/uc?export=download&id=1h-Xz0wo9m_tmzIUHI4a2GK1Wms5ICEqH' },
      ]
    },
    {
      id: 'electrical-machines-1',
      name: 'Electrical Machines-I',
      icon: '⚡',
      color: 'bg-amber-500',
      notes: []
    },
    {
      id: 'bsa',
      name: 'Basic System Analysis',
      icon: '🧲',
      color: 'bg-red-500',
      notes: []
    },
      {
      id: 'emmi',
      name: 'Electrical Machines & Measurements Instrumentation (EMMI)',
      icon: '⚡',
      color: 'bg-amber-500',
      notes: [
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=122gY7moNtAZyisChZzdgtvkGI0dEHIux' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/uc?export=download&id=1wLj4vhrI_P-AY3yHWcjDo2bKbRXPY9jY' },
        { title: 'Unit-4 & 5 Notes', url: 'https://drive.google.com/uc?export=download&id=1-L15l3RWjJfZYbIymeVjnwxSYevcDgGh' }
      ]
    },
    {
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk' },
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' },
      ]
    },
    {
      id: 'emft',
      name: 'Electromagnetic Field Theory ',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Electromagnetic Field Theory Notes', url: 'https://vemu.org/uploads/lecture_notes/03_01_2020_1040364250.pdf' , recommended : true },

      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({
          id: cn.id,
          title: cn.title,
          url: cn.file_url,
          isCommunity: true,
          fileName: cn.file_name,
          uploadedBy: cn.uploaded_by,
          userName: cn.user_name
        }))
    ]
  }));

  const syllabus = {
    title: '3rd Semester Syllabus',
    url: 'https://drive.google.com/file/d/1S8SRzy10r8ggFpxCW2fMbV6bbGW7skzq/view?usp=drivesdk'
  };

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedSubject(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Subjects
            </button>
            <h1 className="text-3xl font-serif leading-tight mb-2">
              {subject.name} Notes
            </h1>
            <p className="text-xs opacity-50 uppercase tracking-widest">Electrical Engineering — 3rd Semester</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full mb-12">
          {subject.notes.length === 0 ? (
            <div className="text-center py-16 border border-dashed rounded-xl bg-card">
              <p className="text-muted-foreground text-sm mb-1">No study materials uploaded yet for this subject.</p>
              <p className="text-xs text-muted-foreground">Contributions from students are welcome!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {subject.notes.map((note, index) => (
                <motion.div
                  key={note.id || index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-md flex flex-col h-full relative">
                    {note.isCommunity && isOwner && (
                      <button
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-lg transition-colors z-10"
                        onClick={() => handleDeleteCommunityNote(note.id)}
                        title="Delete material"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-full ${subject.color} flex items-center justify-center text-white text-xs`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">PDF</span>
                      {note.isCommunity && (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">Community</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 mb-4">{note.title}</h3>
                    {note.userName && (
                      <p className="text-[10px] text-muted-foreground mb-3">Uploaded by: {note.userName}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(note.url, note.title)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded bg-foreground text-background hover:opacity-85 transition-opacity"
                        disabled={note.url === '#'}
                      >
                        <Download className="h-3.5 w-3.5" /> Download
                      </button>
                      <button
                        onClick={() => window.open(note.url, '_blank')}
                        className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
                        disabled={note.url === '#'}
                        title="Open Link"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                      </button>
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/btech-notes/second-year/semester-3')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Electrical Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            3rd Semester<br />
            <span className="opacity-60">Electrical Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Electrical Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">EE Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">3rd Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl"
        >
          <h3 className="text-base font-bold text-foreground mb-3">📚 Electrical Engg 3rd Semester — Important Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">✨ Hi EE Juniors!</strong> A few important things to keep in mind as you progress through 3rd semester — read carefully, this will genuinely help you.</p>
            <p>• <strong className="text-foreground">Maintain CGPA:</strong> Companies keep a cutoff of <strong className="text-foreground">7 or 7.5 CGPA</strong> — no excuses below that. Those with <strong className="text-foreground">8.5+ are in a very safe zone</strong> — aim for 8+ minimum and maintain it till at least 6th semester.</p>
            <p>• <strong className="text-foreground">Maths-II (M2):</strong> Make a short formula sheet yourself while watching YouTube lectures. Solve PYQs. That's it.</p>
            <p>• <strong className="text-foreground">Digital Electronics:</strong> This subject is highly logical. Practice circuit diagrams, K-maps, and multiplexers carefully to secure good marks.</p>
            <p className="text-red-600 dark:text-red-400"><strong>⚠️ Important:</strong> Always maintain good presentation in exams — use 2 pens, underline important keywords, keep proper spacing after answers, and write sufficiently explained answers for better scoring. Cover every topic from the syllabus using playlists, notes, PYQs, YouTube, Google AI Mode, or any resource possible. Once every topic is understood properly, exams automatically become much easier.</p>
            <p>✨ Best Wishes — <strong className="text-foreground">Priyal Kumar</strong></p>
          </div>
        </motion.div>

        {/* Syllabus */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="border border-border rounded-xl p-5 bg-card flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">3rd Semester Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 3rd semester B.Tech EE</p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(syllabus.url, syllabus.title)}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase py-2.5 px-5 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity"
            disabled={syllabus.url === '#'}
          >
            <Download className="h-3.5 w-3.5" /> Download Syllabus
          </button>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">Study Resources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                      {subject.notes.length} files
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 flex-1">{subject.name}</h3>

                  {/* Playlist section */}
                  {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <button
                        className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => toggleSubjectExpansion(subject.id)}
                      >
                        <span className="flex items-center gap-1.5">
                          <Play className="h-3 w-3" /> Study Playlists
                        </span>
                        {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                      {expandedSubjects.includes(subject.id) && (
                        <div className="mt-2 space-y-1">
                          {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                            >
                              📚 Detailed ({getSubjectPlaylists(subject.id).detailed.length})
                            </button>
                          )}
                          {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                            >
                              ⚡ One Shot ({getSubjectPlaylists(subject.id).oneshot.length})
                            </button>
                          )}
                          {getSubjectPlaylists(subject.id).detailed.length === 0 && getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                            <p className="text-xs text-muted-foreground px-2 py-1">Not available yet</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedSubject(subject.id)}
                      className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200"
                    >
                      View Notes
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {/* Playlist Modal */}
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

export default ThirdSemesterEENotes;
