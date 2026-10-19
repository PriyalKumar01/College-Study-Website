import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

// Query exact profiles count via Supabase
export function useLiveStudentCount() {
  const [count, setCount] = useState<number>(() => {
    return getCachedData<number>('live_student_count', DEFAULT_CACHE_TTL_MS) || 2484;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLiveCount = async () => {
      const cached = getCachedData<number>('live_student_count', DEFAULT_CACHE_TTL_MS);
      if (cached) {
        setCount(cached);
        return;
      }

      try {
        // Query exact count from profiles table
        const { count: exactCount, error } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });

        if (!error && exactCount !== null && isMounted) {
          setCount(exactCount);
          setCachedData('live_student_count', exactCount);
        }
      } catch (err) {
        console.warn('Could not fetch live student count:', err);
      }
    };

    fetchLiveCount();
    return () => {
      isMounted = false;
    };
  }, []);

  const formattedK = `${(count / 1000).toFixed(1)}K+`;
  const formattedWithComma = count.toLocaleString('en-IN') + '+';

  return {
    rawCount: count,
    formattedK,
    formattedWithComma,
  };
}
