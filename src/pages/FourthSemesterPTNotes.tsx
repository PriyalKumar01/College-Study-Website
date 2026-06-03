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

const FourthSemesterPTNotes = () => {
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    co: {
      detailed: [
        { title: 'Computer Organization Complete', url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX&si=DIFQTSm2C9CeKCSW' }
      ],
      oneshot: [
        { title: 'Computer Organization One Shot 1', url: 'https://youtu.be/DsK35f8wyUw?si=txkw3jBfvMrPRHI9' },
        { title: 'Computer Organization One Shot 2', url: 'https://youtu.be/nezosHntjPg?si=b07dVQUqLYcwXAak' }
      ]
    },
    dsuc: {
      detailed: [
        { title: 'DSUC Complete Playlist', url: 'https://youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU&si=ywuxQFLJq-6kBNBz' },
        { title: 'DSUC Advanced Playlist', url: 'https://youtube.com/playlist?list=PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j&si=UoNjnrMNLqIyMOJ7' }
      ],
      oneshot: [
        { title: 'DSUC One Shot Complete', url: 'https://youtu.be/MdG0Vw9f1A4?si=l-gk-33QAWwbhSeC' }
      ]
    },
    de: {
      detailed: [
        { title: 'Digital Electronics by-Vaibhav Jain (Best)', url: 'https://youtube.com/playlist?list=PL0c0N7xv8s06alYrdpsYjGXBs1IqIU8QS&si=YrMsDIvKhqS3pAjx', recommended: true },
        { title: 'Digital Electronics by- Engg. Funda', url: 'https://youtube.com/playlist?list=PLgwJf8NK-2e7nYSG31YWEUfwgAp2uIOBY&si=gjuY7Q3o8GBTfdR3' }
      ],
      oneshot: [
        { title: 'DE One Shot by- Knowledge Gate', url: 'https://youtu.be/pHNbm-4reIc?si=BAIqs2C-Ga8NRzPJ' },
        { title: 'DE One Shot by- 5 Min. Engg.', url: 'https://youtu.be/9Tn9M98yER8?si=Mubongdz8rnHGTaz' }
      ]
    },
    python: {
      detailed: [
        { title: 'Python Programming Complete', url: 'https://youtube.com/playlist?list=PLvu-LC7buiaVdESLhxGj0BDQMjSLIEiSL&si=_GpcglKz_pZ78pt_' }
      ],
      oneshot: [
        { title: 'Python Programming One Shot', url: 'https://youtube.com/playlist?list=PL49mRA0Y_C8vu2RWHdPsuRNRAcd89-eaz&si=dTvCvGhRbf7esBPJ' }
      ]
    },
    math2: {
      detailed: [
        { title: 'Unit 1 Differential Equation- Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy' },
        { title: ' Unit 3 Laplace Transform - Fearless', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB' },
        { title: 'Fourier Series -Pradeep Giri Playlist', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7' },
        { title: 'Fourier Series - MKS Playlist', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8' },
        { title: 'Partial Diff. Eq.- MKS Playlist', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyJoNnAqghUK-Lit3qBgfa6o&si=RfESwXzHT7mFK_DG' },
        { title: 'Partial Diff. Eq.- Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k', recommended: true },
        { title: 'Appliaction of Fourier Transforms to BVP', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyJCwFXRDW8KmDlBFGRAxnAu&si=Vi9_HhLL2K5r15gn' },
        { title: 'Complete Engg Math-II -By: Gajendra Prohit', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx', recommended: true }
      ],
      oneshot: []
    },
    itetiict: {
      detailed: [],
      oneshot: [
        { title: 'ICT Introduction Video 1', url: 'https://youtu.be/6ptZr9VRxPs?si=IRMWuVFfR4-Yj6rM' },
        { title: 'ICT Introduction Video 2', url: 'https://youtu.be/Pg_9kXV1lXg?si=Z-jfUI57nI_c8_2w' },
        { title: 'ICT Introduction Video 3', url: 'https://youtu.be/mbdl-Fh5ALg?si=1JQlwxU9UroBsgL8' }
      ]
    }
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
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
      id: 'dsuc',
      name: 'Data Structures Using C',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [ ]
    },
    {
      id: 'itetiict',
      name: 'Intro to Emerging Technologies in ICT',
      icon: '🌐',
      color: 'bg-purple-500',
      notes: []
    },
    {
      id: 'co',
      name: 'Computer Organisation',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: []
    },
    {
      id: 'python',
      name: 'Python Programming',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: []
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
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
    {
      id: 'conm',
      name: 'CONM Notes',
      icon: '🌀',
      color: 'bg-blue-500',
      notes: [
        { title: 'CONM Notes(unit 1-5)', url: 'https://drive.google.com/file/d/18lnFb5NV00LsRkdAqk1MyBHyinOf19n7/view?usp=drivesdk', recommended: true }]
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
        { title: 'Mid Sem 1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1aYXQlrMqS8wIP_k__SrXBOwTq8g9q42T/view?usp=drivesdk' },
        { title: 'Mid Sem 2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1uPEiDJyEzEz2OsyCXJ2ZuyS-m1k8NpR4/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2025-26)', url: 'https://drive.google.com/file/d/1tK3VnFKhL1Vw13SCqh-NOOLEY1E7glIu/view?usp=drivesdk' },
        { title: 'Mid Sem 1 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1SFi-2scaPEeehBKK7sW-vuag0-t3Z3Pk/view?usp=drive_link' },
        { title: 'Mid Sem 2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1my2tho6uAeNtm2r6wA9Egare2Wsj6MzX/view?usp=drive_link' },
        { title: 'End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1P6gRk-loWPVrYtclKa9YaXa5AKLiebZ7/view?usp=drive_link' },
        { title: 'Mid Sem-1 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TLslQyKp3OofBB61ApE4-5q0epHzVcik/view?usp=drive_link' },
        { title: 'End Sem PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TeQ1Pee5v93WkAncNgNss9JQaXhg4b0h/view?usp=drive_link' }
      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'PT-4th Semester');
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

  const syllabus = {
    title: '4th Semester Syllabus',
    url: 'https://drive.google.com/file/d/1ikG58R0J9zc-0NmfDZbsFumu2edAJ3Y3/view?usp=drivesdk'
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
            <p className="text-xs opacity-50 uppercase tracking-widest">Paint Tech Engineering — 4th Semester</p>
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
            onClick={() => navigate('/btech-notes/second-year/semester-4')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Paint Tech Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            4th Semester<br />
            <span className="opacity-60">Paint Tech Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Paint Tech Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">PT Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">4th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Instruction Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl"
        >
          <h3 className="text-base font-bold text-foreground mb-3">📚 Paint Tech 4th Semester — Important Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">✨ Hi CSE/IT Juniors!</strong> A few important things to keep in mind as you progress through 4th semester — read carefully, this will genuinely help you.</p>
            <p>• <strong className="text-foreground">Career Focus:</strong> Start building command in at least one domain — <strong className="text-foreground">Web Dev, App Dev (frontend/backend/both), AI/ML, or Cybersecurity.</strong> Participate in hackathons and contribute to open-source. These make learning exciting and your profile strong.</p>
            <p>• <strong className="text-foreground">DSA is Non-Negotiable:</strong> As a CSE student, strong DSA in C++/Java is a must for placements. Most companies that visit campus are heavily DSA-focused — start early, be consistent.</p>
            <p>• <strong className="text-foreground">Maintain CGPA:</strong> Companies keep a cutoff of <strong className="text-foreground">7 or 7.5 CGPA</strong> — no excuses below that. Those with <strong className="text-foreground">8.5+ are in a very safe zone</strong> — aim for 8+ minimum and maintain it till at least 6th semester.</p>
            <p>• <strong className="text-foreground">DSUC:</strong> Quantum PDF + my notes + Programming PDF available on College Study Website are more than enough. Practice programs: Stack, Dijkstra, Insertion Sort, Selection Sort, Linear & Binary Search.</p>
            <p>• <strong className="text-foreground">Computer Organisation (CO):</strong> IT students — Amit Sir's classes + write well. CSE students — Gate Smashers or Knowledge Gate OneShot (or both) + PYQs.</p>
            <p>• <strong className="text-foreground">ItETiICT:</strong> Notes + PYQs are enough. Focus on IoT, Sensors, and OSI Model — remember the OSI layers using the trick below! 👇</p>
            <p>• <strong className="text-foreground">Python Programming (PP):</strong> Pooja Ma'am's notes + PYQs + Quantum PDF — must go through before exam. For practicals: go through all important Python programs from the special PDF & lab file on the website. Exam has 2 programming questions — insertion/selection sort, linear & binary search (most important), Tower of Hanoi, etc.</p>
            <p>• <strong className="text-foreground">Digital Electronics (DE):</strong> Question Bank on website + Vaibhav Jain playlist (best) + PYQs.</p>
            <p>• <strong className="text-foreground">Maths-II (M2):</strong> Make a short formula sheet yourself while watching YouTube lectures. Solve PYQs. That's it.</p>
            <p>• <strong className="text-foreground">Quantum PDFs:</strong> Wherever available, always go through them — they are genuinely very helpful in general preparation.</p>
            <p>• <strong className="text-foreground">PP Practical Tip 😄:</strong> Odd roll no. students sit near odd roll no. friends, even near even — because odd and even students get different questions. Plan accordingly!</p>

            {/* OSI Model Trick Image */}
            <div className="mt-4 mb-2">
              <p className="font-semibold text-foreground mb-2">🌐 OSI Model Trick — Easy Way to Remember All 7 Layers in Sequence:</p>
              <div className="rounded-lg overflow-hidden border border-border max-w-lg bg-card">
                <img
                  src="/osi-model-trick.png"
                  alt="OSI Model Easy Memory Trick by Priyal Kumar"
                  className="w-full object-contain bg-white dark:invert"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <p className="text-xs mt-1 text-muted-foreground italic">Trick by Priyal Kumar — Sequence: Application → Presentation → Session → Transport → Network → Data Link → Physical</p>
            </div>

            <p className="text-red-600 dark:text-red-400"><strong>⚠️ Important:</strong> Always maintain good presentation in exams — use 2 pens, underline important keywords, keep proper spacing after answers, and write sufficiently explained answers for better scoring. Cover every topic from the syllabus using playlists, notes, PYQs, YouTube, Google AI Mode, or any resource possible. Once every topic is understood properly, exams automatically become much easier.</p>
            <p>✨ Best Wishes — <strong className="text-foreground">Priyal Kumar</strong></p>
          </div>
        </motion.div>

        {/* Syllabus Card */}
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
              <p className="font-semibold text-foreground text-sm">4th Semester Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 4th semester B.Tech PT</p>
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
            {subjects.map((subject, index) => {
              const playlists = getSubjectPlaylists(subject.id);
              const isExpanded = expandedSubjects.includes(subject.id);

              return (
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
                    {subject.id !== 'pyqs' && subject.id !== "assignments" && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <button
                          className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => toggleSubjectExpansion(subject.id)}
                        >
                          <span className="flex items-center gap-1.5">
                            <Play className="h-3 w-3" /> Study Playlists
                          </span>
                          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                        {isExpanded && (
                          <div className="mt-2 space-y-1">
                            {playlists.detailed.length > 0 && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                              >
                                📚 Detailed ({playlists.detailed.length})
                              </button>
                            )}
                            {playlists.oneshot.length > 0 && (
                              <button
                                className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => handlePlaylistClick(subject.id, 'oneshot')}
                              >
                                ⚡ One Shot ({playlists.oneshot.length})
                              </button>
                            )}
                            {playlists.detailed.length === 0 && playlists.oneshot.length === 0 && (
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
              );
            })}
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

export default FourthSemesterPTNotes;