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

const BSMSSem3Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for BS-MS 3rd Semester on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists: Record<string, { detailed: any[]; oneshot: any[] }> = {
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
    em: {
      detailed: [
        { title: 'Economics and Management Complete (Best)', url: 'https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy', recommended: true },
        { title: 'Economics and Management Advanced', url: 'https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae' }
      ],
      oneshot: []
    },
    chemistry: { detailed: [], oneshot: [] },
    'cs-basics': { detailed: [], oneshot: [] }
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
      id: 'em',
      name: 'Economics & Management',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk' },
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
      id: 'statistical',
      name: 'Statistical Methods',
      icon: '📊',
      color: 'bg-green-500',
      notes: [{ title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1zvqf73Q5YzON5-q8MYepf1dMKdE9_8Id/view?usp=drivesdk' }]
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      icon: '💻',
      color: 'bg-indigo-500',
      notes: [{ title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1Yv1GXiivwW-VzgXo0LDDilZQRQOVG-k4/view?usp=drivesdk' }]
    },
    {
      id: 'prp',
      name: 'Probability & Random Processes',
      icon: '💻',
      color: 'bg-indigo-500',
      notes: [{ title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1qOTsNk7Jbb0dslXNoV1cFbHMQfhtMGUA/view?usp=drivesdk' }]
    },
    {
      id: 'real-analysis',
      name: 'Real Analysis',
      icon: '💻',
      color: 'bg-indigo-500',
      notes: [{ title: 'Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1ywGtU0gSZcUuB2Pz8xjZlXhuUAnwfEy_/view?usp=drivesdk' },
        { title: 'Real analysis book (by Bartle & Shebert 4th edition)', url: 'https://drive.google.com/file/d/1IoWmsjvxfOxJFWQw0F6Kmul1VQ-26pN9/view?usp=drivesdk' },
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-orange-500',
      notes: [
        { title: 'PRP & SM Assignment', url: 'https://drive.google.com/file/d/1uVzVvrxd_9zhd0mMYW8Wn0T64Gj9a3u3/view?usp=drivesdk' },
        
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: 'Mid Sem-1 PYQs(2024-25)', url: 'https://drive.google.com/file/d/1poHiP_Tvv_zPb0_p4whjlbj8SkNlDITo/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs(2024-25)', url: 'https://drive.google.com/file/d/1r7kGmBnL9E0UASfursx5MdM5b3l8A_CT/view?usp=drivesdk' },
        { title: 'End Sem PYQs(2024-25)', url: 'https://drive.google.com/file/d/1JvNOmih8LYMYvYZlxuEDdFC6XqQfUKuG/view?usp=drivesdk' },
        { title: 'Mid Sem-1 PYQs(2025-26)', url: 'https://drive.google.com/file/d/1MQQHzmoJ80d2V7x4geGk95ozuC-YAQO2/view?usp=drivesdk' },
        { title: 'Mid Sem-2 PYQs(2025-26)', url: 'https://drive.google.com/file/d/1uxM4C7DaILXYTRCtivU-lM5B6zZUpnDv/view?usp=drivesdk' },
        { title: 'End Sem PYQs(2025-26)', url: 'https://drive.google.com/file/d/1ie2sSJbkNT5voEhTqyjh3uqWb_zzzYzF/view?usp=drivesdk' },
      ]
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BSMS-3rd Semester');
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

  const syllabus = { title: 'BS-MS 3rd Sem Syllabus', url: 'https://drive.google.com/file/d/1TGYcCGUOMvtNQNzjx7M9t796xhvpdgCz/view?usp=drivesdk' };
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
            <p className="text-muted-foreground text-lg">All notes for {subject.name} - BS-MS 3rd Semester</p>
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">BS-MS 3rd Semester Notes 🔬</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">📚 BS-MS 3rd Semester Instruction: </h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <p><strong>✨ For BS-MS students:</strong> From 2nd year onwards, your curriculum diverges from B.Tech with specially curated resources for your syllabus.</p>

<p>• <strong>Engg. Maths-II:</strong> Curated notes, PYQs, playlists & complete study material available.</p>

<p>• <strong>Statistical Methods:</strong> Well-structured notes and guided resources for easy preparation.</p>

<p>• <strong>Data Structures & Algorithms:</strong> Coding-focused notes, playlists, and practice resources available.</p>

<p>• <strong>Probability & Random Processes:</strong> Concept-based notes with curated study playlists.</p>

<p>• <strong>Real Analysis:</strong> Fully curated notes and resources for strong conceptual understanding.</p>

<p>• <strong>Notes, playlists & PYQs will be updated progressively</strong> — contribute your notes to help fellow students!</p>

<p className='text-red-500'>⚠️ <strong>Important:</strong> Always maintain good presentation in exams — use 2 pens, underline important keywords, keep proper spacing after answers, and write sufficiently explained answers for better scoring. Cover every topic from the syllabus using playlists, notes, PYQs, YouTube, Google AI Mode, or any resource possible. Once every topic is understood properly, exams automatically become much easier.</p>

<p>✨ Best Wishes — <strong>Priyal Kumar</strong></p>
            </div>
            </div>
          </div> 
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-8">
          <Card className="gradient-card border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />BS-MS 3rd Sem Syllabus</CardTitle>
              <CardDescription>Official syllabus for BS-MS 3rd Semester</CardDescription>
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
                            {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8"
                                onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'detailed'); }}>
                                📚 Detailed Playlists ({getSubjectPlaylists(subject.id).detailed.length})
                              </Button>
                            )}
                            {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8"
                                onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'oneshot'); }}>
                                ⚡ One Shot Videos ({getSubjectPlaylists(subject.id).oneshot.length})
                              </Button>
                            )}
                            {getSubjectPlaylists(subject.id).detailed.length === 0 && getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                              <p className="text-xs text-muted-foreground pl-2">Not available...</p>
                            )}
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

export default BSMSSem3Notes;
