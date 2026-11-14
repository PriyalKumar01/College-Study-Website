// Presence: active student counter with stale-while-revalidate caching
// Live student presence counter hook
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCachedData, setCachedData } from '@/lib/cacheUtils';

// Verified student base count in primary database: 3,290 registered students
export const BASELINE_STUDENT_COUNT = 3290;
const CACHE_TTL_ONE_HOUR = 3600000; // 1 hour to prevent unnecessary egress

export function useLiveStudentCount() {
  const [count, setCount] = useState<number>(() => {
    return getCachedData<number>('live_student_count', CACHE_TTL_ONE_HOUR) || BASELINE_STUDENT_COUNT;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLiveCount = async () => {
      const cached = getCachedData<number>('live_student_count', CACHE_TTL_ONE_HOUR);
      if (cached && cached >= BASELINE_STUDENT_COUNT) {
        setCount(cached);
        return;
      }

      try {
        // 1. Try public RPC function
        const { data: rpcCount, error: rpcError } = await (supabase as any).rpc('get_user_count');
        if (!rpcError && typeof rpcCount === 'number' && rpcCount > 0 && isMounted) {
          setCount(rpcCount);
          setCachedData('live_student_count', rpcCount);
          return;
        }

        // 2. Query exact count from profiles table
        const { count: exactCount, error } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });

        if (!error && exactCount !== null && exactCount > 0 && isMounted) {
          setCount(exactCount);
          setCachedData('live_student_count', exactCount);
        } else if (isMounted) {
          setCount(BASELINE_STUDENT_COUNT);
        }
      } catch (err) {
        if (isMounted) {
          setCount(BASELINE_STUDENT_COUNT);
        }
      }
    };

    fetchLiveCount();
    return () => {
      isMounted = false;
    };
  }, []);

  const formattedK = `${(count / 1000).toFixed(2)}K+`;
  const formattedWithComma = count.toLocaleString('en-IN') + '+';

  return {
    rawCount: count,
    formattedK,
    formattedWithComma,
  };
}
