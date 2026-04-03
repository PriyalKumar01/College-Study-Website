
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

const ThirdSemesterCENotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('btech', 'CE-3rd Semester');
  const { isOwner } = useAuth();
  const { toast } = useToast();

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
      id: 'som',
      name: 'SOM',
      fullName: 'Strength of Materials',
      description: 'Study of material behavior under load',
      notes: [
        { title: 'SOM Book-by RK Bansal', url: 'https://drive.google.com/uc?export=download&id=15ahuMSoS3b6XeNwK7WVxOQ93pk9ukMwx' },
  { title: 'SOM lab Ques.', url: 'https://drive.google.com/uc?export=download&id=15aa0NBdtwFBJUaaK1tMdMM8GTxsDvlcL' },
  { title: 'Unit-1, 2 & 3 Handwritten Notes', url: 'https://drive.google.com/uc?export=download&id=17blfHAcJBn3xuR72YyZEos8HpX4gah50' },
  { title: 'Unit-4 Notes', url: 'https://drive.google.com/uc?export=download&id=1oKnyxO-KzRUuu2qFl21zgxyulHTxFZ0S' },
  { title: 'Unit-5 Notes', url: 'https://drive.google.com/uc?export=download&id=1fJZ2clBRsX8t6hZoA_Sue85IueQzL25e' },
  { title: 'Unit-1 pdf Notes', url: 'https://drive.google.com/uc?export=download&id=19bTcoGiDiYm6rtoXGe8IJvhgbCTc48h5' }
      ]
    },
    {
      id: 'fm',
      name: 'Fluid Mechanics',
      fullName: 'Fluid Mechanics',
      description: 'Study of fluid behavior and properties',
      notes: [],
      comingSoon: true
    },
    {
      id: 'surveying',
      name: 'Surveying',
      fullName: 'Surveying',
      description: 'Land surveying techniques and measurements',
      notes: [
        { title: 'Surveying Book', url: 'https://drive.google.com/uc?export=download&id=1qtJeCVp96BCwBEL7VZFnw4ad4s5u5vHi' },
        { title: 'Ch-2 Horizontal Measurement Notes', url: 'https://drive.google.com/uc?export=download&id=1bV1bMacPNYa2zg2cwEsGgSm333f9NIsd' },
        { title: 'Ch-3 Compass Surveying', url: 'https://drive.google.com/uc?export=download&id=1dEQzPdFcZ0H83LHX3ZG_mS3H18fm2-Dk' },
        { title: 'Ch-4 Traversing Notes', url: 'https://drive.google.com/uc?export=download&id=12hNbwceSBlMebKC82Z1A9wMN-Mo0enM2' },
        { title: 'Module 4: Theodolite Surveying', url: 'https://drive.google.com/uc?export=download&id=13RKz1xnIfY2-gVg_4X-tdOM1Taa-jMyH' },
        { title: 'Surveying Lab Manual', url: 'https://drive.google.com/uc?export=download&id=12CaI5d370Xc9fgHwFh2u79DtCAzIuglE' },
        { title: 'Surveying Book-by SK.Duggal', url: 'https://drive.google.com/uc?export=download&id=1PikDBlGKeE3kmqDc8G-4mI_eB0f1t27y' },
        { title: 'Ch-1 Surveying', url: 'https://drive.google.com/uc?export=download&id=1bXv399k77ntNOUN--FfOZpT5icMv1trf' }
      ]
    },
    {
      id: 'geotechnical',
      name: 'Geotechnical Engineering',
      fullName: 'Geotechnical Engineering',
      description: 'Soil mechanics and foundation engineering',
      notes: [
        { title: 'Unit-3 Consolidation of Soil', url: 'https://drive.google.com/uc?export=download&id=1-9mhmPtgVA02vg6g3W1eW87extGq3W92' },
        { title: 'Unit-3 Soil Compaction', url: 'https://drive.google.com/uc?export=download&id=1UpGmsD-noROZH64GTt6mrjQ_7cYDlD8l' },
        { title: 'Unit-4 Shear Stress of Soil', url: 'https://drive.google.com/uc?export=download&id=1luBPv3QT2WpifPJJ5tjJTGvNpyeiUYbE' },
        { title: 'Unit-4 Stress Distribution of Soil', url: 'https://drive.google.com/uc?export=download&id=1Zz6_7Jtjz55SLPQ0GqYxYzvxNZQO08BW' }
      ]
    },
    {
      id: 'bmc',
      name: 'Building Material & Construction',
      fullName: 'Building Material & Construction',
      description: 'Construction materials and techniques',
      notes: [
        { title: 'Exp.16- Compressive Strength', url: 'https://drive.google.com/uc?export=download&id=1Ihajiuc7lfFm9VBNJrPDbrtlCgnBnp8j' },
        { title: 'Unit-1 Composition of Good Bricks', url: 'https://drive.google.com/uc?export=download&id=1rVw0nHZSp4mPoyzsbpJwY4mc9Xayyedb' },
        { title: 'Unit-1 Designing of Stone', url: 'https://drive.google.com/uc?export=download&id=1obFomPg8EBisPXULfw132MELLMLkL9vw' },
        { title: 'Unit-1 Lime', url: 'https://drive.google.com/uc?export=download&id=1l-0Fh4ic3wCqDXChReowInUe-dyJrcP7' },
        { title: 'Unit-1 Topic: Manufacturing of Bricks', url: 'https://drive.google.com/uc?export=download&id=1jXmdfXPYApDYN0CcA1F2RIJM5qs9Z-bL' },
        { title: 'Unit-1 Topic: Stone Notes', url: 'https://drive.google.com/uc?export=download&id=1K8ProTDLlwm2F0rBUP4xYjKGvNdvkw3E' },
        { title: 'Unit-2 Characteristics of Aggregate', url: 'https://drive.google.com/uc?export=download&id=1L_racpULP-TQVAnNTs5GRLkTeZXHeC2-' },
        { title: 'Unit-2 Mortar & Its Classification', url: 'https://drive.google.com/uc?export=download&id=1ZUYNMO5unrpBMwrK7DwKYvhZWS-yczAD' },
        { title: 'Unit-2 Topic Admixture/Additives', url: 'https://drive.google.com/uc?export=download&id=1bTjel4NQY5-V2tIf7RXHtYYnW75lw5kL' },
        { title: 'Unit-2 Topic Cement', url: 'https://drive.google.com/uc?export=download&id=17L-FOB_cSJUuVY9f9KR_5iw0wwChH56T' },
        { title: 'Unit-2 Topic Manufacturing of Cement', url: 'https://drive.google.com/uc?export=download&id=1p6r1z9yh1_XY3ecD_ZQux4D-WL9k1pe8' },
        { title: 'Unit-2 Topic Timber Notes', url: 'https://drive.google.com/uc?export=download&id=1PuttlH6uYi9CqlAtBZ4IuJ7ulcrQRk7z' },
        { title: 'Unit-2 Types of Cement', url: 'https://drive.google.com/uc?export=download&id=1fgln9WybK5lcRmpGRxAJ_sOLaVFvMCwY' },
        { title: 'Unit-2 Aggregate Notes', url: 'https://drive.google.com/uc?export=download&id=19X6xdj_W7dPP1zx_0HLPtPg01ut33-Yn' },
        { title: 'Unit-2 Testing of Cement', url: 'https://drive.google.com/uc?export=download&id=1ym2P7Ik8aEk0zyT0N6kyt5a03hn_C2Pm' }
      ]
    },
    {
      id: 'pyqs',
      name: 'Previous Year Questions',
      fullName: 'PYQs for 3rd Semester CE',
      description: 'Previous year question papers',
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
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate('/btech-notes/second-year/semester-3')}
          className="mb-4"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            3rd Semester - CE Notes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Civil Engineering - Comprehensive study materials and resources
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
                        {subject.comingSoon && (
                          <Badge variant="secondary">Coming Soon</Badge>
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

                {expandedSubjects.includes(subject.id) && !subject.comingSoon && (
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

export default ThirdSemesterCENotes;
