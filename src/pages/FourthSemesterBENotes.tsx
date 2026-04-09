
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
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FourthSemesterBENotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BE-4th Semester');
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
    math3: {
      detailed: [
        { title: 'Engineering Mathematics-III Complete', url: '#', recommended: true },
      ],
      oneshot: [
        { title: 'Engineering Mathematics-III One Shot', url: '#' }
      ]
    },
    bme: {
      detailed: [
        { title: 'Biomedical Equipment Complete', url: '#', recommended: true },
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
      id: 'math3',
      name: 'Engineering Mathematics-III',
      icon: '📐',
      color: 'bg-purple-500',
      notes: [
        { title: 'EM-III Complete Notes', url: '#' },
      ]
    },
    {
      id: 'bme',
      name: 'Biomedical Equipment',
      icon: '🏥',
      color: 'bg-red-500',
      notes: [
        { title: 'BME Complete Notes', url: '#' },
      ]
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
        <Button variant="outline" onClick={() => navigate('/btech-notes/second-year/semester-4')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Branches
        </Button>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">4th Semester BE Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Biomedical Engineering study materials</p>
        </motion.div>

        {!selectedSubject ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const playlists = getSubjectPlaylists(subject.id);
              const isExpanded = expandedSubjects.includes(subject.id);
              
              return (
                <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                  <Card className="feature-card h-full relative">

                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center text-2xl mb-4`}>
                        {subject.icon}
                      </div>
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      <CardDescription>{subject.notes.length} PDF Notes Available</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full btn-hero" onClick={() => setSelectedSubject(subject.id)}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Notes
                      </Button>
                      
                      {(playlists.detailed.length > 0 || playlists.oneshot.length > 0) && (
                        <div className="border-t pt-3">
                          <Button variant="ghost" className="w-full justify-between p-2 h-auto" onClick={() => toggleSubjectExpansion(subject.id)}>
                            <span className="flex items-center gap-2 text-sm font-medium">
                              <Play className="h-4 w-4" />
                              Study Playlists
                            </span>
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                          
                          {isExpanded && (
                            <div className="mt-2 space-y-2 pl-2">
                              {playlists.detailed.length > 0 && (
                                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handlePlaylistClick(subject.id, 'detailed')}>
                                  <Play className="h-3 w-3 mr-2" />
                                  Detailed Playlists ({playlists.detailed.length})
                                </Button>
                              )}
                              {playlists.oneshot.length > 0 && (
                                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handlePlaylistClick(subject.id, 'oneshot')}>
                                  <Play className="h-3 w-3 mr-2" />
                                  One Shot Videos ({playlists.oneshot.length})
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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

export default FourthSemesterBENotes;
