/**
 * PDF Resource Link Verifier
 */

export function isValidDriveLink(url: string): boolean {
  if (!url) return false;
  return /drive\.google\.com\/(?:file\/d\/|folderview\?id=|open\?id=|drive\/folders\/)/i.test(url);
}

export function sanitizeResourceUrl(url: string): string {
  if (!url) return '#';
  return url.trim();
}
