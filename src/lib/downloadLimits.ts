export interface DownloadCheckResult {
  allowed: boolean;
  reason?: 'NOT_LOGGED_IN' | 'NOT_VERIFIED' | 'DAILY_LIMIT_REACHED' | 'MONTHLY_LIMIT_REACHED' | 'STORAGE_VIEW_ONLY' | 'ERROR';
  message: string;
  dailyRemaining?: number;
  monthlyRemaining?: number;
}
