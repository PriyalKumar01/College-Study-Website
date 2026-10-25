import { useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface AutoScrollSubjectItem {
  id?: string;
  name: string;
  fullName?: string;
  code?: string;
}

/**
 * Automatically scrolls to and highlights a subject card when opened via
 * a direct link containing ?subject=<id-or-name>.
 */
export function useSubjectAutoScroll<T extends AutoScrollSubjectItem>(
  subjects: T[],
  onMatch?: (matchedSubject: T) => void
) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { toast } = useToast();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Only trigger once per navigation
    if (hasScrolledRef.current) return;

    const rawParam =
      searchParams.get('subject') ||
      new URLSearchParams(location.search).get('subject') ||
      new URLSearchParams(window.location.search).get('subject');

    if (!rawParam || subjects.length === 0) return;

    const query = decodeURIComponent(rawParam).toLowerCase().trim();
    const queryAlnum = query.replace(/[^a-z0-9]/g, '');

    // Search for match by ID, Name, or Full Name
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
      hasScrolledRef.current = true;

      // Small delay allows React + framer-motion animations to complete mount
      const timer = setTimeout(() => {
        const targetId = matched.id || matched.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const el =
          document.getElementById(`subject-${targetId}`) ||
          document.getElementById(`subject-${matched.id}`) ||
          document.querySelector(`[data-subject-id="${matched.id}"]`) ||
          document.querySelector(`[data-subject-name="${CSS.escape(matched.name)}"]`);

        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Visual glowing highlight ring
          el.classList.add(
            'ring-4',
            'ring-emerald-500',
            'ring-offset-2',
            'ring-offset-background',
            'shadow-xl',
            'shadow-emerald-500/20',
            'transition-all',
            'duration-500'
          );

          toast({
            title: `🎯 Viewing ${matched.name}`,
            description: `Navigated directly to ${matched.name} notes.`,
          });

          setTimeout(() => {
            el.classList.remove(
              'ring-4',
              'ring-emerald-500',
              'ring-offset-2',
              'ring-offset-background',
              'shadow-xl',
              'shadow-emerald-500/20'
            );
          }, 4000);
        }

        if (onMatch) {
          onMatch(matched);
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [searchParams, location.search, subjects, onMatch, toast]);
}
