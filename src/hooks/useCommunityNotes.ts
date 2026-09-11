import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

export function useCommunityNotes(category: string, semester?: string | string[]) {
  const cacheKey = `notes_${category}_${Array.isArray(semester) ? semester.join('_') : (semester || 'all')}`;

  const [data, setData] = useState<any[]>(() => {
    return getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS) || [];
  });

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchNotes = useCallback(async (forceRefresh = false) => {
    // Stale-While-Revalidate: serve cached data immediately for instant load
    if (!forceRefresh) {
      const cached = getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS);
      if (cached && cached.length > 0) {
        setData(cached);
      }
    }

    try {
      let query = supabase
        .from('notes')
        .select('id, title, subject, semester, material_type, file_url, file_name, uploaded_at, user_name, uploaded_by, description, year, status, approved')
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

      if (!error && notes && isMountedRef.current) {
        setCachedData(cacheKey, notes);
        setData(notes);
      }
    } catch (e) {
      console.error("Failed to fetch community notes", e);
    }
  }, [category, semester, cacheKey]);

  useEffect(() => {
    fetchNotes();

    // 1. Listen for local events (e.g. approval, upload, subject creation)
    const handleLocalUpdate = () => {
      fetchNotes(true);
    };
    window.addEventListener('studyhub_notes_updated', handleLocalUpdate);

    // 2. Supabase Realtime channel for live sync across all tabs/users
    const semKey = Array.isArray(semester) ? semester.join('_') : (semester || category);
    const channelName = `notes_live_${semKey.replace(/[^a-zA-Z0-9]/g, '_')}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notes' },
        () => {
          fetchNotes(true);
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('studyhub_notes_updated', handleLocalUpdate);
      supabase.removeChannel(channel);
    };
  }, [fetchNotes, category, semester]);

  return { data, refetch: () => fetchNotes(true) };
}
