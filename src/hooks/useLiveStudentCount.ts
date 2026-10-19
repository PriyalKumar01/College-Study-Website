import { useState, useEffect } from 'react';
import { getCachedData, setCachedData, DEFAULT_CACHE_TTL_MS } from '@/lib/cacheUtils';

export function useLiveStudentCount() {
  const [count, setCount] = useState<number>(() => getCachedData<number>('live_student_count', DEFAULT_CACHE_TTL_MS) || 2484);
  return { rawCount: count, formattedK: '2.5K+', formattedWithComma: '2,484+' };
}
