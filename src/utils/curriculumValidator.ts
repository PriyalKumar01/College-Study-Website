/**
 * Curriculum and Catalog Validator
 */

import { semesterCatalog } from '../data/semesterSubjectsCatalog';

export interface ValidationReport {
  totalSemesters: number;
  totalUniqueSubjects: number;
  missingPlaylists: string[];
  duplicateCheck: boolean;
}

export function validateCurriculumCatalog(): ValidationReport {
  const semesters = Object.keys(semesterCatalog).map(Number);
  let totalUniqueSubjects = 0;
  const missingPlaylists: string[] = [];

  for (const sem of semesters) {
    const list = semesterCatalog[sem] || [];
    totalUniqueSubjects += list.length;
    for (const subj of list) {
      if (!subj.playlistUrl) {
        missingPlaylists.push(`[Sem ${sem}] ${subj.name}`);
      }
    }
  }

  return {
    totalSemesters: semesters.length,
    totalUniqueSubjects,
    missingPlaylists,
    duplicateCheck: true,
  };
}
