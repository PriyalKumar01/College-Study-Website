// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// ==============================================================================
// DUAL SUPABASE CONFIGURATION
// Active: Temporary Project (Handling peak load)
// Secondary: Archived Legacy Project
// ==============================================================================

export const MAIN_PROJECT = {
  url: "https://axalbmmjqdezbkpffore.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4YWxibW1qcWRlemJrcGZmb3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzI1NzEsImV4cCI6MjA2Njg0ODU3MX0.N52rlXiZJlmk6ZytFubOhsrkYW6MpvDRlo6NcKHKhHA"
};

export const TEMP_PROJECT = {
  url: "https://xjxdauvimiflzbozycki.supabase.co",
  anonKey: "sb_publishable_XANfm0ZXJ8nc-YOlKHxOJw_oyN2Hlb8"
};

// Active Production Project: xjxdauvimiflzbozycki
export const USE_TEMP_PROJECT = true;

const activeConfig = USE_TEMP_PROJECT ? TEMP_PROJECT : MAIN_PROJECT;
const secondaryConfig = USE_TEMP_PROJECT ? MAIN_PROJECT : TEMP_PROJECT;

export const SUPABASE_URL = activeConfig.url;
export const SUPABASE_PUBLISHABLE_KEY = activeConfig.anonKey;

// Primary active Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Secondary Supabase client for mirroring & synchronization
export const supabaseSecondary = createClient<Database>(secondaryConfig.url, secondaryConfig.anonKey, {
  auth: {
    storageKey: 'studyhub_secondary_auth',
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  }
});

/**
 * Dual-write synchronization helper:
 * Writes to primary client first, and mirrors to secondary client asynchronously.
 * Never fails primary write even if secondary server is offline/paused.
 */
export async function dualWriteTable(
  tableName: keyof Database['public']['Tables'],
  action: 'insert' | 'upsert' | 'update',
  payload: any,
  matchKey?: { column: string; value: any }
) {
  // 1. Primary write
  let primaryPromise: Promise<any>;
  if (action === 'upsert') {
    primaryPromise = (supabase.from(tableName as any) as any).upsert(payload);
  } else if (action === 'insert') {
    primaryPromise = (supabase.from(tableName as any) as any).insert(payload);
  } else {
    primaryPromise = (supabase.from(tableName as any) as any).update(payload).eq(matchKey?.column, matchKey?.value);
  }

  const primaryResult = await primaryPromise;

  // 2. Secondary write in background (silent fallback if secondary project is paused)
  (async () => {
    try {
      if (action === 'upsert') {
        await (supabaseSecondary.from(tableName as any) as any).upsert(payload);
      } else if (action === 'insert') {
        await (supabaseSecondary.from(tableName as any) as any).insert(payload);
      } else if (matchKey) {
        await (supabaseSecondary.from(tableName as any) as any).update(payload).eq(matchKey.column, matchKey.value);
      }
    } catch {
      // Secondary server is offline/paused; ignore silently
    }
  })();

  return primaryResult;
}