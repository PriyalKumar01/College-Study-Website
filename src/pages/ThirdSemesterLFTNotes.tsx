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
import { Download, ArrowLeft, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ThirdSemesterLFTNotes = () => {
  const navigate = useNavigate();

  // Key MUST match courseStructure / upload form: 'LFT-3rd Semester'
  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'LFT-3rd Semester');
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

  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleSubjectExpansion = (subjectId: string) => {
    setExpandedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Subject names MUST match courseStructure.ts 'LFT-3rd Semester' entries EXACTLY:
  // Leather Chemistry, Unit Operations, Shoe Making, Math-II
  const staticSubjects = [
    {
      id: 'leather-chemistry',
      name: 'Leather Chemistry',
      fullName: 'Leather Chemistry',
      description: 'Chemical aspects of leather and tanning processes',
      notes: [],
      pyqs: [
        { title: 'Mid Sem-1 PYQs (2024-25)', url: 'https://drive.google.com/uc?export=download&id=1UIa-qUcLL5fJgFSDhiEbn5xh5yA4dvA8' }
      ]
    },
    {
      id: 'unit-operations',
      name: 'Unit Operations',
      fullName: 'Unit Operations in Leather',
      description: 'Fluid mechanics and unit operations in leather industry',
      notes: [
        { title: 'CPC Book by K. V. Narayanan & B. Lakshmikutty', url: 'https://drive.google.com/uc?export=download&id=1GQDZzGmu_JnHlmOtyHQ11c8LRuSygqVN' }
      ]
    },
    {
      id: 'shoe-making',
      name: 'Shoe Making',
      fullName: 'Shoe Making Technology',
      description: 'Leather microscopy, skin proteins and shoe manufacturing',
      notes: [
        { title: 'LM&SP Lab PDF', url: 'https://drive.google.com/uc?export=download&id=1Xoy_5Eb3rVL0sdEwLA_iKvEdU2ErxggQ' }
      ]
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
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/uc?export=download&id=1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX' }
      ]
    },
    {
      id: 'em',
      name: 'Economics & Management',
      fullName: 'Economics & Management',
      description: 'Business economics and management principles',
      notes: [
        { title: 'Business Economics Book', url: 'https://drive.google.com/uc?export=download&id=1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO' },
        { title: 'E&M Unit 1 (Part-1) Notes', url: 'https://drive.google.com/uc?export=download&id=1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL' },
        { title: 'E&M Unit 1 (Part 2) Notes', url: 'https://drive.google.com/uc?export=download&id=1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6' },
        { title: 'Unit 1 (Elasticity Notes)', url: 'https://drive.google.com/uc?export=download&id=1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8' },
        { title: 'Complete Unit 2 Notes', url: 'https://drive.google.com/uc?export=download&id=1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-' },
        { title: 'Unit 3 (Part-1) Notes', url: 'https://drive.google.com/uc?export=download&id=1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o' },
        { title: 'Unit 3 (Part-2) Notes', url: 'https://drive.google.com/uc?export=download&id=1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M' },
        { title: 'E&M Handwritten Notes', url: 'https://drive.google.com/uc?export=download&id=1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ' },
        { title: 'Full Last Min. Revision Notes', url: 'https://drive.google.com/uc?export=download&id=1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'Previous Year Questions',
      description: 'LFT 3rd Semester PYQs',
      notes: []
    },
    {
      id: 'assignments',
      name: 'Assignments',
      fullName: 'Assignments - All Subjects',
      description: 'LFT 3rd Semester Assignments',
      notes: []
    }
  ];

  const subjects: any[] = staticSubjects.map((sub: any) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn: any) => cn.subject === sub.name || cn.subject === sub.fullName)
        .map((cn: any) => ({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/btech-notes/second-year/semester-3')}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Branches
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            3rd Semester - LFT Notes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leather &amp; Fashion Technology - Comprehensive study materials and resources
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-5xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="feature-card relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{subject.name}</CardTitle>
                        {subject.notes.filter((n: any) => n.isCommunity).length > 0 && (
                          <Badge className="text-xs bg-green-100 text-green-700">
                            +{subject.notes.filter((n: any) => n.isCommunity).length} community
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base mb-1">
                        {subject.fullName}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {subject.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSubjectExpansion(subject.id)}
                      className="ml-4"
                    >
                      {expandedSubjects.includes(subject.id) ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {expandedSubjects.includes(subject.id) && (
                  <CardContent className="space-y-6">
                    {subject.notes && subject.notes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Study Notes
                        </h3>
                        <div className="grid gap-2">
                          {subject.notes.map((note: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                              <a
                                href={note.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 flex-1"
                              >
                                <span className="text-sm font-medium">{note.title}</span>
                                {note.isCommunity && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Community</span>
                                )}
                              </a>
                              <div className="flex items-center gap-2">
                                <Download className="h-4 w-4 text-primary" />
                                {note.isCommunity && isOwner && (
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => handleDeleteCommunityNote(note.id, note.fileName)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {subject.notes && subject.notes.length === 0 && (
                      <p className="text-sm text-muted-foreground">No notes available yet. Be the first to upload!</p>
                    )}

                    {subject.pyqs && subject.pyqs.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Previous Year Questions
                        </h3>
                        <div className="grid gap-2">
                          {subject.pyqs.map((pyq: any, idx: number) => (
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
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdSemesterLFTNotes;
