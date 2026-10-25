import { useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface AutoScrollSubjectItem {
  id?: string;
  name: string;
  fullName?: string;
  code?: string;
}

const safeEscape = (str: string): string => {
  try {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
      return CSS.escape(str);
    }
  } catch {}
  return str.replace(/["\\]/g, '\\$&');
};

/**
 * Automatically scrolls to and highlights a subject card when opened via
 * a direct link containing ?subject=<id-or-name>.
 */
export function useSubjectAutoScroll<T extends AutoScrollSubjectItem>(
  subjects: T[] | undefined | null,
  onMatch?: (matchedSubject: T) => void
) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { toast } = useToast();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    if (!subjects || subjects.length === 0) return;

    // Check query parameter from multiple reliable sources
    const rawParam =
      searchParams.get('subject') ||
      new URLSearchParams(location.search).get('subject') ||
      (typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('subject')
        : null);

    if (!rawParam) return;

    const query = decodeURIComponent(rawParam).toLowerCase().trim();
    const queryAlnum = query.replace(/[^a-z0-9]/g, '');

    if (!queryAlnum) return;

    // Search for match by ID, Name, Full Name, or Code
    const matched = subjects.find(s => {
      const idRaw = (s.id || '').toLowerCase().trim();
      const idAlnum = idRaw.replace(/[^a-z0-9]/g, '');
      const nameRaw = (s.name || '').toLowerCase().trim();
      const nameAlnum = nameRaw.replace(/[^a-z0-9]/g, '');
      const fullRaw = (s.fullName || '').toLowerCase().trim();
      const fullAlnum = fullRaw.replace(/[^a-z0-9]/g, '');
      const codeAlnum = (s.code || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      return (
        idRaw === query ||
        idAlnum === queryAlnum ||
        nameRaw === query ||
        nameAlnum === queryAlnum ||
        fullRaw === query ||
        fullAlnum === queryAlnum ||
        (codeAlnum && codeAlnum === queryAlnum) ||
        (queryAlnum.length >= 3 && (nameAlnum.includes(queryAlnum) || queryAlnum.includes(nameAlnum))) ||
        (idAlnum && queryAlnum.length >= 2 && (idAlnum.includes(queryAlnum) || queryAlnum.includes(idAlnum)))
      );
    });

    if (matched) {
      hasTriggeredRef.current = true;

      // Smart polling retry mechanism to locate DOM element across renders & framer-motion animations
      let attempts = 0;
      const maxAttempts = 12;

      const checkAndScroll = () => {
        attempts++;
        const targetId = matched.id || matched.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        const el =
          document.getElementById(`subject-${targetId}`) ||
          (matched.id ? document.getElementById(`subject-${matched.id}`) : null) ||
          (matched.id ? document.querySelector(`[data-subject-id="${matched.id}"]`) : null) ||
          document.querySelector(`[data-subject-name="${safeEscape(matched.name)}"]`);

        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('csh-subject-highlight');

          toast({
            title: `🎯 ${matched.name}`,
            description: `Directly viewed ${matched.name} notes.`,
          });

          setTimeout(() => {
            el.classList.remove('csh-subject-highlight');
          }, 4500);

          if (onMatch) {
            try {
              onMatch(matched);
            } catch (err) {
              console.error('onMatch callback error:', err);
            }
          }
        } else if (attempts < maxAttempts) {
          setTimeout(checkAndScroll, 200);
        }
      };

      // Initial check after short delay for mount
      const initialTimer = setTimeout(checkAndScroll, 250);
      return () => clearTimeout(initialTimer);
    }
  }, [searchParams, location.search, subjects, onMatch, toast]);
}

export default useSubjectAutoScroll;
