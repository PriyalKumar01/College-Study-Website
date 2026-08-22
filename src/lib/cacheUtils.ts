/**
 * Intelligent Client-Side Caching Utility
 * Provides TTL-based sessionStorage caching with in-memory fallback to drastically eliminate Supabase egress.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryStore = new Map<string, CacheEntry<any>>();

export const DEFAULT_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export function getCachedData<T>(key: string, ttlMs = DEFAULT_CACHE_TTL_MS): T | null {
  const now = Date.now();

  // Try sessionStorage first
  try {
    const item = sessionStorage.getItem(`csh_${key}`);
    if (item) {
      const parsed: CacheEntry<T> = JSON.parse(item);
      if (now - parsed.timestamp < ttlMs) {
        return parsed.data;
      } else {
        sessionStorage.removeItem(`csh_${key}`);
      }
    }
  } catch {
    // sessionStorage not available or parsing failed
  }

  // In-memory fallback
  const memItem = memoryStore.get(key);
  if (memItem) {
    if (now - memItem.timestamp < ttlMs) {
      return memItem.data;
    } else {
      memoryStore.delete(key);
    }
  }

  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(`csh_${key}`, JSON.stringify(entry));
  } catch {
    // sessionStorage quota exceeded or unavailable
  }

  memoryStore.set(key, entry);
}

export function removeCachedData(key: string): void {
  try {
    sessionStorage.removeItem(`csh_${key}`);
  } catch {}
  memoryStore.delete(key);
}

export function clearCachePrefix(prefix: string): void {
  try {
    const fullPrefix = `csh_${prefix}`;
    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(fullPrefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => sessionStorage.removeItem(k));
  } catch {}

  for (const k of memoryStore.keys()) {
    if (k.startsWith(prefix)) {
      memoryStore.delete(k);
    }
  }
}
