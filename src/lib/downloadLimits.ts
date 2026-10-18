import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const DAILY_LIMIT = 5;
const MONTHLY_LIMIT = 20;

export async function checkAndRecordDownload(url: string, title: string, userOverride?: User | null) {
  return { allowed: true, message: 'OK' };
}
