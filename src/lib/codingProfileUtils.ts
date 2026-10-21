import confetti from 'canvas-confetti';
import { ContestEvent, UserCodingProfile, PlatformKey, LeaderboardEntry } from '@/types/codingProfile';

/**
 * Builds direct Google Calendar "Add Event" URL
 */
export function buildGoogleCalendarUrl(contest: ContestEvent): string {
  const formatUtc = (dStr: string) => {
    const d = new Date(dStr);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const start = formatUtc(contest.startTime);
  const end = formatUtc(contest.endTime);
  const title = encodeURIComponent(`[${contest.platform}] ${contest.title}`);
  const details = encodeURIComponent(
    `Coding Contest: ${contest.title}\nPlatform: ${contest.platform}\nContest Link: ${contest.url}\n\nTracked via College Study Hub Coding Calendar.`
  );
  const location = encodeURIComponent(contest.url);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

/**
 * Launches spectacular celebration confetti with colorful paper & shapes shower!
 */
export function triggerCelebrationConfetti() {
  // Burst 1: Center blast
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'],
  });

  // Burst 2: Left cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f43f5e', '#6366f1', '#14b8a6', '#eab308'],
    });
  }, 200);

  // Burst 3: Right cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#3b82f6', '#a855f7', '#22c55e', '#f97316'],
    });
  }, 400);

  // Gentle falling paper shower
  const end = Date.now() + 1500;
  const interval: any = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }
    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#60a5fa', '#c084fc', '#34d399', '#fcd34d'],
    });
  }, 250);
}

/**
 * Generates a unique verification token for profile ownership proof
 */
export function generateVerificationToken(platform: PlatformKey, username: string): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CSH-VERIFY-${rand}`;
}

/**
 * Calculates C-Score based on Codolio transparent algorithm:
 * - LeetCode Rating (Max 350 pts)
 * - Codeforces Rating (Max 350 pts)
 * - CodeChef Rating (Max 150 pts)
 * - Problems Volume & Active Consistency (Max 150 pts)
 */
export function calculateCScore(profile: Partial<UserCodingProfile>): number {
  let score = 0;

  const lcRating = profile.platforms?.leetcode?.rating || 0;
  const cfRating = profile.platforms?.codeforces?.rating || 0;
  const ccRating = profile.platforms?.codechef?.rating || 0;
  const solved = profile.totalSolved || 0;
  const activeDays = profile.activeDays || 0;

  // LeetCode component (normalized to ~2500)
  if (lcRating > 0) {
    score += Math.min(350, (lcRating / 2500) * 350);
  }

  // Codeforces component (normalized to ~2400)
  if (cfRating > 0) {
    score += Math.min(350, (cfRating / 2400) * 350);
  }

  // CodeChef component (normalized to ~2200)
  if (ccRating > 0) {
    score += Math.min(150, (ccRating / 2200) * 150);
  }

  // Problems solved & consistency bonus
  const solvedScore = Math.min(100, (solved / 1500) * 100);
  const consistencyScore = Math.min(50, (activeDays / 365) * 50);
  score += solvedScore + consistencyScore;

  return Math.round(score * 100) / 100;
}

/**
 * Default Priyal Kumar sample profile matching reference images
 */
export const DEFAULT_CODING_PROFILE: UserCodingProfile = {
  fullName: 'Priyal Kumar',
  username: 'Priyal_kumar',
  college: 'Harcourt Butler Technical University',
  country: 'India',
  bio: 'Full Stack Developer (MERN) | C++ | Python | SQL',
  avatarUrl: '/images/study/image.png',
  cScore: 844.72,
  globalRank: 188,
  collegeRank: 3,
  totalSolved: 1330,
  activeDays: 453,
  maxStreak: 169,
  currentStreak: 12,
  contestsAttended: 125,
  dsaDistribution: {
    easy: 386,
    medium: 478,
    hard: 184,
  },
  cpDistribution: {
    codechef: 205,
    codeforces: 54,
    atcoder: 25,
  },
  topicBreakdown: [
    { topic: 'Arrays', count: 438 },
    { topic: 'String', count: 176 },
    { topic: 'HashMap and Set', count: 161 },
    { topic: 'Math', count: 149 },
    { topic: 'Dynamic Programming', count: 104 },
    { topic: 'Trees & Graphs', count: 98 },
    { topic: 'Binary Search', count: 85 },
    { topic: 'Greedy', count: 72 },
  ],
  platforms: {
    leetcode: {
      platform: 'leetcode',
      handle: 'Priyal_kumar',
      isVerified: true,
      verifiedAt: '2026-08-15',
      rating: 2130,
      maxRating: 2145,
      rankTitle: 'Knight',
      solvedCount: 650,
      contestsAttended: 48,
      profileUrl: 'https://leetcode.com/u/Priyal_kumar/',
    },
    codeforces: {
      platform: 'codeforces',
      handle: 'Priyal_kumar',
      isVerified: true,
      verifiedAt: '2026-09-01',
      rating: 1901,
      maxRating: 1901,
      rankTitle: 'Candidate Master',
      solvedCount: 380,
      contestsAttended: 42,
      profileUrl: 'https://codeforces.com/profile/Priyal_kumar',
    },
    codechef: {
      platform: 'codechef',
      handle: 'priyal_kumar',
      isVerified: true,
      verifiedAt: '2026-07-20',
      rating: 1787,
      maxRating: 1790,
      rankTitle: '3★',
      solvedCount: 220,
      contestsAttended: 24,
      profileUrl: 'https://www.codechef.com/users/priyal_kumar',
    },
    atcoder: {
      platform: 'atcoder',
      handle: 'Priyal_kumar',
      isVerified: true,
      verifiedAt: '2026-09-10',
      rating: 1240,
      maxRating: 1240,
      rankTitle: 'Cyan',
      solvedCount: 80,
      contestsAttended: 11,
      profileUrl: 'https://atcoder.jp/users/Priyal_kumar',
    },
    github: {
      platform: 'github',
      handle: 'priyalkumar',
      isVerified: true,
      verifiedAt: '2026-06-12',
      solvedCount: 520,
      profileUrl: 'https://github.com/priyalkumar',
    },
  },
};

/**
 * Sample Leaderboard dataset matching Codolio reference
 */
export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Pratham Lashkari',
    username: 'Pratham',
    college: 'IIT Bombay',
    cScore: 889.49,
    totalSolved: 1640,
    leetcodeRating: 2320,
    codeforcesRating: 2110,
    codechefRating: 2050,
  },
  {
    rank: 2,
    name: 'Yash Nalawade',
    username: 'ynalawade',
    college: 'COEP Pune',
    cScore: 889.18,
    totalSolved: 1580,
    leetcodeRating: 2280,
    codeforcesRating: 2095,
    codechefRating: 1990,
  },
  {
    rank: 3,
    name: 'Raj Roy',
    username: 'RkRoy',
    college: 'HBTU Kanpur',
    cScore: 888.48,
    totalSolved: 1510,
    leetcodeRating: 2240,
    codeforcesRating: 2040,
    codechefRating: 2010,
  },
  {
    rank: 4,
    name: 'Ananya Sharma',
    username: 'ananya_coder',
    college: 'DTU Delhi',
    cScore: 875.20,
    totalSolved: 1420,
    leetcodeRating: 2190,
    codeforcesRating: 1980,
    codechefRating: 1890,
  },
  {
    rank: 5,
    name: 'Aman Verma',
    username: 'aman_v',
    college: 'HBTU Kanpur',
    cScore: 864.10,
    totalSolved: 1390,
    leetcodeRating: 2150,
    codeforcesRating: 1940,
    codechefRating: 1840,
  },
  {
    rank: 6,
    name: 'Sneha Patel',
    username: 'sneha_p',
    college: 'NIT Trichy',
    cScore: 855.90,
    totalSolved: 1360,
    leetcodeRating: 2140,
    codeforcesRating: 1910,
    codechefRating: 1805,
  },
  {
    rank: 188,
    name: 'Priyal Kumar',
    username: 'Priyal_kumar',
    college: 'Harcourt Butler Technical University',
    cScore: 844.72,
    totalSolved: 1330,
    leetcodeRating: 2130,
    codeforcesRating: 1901,
    codechefRating: 1787,
    isCurrentUser: true,
  },
];
