import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Laptop, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { smartDownload } from '@/lib/downloadUtils';
import { motion } from 'framer-motion';

const CodingStudyMaterial = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('coding');

  const handleDeleteCommunityNote = async (id: string, fileName: string) => {
    if (!user || !isOwner) return;
    if (!window.confirm('Delete this user-uploaded material?')) return;
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

  const handleDownload = (url: string, title: string) => smartDownload(url, title);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-foreground dark:bg-card text-background dark:text-foreground pt-16 pb-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-start gap-4 flex-col">
          <button
            onClick={() => navigate('/notes')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Notes
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <Laptop className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif leading-tight">
                Coding Study Material
              </h1>
              <p className="text-xs opacity-50 uppercase tracking-widest mt-1">Interviews & Careers Guides</p>
            </div>
          </div>
          <p className="text-sm opacity-50 max-w-2xl mt-4">
            Complete coding preparation resources, interview guides, and career roadmaps.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10 flex-1 w-full mb-12">
        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allNotes.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="group border border-border bg-card hover:border-foreground/30 rounded-xl p-4 transition-all duration-300 hover:shadow-md flex flex-col h-full relative">
                {note.isCommunity && isOwner && (
                  <button
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-950/20 p-1.5 rounded-lg transition-colors z-10"
                    onClick={() => handleDeleteCommunityNote(note.id, note.fileName || '')}
                    title="Delete material"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">PDF</span>
                  {note.isCommunity && (
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">Community</span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 mb-4">{note.title}</h3>
                {note.userName && (
                  <p className="text-[10px] text-muted-foreground mb-3">Uploaded by: {note.userName}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(note.url, note.title)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-wider uppercase py-2 px-3 rounded bg-foreground text-background hover:opacity-85 transition-opacity"
                    disabled={note.url === '#'}
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                  <button
                    onClick={() => window.open(note.url, '_blank')}
                    className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
                    disabled={note.url === '#'}
                    title="Open Link"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 dark:bg-primary/10 rounded-r-xl">
          <h3 className="text-base font-bold text-foreground mb-3">📚 About Coding Study Material</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our comprehensive coding study material includes interview preparation guides, 
            roadmaps for software development careers, and essential resources for landing 
            your dream tech job. Perfect for placement preparation and career development.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">💼 Job Preparation</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">🎯 Interview Questions</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">🛣️ Career Roadmaps</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">🔧 Development Tools</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CodingStudyMaterial;