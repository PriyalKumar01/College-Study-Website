/**
 * Utility to match community note subjects against static subject definitions.
 * Handles abbreviations, slight differences in naming, and acronyms (e.g. ITPC, FMMO, CPC, E&M, DBMS, OS).
 */

function cleanStr(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[()[\]{}_,.:\-\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAcronym(str: string): string {
  const cleaned = cleanStr(str);
  const words = cleaned
    .split(' ')
    .filter(w => w.length > 0 && !['and', 'to', 'of', 'for', 'in', 'the', 'a', 'an', 'with'].includes(w));
  return words.map(w => w[0]).join('');
}

export function matchesSubject(
  cnSubject: string | null | undefined,
  subName: string | null | undefined,
  subId?: string | null | undefined
): boolean {
  if (!cnSubject || (!subName && !subId)) return false;

  const rawCn = (cnSubject || '').trim();
  const rawSubName = (subName || '').trim();
  const rawSubId = (subId || '').trim();

  // 1. Direct match (case-insensitive)
  if (
    rawCn.toLowerCase() === rawSubName.toLowerCase() ||
    (rawSubId && rawCn.toLowerCase() === rawSubId.toLowerCase())
  ) {
    return true;
  }

  const cleanCn = cleanStr(rawCn);
  const cleanName = cleanStr(rawSubName);
  const cleanId = cleanStr(rawSubId);

  // 2. Cleaned exact match
  if (cleanCn === cleanName || (cleanId && cleanCn === cleanId)) {
    return true;
  }

  // 3. Substring inclusion (either way)
  if (cleanCn.length >= 3) {
    if (cleanName.includes(cleanCn) || cleanCn.includes(cleanName)) {
      return true;
    }
    if (cleanId && (cleanId.includes(cleanCn) || cleanCn.includes(cleanId))) {
      return true;
    }
  }

  // 4. Acronym Matching (e.g. ITPC <=> Introduction to Polymer Chemistry)
  const acrCn = getAcronym(cleanCn);
  const acrName = getAcronym(cleanName);
  const acrId = cleanId;

  if (acrCn && (acrCn === acrName || acrCn === acrId || acrCn === cleanCn)) {
    return true;
  }
  if (cleanCn === acrName || cleanCn === acrId) {
    return true;
  }
  if (acrName && (cleanCn.includes(acrName) || acrName.includes(cleanCn))) {
    return true;
  }
  if (acrCn && (cleanName.includes(acrCn) || acrCn.includes(cleanName))) {
    return true;
  }

  // 5. Significant word matching (e.g. "polymer", "chemistry", "thermodynamics")
  const stopWords = new Set(['and', 'the', 'for', 'intro', 'introduction', 'lab', 'engineering', 'science', 'technology', 'notes', 'all', 'subjects']);
  const cnWords = cleanCn.split(' ').filter(w => w.length > 2 && !stopWords.has(w));
  const nameWords = cleanName.split(' ').filter(w => w.length > 2 && !stopWords.has(w));

  if (cnWords.length > 0 && nameWords.length > 0) {
    const commonWords = cnWords.filter(w =>
      nameWords.includes(w) || nameWords.some(nw => nw.startsWith(w) || w.startsWith(nw))
    );
    if (commonWords.length > 0 && commonWords.length >= Math.min(cnWords.length, nameWords.length) * 0.5) {
      return true;
    }
  }

  return false;
}
