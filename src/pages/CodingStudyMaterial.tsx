
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const CodingStudyMaterial = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('coding');
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


  const staticNotes = [
    { title: 'TOP 18 Remote Job Finding Platform', url: 'https://drive.google.com/file/d/1023kGyIiRCivCnmaGRNqulQxLeHp7u3H/view?usp=drive_link' },
    { title: '20 Coding Pattern Questions', url: 'https://drive.google.com/file/d/10XdetdxtD3NlkcVH2XflKPxdWneqAByM/view?usp=drive_link' },
    { title: 'Important Git Commands', url: 'https://drive.google.com/file/d/10shCtZCZNWVGZ36FMY5tQEVESaKeeOHb/view?usp=drive_link' },
    { title: 'Most Important SQL Interview Questions', url: 'https://drive.google.com/file/d/10_HvDy2cLUYl47cFreqVv6hd0jCLopyc/view?usp=drive_link' },
    { title: 'Python Code Handbook', url: 'https://drive.google.com/file/d/10wLgy6nRRXmTfS62AhiPp18pfAoMNpiQ/view?usp=drive_link' },
    { title: 'React JS Important Interview Questions', url: 'https://drive.google.com/file/d/10bP6HVZmXwKnQygegw-fpIjlr6K_BLpk/view?usp=drive_link' },
    { title: 'SDE Proper Roadmap', url: 'https://drive.google.com/file/d/10c3zokmE7ilcyi90PVVy8aJqm8rGNjKr/view?usp=drive_link' },
    { title: 'Complete SQL Notes', url: 'https://drive.google.com/file/d/10Zuj4dvlLPwHMKmliqY4nvFh5rzcFUSA/view?usp=drive_link' },
    { title: 'Top 50 OOPs Interview Questions', url: 'https://drive.google.com/file/d/10vV9rvrEuwdzVtuuw-du3aKl8io1z57D/view?usp=drive_link' },
    { title: 'Top 50 React JS Interview Questions', url: 'https://drive.google.com/file/d/10fQWRlptbq0ruliMfNKUmJHcFxlUcvAG/view?usp=drive_link' },
    { title: 'Top 50 Web Developer Interview Questions', url: 'https://drive.google.com/file/d/10o_b1zACSC5i59RiBKPKiLJedKSh9jfP/view?usp=drive_link' },
    { title: 'How to Upload Projects on Github', url: 'https://drive.google.com/file/d/11QuiLfDePm_8bgAmg-WwCx8g88H5waQH/view?usp=drive_link' },
    { title: 'Job Interview Questions', url: 'https://drive.google.com/file/d/11e_O6pdhC2eqIPzzJAMnwvrkb4rD0Tjt/view?usp=drive_link' },
    { title: 'The Ultimate MERN Stack Guide', url: 'https://drive.google.com/file/d/11_955Ye0yHNemf2M6T5Iu54RCf5zisy9/view?usp=drive_link' }
  ];

  
  const allNotes: any[] = [
    ...staticNotes,
    ...(communityNotes || []).map(cn => ({
      id: cn.id,
      title: cn.title,
      url: cn.file_url,
      isCommunity: true,
      fileName: cn.file_name,
      uploadedBy: cn.uploaded_by,
      userName: cn.user_name
    }))
  ];

  const handleDownload = (url: string, title: string) => {
    const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (fileId) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.open(downloadUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

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
            onClick={() => navigate('/notes')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <Laptop className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Coding Study Material 🚀
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete coding preparation resources, interview guides, and career roadmaps
              </p>
            </div>
          </div>
        </motion.div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNotes.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="feature-card h-full relative">
                  {note.isCommunity && isOwner && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 z-10"
                      onClick={(e) => { e.stopPropagation(); handleDeleteCommunityNote(note.id, note.fileName); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">PDF</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                  <CardDescription>
                    Coding interview and career preparation material
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

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 p-6 bg-muted/50 rounded-lg border"
        >
          <h3 className="text-lg font-semibold mb-2">📚 About Coding Study Material</h3>
          <p className="text-muted-foreground">
            Our comprehensive coding study material includes interview preparation guides, 
            roadmaps for software development careers, and essential resources for landing 
            your dream tech job. Perfect for placement preparation and career development.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">💼 Job Preparation</Badge>
            <Badge variant="outline">🎯 Interview Questions</Badge>
            <Badge variant="outline">🛣️ Career Roadmaps</Badge>
            <Badge variant="outline">🔧 Development Tools</Badge>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingStudyMaterial;