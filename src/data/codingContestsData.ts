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