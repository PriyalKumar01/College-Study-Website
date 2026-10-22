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