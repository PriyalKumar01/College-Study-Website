import { supabase } from '@/integrations/supabase/client';
import { clearCachePrefix, removeCachedData } from '@/lib/cacheUtils';
import { getLeagueUpgradeInfo } from '@/lib/contributorBadgeUtils';

export interface ContributorSyncResult {
  isNew: boolean;
  tierUpgraded: boolean;
  oldTier: string | null;
  newTier: string;
  tierBadge: string;
  name: string;
  coins: number;
}

/**
 * Automatically increments an existing contributor's coin count or creates a
 * new contributor profile when study materials are approved or published.
 * 
 * - If contributor (or admin) already exists in the contributor list:
 *   Only increments their existing coin count by the number of uploaded PDFs.
 *   Never creates duplicate entries repeatedly.
 * - If 1st time contributor (not in contributor list):
 *   Adds them to the contributor list with the uploaded PDF count.
 *   Instant celebration pop-up is displayed to the contributor on milestone upgrade.
 */
export function parseAdminDetails(rawAdminName?: string | null): { name: string; branch: string; batch: string } {
  if (!rawAdminName) return { name: '', branch: '', batch: '' };
  const raw = rawAdminName.trim();
  // Format 1: "Mo. Asad Idrishi IT'30" or "Manya Singh BS-MS'29"
  const m1 = raw.match(/^(.*?)\s+([A-Za-z]+(?:-[A-Za-z]+)?)'(\d{2})$/);
  if (m1) {
    return { name: m1[1].trim(), branch: m1[2].trim(), batch: m1[3].trim() };
  }
  // Format 2: "Mo. Asad Idrishi IT 30" or "Arjun Gupta CHE '28"
  const m2 = raw.match(/^(.*?)\s+([A-Za-z]+(?:-[A-Za-z]+)?)\s+'?(\d{2})$/);
  if (m2) {
    return { name: m2[1].trim(), branch: m2[2].trim(), batch: m2[3].trim() };
  }
  return { name: raw, branch: '', batch: '' };
}

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
}): Promise<ContributorSyncResult | null> {
  const cleanCount = Math.max(1, Math.round(Number(count) || 1));
  let cleanBranch = (branch || '').trim();
  let cleanBatch = (batch || '').trim().replace(/^'+/, ''); // normalize '28 -> 28
  const cleanEmail = (email || '').trim().toLowerCase();
  let inputName = (name || '').trim();

  // Strip invalid/placeholder branch strings
  if (
    cleanBranch.toLowerCase().includes('first year') ||
    cleanBranch.toLowerCase().includes('all subjects') ||
    cleanBranch.toLowerCase().includes('semester') ||
    cleanBranch.toLowerCase() === 'all'
  ) {
    cleanBranch = '';
  }

  // Strip invalid placeholder batch (e.g. "1st", "2nd")
  if (cleanBatch === '1st' || cleanBatch === '2nd' || cleanBatch.length < 2) {
    cleanBatch = '';
  }

  let resolvedName = inputName;

  // 1. Resolve canonical name, branch, and batch from admin_roles or profiles
  try {
    const { data: adminRoles } = await (supabase as any)
      .from('admin_roles')
      .select('user_name, user_email')
      .neq('role', 'removed');

    if (adminRoles && Array.isArray(adminRoles) && adminRoles.length > 0) {
      // Find matching admin by email or name
      const matchedAdmin = adminRoles.find((a: any) => {
        const aEmail = (a.user_email || '').toLowerCase().trim();
        if (cleanEmail && aEmail === cleanEmail) return true;
        if (inputName) {
          const parsed = parseAdminDetails(a.user_name);
          const pNameLower = parsed.name.toLowerCase();
          const inLower = inputName.toLowerCase();
          if (pNameLower === inLower) return true;
          if (inLower.length > 2 && (pNameLower.includes(inLower) || inLower.includes(pNameLower))) return true;
        }
        return false;
      });

      if (matchedAdmin && matchedAdmin.user_name) {
        const parsed = parseAdminDetails(matchedAdmin.user_name);
        if (parsed.name) resolvedName = parsed.name;
        if (parsed.branch && (!cleanBranch || cleanBranch === 'Engineering')) cleanBranch = parsed.branch;
        if (parsed.batch) cleanBatch = parsed.batch;
      }
    }
  } catch (e) {
    console.warn('[syncContributorCount] Could not query admin_roles:', e);
  }

  // If still missing or generic, check profiles table
  if (cleanEmail && (!resolvedName || resolvedName.toLowerCase() === 'admin' || resolvedName.toLowerCase() === 'owner')) {
    try {
      const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('first_name, last_name, branch')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (profile) {
        const profileFullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim();
        if (profileFullName) resolvedName = profileFullName;
        if (!cleanBranch && profile.branch) cleanBranch = profile.branch;
      }
    } catch (e) {
      // ignore
    }
  }

  // Fallbacks if still generic or empty
  if (!resolvedName || resolvedName.toLowerCase() === 'admin' || resolvedName.toLowerCase() === 'owner') {
    resolvedName = cleanEmail ? cleanEmail.split('@')[0] : 'Community Contributor';
  }

  try {
    // 2. Fetch current contributors to perform robust fuzzy & exact matching
    const { data: existingContribs, error: fetchErr } = await (supabase as any)
      .from('contributors')
      .select('id, name, branch, batch, coins');

    if (!fetchErr && Array.isArray(existingContribs) && existingContribs.length > 0) {
      const targetLower = resolvedName.toLowerCase().replace(/\s+/g, ' ').trim();
      const targetParts = targetLower.split(' ').filter(Boolean);

      // Match Strategy A: Exact match (case-insensitive & whitespace trimmed)
      let matched = existingContribs.find((c: any) => {
        const cLower = (c.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
        return cLower === targetLower;
      });

      // Match Strategy B: Admin team matching or first/last name overlap
      if (!matched && targetParts.length > 0) {
        matched = existingContribs.find((c: any) => {
          const cLower = (c.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
          if (cLower === targetLower) return true;
          // E.g. "Rahul" matches "Rahul Singh" or "Devanshi" matches "Devanshi Saxena"
          if (targetParts.length === 1 && cLower.startsWith(targetParts[0] + ' ')) return true;
          if (cLower.split(' ').length === 1 && targetLower.startsWith(cLower + ' ')) return true;
          return false;
        });
      }

      // If matched: Update ONLY existing record count (DO NOT duplicate!)
      if (matched) {
        const previousCoins = Number(matched.coins) || 0;
        const updatedCoins = previousCoins + cleanCount;
        const oldLeague = getLeagueUpgradeInfo(previousCoins);
        const newLeague = getLeagueUpgradeInfo(updatedCoins);
        const tierUpgraded = oldLeague.tierName !== newLeague.tierName;

        await (supabase as any)
          .from('contributors')
          .update({
            coins: updatedCoins,
            ...(cleanBranch && (!matched.branch || matched.branch.toLowerCase().includes('first year') || matched.branch.toLowerCase().includes('all subjects') || matched.branch.toLowerCase().includes('semester')) ? { branch: cleanBranch } : {}),
            ...(cleanBatch && (!matched.batch || matched.batch === '1st' || matched.batch === '2nd' || matched.batch.length < 2) ? { batch: cleanBatch } : {}),
          })
          .eq('id', matched.id);

        clearCachePrefix('contributors');
        removeCachedData('contributors_list');
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('studyhub_contributors_updated'));
          if (tierUpgraded) {
            window.dispatchEvent(new CustomEvent('studyhub_contributor_milestone', {
              detail: {
                isNew: false,
                contributorName: matched.name,
                coins: updatedCoins,
                tierName: newLeague.badgeLabel,
                oldTier: oldLeague.tierName,
                newTier: newLeague.tierName,
              }
            }));
          }
        }

        return {
          isNew: false,
          tierUpgraded,
          oldTier: oldLeague.tierName,
          newTier: newLeague.tierName,
          tierBadge: newLeague.badgeLabel,
          name: matched.name,
          coins: updatedCoins,
        };
      }
    }

    // 3. If no match found: This is a 1st time contributor (new admin/student upload)
    const newLeague = getLeagueUpgradeInfo(cleanCount);
    const { data: newEntry, error: insertErr } = await (supabase as any)
      .from('contributors')
      .insert({
        name: resolvedName,
        role: 'Contributor',
        coins: cleanCount,
        branch: cleanBranch || 'Engineering',
        batch: cleanBatch || '28',
      })
      .select()
      .maybeSingle();

    if (insertErr) {
      console.error('[syncContributorCount] Error inserting new contributor:', insertErr);
    }

    // No global notification insert — celebration pop-up is shown directly to the contributor only

    clearCachePrefix('contributors');
    removeCachedData('contributors_list');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('studyhub_contributors_updated'));
      window.dispatchEvent(new CustomEvent('studyhub_contributor_milestone', {
        detail: {
          isNew: true,
          contributorName: resolvedName,
          coins: cleanCount,
          tierName: newLeague.badgeLabel,
          oldTier: null,
          newTier: newLeague.tierName,
        }
      }));
    }

    return {
      isNew: true,
      tierUpgraded: true,
      oldTier: null,
      newTier: newLeague.tierName,
      tierBadge: newLeague.badgeLabel,
      name: resolvedName,
      coins: cleanCount,
    };
  } catch (err) {
    console.error('[syncContributorCount] Unhandled error:', err);
    return null;
  }
}
