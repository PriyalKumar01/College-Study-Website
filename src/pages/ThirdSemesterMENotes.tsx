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
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const ThirdSemesterMENotes = () => {
  const navigate = useNavigate();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
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
      id: 'kom',
      name: 'Kinematics of Machine',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [
        { title: 'KOM BOOK By-S.S. Rattan', url: 'https://drive.google.com/file/d/1Ret3lDNQ-Q_aHekhx-1IrVwWN0T1teMN/view?usp=drivesdk' },
        ]
    },
    {
      id: 'ms',
      name: 'Material Science',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [
        { title: 'Ferrous Material Notes', url: 'https://drive.google.com/file/d/1tUuPIWhyWBwySY3MwFzkStAjHAffeOdm/view?usp=drivesdk' },
        { title: 'Unit-1,2 & 3 Notes', url: 'https://drive.google.com/file/d/1oPMef-67CF8M0gDwoNHAfxutsSuCy_Me/view?usp=drivesdk' },
        { title: 'Unit-4 Notes', url: 'https://drive.google.com/file/d/1WjNZVn-02CXoYFBMYZU3ucP0vbk-KJ0R/view?usp=drivesdk' },
        { title: 'Unit-5 Notes', url: 'https://drive.google.com/file/d/11RCPAy1-YnHr06_S6eM9u9ay5uKl1twR/view?usp=drivesdk' },
        { title: 'GATE GPSC_Material Science Unit-1,2& 3 Notes', url: 'https://drive.google.com/file/d/1ibTXNh7As3GPVdt1W-AKZGAjsYF76M2C/view?usp=drivesdk' },
        { title: 'Imp. PYQS with Solutions', url: 'https://drive.google.com/file/d/1nmlQKBUPfw5RfO0-WRnXSrwyD4V4vvBi/view?usp=drivesdk' },
        ]
    },
    {
      id: 'md',
      name: 'Machine Drawing',
      icon: '🌐',
      color: 'bg-purple-500',
      notes: [
        { title: 'Official MD Syllabus', url: 'https://drive.google.com/file/d/1KwWOJi9yGLwqA5dLJJnF0pPR7rEbVXMq/view?usp=drivesdk' },
        { title: 'MD Objective Ques.', url: 'https://drive.google.com/file/d/1KEkAFfUTKrlfBZSflaRp-3JSY55W2z69/view?usp=drivesdk' },
      ]
    },
    {
      id: 'et',
      name: 'Engg. Thermodynamics',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [
        { title: 'Unit-1 ET Notes', url: 'https://drive.google.com/file/d/1L_cqxvSO6djvfa32zliF32MXiLT2nQh7/view?usp=drivesdk' },
        { title: 'Unit-2 ET Notes (PART-1)', url: 'https://drive.google.com/file/d/1l5qwbL5puPX-SAD5Yc4ww5mSEsWnNvrd/view?usp=drivesdk' },
        { title: 'Unit-2 ET Notes (PART-2)', url: 'https://drive.google.com/file/d/1BRrCZ5njGVkHWqDa6fG4rpB_ewIIePwG/view?usp=drivesdk' },
        { title: 'Unit-3 ET Notes', url: 'https://drive.google.com/file/d/1hI6X8tlTlrJlNixbhaGIiRctrppFy9fx/view?usp=drivesdk' },
        { title: 'Unit-4 ET Notes', url: 'https://drive.google.com/file/d/1_kiMpbsqzcwPwOsl3hQpg9Wl9Q_Sfp75/view?usp=drivesdk' },
        { title: 'ET Self Study Notes', url: 'https://drive.google.com/file/d/10V0KF21CkXScf__3pLqWgFF7f--VE7mc/view?usp=drivesdk' },
      ]
    },
    {
      id: 'som',
      name: 'Strength of Material',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: [
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/file/d/19bTcoGiDiYm6rtoXGe8IJvhgbCTc48h5/view?usp=drivesdk', recommended : true },
        { title: 'Unit-1, 2 & 3 Handwritten Notes', url: 'https://drive.google.com/file/d/17blfHAcJBn3xuR72YyZEos8HpX4gah50/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-4 Theory of Failure', url: 'https://drive.google.com/file/d/1oKnyxO-KzRUuu2qFl21zgxyulHTxFZ0S/view?usp=drivesdk', recommended : true },
        { title: 'Unit-5 Thin & thick Cylinder Notes', url: 'https://drive.google.com/file/d/1fJZ2clBRsX8t6hZoA_Sue85IueQzL25e/view?usp=drivesdk' , recommended : true},
        { title: 'SOM Lab Ques.', url: 'https://drive.google.com/file/d/15aa0NBdtwFBJUaaK1tMdMM8GTxsDvlcL/view?usp=drivesdk' },
        { title: 'SOM BOOK By- R.K.Bansal', url: 'https://drive.google.com/file/d/15ahuMSoS3b6XeNwK7WVxOQ93pk9ukMwx/view?usp=drivesdk' }
      ]
    },
    {
      id: 'math2',
      name: 'Engg Mathematics-II',
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
      id: 'mes',
      name: 'MES Notes',
      icon: '🔌',
      color: 'bg-teal-500',
       notes: [
        { title: 'Unit-2 MES Notes', url: 'https://drive.google.com/file/d/1SQCyclPgRSj_dGA7WVU6lW9Eglw8y3kG/view?usp=drivesdk', recommended : true },
        { title: 'Unit-3 MES Notes', url: 'https://drive.google.com/file/d/1EO_jaSk0YL-xr8lJT9MZjc1UKQLIgFr3/view?usp=drivesdk', recommended : true },
        { title: 'Unit-4 MES Notes', url: 'https://drive.google.com/file/d/1hcIsrWh89XAXCJF_pE0zQhVMJkF6EQp2/view?usp=drivesdk', recommended : true },
        { title: 'Unit-5 MES Notes', url: 'https://drive.google.com/file/d/1CYNvhFWiz3zXyJD90XkJA99kRi6kzq1Q/view?usp=drivesdk', recommended : true },
        { title: 'Most Imp. PYQS Solutions', url: 'https://drive.google.com/file/d/1kC6iv_fkPr8_JMGN_Ro_CpTPl_-rqymo/view?usp=drivesdk' },

       ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [
        { title: 'EM-II Assignment 1', url: 'https://drive.google.com/file/d/1TIUedXB4mRke7CDxuvHnVn9lXXA6KmQf/view?usp=drive_link' },
        { title: 'EM-II Assignment-2', url: 'https://drive.google.com/file/d/1TKW4nyYuBMe5LJxXLBlEwEIOdSvbWTpI/view?usp=drive_link' },
        { title: 'EM-II Assignment-3', url: 'https://drive.google.com/file/d/1tDZaX9nQEPecEtrDgjgtPOblvp_GA9TG/view?usp=drive_link' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Mid Sem-1 & 2 PYQs(2022-23)', url: 'https://drive.google.com/file/d/1CDP18lrpDfpro60B_fNbrwCScqXL_6jR/view?usp=drivesdk' },
        { title: 'End Sem PYQs(2022-23)', url: 'https://drive.google.com/file/d/1oBDlfMok9kUsvyE-0LzJvI8Qn8eFd_tg/view?usp=drivesdk' },
        { title: 'Mid Sem PYQs(2023-24)', url: 'https://drive.google.com/file/d/1a4bBTk9Q9NGdPmCv5GJ9wpOBpWYY3gag/view?usp=drivesdk' },
        { title: 'End Sem PYQs(2023-24)', url: 'https://drive.google.com/file/d/1_yfFyoum1jigWHDTEzKQFpb-Tvet81N4/view?usp=drivesdk' },
        { title: 'Mid Sem + ESE PYQs(2024-25)', url: 'https://drive.google.com/file/d/1E7bR9519waWe0YzEMspyimXwFoJm9a6r/view?usp=drivesdk' },
        { title: 'Mid Sem-1 PYQs(2025-26)', url: 'https://drive.google.com/file/d/15t3Iqz4L1mqMcnZA1I_uifLnNag8SEVW/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs(2025-26)', url: 'https://drive.google.com/file/d/1-bbl32FY01UmQqRtBnbhqzAaENlU1Otv/view?usp=drivesdk' },
        { title: 'End Sem PYQs(2025-26)', url: 'https://drive.google.com/file/d/12uBuuZClizctXKDOXm0Am4SLftNZab0j/view?usp=drivesdk' },
        { title: 'SOM OLD PYQS', url: 'https://drive.google.com/file/d/1N3tU3TiSXYWsUDsV3r3z4kHpAIC4s-GP/view?usp=drivesdk' },
        { title: 'Engg. Thermodynamics PYQs', url: 'https://drive.google.com/file/d/1ob0kQEBoz0soaCFLKiQcgKiR_ggy-1-F/view?usp=drivesdk' },

      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ME-3rd Semester');
  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes.map(n => ({ ...n, isCommunity: false as const })),
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({
          id: cn.id,
          title: cn.title,
          url: cn.file_url,
          isCommunity: true as const,
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
    title: '3rd Semester Syllabus',
    url: 'https://drive.google.com/file/d/14vei1z0YQmFEVZFZzel2UEhjO3nRE9oy/view?usp=drivesdk'
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
            <p className="text-xs opacity-50 uppercase tracking-widest">Mechanical Engineering — 3rd Semester</p>
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
                        onClick={() => handleDeleteCommunityNote(note.id!)}
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
            onClick={() => navigate('/btech-notes/second-year/semester-3')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Mechanical Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            3rd Semester<br />
            <span className="opacity-60">Mechanical Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Mechanical Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">ME Department</span>
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
          <h3 className="text-base font-bold text-foreground mb-3">📚 Mechanical Engg 3rd Semester — Important Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">✨ Hi ME Juniors!</strong> A few tips to help you sail through the 3rd semester.</p>
            <p>• <strong className="text-foreground">Thermodynamics:</strong> Focus on concepts of work, heat, and entropy. Solve numerical problems regularly.</p>
            <p>• <strong className="text-foreground">Strength of Materials (SOM):</strong> Standard formulas and beam bending equations are critical. Draw shear force and bending moment diagrams carefully.</p>
            <p>• <strong className="text-foreground">Maintain CGPA:</strong> Keep aiming for <strong className="text-foreground">8.0+ CGPA</strong> to remain in a safe zone for all companies.</p>
            <p className="text-red-600 dark:text-red-400"><strong>⚠️ Important:</strong> Present your answers clearly in exams using neat schematic diagrams and proper units for calculations.</p>
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
              <p className="text-xs text-muted-foreground">Official syllabus for 3rd semester B.Tech ME</p>
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

export default ThirdSemesterMENotes;