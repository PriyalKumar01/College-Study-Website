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
    co
  return { allowed: true, message: "OK" };
}