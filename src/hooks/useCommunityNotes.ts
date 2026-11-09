// Community notes fetching and caching hook (Zero-Egress & Anti-Loop Protected)
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';
import { normalizeToZeroEgressUrl, isSupabaseStorageUrl } from '@/lib/downloadUtils';

export function useCommunityNotes(category: string, semester?: string | string[]) {
  // Stable serialized key: prevents infinite re-render loops when inline arrays are passed
  const semesterKey = Array.isArray(semester)
    ? [...semester].sort().join('|')
    : (semester || 'all');

  const cacheKey = `notes_${category}_${semesterKey}`;

  // Keep a stable ref to semester query filter to prevent callback invalidation
  const semesterRef = useRef(semester);
  semesterRef.current = semester;

  const [data, setData] = useState<any[]>(() => {
    const cached = getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS) || [];
    return cached.filter(
      note => note?.file_url && note.file_url !== '#' && note.material_type !== 'subject_placeholder'
    );
  });

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchNotes = useCallback(async (forceRefresh = false) => {
    // 1. Instant cache check (Zero Supabase Egress & Log Ingestion when cache is valid)
    if (!forceRefresh) {
      const cached = getCachedData<any[]>(cacheKey, DEFAULT_CACHE_TTL_MS);
      if (cached !== null && cached.length >= 0) {
        setData(cached);
        return; // Return immediately to prevent hammering Supabase on every render
      }
    }

    try {
      let query = supabase
        .from('notes')
        .select('id, title, subject, semester, material_type, file_url, file_name, uploaded_at, user_name, uploaded_by, description, year, status, approved')
        .eq('status', 'approved');

      const activeSemester = semesterRef.current;
      if (activeSemester) {
        if (Array.isArray(activeSemester)) {
          query = query.in('semester', activeSemester);
        } else {
          query = query.eq('semester', activeSemester);
        }
      } else {
        query = query.eq('semester', category);
      }

      const { data: notes, error } = await query
        .order('uploaded_at', { ascending: false })
        .limit(100);

      if (!error && notes && isMountedRef.current) {
        // Sanitize: filter out placeholders and ensure all URLs route through zero-egress Cloudflare R2
        const sanitizedNotes = notes
          .filter((note) => {
            if (!note.file_url || note.file_url === '#' || note.file_url.trim() === '') return false;
            if (note.material_type === 'subject_placeholder') return false;
            return true;
          })
          .map((note) => {
            if (isSupabaseStorageUrl(note.file_url)) {
              return { ...note, file_url: normalizeToZeroEgressUrl(note.file_url) };
            }
            return note;
          });

        setCachedData(cacheKey, sanitizedNotes);
        setData(sanitizedNotes);
      }
    } catch (e) {
      console.error("Failed to fetch community notes", e);
    }
  }, [category, semesterKey, cacheKey]);

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
