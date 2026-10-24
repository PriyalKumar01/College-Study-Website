/**
 * HBTU Degree Programs and Academic Regulations Mapping
 */

export interface DegreeProgramInfo {
  code: string;
  name: string;
  durationYears: number;
  allowsLateralEntry: boolean;
}

export const HBTU_PROGRAMS: Record<string, DegreeProgramInfo> = {
  btech: { code: 'btech', name: 'Bachelor of Technology', durationYears: 4, allowsLateralEntry: true },
  bba: { code: 'bba', name: 'Bachelor of Business Administration', durationYears: 3, allowsLateralEntry: false },
  bpharma: { code: 'bpharma', name: 'Bachelor of Pharmacy', durationYears: 4, allowsLateralEntry: true },
  mca: { code: 'mca', name: 'Master of Computer Applications', durationYears: 2, allowsLateralEntry: false },
  mba: { code: 'mba', name: 'Master of Business Administration', durationYears: 2, allowsLateralEntry: false },
  mtech: { code: 'mtech', name: 'Master of Technology', durationYears: 2, allowsLateralEntry: false },
  bsms: { code: 'bsms', name: 'Integrated BS-MS', durationYears: 5, allowsLateralEntry: false },
};

export function isHbtuLateralStudent(rollNumber: string): boolean {
  if (!rollNumber) return false;
  return rollNumber.includes('LE') || /^\d{2}(0[1-9]|1[0-3])2\d{3}/.test(rollNumber);
}
