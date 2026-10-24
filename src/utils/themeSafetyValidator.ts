/**
 * Theme Safety Validator
 * Verifies that no forbidden blue color tokens (bg-blue, text-blue, border-blue) exist in targeted modules.
 */

export function assertNoForbiddenBlueColors(sourceContent: string): { isSafe: boolean; violations: string[] } {
  const blueRegex = /\b(?:bg|text|border|ring|fill|stroke)-blue-[1-9]00\b/g;
  const matches = sourceContent.match(blueRegex) || [];
  return {
    isSafe: matches.length === 0,
    violations: Array.from(new Set(matches)),
  };
}
