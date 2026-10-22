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