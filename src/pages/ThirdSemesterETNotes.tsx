
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

const ThirdSemesterETNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'ET-3rd Semester');
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

  const staticSubjects = [
    {
      id: 'eca',
      name: 'ECA',
      fullName: 'Electronic Circuit Analysis',
      description: 'Analysis and design of electronic circuits',
      notes: [
        { title: 'ECA Book', url: 'https://drive.google.com/uc?export=download&id=1ei7KX3yS6TCUcC2Lkya5zVVLYD99ZvF5' },
      ],
    },
    {
      id: 'de',
      name: 'DE',
      fullName: 'Digital Electronics',
      description: 'Digital circuits and logic design',
      notes: [
        { title: 'Digital Circuit Book PDF', url: 'https://drive.google.com/uc?export=download&id=1M7-WFp832omjfPALcua0haNhY8-SBgv6' },
        { title: 'Digital Design Book', url: 'https://drive.google.com/uc?export=download&id=1ws89s_RjCm6ze8z2K1jknxTkZtgZTCgF' },
        { title: 'Digital Electronics Quantum PDF (Best)', url: 'https://drive.google.com/uc?export=download&id=1ksW_xMibmzUZRFScn3NenGzYYc2yxNS0' },
        { title: 'Semiconductor Material PDF', url: 'https://drive.google.com/uc?export=download&id=1P1X9JiJzdGg7FbEL3arfw4uTVISMcvbs' },
        { title: 'MOS Logic Family', url: 'https://drive.google.com/uc?export=download&id=1Yy9cysGTwmRHwfZAsdRY6YI3sRIYwAlR' },
        { title: 'Transistor Logic Circuit', url: 'https://drive.google.com/uc?export=download&id=1DqjPJwWjDvJ3ZBVFCQ3m6Nkg5I0XQp4l' },
        { title: 'Modeling Styles in VHDL', url: 'https://drive.google.com/uc?export=download&id=18xcUAe-dJjmnYlbZ7JHbEcLYDAW4vw2S' },
        { title: 'Binary Multiplier', url: 'https://drive.google.com/uc?export=download&id=1yApmfaL6yZybANtzaGWqMO2S1qp4DPNF' },
        { title: 'Code Converter PDF', url: 'https://drive.google.com/uc?export=download&id=1D5fIC8AfZVwvh-Gd9N2-vqNeGV2fry51' },
        { title: '2 Bit Magnitude Comparator', url: 'https://drive.google.com/uc?export=download&id=1P4Yu75WoAst1fhF9trgee_uqu-yel5Ik' },
        { title: 'Implementation of MUX', url: 'https://drive.google.com/uc?export=download&id=1uyYZllDc2HKuu-Q98s8kj5_Ly_aq4shU' },
        { title: 'Minimize Output Logical Expression (Assignment)', url: 'https://drive.google.com/uc?export=download&id=1FKVUTDtpTANotGo8gQQ4ul8uqv6oY0tI' },
      ],
    },
    {
      id: 'emmi',
      name: 'EMMI',
      fullName: 'Electrical Machines & Measurements Instrumentation',
      description: 'Electrical machines and measurement techniques',
      notes: [
        { title: 'Unit-1 Notes', url: 'https://drive.google.com/uc?export=download&id=122gY7moNtAZyisChZzdgtvkGI0dEHIux' },
        { title: 'Unit-3 Notes', url: 'https://drive.google.com/uc?export=download&id=1wLj4vhrI_P-AY3yHWcjDo2bKbRXPY9jY' },
        { title: 'Unit-4 & 5 Notes', url: 'https://drive.google.com/uc?export=download&id=1-L15l3RWjJfZYbIymeVjnwxSYevcDgGh' },
      ],
    },
    {
      id: 'hdl',
      name: 'HDL',
      fullName: 'Hardware Description Language',
      description: 'VHDL and hardware design languages',
      notes: [
        { title: 'HDL Book', url: 'https://drive.google.com/uc?export=download&id=1Do7Toyz5Wkjr-4RtbfrLPv4jd3rBhiqK' },
        { title: 'Complete HDL Notes', url: 'https://drive.google.com/uc?export=download&id=1CuFCLwYW92Bc9OJk2nnrLx8SVAxEtdo5' },
        { title: 'HDL Lab File', url: 'https://drive.google.com/uc?export=download&id=18eWiTlXAUAS-OP9JhDM8s0n-cRwO573H' },
        { title: 'VHDL Notes PDF', url: 'https://drive.google.com/uc?export=download&id=1Bpa98ASoIatwH53to9pPsR8Dtfwjthdh' },
      ],
    },
    {
      id: 'ssd',
      name: 'SSD',
      fullName: 'Solid State Devices',
      description: 'Semiconductor devices and circuits',
      notes: [
        { title: 'Microelectronic Circuit Book', url: 'https://drive.google.com/uc?export=download&id=1h-Xz0wo9m_tmzIUHI4a2GK1Wms5ICEqH' },
        { title: 'SSD Unit-5 Notes', url: 'https://drive.google.com/uc?export=download&id=1Xkf5f7V7SMXGYsvu6x9HTFAcpiNBOFy_' },
      ],
    },
    {
      id: 'math2',
      name: 'Math-II',
      fullName: 'Engineering Mathematics-II',
      description: 'Advanced engineering mathematics concepts',
      notes: [
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/uc?export=download&id=1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/uc?export=download&id=1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/uc?export=download&id=1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/uc?export=download&id=1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/uc?export=download&id=1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/uc?export=download&id=1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX' },
      ],
    },
  ];

  const pyqs = [
    { title: 'ALL ESE PYQs (2020-21)', url: 'https://drive.google.com/file/d/1qSh1KfrtnANPXPTi6TNkDLX2zHiOvQeZ/view?usp=drivesdk' },
    { title: 'ALL ESE PYQs (2021-22)', url: 'https://drive.google.com/file/d/1-sLPRx8hnjPoOYH3haBKAMa2wvyu6_6A/view?usp=drivesdk' },
    { title: 'ALL MID SEM PYQs (2022-23)', url: 'https://drive.google.com/file/d/1XNa-KjmgWanTLXFfoFL1GQhVy2MAk4Ij/view?usp=drivesdk' },
    { title: 'MID SEM-1 PYQS (2023-24)', url: 'https://drive.google.com/file/d/1LIH6GhcEHUG2h208On8xw8RSJCkU2-7d/view?usp=drivesdk' },
    { title: 'ALL ESE PYQS (2024-25)', url: 'https://drive.google.com/file/d/1jITDsxslYvATjArkAP9LJkT7pbyIUsHQ/view?usp=drivesdk' },
    { title: 'MID SEM-1 PYQS (2025-26)', url: 'https://drive.google.com/file/d/1myKO8oRNzxXV-CLutIA4NuX_L3FsUs9K/view?usp=drivesdk' },
    { title: 'MID SEM-2 PYQS (2025-26)', url: 'https://drive.google.com/file/d/1Mikt8nRCCZXmDm6GT7pFG2mSXVmwB5Ii/view?usp=drivesdk' },
    { title: 'ALL ESE PYQs (2025-26)', url: 'https://drive.google.com/file/d/1K7lQJCOxNVNBAJUVkh2KEWWMHKNiHT8Y/view?usp=drivesdk' },
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

  const toggleSubjectExpansion = (subjectId: string) => {
    // Basic placeholder if we add playlists later
  };

  const handlePlaylistClick = (subjectId: string, type: 'detailed' | 'oneshot') => {
    // Basic placeholder if we add playlists later
  };

  const syllabus = {
    title: '3rd Semester ET Syllabus',
    url: 'https://drive.google.com/file/d/1qGGkZ5h5jyBMjXCsYRayl2EZSl4IXMGH/view?usp=drivesdk' // User can update this URL later
  };

  if (selectedSubject) {
    const subject = subjects.find((s) => s.id === selectedSubject);
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
              Back to ET Subjects
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {subject.fullName} 📚
            </h1>
            <p className="text-muted-foreground text-lg">
              All notes for {subject.fullName} - 3rd Semester ET
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
                <Card className="feature-card h-full border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                  {note.isCommunity && isOwner && (
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
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg">
                        <FileText className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">PDF</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                    <CardDescription>{subject.fullName} study material</CardDescription>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/btech-notes/second-year/semester-3')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Branches
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            3rd Semester - ET Notes 📖
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Electronics Technology - Comprehensive study materials and resources
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
                <p className="text-sm text-muted-foreground">Official syllabus for 3rd semester ET</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className="feature-card h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 shadow-lg hover:shadow-xl"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <CardHeader>
                  {/* Modern 3D Icon */}
                  <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className={`absolute inset-0 rounded-2xl bg-primary blur-xl opacity-20`} />
                    <div className={`relative w-full h-full rounded-2xl bg-primary bg-opacity-10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center overflow-hidden`}>
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                      <span className="text-2xl drop-shadow-md text-primary">{subject.name}</span>
                    </div>
                  </div>

                  <CardTitle className="text-lg text-center mb-2">{subject.fullName}</CardTitle>
                  <CardDescription className="text-center">{subject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{subject.notes.length} Files</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setSelectedSubject(subject.id); }}
                    >
                      View Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: subjects.length * 0.1, duration: 0.5 }}
        >
          <Card className="feature-card relative">
            <CardHeader>
              <CardTitle className="text-2xl">Previous Year Questions</CardTitle>
              <CardDescription>End semester exam papers from previous years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {pyqs.map((pyq, idx) => (
                  <a
                    key={idx}
                    href={pyq.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <span className="text-sm font-medium">{pyq.title}</span>
                    <Download className="h-4 w-4 text-primary" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ThirdSemesterETNotes;
