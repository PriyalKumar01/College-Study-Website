// Universal Note Recommendation Manager (Owner Star Toggle & Synchronized Badges)
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY_RECOMMENDED = 'studyhub_recommended_items';
const STORAGE_KEY_UNRECOMMENDED = 'studyhub_unrecommended_items';

export function getNoteKey(note: { id?: string; url?: string; title?: string }): string {
  if (note.id && typeof note.id === 'string' && note.id.trim() !== '') {
    return note.id.trim();
  }
  if (note.url && typeof note.url === 'string' && note.url.trim() !== '' && note.url !== '#') {
    return note.url.trim();
  }
  return (note.title || '').trim().toLowerCase();
}

function loadLocalSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return new Set(arr);
    }
  } catch {}
  return new Set();
}

function saveLocalSet(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch {}
}

export function useRecommendations() {
  const [recommendedKeys, setRecommendedKeys] = useState<Set<string>>(() => loadLocalSet(STORAGE_KEY_RECOMMENDED));
  const [unrecommendedKeys, setUnrecommendedKeys] = useState<Set<string>>(() => loadLocalSet(STORAGE_KEY_UNRECOMMENDED));

  // Sync from Supabase on mount (graceful fallback if table doesn't exist yet)
  useEffect(() => {
    let isMounted = true;

    const fetchRemoteRecommendations = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('recommended_notes')
          .select('item_key, is_recommended');

        if (!error && Array.isArray(data) && isMounted) {
          const recSet = new Set<string>();
          const unrecSet = new Set<string>();

          data.forEach((row: any) => {
            if (row.is_recommended) {
              recSet.add(row.item_key);
            } else {
              unrecSet.add(row.item_key);
            }
          });

          // Merge with local storage
          const mergedRec = new Set([...loadLocalSet(STORAGE_KEY_RECOMMENDED), ...recSet]);
          const mergedUnrec = new Set([...loadLocalSet(STORAGE_KEY_UNRECOMMENDED), ...unrecSet]);

          setRecommendedKeys(mergedRec);
          setUnrecommendedKeys(mergedUnrec);
          saveLocalSet(STORAGE_KEY_RECOMMENDED, mergedRec);
          saveLocalSet(STORAGE_KEY_UNRECOMMENDED, mergedUnrec);
        }
      } catch {
        // Table not created yet or offline, continue with localStorage seamlessly
      }
    };

    fetchRemoteRecommendations();

    const handleUpdate = () => {
      setRecommendedKeys(loadLocalSet(STORAGE_KEY_RECOMMENDED));
      setUnrecommendedKeys(loadLocalSet(STORAGE_KEY_UNRECOMMENDED));
    };

    window.addEventListener('studyhub_recommendations_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('studyhub_recommendations_updated', handleUpdate);
    };
  }, []);

  const isRecommended = useCallback(
    (note: { id?: string; url?: string; title?: string; recommended?: boolean }): boolean => {
      const key = getNoteKey(note);
      if (unrecommendedKeys.has(key)) return false;
      if (recommendedKeys.has(key)) return true;
      return Boolean(note.recommended);
    },
    [recommendedKeys, unrecommendedKeys]
  );

  const toggleRecommendation = useCallback(
    async (note: { id?: string; url?: string; title?: string; recommended?: boolean }) => {
      const key = getNoteKey(note);
      const currentlyRec = isRecommended(note);
      const newRecState = !currentlyRec;

      const newRecSet = new Set(recommendedKeys);
      const newUnrecSet = new Set(unrecommendedKeys);

      if (newRecState) {
        newRecSet.add(key);
        newUnrecSet.delete(key);
      } else {
        newRecSet.delete(key);
        newUnrecSet.add(key);
      }

      setRecommendedKeys(newRecSet);
      setUnrecommendedKeys(newUnrecSet);
      saveLocalSet(STORAGE_KEY_RECOMMENDED, newRecSet);
      saveLocalSet(STORAGE_KEY_UNRECOMMENDED, newUnrecSet);

      // Notify other components & tabs
      window.dispatchEvent(new CustomEvent('studyhub_recommendations_updated'));

      // Persist to Supabase if possible
      try {
        await (supabase as any)
          .from('recommended_notes')
          .upsert(
            {
              item_key: key,
              note_title: note.title || '',
              is_recommended: newRecState,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'item_key' }
          );
      } catch {}

      return newRecState;
    },
    [isRecommended, recommendedKeys, unrecommendedKeys]
  );

  const removeRecommendation = useCallback(
    async (note: { id?: string; url?: string; title?: string; recommended?: boolean }) => {
      const key = getNoteKey(note);
      const newRecSet = new Set(recommendedKeys);
      const newUnrecSet = new Set(unrecommendedKeys);

      newRecSet.delete(key);
      newUnrecSet.add(key);

      setRecommendedKeys(newRecSet);
      setUnrecommendedKeys(newUnrecSet);
      saveLocalSet(STORAGE_KEY_RECOMMENDED, newRecSet);
      saveLocalSet(STORAGE_KEY_UNRECOMMENDED, newUnrecSet);

      window.dispatchEvent(new CustomEvent('studyhub_recommendations_updated'));

      try {
        await (supabase as any)
          .from('recommended_notes')
          .upsert(
            {
              item_key: key,
              note_title: note.title || '',
              is_recommended: false,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'item_key' }
          );
      } catch {}
    },
    [recommendedKeys, unrecommendedKeys]
  );

  return {
    isRecommended,
    toggleRecommendation,
    removeRecommendation,
  };
}
