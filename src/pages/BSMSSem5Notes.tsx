import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const BSMSSem5Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists: Record<string, { detailed: any[]; oneshot: any[] }> = {
    entrepreneurship : {
        detailed: [
            { title: 'Financing Decision -Capital Structure', url: 'https://youtu.be/xO20sAjwbq4?si=EmbYJhfQGf8OBd16' , recommended: true },
            { title: 'Investment Decision -Capital Budget', url: 'https://youtu.be/KAITRH_Ohss?si=l9ggbusQWH0rbxOL' , recommended: true },
            { title: 'EBIT/EPS Numerical -Capital Structure', url: 'https://youtu.be/jG0pd7bFMbM?si=dT3qHXuoukRM9cfY' , recommended: true },
            { title: 'ARR Numerical -Capital Structure', url: 'https://youtu.be/duAS8l4GcgM?si=gWTqjks_LLGCsBmF' , recommended: true },
            { title: 'IRR Numerical -Capital Structure', url: 'https://youtu.be/EUGU9q1gzR0?si=osFvPbZY0NsGQBX9' , recommended: true },
            { title: 'NPV Numerical -Capital Structure', url: 'https://youtu.be/sTvV0fkLhh0?si=LeA4JZVzu0ptcFN1' , recommended: true },
            { title: 'Working Capital Management -Concepts', url: 'https://youtu.be/MDeCGC5G2BI?si=PyGYO7Xb_KioasUg' , recommended: true },
            { title: 'Working Capital Management -Numericals', url: 'https://youtu.be/8cB2NI3NkgU?si=59kVTIl96ee1YDs2' , recommended: true },

        ],
        oneshot: [
          { title: 'Financing Decision -Capital Structure', url: 'https://youtu.be/xO20sAjwbq4?si=EmbYJhfQGf8OBd16' , recommended: true },
            { title: 'Investment Decision -Capital Budget', url: 'https://youtu.be/KAITRH_Ohss?si=l9ggbusQWH0rbxOL' , recommended: true },
            { title: 'EBIT/EPS Numerical -Capital Structure', url: 'https://youtu.be/jG0pd7bFMbM?si=dT3qHXuoukRM9cfY' , recommended: true },
            { title: 'ARR Numerical -Capital Structure', url: 'https://youtu.be/duAS8l4GcgM?si=gWTqjks_LLGCsBmF' , recommended: true },
            { title: 'IRR Numerical -Capital Structure', url: 'https://youtu.be/EUGU9q1gzR0?si=osFvPbZY0NsGQBX9' , recommended: true },
            { title: 'NPV Numerical -Capital Structure', url: 'https://youtu.be/sTvV0fkLhh0?si=LeA4JZVzu0ptcFN1' , recommended: true },
            { title: 'Working Capital Management -Concepts', url: 'https://youtu.be/MDeCGC5G2BI?si=PyGYO7Xb_KioasUg' , recommended: true },
            { title: 'Working Capital Management -Numericals', url: 'https://youtu.be/8cB2NI3NkgU?si=59kVTIl96ee1YDs2' , recommended: true },
        ]
      },
    ml: { detailed: [], oneshot: [] },
    ma: { detailed: [], oneshot: [] },
    TandG: { detailed: [], oneshot: [] },
    cs: { detailed: [], oneshot: [] },
    pds: { detailed: [], oneshot: [] },
    ds3: { detailed: [], oneshot: [] }
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
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
      id: 'entrepreneurship',
      name: 'Entrepreneurship Notes',
      icon: '📘',
      color: 'bg-green-500',
      notes: [
        { title: 'Entrepreneurship Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/1m6DIjYxnAQhHJ2j7ER4J2-vVRhIfrsY7/view?usp=drivesdk' , recommended: true },
        { title: 'Full Entrepreneurship Notes (BEST)', url: 'https://docs.google.com/document/d/1-F4WRVvWzW8OZUjUsFtZX0mgtbsq1dGJ5tkl_hJao0I/edit?usp=sharing' , recommended: true },
        { title: 'Entrepreneurship Extra GPT Notes', url: 'https://drive.google.com/file/d/1epEbIJ_Y8J_V7rkbPM50ufwG8DVNVCq9/view?usp=drivesdk' },
        { title: 'Imp. Numerical PDF', url: 'https://drive.google.com/file/d/1X2GW3TcZiIp1RLpB_HECRerQQTBGFWIb/view?usp=drivesdk' , recommended: true },
      ]    
    },
    
    {
      id: 'pds',
      name: 'Principles of Data Science',
      icon: '⚛️',
      color: 'bg-indigo-500',
      notes: []
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: '📐',
      color: 'bg-purple-500',
      notes: []
    },
    {
      id: 'ma',
      name: 'Modern Algebra',
      icon: '⚡',
      color: 'bg-blue-500',
      notes: []
    },
    {
      id: 'TandG',
      name: 'Topology & Geometry',
      icon: '💻',
      color: 'bg-teal-500',
      notes: []
    },
     {
      id: 'cs',
      name: 'Computational Statistics',
      icon: '📐',
      color: 'bg-purple-500',
      notes: []
    },
    {
      id: 'ds3',
      name: 'Data Science Lab - 3',
      icon: '📝',
      color: 'bg-orange-500',
      notes: []
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BSMS-5th Semester');
  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({
          id: cn.id, title: cn.title, url: cn.file_url, isCommunity: true,
          fileName: cn.file_name, uploadedBy: cn.uploaded_by, userName: cn.user_name
        }))
    ]
  }));

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

  const syllabus = { title: 'BS-MS 5th Sem Syllabus', url: 'https://hbtu.ac.in/wp-content/uploads/2024/11/BS-MS-Course-Structure.pdf' };
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
            <p className="text-xs opacity-50 uppercase tracking-widest">BS-MS — 5th Semester</p>
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
                      {note.recommended && (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-500 px-2 py-0.5 rounded border border-yellow-200 dark:border-yellow-900/50">â­ Best</span>
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
                        onClick={() => viewInBrowser(note.url)}
                        className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
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
            onClick={() => navigate('/bsms-notes/third-year')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 3rd Year
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">BS-MS Science Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            5th Semester<br />
            <span className="opacity-60">BS-MS Science Notes ⚛️</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">BS-MS 5th Semester — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">BS-MS</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">5th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Instructions */}
        <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl">
          <h3 className="text-base font-bold text-foreground mb-3">📚 BS-MS 5th Semester Info</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>✨ For BS-MS students:</strong> This semester introduces core quantum and electrodynamics topics essential for research.</p>
            <p>• <strong>Quantum Mechanics:</strong> Schrödinger equation, operators, perturbation theory, and quantum statistics.</p>
            <p>• <strong>Electrodynamics:</strong> Maxwell's equations, electromagnetic waves, radiation, and relativistic electrodynamics.</p>
            <p>• <strong>Mathematical Methods:</strong> Complex analysis, integral transforms, group theory for physicists.</p>
          </div>
        </div>

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
              <p className="font-semibold text-foreground text-sm">BS-MS 5th Sem Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for BS-MS 5th Semester</p>
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
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col relative">
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
                          {getSubjectPlaylists(subject.id).detailed && getSubjectPlaylists(subject.id).detailed.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                            >
                              📚 Detailed ({getSubjectPlaylists(subject.id).detailed.length})
                            </button>
                          )}
                          {getSubjectPlaylists(subject.id).oneshot && getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                            <button
                              className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                            >
                              ⚡ One Shot ({getSubjectPlaylists(subject.id).oneshot.length})
                            </button>
                          )}
                          {(!getSubjectPlaylists(subject.id).detailed || getSubjectPlaylists(subject.id).detailed.length === 0) &&
                           (!getSubjectPlaylists(subject.id).oneshot || getSubjectPlaylists(subject.id).oneshot.length === 0) && (
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

export default BSMSSem5Notes;



