import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useCommunityNotes(category: string, semester?: string | string[]) {
  const [data, setData] = useState<any[]>([]);

  const fetchNotes = useCallback(async () => {
    try {
      let query = supabase
        .from('notes')
        .select('*')
        .eq('status', 'approved');

      if (semester) {
        if (Array.isArray(semester)) {
          query = query.in('semester', semester);
        } else {
          query = query.eq('semester', semester);
        }
      } else {
        query = query.eq('semester', category);
      }

      const { data: notes, error } = await query.order('uploaded_at', { ascending: false });

      if (!error && notes) {
        setData(notes);
      }
    } catch(e) {
      console.error("Failed to fetch community notes", e);
    }
  }, [category, semester]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { data, refetch: fetchNotes };
}

// Handles multi-semester string array querying via Supabase IN clause

// Queries study-materials storage bucket & supabase table
