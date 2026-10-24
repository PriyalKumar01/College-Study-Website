/**
 * Enhanced Roll Number Parser with Lateral Entry Support
 */

export interface HbtuStudentIdentity {
  rollNumber: string;
  admissionYear: number;
  isLateralEntry: boolean;
  graduatingYear: number;
  branchName: string;
  collegeName: string;
}

const HBTU_BRANCH_MAP: Record<string, string> = {
  '01': 'Bio-Technology (BT)',
  '02': 'Biochemical Engineering (BE)',
  '03': 'Civil Engineering (CE)',
  '04': 'Chemical Engineering (CHE)',
  '05': 'Computer Science & Engineering (CSE)',
  '06': 'Electrical Engineering (EE)',
  '07': 'Electronics Engineering (ET)',
  '08': 'Food Technology (FT)',
  '09': 'Information Technology (IT)',
  '10': 'Mechanical Engineering (ME)',
  '11': 'Oil Technology (OT)',
  '12': 'Plastic Technology (PL)',
  '13': 'Paint Technology (PT)',
};

export function parseHbtuRollNumberEnhanced(emailOrRoll: string): HbtuStudentIdentity | null {
  if (!emailOrRoll) return null;
  const clean = emailOrRoll.toLowerCase().trim();
  const match = clean.match(/^(\d{2})(0[1-9]|1[0-3])(\d{4,5})(@hbtu\.ac\.in)?$/);
  if (!match) return null;

  const yearPrefix = parseInt(match[1], 10);
  const admissionYear = 2000 + yearPrefix;
  const branchCode = match[2];
  const rollSuffix = match[3];
  const isLateralEntry = rollSuffix.startsWith('2') || rollSuffix.length === 5;
  const courseDurationYears = isLateralEntry ? 3 : 4;
  const graduatingYear = admissionYear + courseDurationYears;

  return {
    rollNumber: clean.split('@')[0],
    admissionYear,
    isLateralEntry,
    graduatingYear,
    branchName: HBTU_BRANCH_MAP[branchCode] || 'HBTU Engineering Department',
    collegeName: 'HBTU Kanpur',
  };
}
