import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';

const SixthSemesterPLNotes = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'PL-6th Semester');

  const staticSubjects = [
    {
      id: 'ipc',
      name: 'Instrumentation & Process Control (IPC)',
      icon: '🎛️',
      color: 'bg-blue-500',
      notes: []
    },
    {
      id: 'sprp',
      name: 'Structure & Properties Relationship of Polymers (SPRP)',
      icon: '🔬',
      color: 'bg-purple-500',
      notes: []
    },
    {
      id: 'rt',
      name: 'Rubber Technology (RT)',
      icon: '⚙️',
      color: 'bg-indigo-500',
      notes: []
    },
    {
      id: 'pc',
      name: 'Polymer Composite (PC)',
      icon: '🧱',
      color: 'bg-teal-500',
      notes: []
    },
    {
      id: 'pclab',
      name: 'Polymer Characterization Lab (PC LAB)',
      icon: '🥼',
      color: 'bg-emerald-500',
      notes: []
    },
    {
      id: 'ips',
      name: 'Introduction to Polymer Science (IPS)',
      icon: '🧪',
      color: 'bg-orange-500',
      notes: []
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
      name: 'ALL MID & ESE PYQs',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

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
            <div className="text-center py-16 border border-dashed rounded-xl bg-card">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No notes yet</p>
              <p className="text-sm text-muted-foreground">Notes for this subject will be added soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.notes.map((note: any, index: number) => (
                <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                  <div className="group relative border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-lg h-full flex flex-col justify-between">
                    <div>
                      {note.isCommunity && (
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400 mb-2">Community</span>
                      )}
                      <p className="text-sm font-medium text-foreground leading-snug mt-1 mb-3">{note.title}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <button onClick={() => handleDownload(note.url, note.title)} className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity" disabled={note.url === '#'}>
                        <Download className="h-3.5 w-3.5" /> {note.url === '#' ? 'Coming Soon' : 'Download'}
                      </button>
                      <button onClick={() => viewInBrowser(note.url)} className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors" disabled={note.url === '#'} title="View in Browser">
                        <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                      </button>
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
            <ArrowLeft className="h-3.5 w-3.5" /> Back to 6th Semester
          </button>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-3">Plastic Technology Notes</p>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-3">
            6th Semester<br />
            <span className="opacity-60">Plastic Technology Notes</span>
          </h1>
          <p className="text-sm opacity-50 mb-8">B.Tech. Plastic Technology — 6th Semester resources</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            if (subject.isSpecial) {
              return (
                <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }}>
                  <div className="group border-2 border-primary/35 bg-gradient-to-br from-primary/5 to-purple-500/5 hover:border-primary rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col relative cursor-pointer" onClick={() => navigate('/sixth-semester-open-electives')}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded">Elective</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">{subject.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4 flex-1">Open electives portal for 6th semester.</p>
                    <button className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-primary/30 hover:bg-primary hover:text-white transition-all duration-200">
                      View Open Electives
                    </button>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }}>
                <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">{subject.notes.length} files</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">{subject.name}</h3>
                  </div>
                  <button onClick={() => setSelectedSubject(subject.id)} className="w-full text-xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-200 mt-4">
                    View Notes
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SixthSemesterPLNotes;

// Plastic Technology 6th Semester Note Section
