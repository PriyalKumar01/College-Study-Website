import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Play, ChevronDown, ChevronRight, Share2, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlaylistModal } from '@/components/PlaylistModal';
import { smartDownload } from '@/lib/downloadUtils';

const SixthSemesterETNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
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
    {
      id: 'pyqs',
      name: 'ALL MID & ESE PYQS',
      icon: '📚',
      color: 'bg-purple-500',
      playlists: {
        detailed: [],
        oneshot: []
      },
      notes: [
        { title: 'ALL MID & ESE PYQS (2023-2024)', url: 'https://drive.google.com/file/d/1UlzIKw3l6TYZof4_nOFV486qiUDTtkCF/view?usp=drivesdk' },
        { title: 'MID SEM-1 PYQS (2025-2026)', url: 'https://drive.google.com/file/d/16sx03wdvRWGxdcTFaNlawillD6g1bxdd/view?usp=drivesdk' },
      ]
    }
  ];

  const syllabus = {
    title: '6th Semester ET Syllabus',
    url: 'https://drive.google.com/file/d/1uMAxZktTub4htDZPrgom1mHYXU5Bg-Jc/view?usp=drivesdk'
  };

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ET-6th Semester');
  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({ id: cn.id, title: cn.title, url: cn.file_url, isCommunity: true, fileName: cn.file_name, uploadedBy: cn.uploaded_by, userName: cn.user_name })),
    ],
  }));

  const handleDeleteCommunityNote = async (id: string, fileName?: string) => {
    if (!user || !isOwner) return;
    if (!window.confirm('Delete this material?')) return;
    try {
      if (fileName) await supabase.storage.from('study-materials').remove([fileName]);
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Material removed successfully.' });
      refreshNotes();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            <button onClick={() => setSelectedSubject(null)} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-6">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Subjects
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{subject.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold">{subject.name}</h1>
            </div>
            <p className="opacity-60 text-sm">{subject.notes.length} file{subject.notes.length !== 1 ? 's' : ''} available · 6th Semester B.Tech</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1">
          {subject.notes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No notes yet</p>
              <p className="text-sm">Notes for this subject will be added soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.notes.map((note, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                  <div className="group relative flex flex-col h-full rounded-xl border border-border bg-card hover:border-foreground/30 transition-all duration-200 p-4 gap-3">
                    <div>
                      {(note as any).recommended && (
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-2">★ Recommended</span>
                      )}
                      {(note as any).isCommunity && (
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-2 ml-2">Community</span>
                      )}
                      <p className="text-sm font-medium text-foreground leading-snug mt-1 mb-3">{note.title}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-border mt-auto">
                      <button onClick={() => handleDownload(note.url, note.title)} className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity" disabled={(note as any).url === '#'}>
                        <Download className="h-3.5 w-3.5" /> {(note as any).url === '#' ? 'Coming Soon' : 'Download'}
                      </button>
                      <a href={note.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-border hover:bg-muted transition-colors ${note.url === '#' ? 'pointer-events-none opacity-50' : ''}`} title="Open in new tab">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {(note as any).isCommunity && isOwner && (
                        <button onClick={() => handleDeleteCommunityNote((note as any).id, (note as any).fileName)} className="inline-flex items-center justify-center py-2 px-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-xs">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/btech-notes/third-year/semester-6')} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-8">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Branches
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Harcourt Butler Technical University, Kanpur</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
            6th Semester<br />
            <span className="opacity-60">Electronics Engineering Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Electronics Engineering — Comprehensive study materials and resources</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">ET Department</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">{staticSubjects.filter(s => s.id !== 'pyqs' && s.id !== 'assignments').length} Subjects</span>
            <span className="text-xs font-semibold tracking-wider uppercase border border-background/30 px-3 py-1.5 rounded">6th Semester</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Syllabus Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="border border-border rounded-xl p-5 bg-card flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{syllabus.title}</p>
              <p className="text-xs text-muted-foreground">Official syllabus for 6th semester ET</p>
            </div>
          </div>
          <button onClick={() => handleDownload(syllabus.url, syllabus.title)} className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase py-2.5 px-5 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity">
            <Download className="h-3.5 w-3.5" /> Download Syllabus
          </button>
        </motion.div>

        {/* Subjects Grid */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">Study Resources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.4 }}>
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                          {subject.notes.length} files
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-700 p-1" onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name, subject.id); }} title="Share on WhatsApp">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">{subject.name}</h3>

                    {/* Playlist section */}
                    {subject.id !== 'pyqs' && subject.id !== 'assignments' && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <button className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors" onClick={() => toggleSubjectExpansion(subject.id)}>
                          <span className="flex items-center gap-1.5">
                            <Play className="h-3 w-3" /> Study Playlists
                          </span>
                          {expandedSubjects.includes(subject.id) ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                        {expandedSubjects.includes(subject.id) && (
                          <div className="mt-2 space-y-1">
                            {getSubjectPlaylists(subject.id).detailed.length > 0 && (
                              <button className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" onClick={() => handlePlaylistClick(subject.id, 'detailed')}>
                                📚 Detailed ({getSubjectPlaylists(subject.id).detailed.length})
                              </button>
                            )}
                            {getSubjectPlaylists(subject.id).oneshot.length > 0 && (
                              <button className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" onClick={() => handlePlaylistClick(subject.id, 'oneshot')}>
                                ⚡ One Shot ({getSubjectPlaylists(subject.id).oneshot.length})
                              </button>
                            )}
                            {getSubjectPlaylists(subject.id).detailed.length === 0 && getSubjectPlaylists(subject.id).oneshot.length === 0 && (
                              <p className="text-xs text-muted-foreground px-2 py-1">Not available yet</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button onClick={() => setSelectedSubject(subject.id)} className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200">
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

export default SixthSemesterETNotes;
