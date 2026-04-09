import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Share2, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const SixthSemesterMENotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = useAuth();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleWhatsAppShare = (subjectName: string, subjectId: string) => {
    const shareUrl = `${window.location.origin}${location.pathname}?subject=${encodeURIComponent(subjectId)}`;
    const message = `Check out ${subjectName} notes for 6th Semester ME on College Study Hub: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const staticSubjects = [
    {
      id: 'hmt',
      name: 'Heat & Mass Transfer',
      icon: '🔥',
      color: 'bg-red-500',
      notes: [{ title: 'HMT Complete Notes', url: '#' }],
    },
    {
      id: 'te',
      name: 'Turbo Machinery',
      icon: '⚙️',
      color: 'bg-orange-500',
      notes: [{ title: 'Turbo Machinery Notes', url: '#' }],
    },
    {
      id: 'mae',
      name: 'Machine Design',
      icon: '🔩',
      color: 'bg-blue-500',
      notes: [{ title: 'Machine Design Notes', url: '#' }],
    },
    {
      id: 'cim',
      name: 'Computer Integrated Manufacturing',
      icon: '🏭',
      color: 'bg-green-500',
      notes: [{ title: 'CIM Notes', url: '#' }],
    },
    {
      id: 'entrepreneurship',
      name: 'Entrepreneurship',
      icon: '💡',
      color: 'bg-yellow-500',
      notes: [{ title: 'Entrepreneurship Notes', url: '#' }],
    },
    {
      id: 'pyqs',
      name: 'ALL MID & ESE PYQs',
      icon: '📚',
      color: 'bg-purple-500',
      notes: [
        { title: "Mid Sem-1 PYQ'S (2025-26)", url: '#' },
        { title: "Mid Sem-2 PYQ'S (2024-25)", url: '#' },
        { title: "End Sem PYQ'S (2024-25)", url: '#' },
      ],
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [],
    },
  ];

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ME-6th Semester');
  const subjects = staticSubjects.map((sub) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn) => cn.subject === sub.name || cn.subject === sub.id)
        .map((cn) => ({
          id: cn.id,
          title: cn.title,
          url: cn.file_url,
          isCommunity: true,
          fileName: cn.file_name,
          uploadedBy: cn.uploaded_by,
          userName: cn.user_name,
        })),
    ],
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

  const handleDownload = (url: string) => {
    if (url === '#') return;
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      window.open(`https://drive.google.com/uc?export=download&id=${fileId}`, '_blank');
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Button onClick={() => setSelectedSubject(null)} variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subjects
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{subject.name} 📚</h1>
            <p className="text-muted-foreground text-lg">All notes for {subject.name} - 6th Semester ME</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center text-white`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription>{subject.name} study material</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button onClick={() => handleDownload(note.url)} className="flex-1 btn-hero" disabled={note.url === '#'}>
                        <Download className="h-4 w-4 mr-2" /> {note.url === '#' ? 'Coming Soon' : 'Download'}
                      </Button>
                      {(note as any).isCommunity && isOwner && (
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteCommunityNote((note as any).id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
          <Button onClick={() => navigate('/btech-notes/third-year/semester-6')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Branches
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">6th Semester ME Notes 🔧</h1>
          <p className="text-muted-foreground text-lg"><strong>Mechanical Engineering</strong> — 6th Semester</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (index + 1) * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}>
              <Card className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl" onClick={() => setSelectedSubject(subject.id)}>
                <CardHeader>
                  <div className="flex justify-end mb-2">
                    <Button variant="ghost" size="icon" className="text-green-600 hover:bg-green-50 h-8 w-8 -mt-2 -mr-2" onClick={(e) => { e.stopPropagation(); handleWhatsAppShare(subject.name, subject.id); }}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-2xl ${subject.color} blur-xl opacity-20`} />
                    <div className={`relative w-full h-full rounded-2xl ${subject.color} bg-opacity-10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center overflow-hidden`}>
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                      <span className="text-4xl drop-shadow-md">{subject.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-center mb-2">{subject.name}</CardTitle>
                  <CardDescription className="text-center">{subject.notes.length} notes available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">{subject.notes.length} Files</Badge>
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedSubject(subject.id); }}>View Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SixthSemesterMENotes;
