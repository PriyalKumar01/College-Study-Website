import { ContestEvent } from '@/types/codingProfile';

const LC_WEEKLY_ANCHOR = new Date('2024-06-02T02:30:00Z'); // Weekly 400
const LC_BIWEEKLY_ANCHOR = new Date('2024-05-11T14:30:00Z'); // Biweekly 130
const CC_STARTERS_ANCHOR = new Date('2024-05-29T14:30:00Z'); // Starters 136
const AC_ABC_ANCHOR = new Date('2024-06-01T12:00:00Z'); // ABC 356
const CODE360_WEEKLY_ANCHOR = new Date('2026-10-22T15:01:00Z'); // Weekly Contest 254 (Thursday 8:31 PM IST)

/**
 * Deduplicate contest lists by unique ID
 */
export function deduplicateContests(contests: ContestEvent[]): ContestEvent[] {
  const map = new Map<string, ContestEvent>();
  for (const c of contests) {
    const key = c.id || `${c.platform}-${c.title}-${c.startTime}`;
    if (!map.has(key)) {
      map.set(key, c);
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

/**
 * Predictable recurring contests with mathematically exact contest numbering & direct links:
 * - LeetCode Weekly: Every Sunday 08:00 AM – 09:30 AM IST -> https://leetcode.com/contest/weekly-contest-{n}/
 * - LeetCode Biweekly: Every alternate Saturday 08:00 PM – 09:30 PM IST -> https://leetcode.com/contest/biweekly-contest-{n}/
 * - CodeChef Starters: Every Wednesday 08:00 PM – 10:00 PM IST -> https://www.codechef.com/START{n}
 * - AtCoder ABC: Every Saturday 05:30 PM – 07:10 PM IST -> https://atcoder.jp/contests/abc{n}
 * - Code360 Weekly: Every Thursday 08:31 PM – 10:01 PM IST -> https://www.naukri.com/code360/contests/weekly-contest-{n}
 */
export function getPredictableContests(baseDate: Date = new Date()): ContestEvent[] {
  const contests: ContestEvent[] = [];
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  // Generate for past month (-1), current month (0), and active upcoming window (+1 up to 21 days)
  for (let mOffset = -1; mOffset <= 1; mOffset++) {
    const targetMonth = month + mOffset;
    const maxDays = mOffset === 1 ? 21 : new Date(year, targetMonth + 1, 0).getDate();

    for (let day = 1; day <= maxDays; day++) {
      const date = new Date(year, targetMonth, day);
      const dayOfWeek = date.getDay(); // 0 = Sun, 3 = Wed, 4 = Thu, 6 = Sat

      // 1. LeetCode Weekly Contest (Every Sunday 08:00 AM - 09:30 AM IST)
      if (dayOfWeek === 0) {
        const start = new Date(year, targetMonth, day, 8, 0, 0);
        const end = new Date(year, targetMonth, day, 9, 30, 0);
        const diffWeeks = Math.round((start.getTime() - LC_WEEKLY_ANCHOR.getTime()) / (7 * 24 * 3600 * 1000));
        const weekNum = 400 + diffWeeks;

        contests.push({
          id: `lc-weekly-${year}-${targetMonth + 1}-${day}`,
          title: `LeetCode Weekly Contest ${weekNum}`,
          platform: 'LeetCode',
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          durationMinutes: 90,
          url: `https://leetcode.com/contest/weekly-contest-${weekNum}/`,
          difficulty: 'Rated for All',
          subscribersCount: 24500,
        });
      }

      // 2. CodeChef Starters (Every Wednesday 08:00 PM - 10:00 PM IST)
      if (dayOfWeek === 3) {
        const start = new Date(year, targetMonth, day, 20, 0, 0);
        const end = new Date(year, targetMonth, day, 22, 0, 0);
        const diffWeeks = Math.round((start.getTime() - CC_STARTERS_ANCHOR.getTime()) / (7 * 24 * 3600 * 1000));
        const starterNum = 136 + diffWeeks;

        contests.push({
          id: `cc-starters-${year}-${targetMonth + 1}-${day}`,
          title: `CodeChef Starters ${starterNum}`,
          platform: 'CodeChef',
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          durationMinutes: 120,
          url: `https://www.codechef.com/START${starterNum}`,
          difficulty: 'Div 1, 2, 3 & 4',
          subscribersCount: 18400,
        });
      }

      // 3. Code360 Weekly Contest by Naukri / Coding Ninjas (Every Thursday 08:31 PM - 10:01 PM IST)
      if (dayOfWeek === 4) {
        const start = new Date(year, targetMonth, day, 20, 31, 0);
        const end = new Date(year, targetMonth, day, 22, 1, 0);
        const diffWeeks = Math.round((start.getTime() - CODE360_WEEKLY_ANCHOR.getTime()) / (7 * 24 * 3600 * 1000));
        const code360Num = 254 + diffWeeks;

        contests.push({
          id: `code360-weekly-${year}-${targetMonth + 1}-${day}`,
          title: `Code360 Weekly Contest ${code360Num}`,
          platform: 'Code360',
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          durationMinutes: 90,
          url: `https://www.naukri.com/code360/contests/weekly-contest-${code360Num}`,
          difficulty: 'All Levels (Beginner to Advanced)',
          subscribersCount: 12200,
        });
      }

      // 4. Saturdays: AtCoder ABC + Alternate LeetCode Biweekly
      if (dayOfWeek === 6) {
        // AtCoder Beginner Contest (Every Saturday 05:30 PM - 07:10 PM IST)
        const acStart = new Date(year, targetMonth, day, 17, 30, 0);
        const acEnd = new Date(year, targetMonth, day, 19, 10, 0);
        const acDiffWeeks = Math.round((acStart.getTime() - AC_ABC_ANCHOR.getTime()) / (7 * 24 * 3600 * 1000));
        const abcNum = 356 + acDiffWeeks;

        contests.push({
          id: `ac-abc-${year}-${targetMonth + 1}-${day}`,
          title: `AtCoder Beginner Contest ${abcNum} (ABC)`,
          platform: 'AtCoder',
          startTime: acStart.toISOString(),
          endTime: acEnd.toISOString(),
          durationMinutes: 100,
          url: `https://atcoder.jp/contests/abc${abcNum}`,
          difficulty: 'Rating 0 - 1999',
          subscribersCount: 14100,
        });

        // LeetCode Biweekly (Alternate Saturday 08:00 PM - 09:30 PM IST)
        const biweekDiff = Math.round((acStart.getTime() - LC_BIWEEKLY_ANCHOR.getTime()) / (7 * 24 * 3600 * 1000));
        if (Math.abs(biweekDiff) % 2 === 0) {
          const lcBiStart = new Date(year, targetMonth, day, 20, 0, 0);
          const lcBiEnd = new Date(year, targetMonth, day, 21, 30, 0);
          const biweekNum = 130 + Math.floor(biweekDiff / 2);

          contests.push({
            id: `lc-biweekly-${year}-${targetMonth + 1}-${day}`,
            title: `LeetCode Biweekly Contest ${biweekNum}`,
            platform: 'LeetCode',
            startTime: lcBiStart.toISOString(),
            endTime: lcBiEnd.toISOString(),
            durationMinutes: 90,
            url: `https://leetcode.com/contest/biweekly-contest-${biweekNum}/`,
            difficulty: 'Rated for All',
            subscribersCount: 20100,
          });
        }
      }
    }
  }

  return contests;
}

/**
 * Parses cached Codeforces contests from localStorage or returns empty array.
 */
function getCachedCodeforcesContests(): ContestEvent[] {
  try {
    const raw = localStorage.getItem('csh_codeforces_contests');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.contests)) {
      return parsed.contests;
    }
  } catch {
    // Ignore cache parse errors
  }
  return [];
}

/**
 * Returns merged contest schedule (deterministic schedules + real cached Codeforces contests).
 * Deduplicated strictly so no duplicate events exist!
 */
export function getContestSchedule(baseDate: Date = new Date()): ContestEvent[] {
  const predictable = getPredictableContests(baseDate);
  const codeforces = getCachedCodeforcesContests();

  const combined = [...predictable, ...codeforces];
  return deduplicateContests(combined);
}

/**
 * Fetches real Codeforces contests from official Codeforces API and updates cache.
 * Filters upcoming and recently finished rounds.
 */
export async function fetchLiveCodeforcesContests(): Promise<ContestEvent[]> {
  try {