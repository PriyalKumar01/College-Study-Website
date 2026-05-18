import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const BSMSSem4Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for BS-MS 4th Semester on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists: Record<string, { detailed: any[]; oneshot: any[] }> = {
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
    'classical-mech': { detailed: [], oneshot: [] },
    thermodynamics: { detailed: [], oneshot: [] },
    electronics: { detailed: [], oneshot: [] }
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

  const syllabus = { title: 'BS-MS 4th Sem Syllabus', url: '#' };
  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Button onClick={() => setSelectedSubject(null)} variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subjects
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{subject.name} 📚</h1>
            <p className="text-muted-foreground text-lg">All notes for {subject.name} - BS-MS 4th Semester</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white text-lg`}><FileText className="h-5 w-5" /></div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription>{subject.name} study material</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button onClick={() => handleDownload(note.url, note.title)} className="flex-1 btn-hero" disabled={(note as any).url === '#'}>
                        <Download className="h-4 w-4 mr-2" />{(note as any).url === '#' ? 'Coming Soon' : 'Download'}
                      </Button>
                      {(note as any).isCommunity && isOwner && (
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteCommunityNote((note as any).id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Button onClick={() => navigate('/bsms-notes/second-year')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to 2nd Year
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">BS-MS 4th Semester Notes ⚗️</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">📚 BS-MS 4th Semester Info</h3>
              <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                <p><strong>✨ For BS-MS students:</strong> 4th semester builds on your 3rd semester foundation with more advanced topics.</p>
                <p>• <strong>Classical Mechanics:</strong> Lagrangian and Hamiltonian formulations, rigid body dynamics.</p>
                <p>• <strong>Thermodynamics:</strong> Statistical mechanics, entropy, free energy, and partition functions.</p>
                <p>• <strong>Electronics:</strong> Op-amps, oscillators, and basic digital circuits for experimental science.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-8">
          <Card className="gradient-card border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />BS-MS 4th Sem Syllabus</CardTitle>
              <CardDescription>Official syllabus for BS-MS 4th Semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleDownload(syllabus.url, syllabus.title)} className="btn-hero" disabled={syllabus.url === '#'}>
                <Download className="h-4 w-4 mr-2" />{syllabus.url === '#' ? 'Coming Soon' : 'Download Syllabus'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (index + 1) * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
              <Card className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl" onClick={() => setSelectedSubject(subject.id)}>
                <CardHeader>
                  <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto shadow-lg`}>{subject.icon}</div>
                  <CardTitle className="text-lg text-center">{subject.name}</CardTitle>
                  <CardDescription className="text-center">{subject.notes.length} notes available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                          onClick={(e) => { e.stopPropagation(); toggleSubjectExpansion(subject.id); }}>
                          <div className="flex items-center gap-2"><Play className="h-4 w-4 text-primary" /><span className="text-sm font-medium">Study Playlists</span></div>
                          {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </div>
                        {expandedSubjects.includes(subject.id) && (
                          <div className="mt-3 space-y-2 pl-2">
                            <p className="text-xs text-muted-foreground pl-2">Not available...</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{subject.notes.length} Files</Badge>
                      <Button variant="outline" size="sm" onClick={() => setSelectedSubject(subject.id)}>View Notes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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

export default BSMSSem4Notes;
