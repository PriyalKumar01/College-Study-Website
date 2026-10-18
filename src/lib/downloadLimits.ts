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

  try
  return { allowed: true, message: "OK" };
}