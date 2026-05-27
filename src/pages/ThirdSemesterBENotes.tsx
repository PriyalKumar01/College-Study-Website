import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ThirdSemesterBENotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'BE-3rd Semester');
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

  // Subject names MUST match courseStructure.ts 'BE-3rd Semester' exactly
  const staticSubjects = [
    {
      id: 'em',
      name: 'Economics & Management',
      icon: '💼',
      color: 'bg-blue-500',
      notes: [
        { title: 'BEST Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk', recommended : true },
        { title: 'Business Economics Book', url: 'https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link' },
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
      id: 'math2',
      name: 'Engineering Mathematics-II',
      icon: '📐',
      color: 'bg-indigo-500',
      notes: [
        { title: 'BEST Complete Notes (Unit 1 to 5)', url: 'https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk' , recommended : true },
        { title: 'Unit 1 C.F & PI Notes', url: 'https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link' },
        { title: 'Unit 2 Notes', url: 'https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link' },
        { title: 'Unit 3 Notes', url: 'https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link' },
        { title: 'Mid Sem 2 Last Minute Revision', url: 'https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link' },
        { title: 'Best Maths Chapter 1 & 2 Notes', url: 'https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link' },
        { title: 'Formula Sheet Unit 1', url: 'https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link' }
      ]
    },
    {
      id: 'fmmo',
      name: 'Fluid Mechanics & Mechanical Operations',
      icon: '🖥️',
      color: 'bg-green-500',
      notes: [
        { title: 'FMMO BOOK By-R.K.Bansal', url: 'https://drive.google.com/file/d/1gUIEEQgB-gr2kzFVMUjjvaP3DBsH0fYA/view?usp=drivesdk' },
        { title: 'FMMO Unit Operations-I BOOK', url: 'https://drive.google.com/file/d/1vGhqjvUuZpufXPTAT2f_zqULgTwGI2_K/view?usp=drivesdk' },
        { title: 'Unit-1 PDF (Prof.)', url: 'https://drive.google.com/file/d/1sv5aeZzhBcru7YyyI22SiH0YMD2hh-Vz/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-1 Notes (BEST)', url: 'https://drive.google.com/file/d/1pBTj_SwMPldAp8SYxBtBEyGJ2IDUo85p/view?usp=drivesdk', recommended : true },
        { title: 'Unit-2 Notes (BEST)', url: 'https://drive.google.com/file/d/1ZRcG0KYOn1owZTAZgNwbf49bQZ4fX2dU/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-3 Notes (BEST)', url: 'https://drive.google.com/file/d/1U0pCF65tSsQFNAjvrGvtlxay6qbB1hMk/view?usp=drivesdk', recommended : true },
        { title: 'Unit-4 Notes (BEST)', url: 'https://drive.google.com/file/d/1IAKxwQTXgo08XTJ_dKHqqeu1hpoRm6aS/view?usp=drivesdk' , recommended : true},
        { title: 'Unit-5 Notes (BEST)', url: 'https://drive.google.com/file/d/1AWr7NUjpJIdoMSPRCv1JFc55f6ZiF-hx/view?usp=drivesdk', recommended : true },
        { title: 'Complete FMMO Notes (NEW & BEST)', url: 'https://drive.google.com/file/d/1SJ3aWlJFH-zFs15mvyUz9r0MkM7XuLsL/view?usp=drivesdk' , recommended : true},
        { title: 'FMMO Full Notes PDF (OLD)', url: 'https://drive.google.com/file/d/1G9NYplt56PH5BGzJObGRybQbPrYB1AOs/view?usp=drivesdk' },
        { title: 'FMMO PYQS Solution PDF', url: 'https://drive.google.com/file/d/1W57HazGKgGCzYWW-zqAqa7PS5TDKZ8Fq/view?usp=drivesdk' },
        { title: 'FMMO Unit-5 Diagram PDF', url: 'https://drive.google.com/file/d/1bcqck-B9HE1QPbR6JSgz1RnOn2na7cQq/view?usp=drivesdk' , recommended : true },
        { title: 'Rotameter PDF', url: 'https://drive.google.com/file/d/1x9JM67WQ-7_ymlpnr7G4FFdxgoMMKIK-/view?usp=drivesdk'  },
        { title: 'Pump & Valves PDF', url: 'https://drive.google.com/file/d/1MzHpprRwR1j3EyToLPkL5HK-6pd6QLah/view?usp=drivesdk'  },
        { title: 'Size Reduction Equipments Notes', url: 'https://drive.google.com/file/d/1AIPD6fjZwYaFyCvHj8VQcVb0k62wkXEh/view?usp=drivesdk' , recommended : true },
        { title: 'FMMO Lab Exp. -Settling PDF', url: 'https://drive.google.com/file/d/1j9Qs-4MWG56ld5CreZGWTh6VRqKdizrH/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Screen Analysis PDF', url: 'https://drive.google.com/file/d/1BlYeGIH6WKgTAsCSS2nt_eS8Ce8hPWtq/view?usp=drivesdk' },
        { title: 'FMMO Lab Exp. -Rotameter PDF', url: 'https://drive.google.com/file/d/12cN4OntYDhyj7J5peP2Rb1AxjAFbn6QV/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Jaw Crusher PDF', url: 'https://drive.google.com/file/d/159Z5Hs2YQ2J6NE29ojo65iYhDNHKuGkm/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Reynolds PDF', url: 'https://drive.google.com/file/d/1W5EACqOzZfKF4ftkEMNJu7qAXPJOzLXn/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Bernoullis Theorem PDF', url: 'https://drive.google.com/file/d/1uUW8X5RnykpdJtanfKf7W0rrEgy93fgl/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Ball Mill PDF', url: 'https://drive.google.com/file/d/1o2qXKBm1iYYvLWB1lSUgIEfBicrY-7Pe/view?usp=drivesdk'  },
        { title: 'FMMO Lab Exp. -Roll Crusher PDF', url: 'https://drive.google.com/file/d/1U_9VVlvaAQv4t2GvAcJTvGAx0Zvrc-KS/view?usp=drivesdk'  },
        { title: 'FMMO Lab Manual PDF', url: 'https://drive.google.com/file/d/1SeTY3_cjBAXwRPJF-zcXmzir2subMH7Y/view?usp=drivesdk' , recommended : true },
      ]
    },
    {
      id: 'cpc',
      name: 'Chemical Process calculations',
      icon: '🐍',
      color: 'bg-orange-500',
      notes: [
        { title: 'CPC BOOK By-D.C. SIKDAR', url: 'https://drive.google.com/file/d/13MfTeTun6v9N6V23N900a4DCQslGVhLx/view?usp=drivesdk' },
        { title: 'CPC BOOK PDF By- Richard', url: 'https://drive.google.com/file/d/1YVThx8aLj0LLrwrif1wxTMJ1exoHRfcU/view?usp=drivesdk' },
        { title: 'CPC Imp. Notes', url: 'https://drive.google.com/file/d/1E4Im3I0DagUzRPz7-t2dzqdt3D6iozTA/view?usp=drivesdk' },
        { title: 'CPC Notes', url: 'https://drive.google.com/file/d/1IlIEc5WezQ2HJqSzgyAS40bhfPuFB6JJ/view?usp=drivesdk' },
        { title: 'CPC Class Ques.', url: 'https://drive.google.com/file/d/1D7sM9TggsJCuYrqHe9SSstIkIDBtRm9T/view?usp=drivesdk' },
        { title: 'CPC Unit-1 Notes', url: 'https://drive.google.com/file/d/1xjEHt0QYO1inJEuOvaoFzvN8pQov5i2c/view?usp=drivesdk' },
        { title: 'CPC Numerical Notes Plastic', url: 'https://drive.google.com/file/d/1zndHWn8Di_onzrLYqsXg6qQ8w_Mty5vc/view?usp=drivesdk' },
        { title: 'CPC -Unit & Dimensions Notes', url: 'https://drive.google.com/file/d/1WaDMh8m02FyeO8nJGo36AlJhK914FfBh/view?usp=drivesdk' },
        { title: 'CPC All Unit Practice Problem', url: 'https://drive.google.com/file/d/1SvFXHNktnf7e7hIAkRrc9fvxEZNhqEN7/view?usp=drivesdk' },
        { title: 'CPC Theory Part PDF', url: 'https://drive.google.com/file/d/1RaOznhdQL9TSuup6Vw193FupiBclMkIB/view?usp=drivesdk' },
        { title: 'CPC Unit-1,2 PYQs', url: 'https://drive.google.com/file/d/1TI77F8ycCA1gRXDMq6xaxo0uAhMB-KFc/view?usp=drivesdk' },
        { title: 'CPC Unit-2 Notes', url: 'https://drive.google.com/file/d/1Bp_prijNXbbdXcN6Eqs-BhPWbtaWFOEU/view?usp=drivesdk' },
        { title: 'CPC Unit-2,3,4 PYQs', url: 'https://drive.google.com/file/d/1xQ1qfqTyaesMtrhPvNHaGbcozj2Kf7Xn/view?usp=drivesdk' },
        { title: 'CPC Unit-3 & 4 Notes ', url: 'https://drive.google.com/file/d/1NixNyYKaq0gyU3GmZlBh6WmsiBnyQmUI/view?usp=drivesdk' },
        { title: 'BEST CPC Notes -Unit Operations & Process', url: 'https://drive.google.com/file/d/1m2VrF8AnRiHrfdGY7eiX6fR8kqbR5kfF/view?usp=drivesdk', recommended : true },
        { title: 'Idial Gas Law Notes', url: 'https://drive.google.com/file/d/1CzzJqujElxsMlmvED5wM6g-IZ0Wm4FGv/view?usp=drivesdk' },
        { title: 'CPC Full Handwritten Notes', url: 'https://drive.google.com/file/d/1mqfkuHUGZ9scJ5Erv8qFEXMfm5bXptZy/view?usp=drivesdk', recommended : true },
        { title: 'Numerical PDF', url: 'https://drive.google.com/file/d/13FFVHJVzOUg6H9r-gEvMyz8mHaxSH2S4/view?usp=drivesdk' },
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments - All Subjects',
      icon: '📝',
      color: 'bg-yellow-500',
      notes: [
        { title: 'FMMO Asssignment-1 PDF', url: 'https://drive.google.com/file/d/1AX9L3O9O3kn6s1TUAx20zHG-FUa-CuIF/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-2 PDF', url: 'https://drive.google.com/file/d/1TUNcZDO9MmMZ42U3LSCkbLcLHNeMniAd/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-3 PDF', url: 'https://drive.google.com/file/d/1nsAGVFz2d8Irrho4Rw8uFGUMmJgvIv6D/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-4 PDF', url: 'https://drive.google.com/file/d/1ZGXG9oFx3FRkAvsqygTmxBm6OA74PaWa/view?usp=drivesdk' },
        { title: 'FMMO Asssignment-5 PDF', url: 'https://drive.google.com/file/d/1VZMjpCRvpJD0UOC-Iwvdquy_m0ahgEFG/view?usp=drivesdk' },
        { title: 'FMMO Assignment-1 to 5 Solutions PDF', url: 'https://drive.google.com/file/d/10OhOmXg5NbN_St5YSnqB8m-A_hSmNLEv/view?usp=drivesdk' },

      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: [
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem 1 & 2 PYQs (2023-24)', url: 'https://drive.google.com/file/d/1TOeiztCSFWqpnRpeQHYNnq-BcXtbmyzi/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) End Sem PYQs (2023-24)', url: 'https://drive.google.com/file/d/1v1htAchF9MpbRT9zlywqiFZWqNQL5zm-/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem 1 & 2 PYQs (2024-25)', url: 'https://drive.google.com/file/d/1eR4KaUm939MyT0RErzv98a1gxPravAVO/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) End Sem PYQs (2024-25)', url: 'https://drive.google.com/file/d/1jPJ0ryFU0kKpLvUhCG8uDSEOspHe_8-W/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem 1 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1lcZ-zCNw_Cj0nyuISjPTaCBAPXDOmWKT/view?usp=drivesdk' },
        { title: '(see Your Subjects Pyqs ONLY) Mid Sem-2 PYQs (2025-26)', url: 'https://drive.google.com/file/d/1CRDbW8rmMG6NbcG7iD6QqpYgqgFK2Vp_/view?usp=drivesdk' },
        { title: 'All CPC PYQs', url: 'https://drive.google.com/file/d/1F5fQM16Y9_OrGDvvDizqsjB_05ip1uq_/view?usp=drivesdk' },
        { title: 'All E&M PYQs', url: 'https://drive.google.com/file/d/1DuFhji3a_PYAdTIOhkZtYHWEIqL-hu-H/view?usp=drivesdk' },
        { title: 'All FMMO PYQs', url: 'https://drive.google.com/file/d/1BiRBS_qkvONqMqC5YDwJU4VyAyZqngP6/view?usp=drivesdk' },
        { title: 'All EM-II PYQs', url: 'https://drive.google.com/file/d/1m3f0xcG3MUEOfLV9aY0jt4CEJ97fpo2g/view?usp=drivesdk' },
        { title: 'EM-II -End Sem PYQs Solutions (2023-24)', url: 'https://drive.google.com/file/d/1g0GAIl_67M6b8RMnT8iJ9SEVQOPKJgjh/view?usp=drivesdk' },
     ]
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
            3rd Semester - BE Notes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Biomedical Engineering - Comprehensive study materials and resources
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
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            +{subject.notes.filter((n: any) => n.isCommunity).length} community
                          </span>
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
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Study Notes ({subject.notes.length} available)
                      </h3>
                      {subject.notes.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No notes available yet. Be the first to upload!</p>
                      ) : (
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
                                <Download className="h-4 w-4 text-primary cursor-pointer" onClick={() => window.open(note.url, '_blank')} />
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
                      )}
                    </div>
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

export default ThirdSemesterBENotes;
