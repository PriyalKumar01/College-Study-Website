/**
 * Session-Wise PYQ Paper Models
 */

export interface PyqPaper {
  id?: string;
  title: string;
  url: string;
  session: string;
  subject?: string;
  examType?: 'mid_sem' | 'end_sem' | 'carryover' | 'general';
}

export interface AcademicSessionGroup {
  sessionLabel: string;
  academicYear: string;
  papers: PyqPaper[];
  isOpenDefault?: boolean;
}

export interface SessionAccordionState {
  openSessions: Record<string, boolean>;
  searchQuery: string;
}
