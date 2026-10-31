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
 * Backward-compatible helper for HBTU email recognition.
 * NOTE: Heuristic branch and year predictions from roll numbers have been completely
 * removed to prevent incorrect branch allocations (e.g., CSE codes vs EE).
 * Users choose their own actual branch and graduating year.
 */
export function parseHbtuRollNumber(emailOrRoll: string): { college: string; year: string; branch: string } | null {
  if (!emailOrRoll) return null;
  if (!isHbtuEmail(emailOrRoll)) return null;

  return {
    college: 'HBTU Kanpur',
    year: '',
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
  if (!s || s === 'not set' || s === 'null' || s === 'undefined' || s === 'none' || s === 'n/a' || s === '-') return false;
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
  // NOTE: branch and year are NEVER auto-predicted from roll numbers.
  // The user explicitly selects their real academic branch and batch.

  const effectiveFirstName = (profileData?.first_name || firstName).trim();
  const effectiveLastName = (profileData?.last_name || lastName).trim();
  const effectiveFullName = `${effectiveFirstName} ${effectiveLastName}`.trim() || fullName;

  // A profile is strictly complete ONLY if:
  // 1) The user has explicitly completed/saved their profile (meta.profile_completed === true)
  // 2) All core fields (firstName, college, branch, year) are filled with valid values
  const hasAcademicFields = Boolean(
    effectiveFirstName &&
    isValidAcademicField(college) &&
    isValidAcademicField(branch) &&
    isValidAcademicField(year)
  );

  const isComplete = Boolean(meta.profile_completed === true && hasAcademicFields);

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
 */
export async function syncUserMetadataIfIncomplete(
  user: User,
  profileData?: { first_name?: string; last_name?: string; college?: string; branch?: string; year?: string } | null
): Promise<void> {
  if (!user || !user.email) return;

  const standard = buildStandardizedUserMetadata(user, profileData);
  const current = user.user_metadata || {};

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
