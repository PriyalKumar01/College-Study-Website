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
    // Check cache first: if fresh data is in cache, return immediately to eliminate egress
    if (!forceRefresh) {
      const cached = getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS);
      if (cached !== null) {
        setData(cached);
        return;
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
        // Sanitize: filter out broken server entries that have working duplicates or are unreachable
        const sanitizedNotes = notes.filter((note, idx, arr) => {
          if (!note.file_url) return false;
          // If note is on blocked server, check if active working note exists
          if (note.file_url.includes('axalbmmjqdezbkpffore')) {
            const hasWorkingReplacement = arr.some(
              other =>
                other.id !== note.id &&
                !other.file_url.includes('axalbmmjqdezbkpffore') &&
                (other.title?.toLowerCase().trim() === note.title?.toLowerCase().trim() ||
                  (other.file_name && other.file_name === note.file_name))
            );
            if (hasWorkingReplacement) return false; // exclude broken duplicate
          }
          return true;
        });

        setCachedData(cacheKey, sanitizedNotes);
        setData(sanitizedNotes);
      }
    } catch (e) {
      console.error("Failed to fetch community notes", e);
    }
  }, [category, semester, cacheKey]);

  useEffect(() => {
    fetchNotes();

    // Listen for local events (e.g. approval, upload, subject creation)
    const handleLocalUpdate = () => {
      fetchNotes(true);
    };
    window.addEventListener('studyhub_notes_updated', handleLocalUpdate);

    return () => {
      window.removeEventListener('studyhub_notes_updated', handleLocalUpdate);
    };
  }, [fetchNotes]);

  return { data, refetch: () => fetchNotes(true) };
}
