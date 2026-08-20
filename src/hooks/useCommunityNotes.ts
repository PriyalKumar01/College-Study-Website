import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// In-memory cache for community notes with 5-minute TTL to eliminate repeat egress
const notesCache = new Map<string, { data: any[]; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export function useCommunityNotes(category: string, semester?: string | string[]) {
  const [data, setData] = useState<any[]>(() => {
    const cacheKey = `${category}-${Array.isArray(semester) ? semester.join(',') : (semester || '')}`;
    const cached = notesCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
    return [];
  });

  const fetchNotes = useCallback(async (forceRefresh = false) => {
    const cacheKey = `${category}-${Array.isArray(semester) ? semester.join(',') : (semester || '')}`;
    const cached = notesCache.get(cacheKey);

    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      setData(cached.data);
      return;
    }

    try {
      let query = supabase
        .from('notes')
        .select('id, title, subject, semester, material_type, file_url, file_name, uploaded_at, user_name, description, year')
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
        notesCache.set(cacheKey, { data: notes, timestamp: Date.now() });
        setData(notes);
      }
    } catch(e) {
      console.error("Failed to fetch community notes", e);
    }
  }, [category, semester]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { data, refetch: () => fetchNotes(true) };
}
