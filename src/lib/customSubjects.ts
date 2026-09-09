import { SubjectInfo } from '@/data/courseStructure';
import { supabase } from '@/integrations/supabase/client';

const CUSTOM_SUBJECTS_STORAGE_KEY = 'studyhub_custom_subjects_v1';
const RENAMED_SUBJECTS_STORAGE_KEY = 'studyhub_renamed_subjects_v1';

export function getCustomSubjectsForContext(
  category: string,
  semester?: string,
  branch?: string
): SubjectInfo[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SUBJECTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: Record<string, SubjectInfo[]> = JSON.parse(raw);
    const key = `${category}_${branch || 'ALL'}_${semester || 'ALL'}`;
    return [];
  } catch(e) { return []; }
}