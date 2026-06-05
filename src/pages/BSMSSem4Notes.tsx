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

const BSMSSem4Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    math3: {
      detailed: [
        { title: 'Fourier Integral Playlist by-Fearless (Best)', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyITz_e6F9YiyongjaCryasK&si=xhAnYIkAQTe5jAw-', recommended: true },
        { title: 'Complex Variable (Complete Playlist) by-Fearless (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljVCPXMA2wwA9oIV3blxLLQ6&si=zRcZEv8D7dK-CP2M', recommended: true },
        { title: 'Unit 3 Complex Intigration Playlist By-Fearless (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWlvUJ-YmjMsjkAANOagCk7&si=o7JtHhGSY40pDjWY', recommended: true },
        { title: 'Unit 4 Curve Fitting, Correlation & Regrassion by-Gajendra Prohit (Best)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfL1Mrdj7bs2A6bQOU7FMqKX&si=wFlWnVRj-HEH7qAw', recommended: true },
        { title: 'Unit 5 Probability & Distribution Playlist by- MKS (Best)', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLB62_-fT9VNbjRkDEzJzzp&si=FE8RI4spBCakwAgh', recommended: true },
        { title: 'FITTING OF CURVE IN STATISTICS - BY TIKLE\'S ACADEMY', url: 'https://youtube.com/playlist?list=PLNKD1qB9pptvgPP_zrKXa64SPYtKQpy-C&si=mOUPo8QHIhN5w9md' },
        { title: 'Curve Fitting, Correlation by-Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljVF5-HxU829qWUMRFwDAu3v&si=YqbaDiSVfO_BQrlN' },
        { title: 'Complex Integer Playlist By-Pradeep Giri', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9ibhrkzWki0_tfrugS4rvnJ&si=fOLiA6fhcpYafFnO' },
        { title: 'Laplace Transform & Fourier Series By-Pradeep Giri (Best)', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jr5vb-zUd4GUFaexGDiRc9&si=uMG3aPDDGVRo_QOQ', recommended: true },
        { title: 'Hypothesis Testing Playlist By-Fearless (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWze2qPIgZv-CtBJYHEIvqa&si=yrKbGQpWpqNZeDwi', recommended: true },
        { title: 'Inverse Laplace Transform Playlist By-Pradeep Giri', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9iHqXEfSTmpmOpEkUmj-Qay&si=xiSCdE-W81UTMxg6' },
        { title: 'Fourier Transform By-Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfK_FysPwDqaoUKhTqms_aEg&si=4iqfG5zjBHpBMQU_' }
      ],
      oneshot: [
        { title: 'Engineering Mathematics-III One Shot', url: 'https://youtu.be/_Hjp6aFJO40?si=L8tp3IgTfCBFhxEz' }
      ]
    },
    conm: { detailed: [], oneshot: [] },
    no: { detailed: [], oneshot: [] },
    dms: { detailed: [], oneshot: [] },
    cla: { detailed: [], oneshot: [] },
    rds: { detailed: [
                  { title: 'R for DS Playlist - 5 min. Engg', url: 'https://youtube.com/playlist?list=PLYwpaL_SFmcCRFzBkZ-b92Hdg-qCUfx48&si=ooWKiQG1rf56Pcjc', recommended: true },
    ], oneshot: [] },
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
      id: 'math3',
      name: 'Engineering Mathematics-III',
      icon: '📐',
      color: 'bg-purple-500',
      notes: [
        { title: 'Complete Math-III Notes(Unit 1-5)', url: 'https://drive.google.com/file/d/1UNq-P8jCu1R0ucy2zXh1OID5ExaQcUL5/view?usp=drivesdk', recommended: true },
        { title: 'BS Gerewal Math Book', url: 'https://drive.google.com/file/d/1WO6VBRte2_4ZdXbwuwLoA4PfjgSFdabL/view?usp=drive_link' },
        { title: 'HK Das Math Book', url: 'https://drive.google.com/file/d/1WO_2jHYoYX_T9PoZHVVvts4WssiWRqPK/view?usp=drive_link' },
        { title: 'Complete Unit-1,2 & 3 Notes', url: 'https://drive.google.com/file/d/1CE9GVSQI9YCq6iEZ25ASudXDyLHEL5tJ/view?usp=drive_link' },
        { title: 'Unit 4 (Moment) Notes', url: 'https://drive.google.com/file/d/1R0KO9NqX0WFnSbuFqZMTxyol1KmIrC5T/view?usp=drive_link' },
        { title: 'Unit 5 Notes', url: 'https://drive.google.com/file/d/1R0nue1eUT7kZXKeQnXJiZ6mZuijVoQ07/view?usp=drive_link' },
        { title: 'Unit 4 Curve Fitting Notes', url: 'https://drive.google.com/file/d/1CEcIG1FTaeZdqRn53Fy-O8at9SGbmXX2/view?usp=drive_link' },
        { title: 'Z-Transform Notes', url: 'https://drive.google.com/file/d/1_QbIn7C9i3M8E6HD_J3hNwgMORjrMEaj/view?usp=drive_link' },
        { title: 'EM-III Residue Notes', url: 'https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link' },
        { title: 'Harmonic Function Prove Notes', url: 'https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link' }
      ]
    },
    {
      id: 'conm',
      name: 'CONM Notes',
      icon: '🌀',
      color: 'bg-blue-500',
      notes: [{ title: 'CONM Notes(unit 1-5)', url: 'https://drive.google.com/file/d/18lnFb5NV00LsRkdAqk1MyBHyinOf19n7/view?usp=drivesdk', recommended: true }]
    },
    {
      id: 'no',
      name: 'Numerical Optimization',
      icon: '🔥',
      color: 'bg-orange-500',
      notes: [{ title: 'NO Notes(unit 1-5)', url: 'https://drive.google.com/file/d/1tDAuQ_6MD_gxnUyb8FXOmR8UZFD86u6l/view?usp=drivesdk', recommended: true }]
    },
    {
      id: 'dms',
      name: 'Discrete Maths Structure',
      icon: '🔌',
      color: 'bg-green-500',
      notes: [
        { title: 'All Discrete Maths Structure Notes(Unit 1 to 5)', url: 'https://drive.google.com/file/d/1zZz0d9u6oEU5b5K0TbHPJ_LOSCI6r0Fu/view?usp=drivesdk', recommended: true },
        { title: 'Discrete maths book-kennath H.Roshan', url: 'https://drive.google.com/file/d/17sp7ETuil3xu9CXefKJl56qowmgk-3dQ/view?usp=drivesdk' },
        { title: 'Probability & Statistics book', url: 'https://drive.google.com/file/d/1__BWebDSeury6Fc9lhXYhzL7ykIicu3l/view?usp=drivesdk' },
        { title: 'Fundamentals of Maths Statistics book', url: 'https://drive.google.com/file/d/155iOpSTfCuz0NOB6q_5Ohq6iFk8SH1fE/view?usp=drivesdk' },
      ]
    },
    {
      id: 'cla',
      name: 'Computational Linear Algebra (CLA)',
      icon: '🔌',
      color: 'bg-green-500',
      notes: [{ title: 'Complete CLA Notes(unit 1-5)', url: 'https://drive.google.com/file/d/1CKwLsaFF-TQQ3KM1CtXzfxfsNfRj85vu/view?usp=drivesdk', recommended: true }]
    },
    {
      id: 'rDS',
      name: 'R for Data Science',
      icon: '🔌',
      color: 'bg-green-500',
      notes: [
        { title: 'Complete R for DS Notes(unit 1-5)', url: 'https://drive.google.com/file/d/1Xo-zsg8BL2wuxWLn7UF4_SuTHTQMUszD/view?usp=drivesdk', recommended: true },
        { title: 'Full R for DS Notes', url: 'https://drive.google.com/file/d/1zU6N4X6RmLddHWh6ify9k0Dm-rVCRswT/view?usp=drivesdk' }
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: []
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1Z7spAbIGu5BTgT_2ePXh3xqdyh08fzpW/view?usp=drivesdk' },
        { title: 'Mid Sem-1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1sj9C6vGSslL2Aq9pOnrV6Q05YKIdgAPV/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1369PIfbozG_5xJEN-oc3KKElWIe5BKeP/view?usp=drivesdk' },
      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BSMS-4th Semester');
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

  const syllabus = { title: 'BS-MS 4th Sem Syllabus', url: 'https://drive.google.com/file/d/1fVM38WeXkrWqm9vmqApktXMlp7GXDNQj/view?usp=drivesdk' };
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
            <p className="text-xs opacity-50 uppercase tracking-widest">BS-MS — 4th Semester</p>
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
            onClick={() => navigate('/bsms-notes/second-year')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 2nd Year
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">BS-MS Science Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            4th Semester<br />
            <span className="opacity-60">BS-MS Science Notes ⚗️</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">BS-MS 4th Semester — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">BS-MS</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">4th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Instructions */}
        <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl">
          <h3 className="text-base font-bold text-foreground mb-3">📚 BS-MS 4th Semester Info</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>✨ For BS-MS students:</strong> From 2nd year onwards, your curriculum diverges from B.Tech with specially curated resources for your syllabus.</p>
            <p>• <strong>Engineering Mathematics-III:</strong> Curated notes, PYQs, playlists & complete study material available.</p>
            <p>• <strong>CONM Notes:</strong> Structured notes and guided resources for effective preparation.</p>
            <p>• <strong>Numerical Optimization:</strong> Concept-focused notes with curated study playlists.</p>
            <p>• <strong>Discrete Maths Structure:</strong> Well-organized notes, playlists, and practice resources available.</p>
            <p>• <strong>Computational Linear Algebra (CLA):</strong> Fully curated notes and learning resources for strong conceptual understanding.</p>
            <p>• <strong>R for Data Science:</strong> Practical notes, study playlists, and coding resources available.</p>
            <p>• <strong>Notes, playlists & PYQs will be updated progressively</strong> — contribute your notes to help fellow students!</p>
            <p className="text-red-600 dark:text-red-400">⚠️ <strong>Important:</strong> Always maintain good presentation in exams — use 2 pens, underline important keywords, keep proper spacing after answers, and write sufficiently explained answers for better scoring. Cover every topic from the syllabus using playlists, notes, PYQs, YouTube, Google AI Mode, or any resource possible. Once every topic is understood properly, exams automatically become much easier.</p>
            <p>✨ Best Wishes — <strong>Priyal Kumar</strong></p>
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
              <p className="font-semibold text-foreground text-sm">BS-MS 4th Sem Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for BS-MS 4th Semester</p>
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

export default BSMSSem4Notes;



