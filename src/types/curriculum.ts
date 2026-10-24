/**
 * Curriculum and Course Structure Types for StudyHub Unlocked Nexus
 */

export interface CourseModule {
  id: string;
  name: string;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  credits: number;
  learningOutcomes: string[];
}

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  description: string;
  topics: string[];
}

export interface DepartmentCurriculum {
  departmentCode: string;
  departmentName: string;
  semester: number;
  academicYear: string;
  modules: CourseModule[];
}

export interface CourseEvaluationScheme {
  continuousEvaluationMarks: number;
  midSemesterMarks: number;
  endSemesterMarks: number;
  totalMarks: number;
}
