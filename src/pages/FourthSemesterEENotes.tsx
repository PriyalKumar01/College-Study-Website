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

const FourthSemesterEENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'EE-4th Semester');

  const handleDeleteCommunityNote = async (id: string, fileName: string) => {
    if (!user || !isOwner) return;
    try {
      if (fileName) {
        const { error: storageError } = await supabase.storage.from('study-materials').remove([fileName]);
        if (storageError) console.error('Storage deletion error:', storageError);
      }
      const { error: dbError } = await supabase.from('notes').delete().eq('id', id);
      if (dbError) throw dbError;
      toast({ title: "Deleted securely", description: "Material removed successfully." });
      refreshNotes();
    } catch (error: any) {
      toast({ title: "Deletion failed", description: error.message, variant: 'destructive' });
    }
  };

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists = {
    math3: {
      detailed: [
        { title: 'Engineering Mathematics-III Complete (Best)', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyITz_e6F9YiyongjaCryasK&si=xhAnYIkAQTe5jAw-', recommended: true },
        { title: 'Engineering Mathematics-III Advanced (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljVCPXMA2wwA9oIV3blxLLQ6&si=zRcZEv8D7dK-CP2M', recommended: true },
        { title: 'Engineering Mathematics-III Unit 3 (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWlvUJ-YmjMsjkAANOagCk7&si=o7JtHhGSY40pDjWY', recommended: true },
        { title: 'Engineering Mathematics-III Unit 4 (Best)', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfL1Mrdj7bs2A6bQOU7FMqKX&si=wFlWnVRj-HEH7qAw', recommended: true },
        { title: 'Engineering Mathematics-III Unit 5 (Best)', url: 'https://youtube.com/playlist?list=PLhSp9OSVmeyLB62_-fT9VNbjRkDEzJzzp&si=FE8RI4spBCakwAgh', recommended: true },
        { title: 'Engineering Mathematics-III General 1', url: 'https://youtube.com/playlist?list=PLNKD1qB9pptvgPP_zrKXa64SPYtKQpy-C&si=mOUPo8QHIhN5w9md' },
        { title: 'Engineering Mathematics-III General 2', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljVF5-HxU829qWUMRFwDAu3v&si=YqbaDiSVfO_BQrlN' },
        { title: 'Engineering Mathematics-III General 3', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9ibhrkzWki0_tfrugS4rvnJ&si=fOLiA6fhcpYafFnO' },
        { title: 'Engineering Mathematics-III General 4 (Best)', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jr5vb-zUd4GUFaexGDiRc9&si=uMG3aPDDGVRo_QOQ', recommended: true },
        { title: 'Engineering Mathematics-III General 5 (Best)', url: 'https://youtube.com/playlist?list=PL5Dqs90qDljWze2qPIgZv-CtBJYHEIvqa&si=yrKbGQpWpqNZeDwi', recommended: true },
        { title: 'Engineering Mathematics-III General 6', url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9iHqXEfSTmpmOpEkUmj-Qay&si=xiSCdE-W81UTMxg6' },
        { title: 'Engineering Mathematics-III General 7', url: 'https://youtube.com/playlist?list=PLU6SqdYcYsfK_FysPwDqaoUKhTqms_aEg&si=4iqfG5zjBHpBMQU_' }
      ],
      oneshot: [
        { title: 'Engineering Mathematics-III One Shot', url: 'https://youtu.be/_Hjp6aFJO40?si=L8tp3IgTfCBFhxEz' }
      ]
    },
    em: {
      detailed: [
        { title: 'Economics and Management Complete (Best)', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy', recommended: true },
        { title: 'Economics and Management Advanced', url: 'https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae' }
      ],
      oneshot: []
    },
    de: {
      detailed: [
        { title: 'Digital Electronics Complete (Best)', url: 'https://youtube.com/playlist?list=PL0c0N7xv8s06alYrdpsYjGXBs1IqIU8QS&si=YrMsDIvKhqS3pAjx', recommended: true },
        { title: 'Digital Electronics Advanced', url: 'https://youtube.com/playlist?list=PLgwJf8NK-2e7nYSG31YWEUfwgAp2uIOBY&si=gjuY7Q3o8GBTfdR3' }
      ],
      oneshot: [
        { title: 'Digital Electronics One Shot 1', url: 'https://youtu.be/pHNbm-4reIc?si=BAIqs2C-Ga8NRzPJ' },
        { title: 'Digital Electronics One Shot 2', url: 'https://youtu.be/9Tn9M98yER8?si=Mubongdz8rnHGTaz' }
      ]
    },
     eca: {
      detailed: [ ],
      oneshot: []
    },
     eem: {
      detailed: [],
      oneshot: []
    },
    'em-II': {
      detailed: [],
      oneshot: []
    },
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
    return subjectPlaylists[subjectId] || { detailed: [], oneshot: [] };
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
        { title: 'Complete Unit-1,2 & 3 Notes', url: 'https://drive.google.com/file/d/1CE9GVSQI9YCq6iEZ25ASudXDyLHEL5tJ/view?usp=drive_link' , recommended: true},
        { title: 'Unit 4 (Moment) Notes', url: 'https://drive.google.com/file/d/1R0KO9NqX0WFnSbuFqZMTxyol1KmIrC5T/view?usp=drive_link', recommended: true },
        { title: 'Unit 5 Notes', url: 'https://drive.google.com/file/d/1R0nue1eUT7kZXKeQnXJiZ6mZuijVoQ07/view?usp=drive_link', recommended: true },
        { title: 'Unit 4 Curve Fitting Notes', url: 'https://drive.google.com/file/d/1CEcIG1FTaeZdqRn53Fy-O8at9SGbmXX2/view?usp=drive_link' },
        { title: 'Z-Transform Notes', url: 'https://drive.google.com/file/d/1_QbIn7C9i3M8E6HD_J3hNwgMORjrMEaj/view?usp=drive_link' },
        { title: 'EM-III Residue Notes', url: 'https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link' },
        { title: 'Harmonic Function Prove Notes', url: 'https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link' }
      ]
    },
    {
      id: 'em',
      name: 'Economics & Management (E & M)',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk' , recommended: true },
        { title: 'Business Economics Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' },
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' },
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' },
        { title: 'Unit 4 Notes', url: 'https://drive.google.com/file/d/1oFpjOIShc09HqzTfaLGO9R8ARQh4JQb8/view?usp=drivesdk' },
        { title: 'Unit 5 Notes', url: 'https://drive.google.com/file/d/1Bo3URn-WujyZCXYY5KuPQdL7itjztXyy/view?usp=drivesdk' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' , recommended: true},
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' }
      ]
    },
    {
      id: 'de',
      name: 'Digital Electronics (DE)',
      icon: '🔢',
      color: 'bg-teal-500',
      notes: [
        { title: 'DE Complete Notes (BEST)', url: 'https://drive.google.com/file/d/1BUBUuMlABL7Uu-CxOa8_Q5tbFajxBI8t/view?usp=drivesdk' , recommended: true },
        { title: 'Full DE Notes - 5 Min. Engg.', url: 'https://drive.google.com/file/d/1LaApEGFI4z5n-6N54CtgmRwq7B03EZq5/view?usp=drivesdk' , recommended: true},
        { title: 'Question Bank (Chapter Wise)', url: 'https://drive.google.com/file/d/1ANtk5b6Sr6Q6LQLDELmjDsiLis77ThjI/view?usp=drive_link' , recommended: true},
        { title: 'DE Complete Lab File', url: 'https://drive.google.com/file/d/1-u7KbXNDxNQNw7g64PEbwfqE7FOhZmRb/view?usp=drive_link' , recommended: true },
        { title: 'Digital Circuit Book PDF', url: 'https://drive.google.com/uc?export=download&id=1M7-WFp832omjfPALcua0haNhY8-SBgv6' },
        { title: 'Digital Design Book', url: 'https://drive.google.com/uc?export=download&id=1ws89s_RjCm6ze8z2K1jknxTkZtgZTCgF' },
        { title: 'Digital Electronics Quantum PDF (Best)', url: 'https://drive.google.com/uc?export=download&id=1ksW_xMibmzUZRFScn3NenGzYYc2yxNS0' , recommended: true },
        { title: 'Semiconductor Material PDF', url: 'https://drive.google.com/uc?export=download&id=1P1X9JiJzdGg7FbEL3arfw4uTVISMcvbs' },
        { title: 'MOS Logic Family', url: 'https://drive.google.com/uc?export=download&id=1Yy9cysGTwmRHwfZAsdRY6YI3sRIYwAlR' },
        { title: 'Transistor Logic Circuit', url: 'https://drive.google.com/uc?export=download&id=1DqjPJwWjDvJ3ZBVFCQ3m6Nkg5I0XQp4l' },
        { title: 'Modeling Styles in VHDL', url: 'https://drive.google.com/uc?export=download&id=18xcUAe-dJjmnYlbZ7JHbEcLYDAW4vw2S' },
        { title: 'Binary Multiplier', url: 'https://drive.google.com/uc?export=download&id=1yApmfaL6yZybANtzaGWqMO2S1qp4DPNF' },
        { title: 'Code Converter PDF', url: 'https://drive.google.com/uc?export=download&id=1D5fIC8AfZVwvh-Gd9N2-vqNeGV2fry51' },
        { title: '2 Bit Magnitude Comparator', url: 'https://drive.google.com/uc?export=download&id=1P4Yu75WoAst1fhF9trgee_uqu-yel5Ik' },
        { title: 'Implementation of MUX', url: 'https://drive.google.com/uc?export=download&id=1uyYZllDc2HKuu-Q98s8kj5_Ly_aq4shU' },
        { title: 'Minimize Output Logical Expression (Assignment)', url: 'https://drive.google.com/uc?export=download&id=1FKVUTDtpTANotGo8gQQ4ul8uqv6oY0tI' }
      ]
    },
    {
      id: 'em-II',
      name: 'Electrical Machine-II',
      icon: '💻',
      color: 'bg-teal-500',
      notes: [
        { title: 'Complete Notes', url: 'https://drive.google.com/file/d/1ZPre4AgidRaV13iDh8pfpcbHkH0diRDl/view?usp=drivesdk' },
        { title: 'EM-II BOOK PDF', url: 'https://drive.google.com/file/d/1YbGN2j5OSvmOAbHYyvOd3Q2HoqkXQjO6/view?usp=drivesdk' },
        { title: 'ALL EM-II PYQS', url: 'https://drive.google.com/file/d/1gED5OOR1_M6zEKGgpD3_D5YOgsCoZFSR/view?usp=drivesdk' },
        ]
    },
     {
      id: 'eem',
      name: 'Electrical Engg. Materials',
      icon: '💻',
      color: 'bg-teal-500',
      notes: [
        { title: 'Complete Notes', url: '#' },
        ]
    },
     {
      id: 'eca',
      name: 'Electronic Circuit Analysis (ECA)',
      icon: '🔌',
      color: 'bg-blue-500',
      notes: [
        { title: 'ECA Book', url: 'https://drive.google.com/uc?export=download&id=1ei7KX3yS6TCUcC2Lkya5zVVLYD99ZvF5' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 4th Semester EE',
      icon: '❓',
      color: 'bg-red-600',
      notes: [
        { title: 'Mid Sem-1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1DvtfZK2nZ2zNMvAmcv3Q6WvCL2XSOmPE/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1Xkru5BSnBbmwV7wLmVJyvAlUaug2fA_e/view?usp=drivesdk' },
        { title: 'End Sem PYQs (2025-26)', url: 'https://drive.google.com/file/d/1DQdbHlTiRH6XYbvG43QsJXBmCMjVsfFe/view?usp=drivesdk' },
      ]
    },
  ];
  const syllabus = {
    title: '4th Semester Syllabus',
    url: 'https://drive.google.com/file/d/1S8SRzy10r8ggFpxCW2fMbV6bbGW7skzq/view?usp=drivesdk'
  };

  const subjects: any[] = staticSubjects.map(sub => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter(cn => cn.subject === sub.name || cn.subject === sub.id)
        .map(cn => ({
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
            <p className="text-xs opacity-50 uppercase tracking-widest">Electrical Engineering — 4th Semester</p>
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
                        onClick={() => handleDeleteCommunityNote(note.id, note.fileName)}
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
            onClick={() => navigate('/btech-notes/second-year/semester-4')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Electrical Engineering Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            4th Semester<br />
            <span className="opacity-60">Electrical Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Electrical Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">EE Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Core Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">4th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Important Information */}
        <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl">
          <h3 className="text-base font-bold text-foreground mb-3">📚 Important Branch Information</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>✨ Only for EE 4th Semester students:</strong> These notes are specifically designed for Electrical Engineering students.</p>
            <p>1. We try to cover the <strong>maximum possible subjects’ notes</strong> for the EE branch. However, some notes are freely available here for you.</p>
            <p>2. <strong>Contribution Welcome:</strong><br />
              - If you want to contribute your notes for this section, you are most welcome! Just drop your msg via "Contact us" button. <br />
              - Your name will be added to our <strong>Notes Contributors List</strong>, and it will also help your juniors and other students of your branch.</p>
            <p>3. <strong>Available Notes:</strong><br />
              - <strong>Math-III</strong><br />
              - <strong>Digital Electronics</strong><br />
              - <strong>Electromagnetics (E&M)</strong><br />
              These are available with <strong>curated playlists</strong>, so make sure to use them in the best possible way.</p>
            <p>4. <strong>Instructions for Math-III:</strong><br />
              - Make <strong>short, cheat-sheet type notes</strong> before college exams.<br />
              - This makes <strong>revision easier</strong> and helps you <strong>score better</strong>.</p>
            <p>5. <strong>Instructions for Economics & Management Exam:</strong><br />
              - Try to write <strong>long answers</strong> in a <strong>structured manner</strong>.<br />
              - Keep <strong>proper lining on both sides</strong> of the page.<br />
              - Draw a <strong>line after each answer</strong>.<br />
              - Make your <strong>copy eye-catching and attractive</strong> along with correct answers.<br />
              - This strategy works well in <strong>almost all humanities subjects</strong>, even if no one reads the copy carefully.</p>
            <p>6. <strong>Instructions for Digital Electronics:</strong><br />
              - Watch <strong>Vaibhav Jain’s playlist</strong> carefully.<br />
              - A night before the exam, watch <strong>5-minute engineering videos</strong> – they really help!<br />
              - Practice <strong>numerical problems</strong> and <strong>follow instructions given by the professor</strong>.</p>
            <p>✨ <strong>All the best!</strong><br /><strong>- Priyal Kumar (CSE ’27, HBTU)</strong></p>
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
              <p className="font-semibold text-foreground text-sm">4th Semester Syllabus</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 4th semester B.Tech EE</p>
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

export default FourthSemesterEENotes;



