import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const SixthSemesterOpenElectives = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source') || 'cse';
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
    if (subject?.playlists?.[type]?.length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.playlists || { detailed: [], oneshot: [] };
  };

  const subjects = [
    {
      id: 'oe1',
      name: 'Open Elective Subject 1',
      icon: '📖',
      color: 'bg-purple-500',
      playlists: { detailed: [{ title: 'OE1 Playlist', url: '#' }], oneshot: [] },
      notes: [{ title: 'OE1 Notes', url: '#' }]
    },
    {
      id: 'oe2',
      name: 'Open Elective Subject 2',
      icon: '📗',
      color: 'bg-blue-500',
      playlists: { detailed: [], oneshot: [{ title: 'OE2 One Shot', url: '#' }] },
      notes: [{ title: 'OE2 Notes', url: '#' }]
    },
  ];

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        {/* Detail Hero */}
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedSubject(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Open Electives
            </button>
            <h1 className="text-3xl font-serif leading-tight mb-2">
              {subject.name} Notes
            </h1>
            <p className="text-xs opacity-50 uppercase tracking-widest">{subject.name} — 6th Semester</p>
          </div>
        </div>

        {/* Detail Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full mb-12">
          {subject.notes.length === 0 || (subject.notes.length === 1 && subject.notes[0].url === '#') ? (
            <div className="text-center py-16 border border-dashed rounded-xl bg-card">
              <p className="text-muted-foreground text-sm mb-1">No study materials uploaded yet for this subject.</p>
              <p className="text-xs text-muted-foreground">Contributions from students are welcome!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {subject.notes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-md flex flex-col h-full relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-full ${subject.color} flex items-center justify-center text-white text-xs`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">PDF</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 mb-4">{note.title}</h3>
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
            onClick={() => navigate(`/btech-notes/third-year/semester-6/${source}`)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 6th Sem {source.toUpperCase()}
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Open Elective Subjects</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            Open Electives<br />
            <span className="opacity-60">6th Semester Study Resources</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">Choose from available open elective subjects</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">B.Tech Electives</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{subjects.length} Subjects Available</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">6th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">Available Electives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => {
              const playlists = getSubjectPlaylists(subject.id);
              const hasPlaylists = (playlists.detailed?.length > 0 && playlists.detailed[0].url !== '#') || (playlists.oneshot?.length > 0);

              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                >
                  <div 
                    className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col relative cursor-pointer"
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                        {subject.icon}
                      </div>
                      <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                        {subject.notes[0].url === '#' ? 0 : subject.notes.length} files
                      </span>
                    </div>

                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 flex-1">{subject.name}</h3>
                    
                    {hasPlaylists && (
                      <div className="mt-3 pt-3 border-t border-border" onClick={(e) => e.stopPropagation()}>
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
                            {playlists.detailed?.length > 0 && playlists.detailed[0].url !== '#' && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                              >
                                📚 Detailed ({playlists.detailed.length})
                              </button>
                            )}
                            {playlists.oneshot?.length > 0 && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                              >
                                ⚡ One Shot ({playlists.oneshot.length})
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubject(subject.id);
                        }}
                        className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200"
                      >
                        View Notes
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      <PlaylistModal isOpen={showPlaylistModal} onClose={() => setShowPlaylistModal(false)} playlists={getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] || []} type={selectedPlaylistType} title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''} />
    </div>
  );
};

export default SixthSemesterOpenElectives;



