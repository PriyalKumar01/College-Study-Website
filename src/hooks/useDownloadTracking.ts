import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDownloadTracking = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const trackDownload = async (
    noteTitle: string,
    noteUrl: string,
    semester?: string,
    subject?: string
  ) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access notes",
        variant: "destructive",
      });
      return false;
    }

    try {
      const metaFirst = user.user_metadata?.first_name || '';
      const metaLast = user.user_metadata?.last_name || '';
      const metaFull = user.user_metadata?.full_name || '';
      const userName = (metaFirst || metaLast) ? `${metaFirst} ${metaLast}`.trim() : (metaFull || user.email?.split('@')[0] || '');

      const { error } = await supabase
        .from('note_downloads')
        .insert({
          user_id: user.id,
          user_email: user.email || '',
          user_name: userName,
          note_title: noteTitle,
          note_url: noteUrl,
          semester,
          subject,
          ip_address: 'unknown',
          user_agent: navigator.userAgent,
        });

      if (error) {
        console.error('Error tracking download:', error);
        return true; // Allow download even if tracking fails
      }

      return true;
    } catch (error) {
      console.error('Error tracking download:', error);
      return true; // Allow download even if tracking fails
    }
  };

  return { trackDownload };
};