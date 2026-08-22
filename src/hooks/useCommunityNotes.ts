import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

export function useCommunityNotes(category: string, semester?: string | string[]) {
  const cacheKey = `notes_${category}_${Array.isArray(semester) ? semester.join('_') : (semester || 'all')}`;

  const [data, setData] = useState<any[]>(() => {
    return getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS) || [];
  });

  const fetchNotes = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS);
      if (cached) {
        setData(cached);
        return;
      }
    }

    try {
      let query = supabase
        .from('notes')
        .select('id, title, subject, semester, material_type, file_url, file_name, uploaded_at, user_name, uploaded_by, description, year')
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

      const { data: notes, error } = await query
        .order('uploaded_at', { ascending: false })
        .limit(100);

      if (!error && notes) {
        setCachedData(cacheKey, notes);
        setData(notes);
      }
    } catch (e) {
      console.error("Failed to fetch community notes", e);
    }
  }, [category, semester, cacheKey]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { data, refetch: () => fetchNotes(true) };
}
