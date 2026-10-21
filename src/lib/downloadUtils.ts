import { checkAndRecordDownload } from './downloadLimits';
import { User } from '@supabase/supabase-js';

/**
 * Checks if a given URL is a Google Drive file link.
 */
export const isGoogleDriveUrl = (url?: string): boolean => {
  if (!url || url === '#') return false;
  return url.includes('drive.google.com') || url.includes('docs.google.com');
};

/**
 * Checks if a given URL belongs to Supabase Storage.
 */
export const isSupabaseStorageUrl = (url?: string): boolean => {
  if (!url || url === '#') return false;
  return url.includes('supabase.co/storage');
};

/**
 * Checks if a URL points to any decommissioned/dead host.
 */
export const isBlockedServerUrl = (url?: string): boolean => {
  return !url || url === '#' || url.trim() === '';
};

/**
 * Downloads a file using blob fetch or opens in a new tab.
 * Supabase Storage files are automatically intercepted and routed to online reading to eliminate egress.
 */
export const downloadFile = async (url: string, filename: string) => {
  if (isSupabaseStorageUrl(url)) {
    alert('📖 Online Reading Mode:\n\nTo keep StudyHub 100% free and protect server bandwidth, direct PDF download is disabled for community notes. Opening in fast online reader!');
    viewInBrowser(url);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Download failed');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || 'study-material.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    // Fallback: open directly in new tab
    window.open(url, '_blank');
  }
};

/**
 * Opens a file in browser for preview.
 * - Converts Drive download links to preview /preview links.
 * - Opens Supabase Storage files in Google Docs Viewer so Google CDN caches the rendering and eliminates egress.
 */
export const viewInBrowser = (url: string) => {
  if (!url || url === '#') return;

  if (isBlockedServerUrl(url)) {
    console.warn('[viewInBrowser] Skipping unreachable server link:', url);
    return;
  }

  try {
    // Extract file ID from either /d/ID or ?id= patterns for Google Drive
    const fileId =
      url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ||
      new URL(url).searchParams.get('id');

    if (fileId) {
      window.open(`https://drive.google.com/file/d/${fileId}/preview`, '_blank');
      return;
    }

    // Supabase Storage: Use Google Docs Viewer to offload file delivery to Google CDN
    if (isSupabaseStorageUrl(url)) {
      window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=false`, '_blank');
      return;
    }

    window.open(url, '_blank');
  } catch {
    window.open(url, '_blank');
  }
};

/**
 * Smart download handler:
 * - Downloads PDFs smoothly without blocking alert popups.
 * - Direct Google Drive downloads enforce student rate-limits (5/day, 20/month).
 * - Supabase Storage files are kept strictly view-only to maintain egress limits.
 */
export const smartDownload = async (
  url: string,
  title: string = 'download.pdf',
  currentUser?: User | null
) => {
  if (!url || url === '#') return;

  if (isBlockedServerUrl(url)) {
    console.warn('[smartDownload] Skipping unreachable server link:', url);
    return;
  }

  // 1. Supabase Storage / Community PDF: VIEW-ONLY (Preserves server bandwidth and enforces preview)
  if (isSupabaseStorageUrl(url)) {
    alert('📖 Online Reading Mode:\n\nDirect downloading for community notes is restricted to protect monthly server limits. Opening in online preview mode for reading!');
    viewInBrowser(url);
    return;
  }

  if (!isGoogleDriveUrl(url)) {
    viewInBrowser(url);
    return;
  }

  // 2. Enforce Verified User Download Limits for Google Drive (5/day, 20/month)
  const limitCheck = await checkAndRecordDownload(url, title, currentUser);
  if (!limitCheck.allowed) {
    alert(`🔒 Download Notice:\n\n${limitCheck.message}`);
    return;
  }

  // 3. Trigger Google Drive Download
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'drive.google.com') {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || parsed.searchParams.get('id');
      if (fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        window.open(downloadUrl, '_blank');
        return;
      }
    }

    if (parsed.hostname.includes('google.com') || parsed.protocol === 'https:') {
      window.open(url, '_blank');
      return;
    }
  } catch {
    window.open(url, '_blank');
  }
};
