import { useCommunityNotes } from '@/hooks/useCommunityNotes';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Download, ArrowLeft, FileText, Code, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { smartDownload, viewInBrowser } from '@/lib/downloadUtils';
import { motion } from 'framer-motion';

const DSANotes = () => {
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();
  const { toast } = useToast();

  const { data: communityNotes, refetch: refreshNotes } = useCommunityNotes('dsa');

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
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif leading-tight">
                DSA Notes
              </h1>
              <p className="text-xs opacity-50 uppercase tracking-widest mt-1">Data Structures & Algorithms</p>
            </div>
          </div>
          <p className="text-sm opacity-50 max-w-2xl mt-4">
            Data Structures and Algorithms study materials, interview questions, and practice problems.
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
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
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
                    onClick={() => viewInBrowser(note.url)}
                    className="inline-flex items-center justify-center p-2 rounded border border-foreground/20 hover:bg-muted transition-colors"
                    disabled={note.url === '#'}
                    title="View in Browser"
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
          <h3 className="text-base font-bold text-foreground mb-3">📚 About DSA Notes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our comprehensive DSA notes collection includes algorithm implementations, 
            interview questions, and practice problems to help you master Data Structures 
            and Algorithms for coding interviews and competitive programming.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">💻 Coding Interview Prep</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">📊 Data Structures</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">⚡ Algorithms</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2.5 py-1 rounded">🎯 LeetCode Problems</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DSANotes;


