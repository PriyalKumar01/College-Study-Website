import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';

const SixthSemesterOpenElectives = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source') || 'che';
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const { data: communityNotes } = useCommunityNotes('btech', [
    'CHE-6th Semester',
    'BE-6th Semester',
    'LFT-6th Semester',
    'PT-6th Semester',
    'PL-6th Semester',
    'FT-6th Semester',
    'OT-6th Semester',
    'BT-6th Semester',
    'ALL-6th Semester'
  ]);

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
      id: 'business-ethics',
      name: 'Business Ethics',
      fullName: 'Business Ethics & Corporate Governance',
      icon: '📋',
      color: 'bg-indigo-500',
      playlists: {
        detailed: [
          { title: 'Business Ethics Playlist', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7ejgPDoJZW9Q22qJgXDB8IA&si=pDbk-4sUa5AdafNx', recommended: true },
          { title: 'Playlist - Only watch related topics', url: 'https://youtube.com/playlist?list=PLI8rtkxfMUYVuC_POmiWKTlRutAdGWfSq&si=KjP_lyImdrxB37mk' },
        ],
        oneshot: [
          { title: 'Business Ethics Complete Revision', url: 'https://youtu.be/ltW7KVYJ1go?si=VNMtqFzwF6Ge7wq3' },
          { title: 'Corporate Social Responsibility', url: 'https://youtu.be/BWQ56WOMTT4?si=GoS-gd2AdrgKY5a2' },
        ]
      },
      notes: [
        { title: 'Syllabus', url: 'https://drive.google.com/uc?export=download&id=1Q7abTYsAJ14M2VgXaKWKYWYKZ1VHzR7O' },
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1JIhpotQbWbC_ryy7H-fyZOgMmqwXewsA' },
        { title: 'Unit-2 Part-1', url: 'https://drive.google.com/uc?export=download&id=1BG0eCO9jLeoLR68sBreMSxUCPA-DOmSI' },
        { title: 'Unit-2 Part-2', url: 'https://drive.google.com/uc?export=download&id=1BF7V9tNpAK8i3awM6zU8UtW9QDJvkUeV' },
        { title: 'Unit-3 Part-1', url: 'https://drive.google.com/uc?export=download&id=1pB5cQ7iJ_NPiDs-w77Xw0KIIVeEGGLNv' },
        { title: 'Unit-4 Part-1', url: 'https://drive.google.com/uc?export=download&id=1I_1P84wI9Ke8bUuptcCsQq7iSXprJEzT' },
        { title: 'Unit-5 Corporate Governance', url: 'https://drive.google.com/file/d/1h8x6Md6_4X2jn35_W07yCrBpOEfy-OM5/view?usp=drivesdk' },
      ]
    },
    {
      id: 'soft-skills',
      name: 'Soft Skills & PD',
      fullName: 'Soft Skills & Personality Development',
      icon: '🎯',
      color: 'bg-pink-500',
      playlists: { detailed: [{ title: 'Soft Skills Training', url: 'https://www.youtube.com/playlist?list=PLWPirh4EWFpEvS_4JbCkyI_Pq9f_0aW8X' }], oneshot: [] },
      notes: [
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/file/d/1_SQXLSyKAfmLYXkcYDlR40jldU39WCw2/view?usp=drivesdk' },
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/file/d/1OW8xUrc3rNGGwJj-Xnlhem4tXjimSw1y/view?usp=drivesdk' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/file/d/1GyQCW3ExIqvL9GwrRT0T0itfb0VTeGmI/view?usp=drivesdk' },
        { title: 'Unit-4 Notes', url: 'https://drive.google.com/file/d/1BLPEIzV4rmxd-y8QlFcPW9oNMJe-FtAt/view?usp=drivesdk' },
        { title: 'Soft Skill PYQs (2025-26)', url: 'https://drive.google.com/file/d/16rXmTcUFOuBLqO1Gf_Nzg_xo7I2UthMS/view?usp=drivesdk' },
      ]
    },
    {
      id: 'critical-thinking',
      name: 'Critical & Logical Thinking',
      fullName: 'Critical & Logical Thinking',
      icon: '💡',
      color: 'bg-amber-500',
      playlists: { detailed: [{ title: 'Critical Thinking Lectures', url: 'https://www.youtube.com/playlist?list=PLbRMhDVUMngcf7JvWwQG65ZgHq6k5k1a2' }], oneshot: [] },
      notes: [
        { title: 'Syllabus & Introduction', url: 'https://drive.google.com/file/d/1w8bNfC_5_example/view?usp=drivesdk' },
        { title: 'Logical Reasoning & Deduction', url: 'https://drive.google.com/file/d/1w9cNfD_6_example/view?usp=drivesdk' }
      ]
    },
    {
      id: 'tqm',
      name: 'Total Quality Management',
      fullName: 'Total Quality Management (TQM)',
      icon: '🏆',
      color: 'bg-emerald-500',
      playlists: { detailed: [{ title: 'TQM Complete Course', url: 'https://www.youtube.com/playlist?list=PLbRMhDVUMnge5Vw0v8Wk9l9k3a4b5c6d' }], oneshot: [] },
      notes: [
        { title: 'TQM Unit 1 to 5 Comprehensive Notes', url: 'https://drive.google.com/file/d/1tqm_complete_notes/view?usp=drivesdk' }
      ]
    },
    {
      id: 'cyber-law',
      name: 'Cyber Law & IT Security',
      fullName: 'Cyber Law and Information Security',
      icon: '🔒',
      color: 'bg-cyan-500',
      playlists: { detailed: [{ title: 'Cyber Law Series', url: 'https://www.youtube.com/playlist?list=PLcyberlaw_hbtu_series' }], oneshot: [] },
      notes: [
        { title: 'IT Act 2000 & Cyber Crimes', url: 'https://drive.google.com/file/d/1cyberlaw_it_act/view?usp=drivesdk' }
      ]
    },
    {
      id: 'hvpe',
      name: 'Human Values & Ethics',
      fullName: 'Human Values & Professional Ethics (HVPE)',
      icon: '🌱',
      color: 'bg-green-600',
      playlists: { detailed: [{ title: 'HVPE NPTEL Lectures', url: 'https://www.youtube.com/playlist?list=PLhvpe_nptel_lectures' }], oneshot: [] },
      notes: [
        { title: 'HVPE Complete Notes & Question Bank', url: 'https://drive.google.com/file/d/1hvpe_complete_notes/view?usp=drivesdk' }
      ]
    }
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
            <p className="text-xs opacity-50 uppercase tracking-widest">{subject.fullName} — 6th Semester</p>
          </div>
        </div>

        {/* Detail Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full mb-12">
          {(() => {
            const staticNotes = (subject.notes || []).filter(n => n.url && n.url !== '#');
            const matchingCommunity = (communityNotes || []).filter((cn: any) => {
              const sLower = (cn.subject || '').toLowerCase();
              const subNameLower = subject.name.toLowerCase();
              const subFullLower = subject.fullName.toLowerCase();
              return sLower === subNameLower || sLower === subFullLower || sLower.includes(subNameLower) || (sLower.includes('open elective') && (cn.title || '').toLowerCase().includes(subNameLower));
            }).map((cn: any) => ({
              title: cn.title,
              url: cn.file_url,
              isCommunity: true,
              uploadedBy: cn.user_name || 'Community Member'
            }));

            const allNotes = [...staticNotes, ...matchingCommunity];

            if (allNotes.length === 0) {
              return (
                <div className="text-center py-16 border border-dashed rounded-xl bg-card">
                  <p className="text-muted-foreground text-sm mb-1">No study materials uploaded yet for this subject.</p>
                  <p className="text-xs text-muted-foreground">Contributions from students are welcome!</p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allNotes.map((note: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-md flex flex-col h-full relative">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${subject.color} flex items-center justify-center text-white text-xs`}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">PDF</span>
                        </div>
                        {note.isCommunity && (
                          <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                            Verified Upload
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 mb-2">{note.title}</h3>
                      {note.uploadedBy && (
                        <p className="text-[11px] text-muted-foreground mb-3">By {note.uploadedBy}</p>
                      )}
                      <div className="flex gap-2 mt-auto">
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
            );
          })()}
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
                        {(() => {
                          const staticCount = (subject.notes || []).filter(n => n.url && n.url !== '#').length;
                          const commCount = (communityNotes || []).filter((cn: any) => {
                            const sLower = (cn.subject || '').toLowerCase();
                            const subNameLower = subject.name.toLowerCase();
                            return sLower === subNameLower || sLower.includes(subNameLower) || (sLower.includes('open elective') && (cn.title || '').toLowerCase().includes(subNameLower));
                          }).length;
                          return staticCount + commCount;
                        })()} files
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



