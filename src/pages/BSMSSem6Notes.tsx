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

const BSMSSem6Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for BS-MS 6th Semester on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot' | 'workshop'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const subjectPlaylists: Record<string, { detailed: any[]; oneshot: any[] }> = {
    ma: { detailed: [], oneshot: [] },
    foc: { detailed: [], oneshot: [] },
    fa: { detailed: [], oneshot: [] },
    Pelective: { detailed: [], oneshot: [] },
    Oelective: { detailed: [], oneshot: [] },
    bda: { detailed: [], oneshot: [] },
    dl: { detailed: [], oneshot: [] },

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
      id: 'dl',
      name: 'Deep Learning',
      icon: '🌌',
      color: 'bg-violet-500',
      notes: []
    },
    {
      id: 'foc',
      name: 'Fundamental of Computing',
      icon: '📚',
      color: 'bg-teal-500',
      notes: []
    },
    {
      id: 'fa',
      name: 'Functional Analysis',
      icon: '☢️',
      color: 'bg-red-600',
      notes: []
    },
    {
      id: 'bda',
      name: 'Big Data Analytics',
      icon: '🔭',
      color: 'bg-cyan-500',
      notes: []
    },
    {
      id: 'Oelective',
      name: 'Program Elective (POC)',
      icon: '📚',
      color: 'bg-teal-500',
      notes: []
    },
    {
      id: 'Pelective',
      name: 'Open Elective (OEC)',
      icon: '📚',
      color: 'bg-teal-500',
      notes: []
    },
    {
      id: 'ma',
      name: 'Multivariate Analysis',
      icon: '📝',
      color: 'bg-orange-500',
      notes: []
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BSMS-6th Semester');
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

  const syllabus = { title: 'BS-MS 6th Sem Syllabus', url: '#' };
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
            <p className="text-muted-foreground text-lg">All notes for {subject.name} - BS-MS 6th Semester</p>
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
          <Button onClick={() => navigate('/bsms-notes/third-year')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to 3rd Year
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">BS-MS 6th Semester Notes 🌌</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg border-2 border-violet-200 dark:border-violet-800">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-violet-800 dark:text-violet-200 mb-2">📚 BS-MS 6th Semester Info</h3>
              <div className="space-y-2 text-sm text-violet-700 dark:text-violet-300">
                <p><strong>✨ For BS-MS students:</strong> 6th Semester introduces specialization topics and research electives.</p>
                <p>• <strong>Condensed Matter Physics:</strong> Crystal structure, band theory, semiconductors, and superconductivity.</p>
                <p>• <strong>Nuclear & Particle Physics:</strong> Nuclear models, radioactivity, particle accelerators, and the Standard Model.</p>
                <p>• <strong>Optics & Photonics:</strong> Wave optics, laser physics, fiber optics, and optical instruments.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-8">
          <Card className="gradient-card border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />BS-MS 6th Sem Syllabus</CardTitle>
              <CardDescription>Official syllabus for BS-MS 6th Semester</CardDescription>
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

export default BSMSSem6Notes;
