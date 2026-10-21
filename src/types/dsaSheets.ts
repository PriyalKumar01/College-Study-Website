export type SheetCategory =
  | 'All'
  | 'Company Wise'
  | 'Popular'
  | 'Quick Revision'
  | 'Complete DSA'
  | 'Topic Specific'
  | 'Competitive';

export type ProblemDifficulty = 'Basic' | 'Easy' | 'Medium' | 'Hard';

export interface DsaProblem {
  id: string;
  title: string;
  difficulty: ProblemDifficulty;
  platform: 'LeetCode' | 'GeeksforGeeks' | 'CodeStudio' | 'TakeUForward';
  problemUrl: string;
  youtubeUrl?: string;
  articleUrl?: string;
  companies?: string[];
  tags?: string[];
}

export interface DsaLecture {
  id: string;
  title: string;
  problems: DsaProblem[];
}

export interface DsaStep {
  id: string;
  title: string;
  lectures: DsaLecture[];
}

export interface DsaSheet {
  id: string;
  slug: string;
  title: string;
  creator: string;
  description: string;
  category: SheetCategory[];
  totalQuestions: number;
  followersCount: number;
  isCompanyWise?: boolean;
  featuredCompany?: string;
  steps: DsaStep[];
}
