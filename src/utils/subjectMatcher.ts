// Search: normalized subject name matching and elective keyword resolution
/**
 * Utility to match community note subjects against static subject definitions.
 * Handles abbreviations, slight differences in naming, and acronyms (e.g. ITPC, FMMO, CPC, E&M, DBMS, OS, DAA, TOAFL).
 * Strictly guards against cross-subject contamination (e.g. PYQs leaking into theory subjects, DAA into DBMS).
 */

// Normalizes subject string for robust fuzzy & acronym comparison
function cleanStr(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[()[\]{}_,.:\-/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Known bidirectional abbreviation map for all engineering & science branches
const KNOWN_MAP: Record<string, string> = {
  // CSE / IT / AIML
  'daa': 'design and analysis of algorithms',
  'dbms': 'database management systems',
  'toafl': 'theory of automata and formal languages',
  'tafl': 'theory of automata and formal languages',
  'toc': 'theory of computation',
  'fl': 'formal languages',
  'os': 'operating systems',
  'cn': 'computer networks',
  'ds': 'data science',
  'dsa': 'data structures and algorithms',
  'coa': 'computer organization and architecture',
  'se': 'software engineering',
  'cd': 'compiler design',
  'wt': 'web technology',
  'ai': 'artificial intelligence',
  'ml': 'machine learning',
  'aiml': 'artificial intelligence and machine learning',

  // Examination / PYQs
  'pyqs': 'previous year questions',
  'pyq': 'previous year questions',

  // EE / ET / Other branches
  'bsa': 'basic system analysis',
  'ssdc': 'solid state devices and circuit',
  'emmi': 'electrical machines and measurements instrumentation',
  'eem': 'electrical engg materials',
  'eca': 'electronic circuit analysis',
  'emd': 'electrical machine design',
  'uet': 'utilization of electrical energy and traction',
  'cs': 'control systems',
  'dsp': 'digital signal processing',
  'mpmc': 'microprocessors and microcontrollers',
  'vlsi': 'very large scale integration',

  // Chemical / Polymer / Materials
  'itpc': 'introduction to polymer chemistry',
  'fmmo': 'fluid mechanics and mechanical operations',
  'cpc': 'chemical process calculation',
  'cre': 'chemical reaction engineering',
  'ht': 'heat transfer',
  'mt': 'mass transfer',
  'td': 'thermodynamics',
};

function isPyqSubject(str: string): boolean {
  const c = cleanStr(str);
  return c.includes('previous year') || c.includes('pyq') || c === 'pyqs';
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

  const cleanCn = cleanStr(rawCn);
  const cleanName = cleanStr(rawSubName);
  const cleanId = cleanStr(rawSubId);

  // 1. Strict Guard: PYQs should NEVER match standard academic subjects and vice-versa
  const cnIsPyq = isPyqSubject(cleanCn);
  const subIsPyq = isPyqSubject(cleanName) || isPyqSubject(cleanId);
  if (cnIsPyq !== subIsPyq) {
    return false;
  }

  // 2. Direct or clean exact match
  if (
    cleanCn === cleanName ||
    (cleanId && cleanCn === cleanId) ||
    rawCn.toLowerCase() === rawSubName.toLowerCase() ||
    (rawSubId && rawCn.toLowerCase() === rawSubId.toLowerCase())
  ) {
    return true;
  }

  // 3. Known bidirectional abbreviations
  if (KNOWN_MAP[cleanCn]) {
    const expanded = KNOWN_MAP[cleanCn];
    if (
      cleanName === expanded ||
      (cleanId && cleanId === expanded) ||
      cleanName.includes(expanded) ||
      expanded.includes(cleanName)
    ) {
      return true;
    }
  }
  if (KNOWN_MAP[cleanName]) {
    const expanded = KNOWN_MAP[cleanName];
    if (
      cleanCn === expanded ||
      cleanCn.includes(expanded) ||
      expanded.includes(cleanCn)
    ) {
      return true;
    }
  }
  if (cleanId && KNOWN_MAP[cleanId]) {
    const expanded = KNOWN_MAP[cleanId];
    if (
      cleanCn === expanded ||
      cleanCn.includes(expanded) ||
      expanded.includes(cleanCn)
    ) {
      return true;
    }
  }

  // 4. Multi-word Acronym Matching (Only when words >= 2, never match single-word letters)
  const getMultiWordAcronym = (s: string): string => {
    const words = s
      .split(' ')
      .filter(
        w =>
          w.length > 0 &&
          !['and', 'to', 'of', 'for', 'in', 'the', 'a', 'an', 'with'].includes(w)
      );
    if (words.length >= 2) {
      return words.map(w => w[0]).join('');
    }
    return '';
  };

  const acrCn = getMultiWordAcronym(cleanCn);
  const acrName = getMultiWordAcronym(cleanName);

  if (acrCn && (acrCn === cleanName || (cleanId && acrCn === cleanId) || (acrName && acrCn === acrName))) {
    return true;
  }
  if (acrName && (acrName === cleanCn || (acrCn && acrName === acrCn))) {
    return true;
  }

  // 5. Meaningful substring token inclusion (length >= 4 to avoid false 2-3 char overlap)
  if (cleanCn.length >= 4 && cleanName.length >= 4) {
    if (cleanName.includes(cleanCn) || cleanCn.includes(cleanName)) {
      return true;
    }
  }

  // 6. Significant word overlap (for subjects like 'Engineering Chemistry Notes')
  const stopWords = new Set([
    'and', 'the', 'for', 'intro', 'introduction', 'lab', 'file', 'practical',
    'engineering', 'science', 'technology', 'notes', 'all', 'subjects'
  ]);
  const cnWords = cleanCn.split(' ').filter(w => w.length >= 3 && !stopWords.has(w));
  const nameWords = cleanName.split(' ').filter(w => w.length >= 3 && !stopWords.has(w));

  if (cnWords.length > 0 && nameWords.length > 0) {
    const commonWords = cnWords.filter(w => nameWords.includes(w));
    if (commonWords.length > 0 && commonWords.length === Math.min(cnWords.length, nameWords.length)) {
      return true;
    }
  }

  return false;
}
