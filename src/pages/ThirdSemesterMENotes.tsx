
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
import { Download, ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ThirdSemesterMENotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes } = useCommunityNotes('btech', 'ME-3rd Semester');
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDeleteCommunityNote = async (id: string, fileName: string) => {
    if (!user || user.email !== 'priyalkumar06@gmail.com') return;
    try {
      if (fileName) {
        const { error: storageError } = await supabase.storage.from('study-materials').remove([fileName]);
        if (storageError) console.error('Storage deletion error:', storageError);
      }
      const { error: dbError } = await supabase.from('notes').delete().eq('id', id);
      if (dbError) throw dbError;
      toast({ title: "Deleted securely", description: "Material removed successfully." });
      window.location.reload();
    } catch (error: any) {
      toast({ title: "Deletion failed", description: error.message, variant: 'destructive' });
    }
  };

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleDownload = (url: string, title: string) => {
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  const staticSubjects = [
    {
      id: 'thermodynamics',
      name: 'Thermodynamics',
      icon: '🔥',
      color: 'bg-red-500',
      notes: [
        { title: 'Thermodynamics Complete Notes', url: '#' },
      ],
    },
    {
      id: 'material-science',
      name: 'Material Science',
      icon: '🧪',
      color: 'bg-blue-500',
      notes: [
        { title: 'Material Science Notes', url: '#' },
      ],
    },
    {
      id: 'strength-of-materials',
      name: 'Strength of Materials',
      icon: '💪',
      color: 'bg-green-500',
      notes: [
        { title: 'SOM Complete Notes', url: '#' },
      ],
    },
    {
      id: 'manufacturing-process',
      name: 'Manufacturing Process',
      icon: '🏭',
      color: 'bg-orange-500',
      notes: [
        { title: 'Manufacturing Process Notes', url: '#' },
      ],
    },
    {
      id: 'math-2',
      name: 'Math-II',
      icon: '📐',
      color: 'bg-purple-500',
      notes: [
        { title: 'Engineering Mathematics-II Notes', url: '#' },
      ],
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  const subjects: any[] = staticSubjects.map((sub: any) => ({ ...sub, notes: [ ...sub.notes, ...(communityNotes || []).filter((cn: any) => cn.subject === sub.name || cn.subject === sub.id).map((cn: any) => ({ id: cn.id, title: cn.title, url: cn.file_url, isCommunity: true, fileName: cn.file_name })) ] }));

  const syllabusLink = {
    title: 'ME Branch Syllabus',
    url: 'https://drive.google.com/file/d/14vei1z0YQmFEVZFZzel2UEhjO3nRE9oy/view?usp=drivesdk'
  };

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
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
              All notes for {subject.name} - 3rd Semester ME Branch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="feature-card h-full relative">
                  {note.isCommunity && user?.email === 'priyalkumar06@gmail.com' && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-10 h-8 w-8 z-10"
                      onClick={(e) => { e.stopPropagation(); handleDeleteCommunityNote(note.id, note.fileName); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

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
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/btech-notes/second-year/semester-3')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            3rd Semester ME Branch Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a subject to access comprehensive study materials for Mechanical Engineering
          </p>
        </motion.div>

        {/* Syllabus Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Official Syllabus
              </CardTitle>
              <CardDescription>
                Complete syllabus for 3rd Semester ME Branch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleDownload(syllabusLink.url, syllabusLink.title)}
                className="btn-hero"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Syllabus
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className="feature-card h-full cursor-pointer"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 ${subject.color} rounded-xl flex items-center justify-center text-white text-3xl mb-4`}>
                    {subject.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{subject.name}</CardTitle>
                  <CardDescription>
                    {subject.notes.length} files available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-hero">
                    View Notes
                  </Button>
                  <div className="mt-3 text-center">
                    <Badge variant="outline" className="text-xs">
                      Playlist: Coming Soon
                    </Badge>
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

export default ThirdSemesterMENotes;
