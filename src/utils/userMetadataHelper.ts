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
 * HBTU branch code lookup based on official university roll numbers.
 * Roll number pattern: YY PP BB NNN (e.g. 24 01 12 025)
 * YY: Admission Year (24 = 2024 -> B.Tech Graduating Year 2028)
 * PP: Program Code (01 = B.Tech)
 * BB: Branch Code (12 = Plastic Technology)
 */
const HBTU_BRANCH_MAP: Record<string, string> = {
  '01': 'Computer Science & Engineering (CSE)',
  '02': 'Information Technology (IT)',
  '03': 'Electronics Engineering (ET)',
  '04': 'Electrical Engineering (EE)',
  '05': 'Mechanical Engineering (ME)',
  '06': 'Civil Engineering (CE)',
  '07': 'Chemical Engineering (CHE)',
  '08': 'Biochemical Engineering (BE)',
  '09': 'Food Technology (FT)',
  '10': 'Oil Technology (OT)',
  '11': 'Paint Technology (PT)',
  '12': 'Plastic Technology (PL)',
  '13': 'Leather & Fashion Technology (LFT)',
};

/**
 * Parses an HBTU student roll number or email (e.g., 240112025@hbtu.ac.in)
 * and returns auto-computed college, graduating year, and branch.
 */
export function parseHbtuRollNumber(emailOrRoll: string): { college: string; year: string; branch: string } | null {
  if (!emailOrRoll) return null;
  const username = emailOrRoll.includes('@') ? emailOrRoll.split('@')[0].trim() : emailOrRoll.trim();

  // Match 9-digit roll number: e.g. 240112025
  const match = username.match(/^(\d{2})(\d{2})(\d{2})(\d{3})$/);
  if (!match) return null;

  const [, yy, prog, bb] = match;
  const admYear = 2000 + parseInt(yy, 10);

  // Program: 01 is B.Tech (4 years), 02 is M.Tech (2 years), 03 is MCA (2 years)
  let passingYear = (admYear + 4).toString();
  if (prog === '02') passingYear = (admYear + 2).toString();
  if (prog === '03') passingYear = (admYear + 2).toString();

  const branch = HBTU_BRANCH_MAP[bb] || '';

  return {
    college: 'HBTU Kanpur',
    year: passingYear,
    branch,
  };
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
  const isHbtu = email.endsWith('@hbtu.ac.in');

  const { fullName, firstName, lastName } = resolveCleanUserName(meta, email);

  // Priority: profile table > metadata > HBTU roll number auto-detection > default empty string
  let college = (profileData?.college || meta.college || '').trim();
  let branch = (profileData?.branch || meta.branch || '').trim();
  let year = (profileData?.year || meta.year || '').trim();

  if (isHbtu) {
    if (!college) college = 'HBTU Kanpur';
    const parsed = parseHbtuRollNumber(email);
    if (parsed) {
      if (!branch) branch = parsed.branch;
      if (!year) year = parsed.year;
    }
  }

  const effectiveFirstName = (profileData?.first_name || firstName).trim();
  const effectiveLastName = (profileData?.last_name || lastName).trim();
  const effectiveFullName = `${effectiveFirstName} ${effectiveLastName}`.trim() || fullName;

  const isComplete = Boolean(
    effectiveFirstName &&
    college &&
    branch &&
    year
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
    email_verified: true,
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
