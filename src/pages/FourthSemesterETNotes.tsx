
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronRight, ChevronDown, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const FourthSemesterETNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ET-4th Semester');
  const { isOwner } = useAuth();
  const { toast } = useToast();

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

  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);


  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 4th Semester ET on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const subjectPlaylists = {
    dsuc: {
      detailed: [
        { title: 'DSUC Complete Playlist', url: 'https://youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU&si=ywuxQFLJq-6kBNBz' },
        { title: 'DSUC Advanced Playlist', url: 'https://youtube.com/playlist?list=PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j&si=UoNjnrMNLqIyMOJ7' }
      ],
      oneshot: [
        { title: 'DSUC One Shot Complete', url: 'https://youtu.be/MdG0Vw9f1A4?si=l-gk-33QAWwbhSeC' }
      ]
    },
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
    pyqs: {
      detailed: [],
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
      id: 'dsuc',
      name: 'Data Structures Using C',
      icon: '💻',
      color: 'bg-blue-500',
      notes: [
        { title: 'Complete DSUC Best Notes - Quantum', url: 'https://drive.google.com/file/d/1owA6SjSqpZrLk1-qH_W0o96jamAcciOC/view?usp=drive_link' },
        { title: 'All Most Important Programs for End Sem DSUC', url: 'https://drive.google.com/file/d/16eqDnz71Ir1RulrBmeN7Lsxb54NnFPVs/view?usp=drive_link' },
        { title: 'DSUC Lab File', url: 'https://drive.google.com/file/d/1-XiDXdsHOUgn_FWc7Vj3nqkPIpvQ6Z00/view?usp=drive_link' },
        { title: 'DSUC Unit 3 Notes', url: 'https://drive.google.com/file/d/16vyaX2v03fQIIRlPQEuRpZlj9yMkwslJ/view?usp=drive_link' },
        { title: 'DSUC Unit 1 Notes', url: 'https://drive.google.com/file/d/17AvvwyJt04S2BVhsGaeIPTmKiauFjFt3/view?usp=drive_link' },
        { title: 'DSUC Unit 2 Notes', url: 'https://drive.google.com/file/d/176a8uPhPDR4sCE0OGOnem3fAJzhEafHp/view?usp=drive_link' },
        { title: 'DSUC Unit 4 Notes', url: 'https://drive.google.com/file/d/16puOi7D4C8zNYQy7b5g57ldSY4uxKu1U/view?usp=drive_link' },
        { title: 'DSUC Unit 5 Notes', url: 'https://drive.google.com/file/d/16lSiwGeeApPd-ROVWiHzE2p_lrGl8Nmx/view?usp=drive_link' },
        { title: 'Best Unit 1 Notes', url: 'https://drive.google.com/file/d/1ox2uuOi9_5E_OykzE4HVFziuaztrG_6h/view?usp=drive_link' }
      ]
    },
    {
      id: 'math3',
      name: 'Engineering Mathematics-III',
      icon: '📐',
      color: 'bg-purple-500',
      notes: [
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
      id: 'em',
      name: 'Economics & Management',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'Business Economics Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' },
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' },
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' },
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 4th Semester ET',
      icon: '❓',
      color: 'bg-red-600',
      notes: [
        { title: 'MID SEM-1 PYQS (2025-2026)', url: 'https://drive.google.com/file/d/1VTLs5pLDDD-cZLfSmIlTf9W2bNNGj4EX/view?usp=drivesdk' },
        { title: 'ALL ESE PYQS (2024-2025)', url: 'https://drive.google.com/file/d/1owpcBuEsrTB3BLayDYQ2R_D3xQdmOtdS/view?usp=drivesdk' },
        { title: 'ALL 4TH SEM PYQS (2023-2024)', url: 'https://drive.google.com/file/d/1YTAmn1qoGZWsNAzEK84scJCxGKjMuroD/view?usp=drivesdk' },
        { title: 'ALL ESE PYQS (2022-2023)', url: 'https://drive.google.com/file/d/1oY6TFpA4z8Wdk1_bMn2DnyVBkMmQSTRW/view?usp=drivesdk' },
      ]
    },
  ];

  const syllabus = {
    title: '4th Semester ET Syllabus',
    url: 'https://drive.google.com/file/d/1wCW2o3LRk59xfJC4-p0Lj4V-h6PDsrd1/view?usp=drivesdk'
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

  const handleDownload = (url: string, title: string) => {
    if (url === '#') return;
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              onClick={() => setSelectedSubject(null)}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {subject.name} 📚
            </h1>
            <p className="text-muted-foreground text-lg">
              {subject.fullName} - 4th Semester ET
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">

                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white text-lg`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription>
                      {subject.name} study material
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDownload(note.url, note.title)}
                        className="flex-1 btn-hero"
                        disabled={note.url === '#'}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {note.url === '#' ? 'Coming Soon' : 'Download PDF'}
                      </Button>
                      {(note as any).isCommunity && isOwner && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteCommunityNote((note as any).id)}
                          title="Delete Community Upload"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/btech-notes/second-year/semester-4')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            4th Semester ET Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Electronics & Telecommunication - Comprehensive study materials
          </p>
        </motion.div>

        {/* Syllabus Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{syllabus.title}</h3>
                <p className="text-sm text-muted-foreground">Official syllabus for 4th semester ET</p>
              </div>
            </div>
            <Button
              onClick={() => handleDownload(syllabus.url, syllabus.title)}
              className="btn-hero"
              disabled={syllabus.url === '#'}
            >
              <Download className="h-4 w-4 mr-2" />
              {syllabus.url === '#' ? 'Coming Soon' : 'Download Syllabus'}
            </Button>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const playlists = getSubjectPlaylists(subject.id);
            const hasDetailedPlaylist = playlists.detailed && playlists.detailed.length > 0 && playlists.detailed[0].url !== '#';

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl"
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <CardHeader>
                    {/* Modern 3D Icon */}
                    <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className={`absolute inset-0 rounded-2xl ${subject.color} blur-xl opacity-20`} />
                      <div className={`relative w-full h-full rounded-2xl ${subject.color} bg-opacity-10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center overflow-hidden`}>
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                        <span className="text-4xl drop-shadow-md">{subject.icon}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-center">{subject.name}</CardTitle>
                    <CardDescription className="text-center">
                      {subject.notes.length} notes available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {/* Study Playlists Section */}
                      {subject.id !== 'pyqs' && subject.id !== "assignments" && (
                        <div className="border-t pt-4">
                          <div
                            className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubjectExpansion(subject.id);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Play className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">Study Playlists</span>
                            </div>
                            {expandedSubjects.includes(subject.id) ?
                              <ChevronDown className="h-4 w-4" /> :
                              <ChevronRight className="h-4 w-4" />
                            }
                          </div>

                          {expandedSubjects.includes(subject.id) && (
                            <div className="mt-3 space-y-2 pl-2">
                              {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs h-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlaylistClick(subject.id, 'detailed');
                                  }}
                                >
                                  📚 Detailed Playlists ({getSubjectPlaylists(subject.id).detailed.length})
                                </Button>
                              )}
                              {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs h-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlaylistClick(subject.id, 'oneshot');
                                  }}
                                >
                                  ⚡ One Shot Videos ({getSubjectPlaylists(subject.id).oneshot.length})
                                </Button>
                              )}
                              {getSubjectPlaylists(subject.id).detailed.length === 0 &&
                                getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                                  <p className="text-xs text-muted-foreground pl-2">Not available...</p>
                                )}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{subject.notes.length} Files</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); setSelectedSubject(subject.id); }}
                        >
                          View Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        {showPlaylistModal && (
          <PlaylistModal
            isOpen={showPlaylistModal}
            onClose={() => setShowPlaylistModal(false)}
            title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
            playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] : []}
            type={selectedPlaylistType}
          />
        )}
      </div>

    </div>
  );
};
export default FourthSemesterETNotes;
