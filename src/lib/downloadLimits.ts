import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface DownloadCheckResult {
  allowed: boolean;
  reason?: 'NOT_LOGGED_IN' | 'NOT_VERIFIED' | 'DAILY_LIMIT_REACHED' | 'MONTHLY_LIMIT_REACHED' | 'STORAGE_VIEW_ONLY' | 'ERROR';
  message: string;
  dailyRemaining?: number;
  monthlyRemaining?: number;
}

const DAILY_LIMIT = 5;
const MONTHLY_LIMIT = 20;

/**
 * Checks if a user is allowed to download a PDF, and logs the download upon approval.
 * - Enforces authentication & email verification
 * - Max 5 PDFs per day
 * - Max 20 PDFs per month
 */
let isDownloadInProgress = false;

export async function checkAndRecordDownload(
  url: string,
  title: string,
  userOverride?: User | null
): Promise<DownloadCheckResult> {
  if (isDownloadInProgress) {
    return {
      allowed: false,
      reason: 'ERROR',
      message: 'Download already in progress. Please wait a moment...',
    };
  }
  isDownloadInProgress = true;

  try {
    // 1. Get current authenticated user
    let user = userOverride;
    if (!user) {
      const { data } = await supabase.auth.getUser();
      user = data?.user ?? null;
    }

    if (!user || !user.email) {
      return {
        allowed: false,
        reason: 'NOT_LOGGED_IN',
        message: 'Please sign in to download syllabus notes. You can still preview them online without downloading!',
      };
    }

    // 2. Check email verification (email_confirmed_at or confirmed_at)
    const isEmailConfirmed = Boolean(user.email_confirmed_at || (user as any).confirmed_at);
    // Google OAuth logins are automatically verified
    const isGoogleAuth = user.app_metadata?.provider === 'google' || user.identities?.some(i => i.provider === 'google');
    
    if (!isEmailConfirmed && !isGoogleAuth) {
      return {
        allowed: false,
        reason: 'NOT_VERIFIED',
        message: 'Please verify your email address to download notes. Check your inbox for the verification link.',
      };
    }

    // 3. Calculate start of today (midnight) & start of this month in UTC
    const now = new Date();
    const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

    const userEmail = user.email.toLowerCase().trim();
    const userId = user.id;

    // 4. Query downloads for today
    const { count: dailyCount, error: dailyErr } = await supabase
      .from('note_downloads')
      .select('id', { count: 'exact', head: true })
      .or(`user_id.eq.${userId},user_email.eq.${userEmail}`)
      .gte('download_timestamp', startOfToday);

    if (dailyErr) {
      console.warn('[DownloadLimits] Daily check query error:', dailyErr);
    }

    const currentDaily = dailyCount ?? 0;
    if (currentDaily >= DAILY_LIMIT) {
      return {
        allowed: false,
        reason: 'DAILY_LIMIT_REACHED',
        message: `Daily download limit reached (${DAILY_LIMIT}/${DAILY_LIMIT} PDFs). Come back tomorrow, or read notes online in your browser!`,
        dailyRemaining: 0,
        monthlyRemaining: Math.max(0, MONTHLY_LIMIT - currentDaily),
      };
    }

    // 5. Query downloads for this month
    const { count: monthlyCount, error: monthlyErr } = await supabase
      .from('note_downloads')
      .select('id', { count: 'exact', head: true })
      .or(`user_id.eq.${userId},user_email.eq.${userEmail}`)
      .gte('download_timestamp', startOfMonth);

    if (monthlyErr) {
      console.warn('[DownloadLimits] Monthly check query error:', monthlyErr);
    }

    const currentMonthly = monthlyCount ?? 0;
    if (currentMonthly >= MONTHLY_LIMIT) {
      return {
        allowed: false,
        reason: 'MONTHLY_LIMIT_REACHED',
        message: `Monthly download limit reached (${MONTHLY_LIMIT}/${MONTHLY_LIMIT} PDFs). You can still view all notes anytime in your browser!`,
        dailyRemaining: Math.max(0, DAILY_LIMIT - currentDaily),
        monthlyRemaining: 0,
      };
    }

    // 6. Record download log in note_downloads table
    const userName = user.user_metadata?.first_name || user.email.split('@')[0];
    await supabase.from('note_downloads').insert({
      user_id: userId,
      user_email: userEmail,
      user_name: userName,
      note_title: title,
      note_url: url,
      download_timestamp: new Date().toISOString(),
    });

    return {
      allowed: true,
      message: 'Download permitted.',
      dailyRemaining: Math.max(0, DAILY_LIMIT - (currentDaily + 1)),
      monthlyRemaining: Math.max(0, MONTHLY_LIMIT - (currentMonthly + 1)),
    };
  } catch (error: any) {
    c
  return { allowed: true, message: "OK" };
}