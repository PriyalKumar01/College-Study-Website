import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, BookOpen, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FifthSemesterPTNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot') => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject?.playlists?.[type]?.length > 0) {
      setSelectedSubjectForPlaylist(subjectId);
      setSelectedPlaylistType(type);
      setShowPlaylistModal(true);
    }
  };

  const getSubjectPlaylists = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.playlists || { detailed: [], oneshot: [] };
  };

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 5th Semester PT on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const subjects = [
    {
      id: 'polymer',
      name: 'Advanced Polymer Science',
      icon: '🧪',
      color: 'bg-purple-500',
      playlists: { detailed: [], oneshot: [] },
      notes: [{ title: 'Polymer Science Notes', url: '#' }]
    },
    {
      id: 'xyz',
      name: 'Subject XYZ',
      icon: '📘',
      color: 'bg-blue-500',
      playlists: { detailed: [], oneshot: [] },
      notes: [{ title: 'XYZ Notes', url: '#' }]
    },
    {
      id: 'openElective',
      name: 'Open Elective',
      icon: '📚',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      isSpecial: true,
      notes: []
    }
  ];

  const handleDownload = (url: string) => {
    if (url === '#') return;
    window.open(url, '_blank');
  };

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button onClick={() => setSelectedSubject(null)} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subjects
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-6">{subject.name} 📚</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className="feature-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => handleDownload(note.url)} className="w-full btn-hero" disabled={note.url === '#'}>
                      <Download className="h-4 w-4 mr-2" /> {note.url === '#' ? 'Coming Soon' : 'Download PDF'}
                    </Button>
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
        <Button variant="outline" onClick={() => navigate('/btech-notes/third-year/semester-5')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Branches
        </Button>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">5th Semester PT Notes</h1>
          <p className="text-lg text-muted-foreground">Plastic Technology study materials</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const playlists = getSubjectPlaylists(subject.id);
            const isExpanded = expandedSubjects.includes(subject.id);
            
            if (subject.isSpecial) {
              return (
                <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card className="feature-card h-full border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center text-2xl mb-4 text-white`}>
                        {subject.icon}
                      </div>
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      <CardDescription>Choose your elective subject</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full btn-hero" onClick={() => navigate('/fifth-semester-cse-open-electives')}>
                        <BookOpen className="h-4 w-4 mr-2" /> View Open Electives
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }
            
            return (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className="feature-card h-full relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name); }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center text-2xl mb-4`}>
                      {subject.icon}
                    </div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <CardDescription>{subject.notes.length} PDF Notes Available</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full btn-hero" onClick={() => setSelectedSubject(subject.id)}>
                      <FileText className="h-4 w-4 mr-2" /> View Notes
                    </Button>
                    {(playlists.detailed.length > 0 || playlists.oneshot.length > 0) && (
                      <div className="border-t pt-3">
                        <Button variant="ghost" className="w-full justify-between p-2 h-auto" onClick={() => toggleSubjectExpansion(subject.id)}>
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <Play className="h-4 w-4" /> Study Playlists
                          </span>
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                        {isExpanded && (
                          <div className="mt-2 space-y-2 pl-2">
                            {playlists.detailed.length > 0 && (
                              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handlePlaylistClick(subject.id, 'detailed')}>
                                <Play className="h-3 w-3 mr-2" /> Detailed ({playlists.detailed.length})
                              </Button>
                            )}
                            {playlists.oneshot.length > 0 && (
                              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handlePlaylistClick(subject.id, 'oneshot')}>
                                <Play className="h-3 w-3 mr-2" /> One Shot ({playlists.oneshot.length})
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
      </div>
      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
        playlists={getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType]}
        type={selectedPlaylistType}
      />
    </div>
  );
};

export default FifthSemesterPTNotes;
