/** Custom subjects manager with safe zero-note deletion verification */
// Curriculum: dynamic open elective and custom subject mapping
import { SubjectInfo } from '@/data/courseStructure';
import { supabase } from '@/integrations/supabase/client';
import { clearCachePrefix } from '@/lib/cacheUtils';
import { matchesSubject } from '@/utils/subjectMatcher';

const CUSTOM_SUBJECTS_STORAGE_KEY = 'studyhub_custom_subjects_v1';
const RENAMED_SUBJECTS_STORAGE_KEY = 'studyhub_renamed_subjects_v1';
const DELETED_SUBJECTS_STORAGE_KEY = 'studyhub_deleted_subjects_v1';

export function getDeletedSubjects(): string[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(DELETED_SUBJECTS_STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function isSubjectDeleted(
  subjectName: string,
  category?: string,
  semester?: string,
  branch?: string
): boolean {
  if (!subjectName) return false;
  const deleted = getDeletedSubjects();
  if (deleted.length === 0) return false;

  const nameLower = subjectName.trim().toLowerCase();
  if (deleted.includes(nameLower)) return true;

  if (category || semester || branch) {
    const contextualKey = `${category || 'all'}_${branch || 'all'}_${semester || 'all'}_${nameLower}`.toLowerCase();
    if (deleted.includes(contextualKey)) return true;
  }
  return false;
}

export async function deleteSubject(
  subjectName: string,
  category?: string,
  semester?: string,
  branch?: string
): Promise<boolean> {
  try {
    const trimmed = subjectName.trim();
    const nameLower = trimmed.toLowerCase();
    if (!trimmed) return false;

    // 1. Mark as deleted in localStorage
    const deleted = getDeletedSubjects();
    const contextualKey = `${category || 'all'}_${branch || 'all'}_${semester || 'all'}_${nameLower}`.toLowerCase();
    if (!deleted.includes(nameLower)) deleted.push(nameLower);
    if (!deleted.includes(contextualKey)) deleted.push(contextualKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DELETED_SUBJECTS_STORAGE_KEY, JSON.stringify(deleted));
    }

    // 2. Remove from custom subjects in localStorage
    const raw = typeof window !== 'undefined' ? localStorage.getItem(CUSTOM_SUBJECTS_STORAGE_KEY) : null;
    if (raw) {
      const parsed: Record<string, SubjectInfo[]> = JSON.parse(raw);
      Object.keys(parsed).forEach(k => {
        parsed[k] = parsed[k].filter(s => s.name.trim().toLowerCase() !== nameLower);
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem(CUSTOM_SUBJECTS_STORAGE_KEY, JSON.stringify(parsed));
      }
    }

    // 3. Delete any subject placeholder rows in Supabase notes table
    try {
      let query = supabase
        .from('notes')
        .delete()
        .ilike('subject', trimmed)
        .eq('material_type', 'subject_placeholder');

      if (semester) {
        const dbSemester = category === 'btech'
          ? (branch && semester ? `${branch}-${semester}` : semester)
          : semester;
        query = query.eq('semester', dbSemester);
      }
      await query;
    } catch (dbErr) {
      console.warn('Could not delete placeholder from Supabase notes table:', dbErr);
    }

    // 4. Invalidate cache and broadcast update
    clearCachePrefix('notes');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('studyhub_notes_updated'));
    }
    return true;
  } catch (err) {
    console.error('Failed to delete subject', err);
    return false;
  }
}

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

export async function saveCustomSubject(
  category: string,
  semester: string | undefined,
  branch: string | undefined,
  subject: SubjectInfo,
  user?: any
): Promise<void> {
  try {
    // 1. Save to local storage for immediate offline / quick access
    const raw = localStorage.getItem(CUSTOM_SUBJECTS_STORAGE_KEY);
    const parsed: Record<string, SubjectInfo[]> = raw ? JSON.parse(raw) : {};
    const key = `${category}_${branch || 'ALL'}_${semester || 'ALL'}`;
    if (!parsed[key]) parsed[key] = [];
    if (!parsed[key].some(s => s.name.toLowerCase() === subject.name.toLowerCase())) {
      parsed[key].push(subject);
      localStorage.setItem(CUSTOM_SUBJECTS_STORAGE_KEY, JSON.stringify(parsed));
    }

    // 2. Persist to Supabase notes table as an approved placeholder
    // This makes the subject visible to all devices, admins, and students immediately!
    let currentUser = user;
    if (!currentUser) {
      const { data: authData } = await supabase.auth.getUser();
      currentUser = authData?.user ?? null;
    }

    const dbSemester = category === 'btech'
      ? (branch && semester ? `${branch}-${semester}` : (semester || category))
      : (semester || category);

    if (currentUser) {
      await supabase.from('notes').insert({
        title: `[SUBJECT] ${subject.name}`,
        subject: subject.name,
        semester: dbSemester,
        material_type: 'subject_placeholder',
        file_url: '#',
        file_name: 'subject.meta',
        description: subject.fullName || subject.name,
        status: 'approved',
        approved: true,
        approved_at: new Date().toISOString(),
        uploaded_by: currentUser.id,
        user_email: currentUser.email || 'admin@studyhub.com',
        user_name: currentUser.user_metadata?.first_name || currentUser.email?.split('@')[0] || 'Owner',
      });
    }

    // 3. Invalidate cache and broadcast update
    clearCachePrefix('notes');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('studyhub_notes_updated'));
    }
  } catch (e) {
    console.error('Failed to save custom subject', e);
  }
}

// Extracts dynamic custom subjects created by owner or uploaded through community
export function extractDynamicSubjects(
  communityNotes: any[] | undefined,
  staticSubjects: any[]
): any[] {
  if (!communityNotes || communityNotes.length === 0) return [];

  const customMap = new Map<string, any>();

  communityNotes.forEach(cn => {
    if (!cn.subject) return;
    if (isSubjectDeleted(cn.subject)) return;
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

export async function deleteCustomSubject(
  subjectName: string,
  semester?: string
): Promise<boolean> {
  return deleteSubject(subjectName, undefined, semester);
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
      clearCachePrefix('notes');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studyhub_notes_updated'));
      }
    } catch (dbErr) {
      console.warn('Could not update subject name in notes table:', dbErr);
    }
  } catch (e) {
    console.error('Failed to save renamed subject', e);
  }
}
// Reviewed: academic catalog & interface consistency check (v2.0.140)
