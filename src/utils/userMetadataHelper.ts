import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface StandardUserMetadata {
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  college: string;
  branch: string;
  year: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  profile_completed: boolean;
  [key: string]: any;
}

/**
 * Checks if an email address belongs to the official HBTU student/faculty domain.
 */
export function isHbtuEmail(emailOrRoll: string): boolean {
  if (!emailOrRoll) return false;
  const clean = emailOrRoll.toLowerCase().trim();
  return clean.endsWith('@hbtu.ac.in') || clean.includes('@hbtu.ac.in');
}

/**
 * Calculates a default estimated passing year for an HBTU student based on their roll number prefix.
 * e.g., '24XXXX...' (admitted 2024) -> 2028 graduating year (+4 years for standard B.Tech).
 * '26XXXX...' (admitted 2026) -> 2030 graduating year.
 * NOTE: This is ONLY provided as an editable initial suggestion in the UI form.
 * Students can freely change it if they are Lateral Entry, M.Tech, MCA, or PhD.
 * BRANCH IS NEVER AUTO-DETECTED.
 */
export function getHbtuSuggestedPassingYear(emailOrRoll: string): string {
  if (!emailOrRoll) return '';
  const clean = emailOrRoll.toLowerCase().trim();
  const username = clean.includes('@') ? clean.split('@')[0] : clean;
  // Match first 2 digits of roll number: e.g. '240104...' -> 24 -> 2024 + 4 = 2028
  const match = username.match(/^(\d{2})/);
  if (match) {
    const startYear = parseInt(match[1], 10);
    // Realistic admission years: 2015 to 2035
    if (startYear >= 15 && startYear <= 35) {
      const gradYear = 2000 + startYear + 4;
      return String(gradYear);
    }
  }
  return '';
}

/**
 * Backward-compatible helper for HBTU email recognition.
 * NOTE: Heuristic branch auto-detection from roll numbers has been completely
 * removed. Users must explicitly choose their own branch.
 */
export function parseHbtuRollNumber(emailOrRoll: string): { college: string; year: string; branch: string } | null {
  if (!emailOrRoll) return null;
  if (!isHbtuEmail(emailOrRoll)) return null;

  return {
    college: 'HBTU Kanpur',
    year: getHbtuSuggestedPassingYear(emailOrRoll),
    branch: '',
  };
}

/**
 * Validates that an academic field (college, branch, year) is real and not a test placeholder,
 * null string, or empty.
 */
export function isValidAcademicField(value?: string | null): boolean {
  if (!value) return false;
  const s = value.trim().toLowerCase();
  if (!s || s === 'not set' || s === 'null' || s === 'undefined' || s === 'none' || s === 'n/a' || s === '-' || s === 'user') return false;
  return true;
}

/**
 * Derives a clean display name from user metadata, handling GitHub OAuth users
 * who might not have set a public display name on GitHub.
 */
export function resolveCleanUserName(meta: Record<string, any> = {}, email: string = ''): {
  fullName: string;
  firstName: string;
  lastName: string;
} {
  let rawName = (meta.full_name || meta.name || '').trim();

  if (!rawName) {
    const rawFallback = meta.user_name || meta.preferred_username || (email ? email.split('@')[0] : '') || 'User';
    // Clean string by converting hyphens/underscores/dots to spaces and capitalizing words
    rawName = rawFallback
      .replace(/[._-]+/g, ' ')
      .replace(/\b[a-z]/g, (char) => char.toUpperCase())
      .trim();
  }

  const parts = rawName.split(/\s+/).filter(Boolean);
  const firstName = (meta.first_name || parts[0] || 'User').trim();
  const lastName = (meta.last_name || parts.slice(1).join(' ') || '').trim();
  const fullName = rawName || `${firstName} ${lastName}`.trim();

  return { fullName, firstName, lastName };
}

/**
 * Builds the complete standardized user metadata dictionary ensuring that all
 * keys (name, full_name, first_name, last_name, college, branch, year, email,
 * email_verified, phone_verified, profile_completed) are ALWAYS present.
 */
export function buildStandardizedUserMetadata(
  user: User,
  profileData?: { first_name?: string; last_name?: string; college?: string; branch?: string; year?: string } | null
): StandardUserMetadata {
  const meta = user.user_metadata || {};
  const email = (user.email || '').toLowerCase().trim();
  const isHbtu = isHbtuEmail(email);

  const { fullName, firstName, lastName } = resolveCleanUserName(meta, email);

  // Priority: profile table > metadata > default empty string
  const rawCollege = (profileData?.college || meta.college || '').trim();
  const rawBranch = (profileData?.branch || meta.branch || '').trim();
  const rawYear = (profileData?.year || meta.year || '').trim();

  let college = isValidAcademicField(rawCollege) ? rawCollege : '';
  let branch = isValidAcademicField(rawBranch) ? rawBranch : '';
  let year = isValidAcademicField(rawYear) ? rawYear : '';

  if (isHbtu && !college) {
    college = 'HBTU Kanpur';
  }
  // NOTE: Branch is NEVER auto-detected from roll numbers.
  // The user explicitly selects their actual branch from the dropdown.

  const effectiveFirstName = (profileData?.first_name || firstName).trim();
  const effectiveLastName = (profileData?.last_name || lastName).trim();
  const effectiveFullName = `${effectiveFirstName} ${effectiveLastName}`.trim() || fullName;

  // A profile is strictly complete ONLY if:
  // All 4 core fields (firstName, college, branch, year) are filled with valid non-placeholder values
  const hasAcademicFields = Boolean(
    effectiveFirstName &&
    effectiveFirstName.toLowerCase() !== 'user' &&
    isValidAcademicField(college) &&
    isValidAcademicField(branch) &&
    isValidAcademicField(year)
  );

  const isComplete = Boolean(
    hasAcademicFields && (meta.profile_completed === true || Boolean(profileData?.branch))
  );

  return {
    ...meta,
    name: effectiveFullName,
    full_name: effectiveFullName,
    first_name: effectiveFirstName,
    last_name: effectiveLastName,
    college: college || '',
    branch: branch || '',
    year: year || '',
    email: email,
    email_verified: Boolean(user.email_confirmed_at || meta.email_verified || isHbtu),
    phone_verified: false,
    profile_completed: isComplete,
  };
}

/**
 * Checks if the user's raw_user_meta_data is missing any standard keys
 * or needs normalization, and updates Supabase Auth if necessary.
 * IMPORTANT: Safely fetches profile from DB first if not provided to prevent
 * overwriting valid user data.
 */
export async function syncUserMetadataIfIncomplete(
  user: User,
  profileData?: { first_name?: string; last_name?: string; college?: string; branch?: string; year?: string } | null
): Promise<void> {
  if (!user || !user.email) return;

  let effectiveProfile = profileData;
  if (!effectiveProfile) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('first_name, last_name, college, branch, year')
        .eq('user_id', user.id)
        .maybeSingle();
      if (data) {
        effectiveProfile = data;
      }
    } catch {}
  }

  const standard = buildStandardizedUserMetadata(user, effectiveProfile);
  const current = user.user_metadata || {};

  // Guard: NEVER downgrade an already completed profile to incomplete if DB fetch was null/failed
  if (current.profile_completed === true && !standard.profile_completed && !effectiveProfile) {
    return;
  }

  const isMissingKeys =
    current.name === undefined ||
    current.full_name === undefined ||
    current.first_name === undefined ||
    current.last_name === undefined ||
    current.college === undefined ||
    current.branch === undefined ||
    current.year === undefined ||
    current.profile_completed === undefined;

  const isValueChanged =
    (standard.name && standard.name !== current.name) ||
    (standard.college && standard.college !== current.college) ||
    (standard.branch && standard.branch !== current.branch) ||
    (standard.year && standard.year !== current.year) ||
    (standard.profile_completed !== current.profile_completed);

  if (isMissingKeys || isValueChanged) {
    try {
      await supabase.auth.updateUser({
        data: {
          name: standard.name,
          full_name: standard.full_name,
          first_name: standard.first_name,
          last_name: standard.last_name,
          college: standard.college,
          branch: standard.branch,
          year: standard.year,
          email: standard.email,
          email_verified: true,
          phone_verified: false,
          profile_completed: standard.profile_completed,
        },
      });
    } catch (err) {
      console.warn('Silent user metadata synchronization notice:', err);
    }
  }
}
