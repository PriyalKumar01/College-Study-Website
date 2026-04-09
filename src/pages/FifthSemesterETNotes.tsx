
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
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FifthSemesterETNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ET-5th Semester');
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

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

  const subjectPlaylists: Record<string, { detailed: { title: string; url: string; recommended?: boolean }[]; oneshot: { title: string; url: string; recommended?: boolean }[] }> = {
    dc: {
      detailed: [
        { title: 'Digital Communication Complete', url: '#', recommended: true },
      ],
      oneshot: []
    },
    vlsi: {
      detailed: [
        { title: 'VLSI Design Complete', url: '#', recommended: true },
      ],
      oneshot: []
    }
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
      id: 'dc',
      name: 'Digital Communication',
      icon: '📡',
      color: 'bg-blue-500',
      notes: [
        { title: 'DC Complete Notes', url: '#' },
      ]
    },
    {
      id: 'vlsi',
      name: 'VLSI Design',
      icon: '🔲',
      color: 'bg-green-500',
      notes: [
        { title: 'VLSI Notes', url: '#' },
      ]
    },
    {
      id: 'openElective',
      name: 'Open Elective',
      icon: '📚',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      isSpecial: true,
      notes: []
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      playlists: { detailed: [], oneshot: [] },
      notes: []
    }
  ];

  const getSubjectDisplayName = (subjectId: string): string => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || subjectId;
  };

  const syllabus = {
    title: '5th Semester ET Syllabus',
    url: 'https://drive.google.com/file/d/1o4-y7gQRZplfmvYzlCZsT2dxZ8a_UtEV/view',
  };

  
  const subjects: any[] = staticSubjects.map((sub: any) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn: any) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn: any) => ({
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate('/btech-notes/third-year/semester-5')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Branches
        </Button>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">5th Semester ET Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Electronics Technology study materials</p>
        </motion.div>

        {!selectedSubject ? (
          <>
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
                    <p className="text-sm text-muted-foreground">Official syllabus for 5th semester ET</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(syllabus.url, '_blank')}
                  className="btn-hero"
                  disabled={syllabus.url === '#'}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {syllabus.url === '#' ? 'Coming Soon' : 'Download Syllabus'}
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => {
                const playlists = getSubjectPlaylists(subject.id);
                const isExpanded = expandedSubjects.includes(subject.id);

                if (subject.isSpecial) {
                  return (
                    <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                      <Card
                        className="feature-card h-full border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl"
                        onClick={() => navigate('/fifth-semester-cse-open-electives')}
                      >
                        <CardHeader>
                          {/* Modern 3D Icon */}
                          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-20" />
                            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 bg-opacity-10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center overflow-hidden">
                              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                              <span className="text-4xl drop-shadow-md">{subject.icon}</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl text-center">{subject.name}</CardTitle>
                          <CardDescription className="text-center">Choose your elective subject</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full btn-hero" onClick={(e) => { e.stopPropagation(); navigate('/fifth-semester-cse-open-electives'); }}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Open Electives
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
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

                        <CardTitle className="text-xl text-center">{subject.name}</CardTitle>
                        <CardDescription className="text-center">{subject.notes.length} PDF Notes Available</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-3">
                          {/* Study Playlists Section */}
                          {(playlists.detailed.length > 0 || playlists.oneshot.length > 0) && (
                            <div className="border-t pt-4">
                              <div
                                className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                                onClick={(e) => { e.stopPropagation(); toggleSubjectExpansion(subject.id); }}
                              >
                                <div className="flex items-center gap-2">
                                  <Play className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium">Study Playlists</span>
                                </div>
                                {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              </div>
                              {expandedSubjects.includes(subject.id) && (
                                <div className="mt-3 space-y-2 pl-2">
                                  {playlists.detailed.length > 0 && (
                                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'detailed'); }}>
                                      📚 Detailed Playlists ({playlists.detailed.length})
                                    </Button>
                                  )}
                                  {playlists.oneshot.length > 0 && (
                                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'oneshot'); }}>
                                      ⚡ One Shot Videos ({playlists.oneshot.length})
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2">
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
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Button variant="outline" onClick={() => setSelectedSubject(null)} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>

            <h2 className="text-2xl font-bold mb-6">{subjects.find(s => s.id === selectedSubject)?.name} - Notes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.find(s => s.id === selectedSubject)?.notes.map((note, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                  <Card className="feature-card relative">

                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm leading-tight mb-2">{note.title}</h3>
                          <Badge variant="secondary" className="text-xs">PDF</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-3" size="sm" onClick={() => window.open(note.url, '_blank')}>
                        <Download className="h-3 w-3 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        title={getSubjectDisplayName(selectedSubjectForPlaylist)}
        playlists={getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType]}
        type={selectedPlaylistType}
      />
    </div>
  );
};

export default FifthSemesterETNotes;
