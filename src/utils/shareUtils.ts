/**
 * Utility for unified, high-reliability sharing across College Study Hub.
 * Uses native Web Share API on mobile devices, with automatic clipboard copy
 * and WhatsApp fallback on desktop.
 */

export interface ShareContentParams {
  title: string;
  text?: string;
  url: string;
  toast?: (options: { title: string; description?: string; variant?: any }) => void;
}

export async function shareContent({
  title,
  text,
  url,
  toast,
}: ShareContentParams): Promise<'native' | 'clipboard_wa' | 'aborted'> {
  const fullUrl = url.startsWith('http')
    ? url
    : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;

  const shareMessage = text
    ? `${text}\n${fullUrl}`
    : `Check out ${title} notes on College Study Hub:\n${fullUrl}`;

  // 1. Mobile Web Share API (Android, iOS Safari/Chrome, etc.)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title,
        text: shareMessage,
        url: fullUrl,
      });
      return 'native';
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // User cancelled share dialog
        return 'aborted';
      }
      // If error or unsupported format, continue to fallback
    }
  }

  // 2. Clipboard copy fallback
  let copied = false;
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(fullUrl);
      copied = true;
    } catch (clipErr) {
      console.warn('Clipboard write failed:', clipErr);
    }
  }

  if (toast) {
    toast({
      title: copied ? 'Link Copied! 📋' : 'Opening WhatsApp... 🚀',
      description: copied
        ? `Direct link to "${title}" copied to clipboard.`
        : `Sharing "${title}" on WhatsApp.`,
    });
  }

  // 3. WhatsApp web / mobile fallback
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  return 'clipboard_wa';
}

export function buildSubjectShareUrl(
  pathname: string,
  subjectId?: string,
  subjectName?: string
): string {
  const cleanPath = pathname.split('?')[0];
  const queryVal = (subjectId || subjectName || '').trim();
  if (!queryVal) return cleanPath;
  return `${cleanPath}?subject=${encodeURIComponent(queryVal)}`;
}
