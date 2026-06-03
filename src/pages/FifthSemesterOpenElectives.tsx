import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const FifthSemesterOpenElectives = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source');
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
      id: 'business-ethics',
      name: 'Business Ethics',
      fullName: 'Business Ethics (Open Elective)',
      icon: '📋',
      color: 'bg-indigo-500',
      playlists: {
        detailed: [
          { title: 'Business Ethics Playlist', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7ejgPDoJZW9Q22qJgXDB8IA&si=pDbk-4sUa5AdafNx', recommended: true },
          { title: 'Playlist -Only watch related topics', url: 'https://youtube.com/playlist?list=PLI8rtkxfMUYVuC_POmiWKTlRutAdGWfSq&si=KjP_lyImdrxB37mk' },
          { title: 'Playlist -Only watch topics-wise', url: 'https://youtube.com/playlist?list=PLeUIXA68NobWnEOojETHpolPkR6qXszU2&si=AoNt743N0d1I3_A7', recommended: true },
        ],
        oneshot: [
          { title: 'Business Ethics', url: 'https://youtu.be/ltW7KVYJ1go?si=VNMtqFzwF6Ge7wq3' },
          { title: 'Ethical Decision Making', url: 'https://youtu.be/73MnDxDPv6w?si=Q9EnJRn2xxf-vpSw' },
          { title: 'Corporate Social Responsibility', url: 'https://youtu.be/BWQ56WOMTT4?si=GoS-gd2AdrgKY5a2' },
          { title: 'Marketing Ethics', url: 'https://youtu.be/rfAWVcORC_M?si=pDupNteELaSY3L3P' },
          { title: 'Corporate Governance', url: 'https://youtu.be/hVOkmReERiE?si=CihY_vL13DjYlj14' },
          { title: 'Theories of Corporate Governance', url: 'https://youtu.be/SZAHAXYxX34?si=OEhJaTeZ3Y_a8I4k' },
        ]
      },
      notes: [
        { title: 'Syllabus', url: 'https://drive.google.com/uc?export=download&id=1Q7abTYsAJ14M2VgXaKWKYWYKZ1VHzR7O' },
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=1JIhpotQbWbC_ryy7H-fyZOgMmqwXewsA' },
        { title: 'Unit-2 Part-1', url: 'https://drive.google.com/uc?export=download&id=1BG0eCO9jLeoLR68sBreMSxUCPA-DOmSI' },
        { title: 'Unit-2 Part-2', url: 'https://drive.google.com/uc?export=download&id=1BF7V9tNpAK8i3awM6zU8UtW9QDJvkUeV' },
        { title: 'Unit-2 Part-3', url: 'https://drive.google.com/uc?export=download&id=1enrdv3TDcXVAAXOd8zoNAFsBOMi58eNC' },
        { title: 'Unit-2 Part-4', url: 'https://drive.google.com/uc?export=download&id=14C3hUK3bPYA1KpNuBqr7HnQ6pFP8g410' },
        { title: 'Unit-2 Part-5', url: 'https://drive.google.com/uc?export=download&id=1D0QrnqjcONsYvDtyoiZKS4ueGSIMbgAT' },
        { title: 'Unit-2 Case Study: On Dilemma', url: 'https://drive.google.com/uc?export=download&id=1Dp1NF-RIATPr6CU-yQrTka2ibaowWw_l' },
        { title: 'Unit-3 Part-1', url: 'https://drive.google.com/uc?export=download&id=1pB5cQ7iJ_NPiDs-w77Xw0KIIVeEGGLNv' },
        { title: 'Unit-3 Part-2', url: 'https://drive.google.com/uc?export=download&id=1zgzoyye9-shZCxCNYWcP8n5HwJiN09cd' },
        { title: 'Unit-3 Part-3', url: 'https://drive.google.com/uc?export=download&id=1WzQMBm4wG1aUwulXKUeNXMNjmeqX_zFy' },
        { title: 'Unit-3 Part-4', url: 'https://drive.google.com/uc?export=download&id=12alClJeKBTeE_1XIRJvJPkQ-Un9tS4X4' },
        { title: 'Unit-4 Part-1', url: 'https://drive.google.com/uc?export=download&id=1I_1P84wI9Ke8bUuptcCsQq7iSXprJEzT' },
        { title: 'Unit-4 Part-2', url: 'https://drive.google.com/uc?export=download&id=1tHs6ovfZ8dFwsV516_gGRvu4rvtAz899' },
        { title: 'Unit-5 Corporate Governance', url: 'https://drive.google.com/file/d/1h8x6Md6_4X2jn35_W07yCrBpOEfy-OM5/view?usp=drivesdk' },
      ]
    },
    {
      id: 'soft-skills',
      name: 'Soft Skills & PD',
      fullName: 'Soft Skills & Personality Development (Open Elective)',
      icon: '🎯',
      color: 'bg-pink-500',
      playlists: { detailed: [{ title: 'Playlist Coming Soon', url: '#' }], oneshot: [] },
      notes: [
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/file/d/1_SQXLSyKAfmLYXkcYDlR40jldU39WCw2/view?usp=drivesdk' },
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/file/d/1OW8xUrc3rNGGwJj-Xnlhem4tXjimSw1y/view?usp=drivesdk' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/file/d/1GyQCW3ExIqvL9GwrRT0T0itfb0VTeGmI/view?usp=drivesdk' },
        { title: 'Unit-4 Notes', url: 'https://drive.google.com/file/d/1BLPEIzV4rmxd-y8QlFcPW9oNMJe-FtAt/view?usp=drivesdk' },
        { title: 'Unit-5 HR Interview Notes', url: 'https://www.indiabix.com/hr-interview/questions-and-answers/' },
        { title: 'Soft Skill PYQ\'s(2025-26)', url: 'https://drive.google.com/file/d/16rXmTcUFOuBLqO1Gf_Nzg_xo7I2UthMS/view?usp=drivesdk' },
      ]
    },
    {
      id: 'critical-thinking',
      name: 'Critical & Logical Thinking',
      fullName: 'Critical & Logical Thinking (Open Elective)',
      icon: '🧠',
      color: 'bg-cyan-500',
      playlists: { detailed: [{ title: 'Playlist Coming Soon', url: '#' }], oneshot: [] },
      notes: [
        { title: 'Syllabus (2025-26)', url: 'https://drive.google.com/file/d/1uqzNRJ0DCr6KHeFGFRDr554S-9NqgNC6/view?usp=drivesdk' },
        { title: 'unit-1 Notes', url: 'https://drive.google.com/file/d/1lUmDZWGrB3fcGQZiW4pcBhZsdbe---mB/view?usp=drivesdk' },
        { title: 'Unit-2 Notes', url: 'https://drive.google.com/file/d/1BfRMHIibGiWu3D-QUTo6FedJf4QJp11r/view?usp=drivesdk' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/file/d/14fH-6bnIUW5-YXjCp7pW-fL9I1-KG3Ty/view?usp=drivesdk' },
        { title: 'Unit-4 Notes', url: 'https://drive.google.com/file/d/1qsCpiTxYAqg8p2zkMnqSl0IcszHUYZYv/view?usp=drivesdk' },
        { title: 'Unit-5 Notes', url: 'https://drive.google.com/file/d/1zmi0qVacaSHXZYALEbIyXAzLL_ZnLGnU/view?usp=drivesdk' },
      ]
    },
    {
      id: 'solar-energy',
      name: 'Solar Energy',
      fullName: 'Solar Energy (Open Elective)',
      icon: '☀️',
      color: 'bg-yellow-500',
      playlists: { detailed: [{ title: 'Playlist Coming Soon', url: '#' }], oneshot: [] },
      notes: [
        { title: 'Solar Energy Syallbus', url: 'https://drive.google.com/file/d/1BJe0qZi7wRoM8W10zhAeVkdsct2638cK/view?usp=drivesdk' },
        { title: 'Unit-2 FPC Notes', url: 'https://drive.google.com/file/d/19v7kKUZbLeCXdzL2GHEUMlEYTcmP--vs/view?usp=drivesdk' },
        { title: 'Unit-3 Solar air Heater Notes', url: 'https://drive.google.com/file/d/1UUMXTQntr4nQrjaY8l29CrJQhgasuTTh/view?usp=drivesdk' },
        { title: 'Unit-3 Solar Collector Notes', url: 'https://drive.google.com/file/d/1ACoU5BnJAqPzjyKM91WQXcR4z7GGZuzC/view?usp=drivesdk' },
        { title: 'Unit-4 Various Coeff. Calculations Notes', url: 'https://drive.google.com/file/d/1pmO3WOItulIDw348_RX1r5bMvfAkqe3A/view?usp=drivesdk' },
        { title: 'Unit-4 Solar Distillation Notes', url: 'https://drive.google.com/file/d/1CZ3OrOsEqJ_UPvbinc5Ge-Ppff0fjgr3/view?usp=drivesdk' },
        { title: 'Thermal Energy Storage Notes', url: 'https://drive.google.com/file/d/1XllAfIWX0cevnmjScouebOh4-ToXZ-rt/view?usp=drivesdk' },
        { title: 'Solar Angles PDF', url: 'https://drive.google.com/file/d/17x7ZXOsJwOLLyY06f5riCIvI57FWuG6C/view?usp=drivesdk' },
        { title: 'PV Economic Analysis Notes', url: 'https://drive.google.com/file/d/1JAYx_sZhppkXAfBctDStrIXnz9bnN7-i/view?usp=drivesdk' },
        { title: 'PN Junction Characteristics Notes', url: 'https://drive.google.com/file/d/1swQYtgNu0ZQ9huSkO_xchLNDprm7n6y_/view?usp=drivesdk' },
        { title: 'Central Receiver System Notes', url: 'https://drive.google.com/file/d/1ua4vQxqB0ZbkTB-bDTYelEMurSjmTmBI/view?usp=drivesdk' },
        { title: 'Comparision of analysis of collectors Notes', url: 'https://drive.google.com/file/d/1WIwb0YH1wwvG7g2xm3abQ9lYmgQDSiC-/view?usp=drivesdk' },
        { title: 'All Year - PYQS', url: 'https://drive.google.com/file/d/1QOAVF7JMHNMx98oWkrWkgnZSlGJoAq72/view?usp=drivesdk' },
      ]
    },
    {
      id: 'env-ecology',
      name: 'Environment & Ecology',
      fullName: 'Environment & Ecology (Open Elective)',
      icon: '🌿',
      color: 'bg-emerald-500',
      playlists: { detailed: [{ title: 'Playlist Coming Soon', url: '#' }], oneshot: [] },
      notes: [
        { title: 'Env. & Ecology Lecture Notes', url: 'https://drive.google.com/file/d/1taWO5of2LSvA1MTtIvI6AdSf3t-ZrVJ-/view?usp=drivesdk' },
        { title: 'Env. & Ecology Notes', url: 'https://drive.google.com/file/d/12LxbDeBxI4bUNx6lKqct5YCHzuQueCe4/view?usp=drivesdk' },
      ]
    },
    {
      id: 'discrete-maths',
      name: 'Discrete Maths',
      fullName: 'Discrete Mathematics (Open Elective)',
      icon: '🔢',
      color: 'bg-violet-500',
      playlists: { detailed: [{ title: 'Playlist Coming Soon', url: '#' }], oneshot: [] },
      notes: [
        { title: 'Discrete Math Book', url: 'https://drive.google.com/file/d/1qrF_EAftAlDNmb-5AIfTcqxEK1YYqouW/view?usp=drivesdk' },
        { title: 'Discrete Math Handwritten Notes', url: 'https://drive.google.com/file/d/1s07BRK08It_XdHn3FgNnWpru_DCwYe8Z/view?usp=drivesdk' },
      ]
    },
    {
      id: 'non-conventional-energy',
      name: 'Non-Conventional Energy',
      fullName: 'Non-Conventional Energy Resources (Open Elective)',
      icon: '⚡',
      color: 'bg-amber-500',
      playlists: { detailed: [{ title: 'Playlist Coming Soon', url: '#' }], oneshot: [] },
      notes: [{ title: 'Notes Coming Soon', url: '#' }]
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
            <p className="text-xs opacity-50 uppercase tracking-widest">{subject.fullName} — 5th Semester</p>
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
            onClick={() => navigate(source === 'bsms' ? '/bsms/sem-5' : '/btech-notes/third-year/semester-5')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {source === 'bsms' ? 'Back to 5th Sem BS-MS' : 'Back to 5th Sem'}
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Open Elective Subjects</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            Open Electives<br />
            <span className="opacity-60">5th Semester Study Resources</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">Choose your preferred open elective subject — One will be allotted based on GPA</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{source === 'bsms' ? 'BS-MS Electives' : 'B.Tech Electives'}</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{subjects.length} Subjects Available</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">5th Semester</span>
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

export default FifthSemesterOpenElectives;
