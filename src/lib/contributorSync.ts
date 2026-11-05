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
  const cleanEmail = (email || '').trim().toLowerCase();
  const inputName = (name || '').trim();

  // OWNER CHECK: Never add or count the platform owner in the contributor list
  const isOwnerAccount =
    cleanEmail === 'priyalkumar06@gmail.com' ||
    cleanEmail.includes('priyalkumar') ||
    inputName.toLowerCase() === 'priyal' ||
    inputName.toLowerCase().startsWith('priyal ') ||
    inputName.toLowerCase() === 'owner';

  if (isOwnerAccount) {
    console.log('[syncContributorCount] Platform owner detected — skipping contributor list addition.');
    return null;
  }

  const cleanCount = Math.max(1, Math.round(Number(count) || 1));
  let cleanBranch = (branch || '').trim();
  let cleanBatch = (batch || '').trim().replace(/^'+/, ''); // normalize '28 -> 28

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
      .select('user_name, user_email, role')
      .neq('role', 'removed');

    if (adminRoles && Array.isArray(adminRoles) && adminRoles.length > 0) {
      // If role is owner or super_admin, skip immediately
      const ownerAdmin = adminRoles.find((a: any) => 
        (cleanEmail && a.user_email?.toLowerCase() === cleanEmail) && 
        (a.role === 'owner' || a.role === 'super_admin' || a.user_email?.toLowerCase() === 'priyalkumar06@gmail.com')
      );
      if (ownerAdmin) {
        console.log('[syncContributorCount] Admin is owner, skipping contributor sync.');
        return null;
      }

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
      .select('id, name, branch, batch, coins, email');

    if (!fetchErr && Array.isArray(existingContribs) && existingContribs.length > 0) {
      const targetLower = resolvedName.toLowerCase().replace(/\s+/g, ' ').trim();
      const targetParts = targetLower.split(' ').filter(Boolean);
      const targetFirstName = targetParts[0] || '';
      const normTarget = targetLower.replace(/[^a-z0-9]/g, '');

      // Helper to check name equivalence (e.g. kanujiya vs kanaujia)
      const isNameEquivalent = (a: string, b: string) => {
        const aClean = a.toLowerCase().replace(/kanujiya/g, 'kanaujia').replace(/[^a-z0-9]/g, '');
        const bClean = b.toLowerCase().replace(/kanujiya/g, 'kanaujia').replace(/[^a-z0-9]/g, '');
        return aClean === bClean || (aClean.length > 4 && (aClean.includes(bClean) || bClean.includes(aClean)));
      };

      // Match Strategy 1: Email match (highest fidelity)
      let matched = cleanEmail
        ? existingContribs.find((c: any) => c.email && c.email.toLowerCase().trim() === cleanEmail)
        : null;

      // Match Strategy 2: Exact or normalized name equivalence (handles spelling variants like Kanujiya / Kanaujia)
      if (!matched) {
        matched = existingContribs.find((c: any) => {
          const cLower = (c.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
          if (cLower === targetLower) return true;
          return isNameEquivalent(c.name || '', resolvedName);
        });
      }

      // Match Strategy 3: Admin name or first name + branch match
      if (!matched && targetFirstName.length > 2) {
        matched = existingContribs.find((c: any) => {
          const cLower = (c.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
          const cFirst = cLower.split(' ').filter(Boolean)[0] || '';
          const cBranch = (c.branch || '').toUpperCase().trim();
          const qBranch = (cleanBranch || '').toUpperCase().trim();

          // E.g. "Asad" matching "Mo. Asad Idrishi"
          if (cLower.includes(targetFirstName) || targetLower.includes(cFirst)) {
            if (!qBranch || !cBranch || cBranch === 'ENGINEERING' || cBranch === qBranch) {
              return true;
            }
          }

          // Same first name and same branch (e.g. Ananya CSE)
          if (cFirst === targetFirstName && qBranch && cBranch === qBranch) {
            return true;
          }

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

        const updatePayload: Record<string, any> = {
          coins: updatedCoins,
        };

        // Link email if missing
        if (cleanEmail && !matched.email) {
          updatePayload.email = cleanEmail;
        }

        // Clean up placeholder branch/batch if better info is available
        if (cleanBranch && (!matched.branch || matched.branch.toLowerCase().includes('first year') || matched.branch.toLowerCase().includes('all subjects') || matched.branch.toLowerCase().includes('semester') || matched.branch.toLowerCase() === 'engineering')) {
          updatePayload.branch = cleanBranch;
        }
        if (cleanBatch && (!matched.batch || matched.batch === '1st' || matched.batch === '2nd' || matched.batch.length < 2)) {
          updatePayload.batch = cleanBatch;
        }

        await (supabase as any)
          .from('contributors')
          .update(updatePayload)
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
        email: cleanEmail || null,
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
// Reviewed: academic catalog & interface consistency check (v2.0.139)
