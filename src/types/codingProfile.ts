export type PlatformKey = 'leetcode' | 'codeforces' | 'codechef' | 'atcoder' | 'github' | 'geeksforgeeks';

export interface CodingPlatformHandle {
  platform: PlatformKey;
  handle: string;
  isVerified: boolean;
  verifiedAt?: string;
  verificationToken?: string;
  rating?: number;
  maxRating?: number;
  rankTitle?: string;
  solvedCount?: number;
  contestsAttended?: number;
  profileUrl: string;
}

export interface ContestEvent {
  id: string;
  title: string;
  platform: 'LeetCode' | 'Codeforces' | 'CodeChef' | 'AtCoder' | 'GeeksforGeeks';
  startTime: string; // ISO format
  endTime: string;   // ISO format
  durationMinutes: number;
  url: string;
  difficulty?: string;
  subscribersCount?: number;
}

export interface UserCodingProfile {
  fullName: string;
  username: string;
  college: string;
  country: string;
  bio?: string;
  avatarUrl?: string;
  cScore: number;
  globalRank: number;
  collegeRank: number;
  totalSolved: number;
  activeDays: number;
  maxStreak: number;
  currentStreak: number;
  contestsAttended: number;
  dsaDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  cpDistribution: {
    codechef: number;
    codeforces: number;
    atcoder: number;
  };
  topicBreakdown: {
    topic: string;
    count: number;
  }[];
  platforms: Partial<Record<PlatformKey, CodingPlatformHandle>>;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  username: string;
  avatarUrl?: string;
  college: string;
  cScore: number;
  totalSolved: number;
  leetcodeRating: number;
  codeforcesRating: number;
  codechefRating: number;
  isCurrentUser?: boolean;
}
