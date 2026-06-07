import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, ExternalLink, Share2, Trash2, BookOpen, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { smartDownload } from '@/lib/downloadUtils';

const SixthSemesterEENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleWhatsAppShare = (subjectName: string, subjectId: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectId)}`;
    const message = `Check out ${subjectName} notes for 6th Semester B.Tech on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const staticSubjects = [
    { id: 'powerelec', name: 'Power Electronics', icon: '⚡', color: 'bg-yellow-500', notes: [{ title: 'Power Electronics Notes', url: '#' }] },
    { id: 'controlsys', name: 'Control Systems', icon: '🎛️', color: 'bg-blue-500', notes: [{ title: 'Control Systems Notes', url: '#' }] },
    { id: 'electricmachine', name: 'Electrical Machines-II', icon: '🔌', color: 'bg-green-600', notes: [{ title: 'Electrical Machines-II Notes', url: '#' }] },
    { id: 'powersys', name: 'Power System Analysis', icon: '🏭', color: 'bg-red-500', notes: [{ title: 'Power System Analysis Notes', url: '#' }] },
    { id: 'dsp', name: 'Digital Signal Processing', icon: '📡', color: 'bg-purple-500', notes: [{ title: 'DSP Notes', url: '#' }] },
    { id: 'pyqs', name: 'ALL MID & ESE PYQs', icon: '📚', color: 'bg-purple-500', notes: [{ title: "Mid Sem-1 PYQ'S (2025-26)", url: '#' }, { title: "Mid Sem-2 PYQ'S (2024-25)", url: '#' }, { title: "End Sem PYQ'S (2024-25)", url: '#' }] },
    { id: 'assignments', name: 'Assignments - All Subjects', icon: '📝', color: 'bg-yellow-500', notes: [] },
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'EE-6th Semester');
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="bg-foreground dark:bg-card text-background dark:text-foreground py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <button onClick={() => setSelectedSubject(null)} className="flex items-center gap-2 text-sm mb-4 opacity-70 hover:opacity-100 transition-opacity">
              <ArrowLeft className="h-4 w-4" /> Back to Subjects
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{subject.icon}</span>
              <h1 className="text-2xl md:text-3xl font-bold">{subject.name}</h1>
            </div>
            <p className="opacity-70 text-sm">{subject.notes.length} file{subject.notes.length !== 1 ? 's' : ''} available · 6th Semester B.Tech</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {subject.notes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No notes yet</p>
              <p className="text-sm">Notes for this subject will be added soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.notes.map((note, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                  <div className="group relative flex flex-col h-full rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 p-4 gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5 rounded">PDF</span>
                      {(note as any).isCommunity && <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50">Community</span>}
                      {(note as any).recommended && <span className="text-[10px] font-bold tracking-wider uppercase bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-500 px-2 py-0.5 rounded border border-yellow-200 dark:border-yellow-900/50">⭐ Best</span>}
                    </div>
                    <p className="text-sm font-medium leading-snug flex-1">{note.title}</p>
                    <div className="flex gap-2 mt-1">
                      <Button onClick={() => handleDownload(note.url, note.title)} className="flex-1 h-8 text-xs" disabled={(note as any).url === '#'}>
                        <Download className="h-3.5 w-3.5 mr-1.5" />{(note as any).url === '#' ? 'Coming Soon' : 'Download'}
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => window.open(note.url, '_blank')} disabled={(note as any).url === '#'} title="Open in new tab">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      {(note as any).isCommunity && isOwner && (
                        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteCommunityNote((note as any).id, (note as any).fileName)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
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
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/btech-notes/third-year/semester-6')} className="flex items-center gap-2 text-sm mb-4 opacity-70 hover:opacity-100 transition-opacity">
            <ArrowLeft className="h-4 w-4" /> Back to Branches
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">6th Semester EE Notes ⚡</h1>
          <p className="opacity-70 text-sm">Electrical Engineering · 6th Semester B.Tech</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject, index) => (
            <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
              <div className="group flex flex-col h-full rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden" onClick={() => setSelectedSubject(subject.id)}>
                <div className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-md flex-shrink-0`}>{subject.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight truncate">{subject.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{subject.notes.length} file{subject.notes.length !== 1 ? 's' : ''}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-700 p-1" onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name, subject.id); }} title="Share on WhatsApp">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-5 pb-5 flex flex-col gap-3 flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs h-8 mt-auto" onClick={(e) => { e.stopPropagation(); setSelectedSubject(subject.id); }}>
                    <FileText className="h-3.5 w-3.5 mr-1.5" />View Notes
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SixthSemesterEENotes;
