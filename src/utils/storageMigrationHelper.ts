/**
 * LocalStorage Migration Helper for Semester Filters
 */

export function clearLegacyFilterKeys(): void {
  try {
    for (let sem = 1; sem <= 8; sem++) {
      const oldKey = `csh_legacy_filter_sem_${sem}`;
      if (localStorage.getItem(oldKey)) {
        localStorage.removeItem(oldKey);
      }
    }
  } catch {
    // Graceful no-op in SSR or restricted storage environments
  }
}

export function getSelectedSubjectIds(sem: number): string[] {
  try {
    const raw = localStorage.getItem(`csh_selected_subjects_sem_${sem}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
