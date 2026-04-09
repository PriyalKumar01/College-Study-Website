
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const DSANotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('dsa');
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
    { title: '100 Must Do Leetcode Problems', url: 'https://drive.google.com/file/d/103Mm8QysPI19PJ0mBNlJSqS_SizI7J1x/view?usp=drive_link' },
    { title: 'Strivers SDE Sheet Notes', url: 'https://drive.google.com/file/d/1-zbaZduTV7s_cNC8gVwFQS5duTtv_1P7/view?usp=drive_link' },
    { title: 'Top Array Interview Questions', url: 'https://drive.google.com/file/d/11CSx57aoluwvGA-dJ2Qiszc2mRiTuE1e/view?usp=drive_link' },
    { title: 'DSA Complete Handwritten Notes', url: 'https://drive.google.com/file/d/12IljJkQxxytSV9a7KniIezBLyknqo7Cz/view?usp=drive_link' },
    { title: 'DSA Complete Book PDF – Made Easy', url: 'https://drive.google.com/file/d/12KMt3yfyVXg2TLIkSYE3axFA3-i8Axku/view?usp=drive_link' },
    { title: 'DSA Interview Q/A', url: 'https://drive.google.com/file/d/111e353JYvADY5eO5HD7yeV1_OLKUSI2K/view?usp=drive_link' },
    { title: 'Java Array Interview Questions', url: 'https://drive.google.com/file/d/11qSZeqKfwiAsrNmRIP3RK67Zd4Vtmsi3/view?usp=drive_link' },
    { title: 'DSA Handwritten Notes', url: 'https://drive.google.com/file/d/12VN3BzsTESea-i-NYg9mkflgIN49CzIs/view?usp=drive_link' },
    { title: 'Java Programming Full Notes', url: 'https://drive.google.com/file/d/12E5GrtT3O7MD1mCnTZoVgtPOxb5h2jvA/view?usp=drive_link' }
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
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white">
              <Code className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                DSA Notes 💻
              </h1>
              <p className="text-muted-foreground text-lg">
                Data Structures and Algorithms study materials, interview questions and practice problems
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
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">PDF</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                  <CardDescription>
                    DSA study material and interview preparation
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
          <h3 className="text-lg font-semibold mb-2">📚 About DSA Notes</h3>
          <p className="text-muted-foreground">
            Our comprehensive DSA notes collection includes algorithm implementations, 
            interview questions, and practice problems to help you master Data Structures 
            and Algorithms for coding interviews and competitive programming.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">💻 Coding Interview Prep</Badge>
            <Badge variant="outline">📊 Data Structures</Badge>
            <Badge variant="outline">⚡ Algorithms</Badge>
            <Badge variant="outline">🎯 LeetCode Problems</Badge>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DSANotes;