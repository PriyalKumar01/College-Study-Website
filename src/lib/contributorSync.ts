import { supabase } from '@/integrations/supabase/client';
import { clearCachePrefix } from '@/lib/cacheUtils';

/**
 * Automatically increments an existing contributor's coin count or creates a
 * new contributor profile when study materials are approved or published.
 */
export async function syncContributorCount({
  name,
  email,
  count = 1,
  branch,
  batch,
}: {
  name?: string | null;
  email?: string | null;
  count?: number;
  branch?: string | null;
  batch?: string | null;
}) {
  let cleanName = (name || '').trim();
  if (!cleanName || cleanName.toLowerCase() === 'admin' || cleanName.toLowerCase() === 'owner') {
    cleanName = (email?.split('@')[0] || '').trim();
  }
  if (!cleanName || cleanName.toLowerCase() === 'admin' || cleanName.toLowerCase() === 'owner') {
    cleanName = email ? email : 'Community Contributor';
  }

  const cleanCount = Math.max(1, count);
  const cleanBranch = (branch || '').trim();
  const cleanBatch = (batch || '').trim();

  try {
    // 1. Attempt RPC first if migration has been executed
    const { error: rpcError } = await (supabase as any).rpc('increment_or_add_contributor', {
      p_name: cleanName,
      p_count: cleanCount,
      p_branch: cleanBranch,
      p_batch: cleanBatch,
    });

    if (!rpcError) {
      clearCachePrefix('contributors');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_contributors_updated'));
      }
      return;
    }
  } catch (err) {
    // Fall back to direct PostgREST operations
  }

  // 2. Direct fallback
  try {
    const { data: existing, error: selectErr } = await (supabase as any)
      .from('contributors')
      .select('id, name, coins')
      .ilike('name', cleanName)
      .limit(1)
      .maybeSingle();

    if (!selectErr && existing?.id) {
      const updatedCoins = (existing.coins || 0) + cleanCount;
      await (supabase as any)
        .from('contributors')
        .update({ coins: updatedCoins })
        .eq('id', existing.id);
    } else {
      await (supabase as any).from('contributors').insert({
        name: cleanName,
        role: 'Contributor',
        coins: cleanCount,
        branch: cleanBranch || 'Engineering',
        batch: cleanBatch || '28',
      });
    }

    clearCachePrefix('contributors');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('studyhub_contributors_updated'));
    }
  } catch (fallbackErr) {
    console.error('[syncContributorCount] Failed to sync contributor:', fallbackErr);
  }
}
