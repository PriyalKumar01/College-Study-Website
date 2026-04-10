
import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, FileText, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { smartDownload } from '@/lib/downloadUtils';

const WebDevelopmentNotes = () => {
  const navigate = useNavigate();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('webdev');
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
    { title: 'Backend Expert Interview Questions', url: 'https://drive.google.com/file/d/10Mf4HwXV0A0wSCSnTmJJUD3Vls3wQ05g/view?usp=drive_link' },
    { title: 'System Design Notes', url: 'https://drive.google.com/file/d/10tvBr8onwzSc8q8TpdyRdpbZ21vKfPlO/view?usp=drive_link' },
    { title: 'Frontend Interview Questions', url: 'https://drive.google.com/file/d/10wd0lDUqnu9HBV0EmLutyYvD_nXMbaX8/view?usp=drive_link' },
    { title: 'Node JS Handwritten Notes', url: 'https://drive.google.com/file/d/1-wbRT2L4rE4GsFV3d2nsECsJ4GQmbBcs/view?usp=drive_link' },
    { title: 'Spring Boot API Create', url: 'https://drive.google.com/file/d/10FgdWUI-mmIqFuUsycbUhcruZwmEGfxV/view?usp=drive_link' },
    { title: 'SQL Handwritten Notes', url: 'https://drive.google.com/file/d/1-xihZR6Lm6DxGGjQEf7MlEsTmMWX8rEZ/view?usp=drive_link' },
    { title: 'SQL Top 100 Important Questions', url: 'https://drive.google.com/file/d/10GPBEqENiiNq_jbIbmRUF84eIkOw8C83/view?usp=drive_link' },
    { title: '100 Important JavaScript Q/A', url: 'https://drive.google.com/file/d/12GVmCoerF08017xfsncK9tSGdpDoaPM_/view?usp=drive_link' },
    { title: '100 React JS Interview Q/A', url: 'https://drive.google.com/file/d/11NOUSmHg-JNqPVAa7K_xwPULrHd68t33/view?usp=drive_link' },
    { title: 'APIs for Frontend', url: 'https://drive.google.com/file/d/12OhGekKZGqD_yoPI1-kZbOYoRwnPj63E/view?usp=drive_link' },
    { title: 'Frontend Interview Q/A & Tips', url: 'https://drive.google.com/file/d/11H0V6O7GumMQMXVXOYse2fb6g0wnqALo/view?usp=drive_link' },
    { title: 'JavaScript Full Handwritten Notes', url: 'https://drive.google.com/file/d/12SZmRMEKR8Gxz_N6oC0S1oCEuHlmom9R/view?usp=drive_link' },
    { title: 'Full Stack WebDev Roadmap', url: 'https://drive.google.com/file/d/12LyRRxIKr_cVMBKgLhznpIopQIdGwmGw/view?usp=drive_link' },
    { title: 'HTML, CSS, JS – Interview Q/A', url: 'https://drive.google.com/file/d/12ETGjzq5U3SwDY-wRhmnFJVxkrxj0R0f/view?usp=drive_link' },
    { title: 'Important Interview Backend Concepts', url: 'https://drive.google.com/file/d/120uObg7nA5cbG36oCbgU4zD7Cm69x6yB/view?usp=drive_link' },
    { title: 'JavaScript Array Methods', url: 'https://drive.google.com/file/d/12F-oGLy9ej0oNJdn0YNHK3AikIjIW12S/view?usp=drive_link' },
    { title: 'Top 30 React JS Interview Questions', url: 'https://drive.google.com/file/d/11xqHzGnqQhRopuaglDxlpKD5v0RpIuuC/view?usp=drive_link' },
    { title: 'SQL Complete PDF Notes', url: 'https://drive.google.com/file/d/111xaHcL9ZDKtTpdB2mk-ceir5kZ7LQfT/view?usp=drive_link' },
    { title: 'System Design Handbook', url: 'https://drive.google.com/file/d/113jEs3RkyjV1u46W_bD-vTvTMnm9Jf-x/view?usp=drive_link' },
    { title: 'The Complete SQL Handbook Notes & Tips', url: 'https://drive.google.com/file/d/12Qq7As6xtwBk73IYiBLVoQzKdiT_0lJd/view?usp=drive_link' }
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
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white">
              <Globe className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Web Development Notes 🌐
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete web development resources covering frontend, backend, and full-stack development
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
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">PDF</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                  <CardDescription>
                    Web development study material and interview preparation
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
          <h3 className="text-lg font-semibold mb-2">📚 About Web Development Notes</h3>
          <p className="text-muted-foreground">
            Our comprehensive web development notes collection covers everything from frontend 
            technologies like HTML, CSS, JavaScript, and React to backend concepts including 
            Node.js, databases, APIs, and system design. Perfect for both beginners and experienced developers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">🎨 Frontend Development</Badge>
            <Badge variant="outline">⚙️ Backend Development</Badge>
            <Badge variant="outline">🔗 Full Stack</Badge>
            <Badge variant="outline">📊 System Design</Badge>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebDevelopmentNotes;