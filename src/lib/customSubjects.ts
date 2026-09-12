import { SubjectInfo } from '@/data/courseStructure';
import { supabase } from '@/integrations/supabase/client';
import { clearCachePrefix } from '@/lib/cacheUtils';
import { matchesSubject } from '@/utils/subjectMatcher';

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
    const specific = parsed[key] || [];
    const general = parsed[`${category}_ALL_ALL`] || [];
    const map = new Map<string, SubjectInfo>();
    [...general, ...specific].forEach(s => map.set(s.name, s));
    return Array.from(map.values());
  } catch (e) {
    console.error('Failed to load custom subjects', e);
    return [];
  }
}

export function saveCustomSubject(
  category: string,
  semester: string | undefined,
  branch: string | undefined,
  subject: SubjectInfo
): void {
  try {
    const raw = localStorage.getItem(CUSTOM_SUBJECTS_STORAGE_KEY);
    const parsed: Record<string, SubjectInfo[]> = raw ? JSON.parse(raw) : {};
    const key = `${category}_${branch || 'ALL'}_${semester || 'ALL'}`;
    if (!parsed[key]) parsed[key] = [];
    if (!parsed[key].some(s => s.name.toLowerCase() === subject.name.toLowerCase())) {
      parsed[key].push(subject);
      localStorage.setItem(CUSTOM_SUBJECTS_STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch (e) {
    console.error('Failed to save custom subject', e);
  }
}

export function extractDynamicSubjects(
  communityNotes: any[] | undefined,
  staticSubjects: any[]
): any[] {
  if (!communityNotes || communityNotes.length === 0) return [];

  const customMap = new Map<string, any>();

  communityNotes.forEach(cn => {
    if (!cn.subject) return;
    const isAlreadyStatic = staticSubjects.some(sub => matchesSubject(cn.subject, sub.name, sub.id));
    if (!isAlreadyStatic && !customMap.has(cn.subject.toLowerCase())) {
      customMap.set(cn.subject.toLowerCase(), {
        id: cn.subject.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: cn.subject,
        fullName: cn.description && !cn.description.startsWith('[') ? cn.description : cn.subject,
        icon: '📚',
        color: 'bg-indigo-600',
        notes: [],
        isCustom: true
      });
    }
  });

  return Array.from(customMap.values());
}

export function getRenamedSubjectsMap(): Record<string, string> {
  try {
    const raw = localStorage.getItem(RENAMED_SUBJECTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export async function saveRenamedSubject(
  oldName: string,
  newName: string
): Promise<void> {
  try {
    const trimmedOld = oldName.trim();
    const trimmedNew = newName.trim();
    if (!trimmedOld || !trimmedNew || trimmedOld === trimmedNew) return;

    // Save to localStorage
    const raw = localStorage.getItem(RENAMED_SUBJECTS_STORAGE_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    map[trimmedOld] = trimmedNew;
    localStorage.setItem(RENAMED_SUBJECTS_STORAGE_KEY, JSON.stringify(map));

    // Also update any custom subjects with this name
    const customRaw = localStorage.getItem(CUSTOM_SUBJECTS_STORAGE_KEY);
    if (customRaw) {
      const customParsed: Record<string, SubjectInfo[]> = JSON.parse(customRaw);
      Object.keys(customParsed).forEach(k => {
        customParsed[k] = customParsed[k].map(sub =>
          sub.name === trimmedOld ? { ...sub, name: trimmedNew } : sub
        );
      });
      localStorage.setItem(CUSTOM_SUBJECTS_STORAGE_KEY, JSON.stringify(customParsed));
    }

    // Sync with Supabase notes table if online
    try {
      await (supabase as any)
        .from('notes')
        .update({ subject: trimmedNew })
        .eq('subject', trimmedOld);
    } catch (dbErr) {
      console.warn('Could not update subject name in notes table:', dbErr);
    }
  } catch (e) {
    console.error('Failed to save renamed subject', e);
  }
}
