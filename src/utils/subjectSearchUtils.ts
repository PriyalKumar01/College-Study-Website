/**
 * Subject Search and Filtering Utilities
 */

export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function matchesSubjectQuery(subjectName: string, query: string): boolean {
  if (!query || !query.trim()) return true;
  const tokens = tokenizeQuery(query);
  const normalizedSubject = subjectName.toLowerCase();
  return tokens.every((token) => normalizedSubject.includes(token));
}

export function highlightMatchedText(text: string, query: string): { matched: boolean; text: string }[] {
  if (!query.trim()) return [{ matched: false, text }];
  const tokens = tokenizeQuery(query);
  const regex = new RegExp(`(${tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part) => ({
    matched: tokens.some((t) => t.toLowerCase() === part.toLowerCase()),
    text: part,
  }));
}
