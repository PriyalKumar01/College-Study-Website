import { supabase } from '@/integrations/supabase/client';

export interface DownloadCheckResult {
  allowed: boolean;
  message: string;
}

const DAILY_LIMIT = 5;
const MONTHLY_LIMIT = 20;
