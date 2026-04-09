
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

const ThirdSemesterPTNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'PT-3rd Semester');
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

  const staticSubjects = [
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
      name: 'E&M',
      fullName: 'Economics & Management',
      description: 'Business economics and management principles',
      notes: [
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
      id: 'isctc',
      name: 'ISCTC',
      fullName: 'Introduction to Surface Coating Technology & Chemistry',
      description: 'Surface coating techniques and chemical processes',
      notes: [
      { title: 'ISCTC Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=1nykZkVtniaUYCIW0xUsA3FYMNPolU_yL' },
      { title: 'ISCTC Notes 2', url: 'https://drive.google.com/uc?export=download&id=1ob5KJJV77sbjlunsulK7aASMT9VdeIm3' }
  ]
    },
    {
      id: 'fmmo',
      name: 'FMMO',
      fullName: 'Fluid Mechanics & Machinery Operations',
      description: 'Study of fluid behavior and machinery operations',
      notes: [
      { title: 'FMMO Unit-2 Notes', url: 'https://drive.google.com/uc?export=download&id=1Ze7GYkPZ04Wc1S557WQtdtgphL21zMXV' }
  ]
    },
    {
      id: 'tofep',
      name: 'TOFEP',
      fullName: 'Technology of Film & Emulsion Paints',
      description: 'Paint technology and emulsion chemistry',
      notes: [
      { title: '1 - Introduction & Definition Notes', url: 'https://drive.google.com/uc?export=download&id=1nykZkVtniaUYCIW0xUsA3FYMNPolU_yL' },
{ title: '2 - Ingredient & Characteristics Notes', url: 'https://drive.google.com/uc?export=download&id=1ob5KJJV77sbjlunsulK7aASMT9VdeIm3' },
{ title: '3 - Classification Notes', url: 'https://drive.google.com/uc?export=download&id=1W6x44NFGW3bd9VoyRiJfJIIxaGeYJyq1' },
{ title: '4 - Fundamental Notes', url: 'https://drive.google.com/uc?export=download&id=1_sW8TnSFrIEGfSoRS8FS33gR-3fH4mCX' },
{ title: '5 - Industry Scenario, Paint Dispersion, Flocculation, Emulsion, Stabilisation', url: 'https://drive.google.com/uc?export=download&id=1wdaw6ngi6aVq2pvBbxGUctMFmdH04Eur' },
{ title: '6 - Oil Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=1HIOzWJ1vljX70rVZv-Mflo_cnTXAiwl4' },
{ title: '7 - Oil Notes (Part-2)', url: 'https://drive.google.com/uc?export=download&id=1yHAIEvwnb7AJZ6k8njiF1zC2TKhgmAKO' },
{ title: '8 - Oil Extraction & Silent Features Notes', url: 'https://drive.google.com/uc?export=download&id=1CzUlqiSdsudv4Anb8r-fuJpfN9pr-hBI' },
{ title: '9 - Modified Oil, Driers & Solvents Notes', url: 'https://drive.google.com/uc?export=download&id=1TiCM4GHdrrRCR45SUhq3jv0oy7rAnffq' },
{ title: '10 - Plasticizer & Solvents Notes', url: 'https://drive.google.com/uc?export=download&id=16kytxH0_XoGAiIr8mPilVRKnU06t4GBN' },
{ title: '11 - Pigment Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=1gL6M2wRppjmKJWy3tELBcP_Fv9DHaq_f' },
{ title: '12 - Pigment (Part-2)', url: 'https://drive.google.com/uc?export=download&id=13esE0MardJpzjNuc4nmIpJZ64EpigSek' },
{ title: '13 - Pigment Notes (Part-3)', url: 'https://drive.google.com/uc?export=download&id=18XKjO7n09CBGJVS3icf_XHLWxXSzeFXA' },
{ title: '14 - Natural Resin & Alkyl Notes', url: 'https://drive.google.com/uc?export=download&id=11j3rzNw_WMYNPkVnivx_bCJmdyFv759E' },
{ title: '15 - Alkyd Notes', url: 'https://drive.google.com/uc?export=download&id=1bvUq42wxy0vOVjsCHc3qmendhals1Vjb' },
{ title: '16 - Polymer Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=15iuMVScQTgOQqpz6iKRcKriUHEPBen6h' },
{ title: '17 - Polymer Notes (Part-2)', url: 'https://drive.google.com/uc?export=download&id=1Ml7ozTdKVUahetcgCulKn2CzPXlhKAyC' },
{ title: '18 - Synthetic Resin Notes', url: 'https://drive.google.com/uc?export=download&id=1_9l87iTxMBsCKlDuVGb0weqW2zr8A-4D' },
{ title: '19 - Paint Additive Notes', url: 'https://drive.google.com/uc?export=download&id=1BJS9t94b0-JPNm-j_vjP0Jq4AjYYDgbX' },
{ title: '20 - Paint Formulation Notes', url: 'https://drive.google.com/uc?export=download&id=1TeJG0OT0Tx2DuKuVAlDT29pmNBdHTMRb' },
{ title: '21 - Drier Notes', url: 'https://drive.google.com/uc?export=download&id=1taOp8I9d5fAm_bYDBebbm6-2uWbK0Uin' },
{ title: '22 - Solvent Notes', url: 'https://drive.google.com/uc?export=download&id=1xXy1O0nHHQXKwGpE-W5yU42qhS5NnlAM' }
 ]
    },
    {
      id: 'tofep',
      name: 'TOFEP',
      fullName: 'Technology of Film & Emulsion Paints',
      description: 'Paint technology and emulsion chemistry',
      notes: [
      { title: '1 - Introduction & Definition Notes', url: 'https://drive.google.com/uc?export=download&id=1nykZkVtniaUYCIW0xUsA3FYMNPolU_yL' },
{ title: '2 - Ingredient & Characteristics Notes', url: 'https://drive.google.com/uc?export=download&id=1ob5KJJV77sbjlunsulK7aASMT9VdeIm3' },
{ title: '3 - Classification Notes', url: 'https://drive.google.com/uc?export=download&id=1W6x44NFGW3bd9VoyRiJfJIIxaGeYJyq1' },
{ title: '4 - Fundamental Notes', url: 'https://drive.google.com/uc?export=download&id=1_sW8TnSFrIEGfSoRS8FS33gR-3fH4mCX' },
{ title: '5 - Industry Scenario, Paint Dispersion, Flocculation, Emulsion, Stabilisation', url: 'https://drive.google.com/uc?export=download&id=1wdaw6ngi6aVq2pvBbxGUctMFmdH04Eur' },
{ title: '6 - Oil Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=1HIOzWJ1vljX70rVZv-Mflo_cnTXAiwl4' },
{ title: '7 - Oil Notes (Part-2)', url: 'https://drive.google.com/uc?export=download&id=1yHAIEvwnb7AJZ6k8njiF1zC2TKhgmAKO' },
{ title: '8 - Oil Extraction & Silent Features Notes', url: 'https://drive.google.com/uc?export=download&id=1CzUlqiSdsudv4Anb8r-fuJpfN9pr-hBI' },
{ title: '9 - Modified Oil, Driers & Solvents Notes', url: 'https://drive.google.com/uc?export=download&id=1TiCM4GHdrrRCR45SUhq3jv0oy7rAnffq' },
{ title: '10 - Plasticizer & Solvents Notes', url: 'https://drive.google.com/uc?export=download&id=16kytxH0_XoGAiIr8mPilVRKnU06t4GBN' },
{ title: '11 - Pigment Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=1gL6M2wRppjmKJWy3tELBcP_Fv9DHaq_f' },
{ title: '12 - Pigment (Part-2)', url: 'https://drive.google.com/uc?export=download&id=13esE0MardJpzjNuc4nmIpJZ64EpigSek' },
{ title: '13 - Pigment Notes (Part-3)', url: 'https://drive.google.com/uc?export=download&id=18XKjO7n09CBGJVS3icf_XHLWxXSzeFXA' },
{ title: '14 - Natural Resin & Alkyl Notes', url: 'https://drive.google.com/uc?export=download&id=11j3rzNw_WMYNPkVnivx_bCJmdyFv759E' },
{ title: '15 - Alkyd Notes', url: 'https://drive.google.com/uc?export=download&id=1bvUq42wxy0vOVjsCHc3qmendhals1Vjb' },
{ title: '16 - Polymer Notes (Part-1)', url: 'https://drive.google.com/uc?export=download&id=15iuMVScQTgOQqpz6iKRcKriUHEPBen6h' },
{ title: '17 - Polymer Notes (Part-2)', url: 'https://drive.google.com/uc?export=download&id=1Ml7ozTdKVUahetcgCulKn2CzPXlhKAyC' },
{ title: '18 - Synthetic Resin Notes', url: 'https://drive.google.com/uc?export=download&id=1_9l87iTxMBsCKlDuVGb0weqW2zr8A-4D' },
{ title: '19 - Paint Additive Notes', url: 'https://drive.google.com/uc?export=download&id=1BJS9t94b0-JPNm-j_vjP0Jq4AjYYDgbX' },
{ title: '20 - Paint Formulation Notes', url: 'https://drive.google.com/uc?export=download&id=1TeJG0OT0Tx2DuKuVAlDT29pmNBdHTMRb' },
{ title: '21 - Drier Notes', url: 'https://drive.google.com/uc?export=download&id=1taOp8I9d5fAm_bYDBebbm6-2uWbK0Uin' },
{ title: '22 - Solvent Notes', url: 'https://drive.google.com/uc?export=download&id=1xXy1O0nHHQXKwGpE-W5yU42qhS5NnlAM' }
 ]
    },
    {
  id: 'cpc',
  name: 'CPC',
  fullName: 'Chemical Process Calculations',
  description: 'Chemical engineering calculations and processes',
  notes: [
    { 
      title: 'CPC Book', 
      url: 'https://drive.google.com/uc?export=download&id=1C_4Tu6_ewgL1YRjW6hTRx4AwSUrFBXJG' 
    }
  ]
},
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      icon: '❓',
      color: 'bg-red-500',
      notes: []
    }
  ];

  
  const subjects: any[] = staticSubjects.map((sub: any) => ({
    ...sub,
    notes: [
      ...sub.notes,
      ...(communityNotes || [])
        .filter((cn: any) => cn.subject === sub.name || cn.subject === sub.id)
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
            3rd Semester - PT Notes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plastic Technology - Comprehensive study materials and resources
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
                            <a
                              key={idx}
                              href={note.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                            >
                              <span className="text-sm font-medium">{note.title}</span>
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

export default ThirdSemesterPTNotes;
