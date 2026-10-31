/**
 * Roll number parsing - heuristic branch and year prediction has been disabled.
 * Students manually select their branch and batch to ensure accuracy.
 */

export interface HbtuStudentIdentity {
  rollNumber: string;
  admissionYear: number;
  isLateralEntry: boolean;
  graduatingYear: number;
  branchName: string;
  collegeName: string;
}

export function parseHbtuRollNumberEnhanced(emailOrRoll: string): HbtuStudentIdentity | null {
  if (!emailOrRoll) return null;
  const clean = emailOrRoll.toLowerCase().trim();
  if (!clean.endsWith('@hbtu.ac.in') && !clean.includes('@hbtu.ac.in')) return null;

  return {
    rollNumber: clean.split('@')[0],
    admissionYear: 0,
    isLateralEntry: false,
    graduatingYear: 0,
    branchName: '',
    collegeName: 'HBTU Kanpur',
  };
}
