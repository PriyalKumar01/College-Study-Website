import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Play, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';

const FourthSemesterCHENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
  const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');

  const handleWhatsAppShare = (subjectName: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectName)}`;
    const message = `Check out ${subjectName} notes for 4th Semester CHE on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
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

  const subjects = [
    {
      id: 'che-subject-1',
      name: 'Subject 1',
      fullName: 'Chemical Engineering Subject 1',
      icon: '🧪',
      color: 'bg-green-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'che-subject-2',
      name: 'Subject 2',
      fullName: 'Chemical Engineering Subject 2',
      icon: '⚗️',
      color: 'bg-blue-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'che-subject-3',
      name: 'Subject 3',
      fullName: 'Chemical Engineering Subject 3',
      icon: '🔬',
      color: 'bg-purple-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'che-subject-4',
      name: 'Subject 4',
      fullName: 'Chemical Engineering Subject 4',
      icon: '📊',
      color: 'bg-orange-500',
      playlists: {
        detailed: [{ title: 'Playlist Coming Soon', url: '#' }],
        oneshot: []
      },
      notes: [
        { title: 'Notes Coming Soon', url: '#' },
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 4th Semester CHE',
      icon: '❓',
      color: 'bg-red-600',
      playlists: {
        detailed: [],
        oneshot: []
      },
      notes: [
        { title: 'PYQs Coming Soon', url: '#' },
      ]
    },
  ];

  const syllabus = {
    title: '4th Semester CHE Syllabus',
    url: '#'
  };

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
              {subject.fullName} - 4th Semester CHE
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
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
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
                    <Button
                      onClick={() => handleDownload(note.url, note.title)}
                      className="w-full btn-hero"
                      disabled={note.url === '#'}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {note.url === '#' ? 'Coming Soon' : 'Download PDF'}
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
            4th Semester CHE Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Chemical Engineering - Comprehensive study materials
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
                <p className="text-sm text-muted-foreground">Official syllabus for 4th semester CHE</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name); }}
                    title="Share on WhatsApp"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
                      {subject.icon}
                    </div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {subject.notes.length} notes available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {subject.notes.length} Files
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubject(subject.id)}
                        className="flex-1"
                      >
                        View Notes
                      </Button>
                    </div>
                    
                    {hasDetailedPlaylist && (
                      <div className="pt-2 border-t">
                        <button
                          onClick={() => handlePlaylistClick(subject.id, 'detailed')}
                          className="w-full flex items-center justify-between p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            Study Playlists
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
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
        playlists={getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] || []}
        type={selectedPlaylistType}
        title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
      />
    </div>
  );
};

export default FourthSemesterCHENotes;
