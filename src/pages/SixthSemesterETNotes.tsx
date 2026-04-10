
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
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const SixthSemesterETNotes = () => {
    const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ET-6th Semester');
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

    const location = useLocation();
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [selectedPlaylistType, setSelectedPlaylistType] = useState<'detailed' | 'oneshot'>('detailed');
    const [selectedSubjectForPlaylist, setSelectedSubjectForPlaylist] = useState<string>('');
    const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

    const handleWhatsAppShare = (subjectName: string, subjectId: string) => {
        const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectId)}`;
        const message = `Check out ${subjectName} notes for 6th Semester ET on College Study Hub: ${shareUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    const toggleSubjectExpansion = (subjectId: string) => {
        setExpandedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
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

    const staticSubjects = [
        {
            id: 'mwe',
            name: 'Microwave Engineering',
            icon: '📡',
            color: 'bg-blue-500',
            playlists: {
                detailed: [],
                oneshot: []
            },
            notes: [{ title: 'MWE Notes', url: '#' }]
        },
        {
            id: 'dsp',
            name: 'Digital Signal Processing',
            icon: '📊',
            color: 'bg-green-500',
            playlists: {
                detailed: [],
                oneshot: []
            },
            notes: [{ title: 'DSP Notes', url: '#' }]
        },
        {
            id: 'cn',
            name: 'Computer Networks',
            icon: '🌐',
            color: 'bg-purple-500',
            playlists: {
                detailed: [],
                oneshot: []
            },
            notes: [{ title: 'CN Notes', url: '#' }]
        },
        ,
        {
            id: 'entrepreneurship',
            name: 'Entrepreneurship Notes',
            icon: '📘',
            color: 'bg-green-500',
            playlists: {
                detailed: [{ title: 'Entrepreneurship Playlist', url: '#' }],
                oneshot: []
            },
            notes: [{ title: 'Entrepreneurship Notes (UPTO MID SEM-1)', url: 'https://drive.google.com/file/d/1m6DIjYxnAQhHJ2j7ER4J2-vVRhIfrsY7/view?usp=drivesdk' }]
        },
        ,
        {
            id: 'pyqs',
            name: 'ALL MID & ESE PYQS',
            icon: '🌐',
            color: 'bg-purple-500',
            playlists: {
                detailed: [],
                oneshot: []
            },
            notes: [
                { title: 'ALL MID & ESE PYQS (2023-2024)', url: 'https://drive.google.com/file/d/1UlzIKw3l6TYZof4_nOFV486qiUDTtkCF/view?usp=drivesdk' },
                { title: 'MID SEM-1 PYQS (2025-2026)', url: 'https://drive.google.com/file/d/16sx03wdvRWGxdcTFaNlawillD6g1bxdd/view?usp=drivesdk' },
            ]
        },
    ];

    const syllabus = {
        title: '6th Semester ET Syllabus',
        url: 'https://drive.google.com/file/d/1uMAxZktTub4htDZPrgom1mHYXU5Bg-Jc/view?usp=drivesdk'
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
            <div className="min-h-screen bg-gradient-hero">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <Button onClick={() => setSelectedSubject(null)} variant="outline" className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subjects
                        </Button>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{subject.name} 📚</h1>
                        <p className="text-muted-foreground text-lg">All notes for {subject.name} - 6th Semester ET</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subject.notes.map((note, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
                                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">

                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white text-lg`}>
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <Badge variant="secondary">PDF</Badge>
                                        </div>
                                        <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                                        <CardDescription>{subject.name} study material</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button onClick={() => handleDownload(note.url, note.title)} className="w-full btn-hero" disabled={note.url === '#'}>
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                    <Button onClick={() => navigate('/btech-notes/third-year/semester-6')} variant="outline" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Branches
                    </Button>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">6th Semester ET Notes 📖</h1>
                    <p className="text-muted-foreground text-lg">Electronics Technology notes and resources</p>
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
                                <p className="text-sm text-muted-foreground">Official syllabus for 6th semester ET</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject, index) => (
                        <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (index + 1) * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
                            <Card
                                className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl"
                                onClick={() => setSelectedSubject(subject.id)}
                            >
                                <CardHeader>
                                    <div className="flex justify-end mb-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-green-600 hover:bg-green-50 h-8 w-8 -mt-2 -mr-2"
                                            onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name, subject.id); }}
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Modern 3D Icon */}
                                    <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <div className={`absolute inset-0 rounded-2xl ${subject.color} blur-xl opacity-20`} />
                                        <div className={`relative w-full h-full rounded-2xl ${subject.color} bg-opacity-10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center overflow-hidden`}>
                                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                                            <span className="text-4xl drop-shadow-md">{subject.icon}</span>
                                        </div>
                                    </div>

                                    <CardTitle className="text-lg text-center mb-2">{subject.name}</CardTitle>
                                    <CardDescription className="text-center">
                                        {subject.notes.length} notes available
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-3">
                                        {/* Study Playlists Section */}
                                        {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
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
                                                        {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                                                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'detailed'); }}>
                                                                📚 Detailed Playlists ({getSubjectPlaylists(subject.id).detailed.length})
                                                            </Button>
                                                        )}
                                                        {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                                                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={(e) => { e.stopPropagation(); handlePlaylistClick(subject.id, 'oneshot'); }}>
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
                    ))}
                </div>

                <PlaylistModal
                    isOpen={showPlaylistModal}
                    onClose={() => setShowPlaylistModal(false)}
                    title={subjects.find(s => s.id === selectedSubjectForPlaylist)?.name || ''}
                    playlists={selectedSubjectForPlaylist ? getSubjectPlaylists(selectedSubjectForPlaylist)[selectedPlaylistType] : []}
                    type={selectedPlaylistType}
                />
            </div>
        </div>
    );
};

export default SixthSemesterETNotes;
