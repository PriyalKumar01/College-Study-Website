
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
import { smartDownload } from '@/lib/downloadUtils';

const ThirdSemesterCHENotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CHE-3rd Semester');
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



  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  const staticSubjects = [
    {
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
    {
      id: 'cet',
      name: 'Chemical Engineering Thermodynamics',
      icon: '🔥',
      color: 'bg-red-500',
      notes: [
        { title: 'Full CET Notes (Part-1)', url: 'https://drive.google.com/file/d/1zlfT4jBJLD4CRU_6ZBuxoFV9_K0uXetU/view?usp=drivesdk' },
        { title: 'CET Full Notes (Part-2)', url: 'https://drive.google.com/file/d/1p7fsSI1WveZivltVvUwKI_zxyhB7m0Di/view?usp=drivesdk' }
      ]
    },
    {
      id: 'cefm',
      name: 'Chemical Engineering Fluid Mechanics',
      icon: '💧',
      color: 'bg-blue-500',
      notes: [
        { title: 'Unit-1, 2, 3 (Part-1)', url: 'https://drive.google.com/file/d/1vH4H28t4RaXCv2ILjI3FUQviiTGDMdvm/view?usp=drivesdk' },
        { title: 'CEFM Notes (Part-2)', url: 'https://drive.google.com/file/d/14Aw4AqVi0-8WsA2cByZPiMNaE77E_bXj/view?usp=drivesdk' },
        { title: 'CEFM Notes (Part-3)', url: 'https://drive.google.com/file/d/1m_SuOF2lhHkFpDeUBwfBxZpAecgvT3lr/view?usp=drivesdk' },
        { title: 'CEFM Theoretical Notes', url: 'https://drive.google.com/file/d/1hje_3zG0kzp9vTmUDbXY6M_ylvlA3Qft/view?usp=drivesdk' }
      ]
    },
    {
      id: 'cpc',
      name: 'Chemical Process Calculations',
      icon: '📊',
      color: 'bg-purple-500',
      notes: [
        { title: 'Notes Upto Mid 1', url: 'https://drive.google.com/file/d/1jl0wG-AjZRdO0CmnFvWKBCTLgUq31Uuo/view?usp=drivesdk' },
        { title: 'CPC Book by K.V. Narayanan, B. Lakshmikutty', url: 'https://drive.google.com/file/d/1GQDZzGmu_JnHlmOtyHQ11c8LRuSygqVN/view?usp=drivesdk' }
      ]
    },
    {
      id: 'iem',
      name: 'Industrial Economics & Management',
      icon: '💼',
      color: 'bg-green-500',
      notes: [
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link' },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link' },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link' },
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link' },
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link' },
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link' }
      ]
    },
    {
      id: 'pfpp',
      name: 'Principles of Food Processing & Preservation',
      icon: '🍽️',
      color: 'bg-orange-500',
      notes: [
        { title: 'Unit-1 (Part-1)', url: 'https://drive.google.com/file/d/1oCtO7Cpb_qFMZUT_04g1mAvN2a0follZ/view?usp=drivesdk' },
        { title: 'Unit-1 (Part-2)', url: 'https://drive.google.com/file/d/184-BKZyYehJFsqA4hn1nNHgYsVggfR9K/view?usp=drivesdk' },
        { title: 'Unit-1 (Part-3)', url: 'https://drive.google.com/file/d/12obsM0HJdgMEuOX4rm3wDKQdnBqnikFd/view?usp=drivesdk' },
        { title: 'Unit-1 (Part-4)', url: 'https://drive.google.com/file/d/1bzW69P-hdYpu1fuFgJAG1Ljs7xgwsJA-/view?usp=drivesdk' },
        { title: 'Unit-1 (Part-5)', url: 'https://drive.google.com/file/d/1wNMyIADDGr71BEu3gp7JNNMxCVxjGomk/view?usp=drivesdk' },
        { title: 'Unit-2 (Part-1)', url: 'https://drive.google.com/file/d/1Ty5ocnQ-YxohQyLusRzhz3YF69SSvggz/view?usp=drivesdk' },
        { title: 'Unit-2 (Part-2)', url: 'https://drive.google.com/file/d/1KBpJNdy9XUQa_9Gg0mIkHpfD6CHKAW8Y/view?usp=drivesdk' },
        { title: 'Book: Unit Operations of Chemical Engineering', url: 'https://drive.google.com/file/d/1F2mZjPRCxjhYbPqsaowy8C0cbj9Z6arX/view?usp=drivesdk' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-yellow-500',
      notes: [
        { title: 'MID SEM 1 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1ZUAmoXNvJdPH1g5qQzfigYnZ0U3n68hA/view?usp=drivesdk' },
        { title: 'MID SEM 2 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1qDjipZjIOgNg3DLbrH4fNbi_61_cIu3V/view?usp=drivesdk' },
        { title: 'ESE PYQs (2023-24)', url: 'https://drive.google.com/file/d/1jSFf1vbJbHeFHCIHzJe4XPy-oAlIG9pk/view?usp=drivesdk' }
      ]
    }
  ];

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
          userName: cn.user_name
        }))
    ]
  }));

  const syllabus = {
    title: 'CHE Branch Syllabus',
    url: 'https://drive.google.com/file/d/1_tGpmMXBKNe2yUMtVXToWA4VAM-Jj2pk/view?usp=drivesdk'
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
              All notes for {subject.name} - 3rd Semester CHE Branch
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
            3rd Semester CHE Branch Notes 📖
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a subject to access comprehensive study materials for Chemical Engineering
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
                Complete syllabus for 3rd Semester CHE Branch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleDownload(syllabus.url, syllabus.title)}
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

export default ThirdSemesterCHENotes;
