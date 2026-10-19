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
 * Checks if a URL points to the old/paused Supabase project (axalbmmjqdezbkpffore).
 */
export const isBlockedServerUrl = (url?: string): boolean => {
  if (!url || url === '#') return false;
  return url.includes('axalbmmjqdezbkpffore.supabase.co');
};

/**
 * Downloads a file using blob fetch.
 */
export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Download failed');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    // Fallback: open in new tab
    window.open(url, '_blank');
  }
};

/**
 * Opens a file in browser for preview.
 * - Converts Drive download links to preview /view links.
 * - Intercepts paused server links gracefully without crashing.
 */
export const viewInBrowser = (url: string) => {
  if (!url || url === '#') return;

  // Intercept blocked/paused server #1 URLs
  if (isBlockedServerUrl(url)) {
    alert(
      "⚠️ Note Status: This material was uploaded to Server #1, which is undergoing scheduled maintenance until the Oct 29 quota reset.\n\nPlease refer to the verified Google Drive notes above in this section, or contact an admin."
    );
    return;
  }

  try {
    // Extract file ID from either /d/ID or ?id= patterns for Google Drive
    const fileId =
      url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ||
      new URL(url).searchParams.get('id');

    if (fileId) {
      window.open(`https://drive.google.com/file/d/${fileId}/preview`, '_blank');
    } else {
      window.open(url, '_blank');
    }
  } catch {
    window.open(url, '_blank');
  }
};

/**
 * Smart download handler:
 * 1. Supabase Storage notes are VIEW-ONLY (prevents server egress consumption).
 * 2. Paused server notes are intercepted gracefully.
 * 3. Google Drive downloads enforce rate-limits:
 *    - Max 5 downloads per day per verified user
 *    - Max 20 downloads per month
 */
export const smartDownload = async (
  url: string,
  title: string = 'download.pdf',
  currentUser?: User | null
) => {
  if (!url || url === '#') return;

  // 1. Blocked / Paused Server Guard
  if (isBlockedServerUrl(url)) {
    alert(
      "⚠️ Server Notice: This material is located on Server #1 (maintenance until Oct 29 quota reset). Please use the verified syllabus notes on Google Drive above."
    );
    return;
  }

  // 2. Supabase Storage Guard: Force View-Only to protect free bandwidth quota
  if (!isGoogleDriveUrl(url)) {
    alert(
      "📄 View Mode Active:\nTo keep StudyHub 100% free for all students and preserve server limits, community notes open directly in browser preview.\n\nOpening preview now..."
    );
    viewInBrowser(url);
    return;
  }

  // 3. Enforce Verified User Download Limits (5/day, 20/month)
  const limitCheck = await checkAndRecordDownload(url, title, currentUser);
  if (!limitCheck.allowed) {
    alert(`🔒 Download Restricted:\n\n${limitCheck.message}`);
    return;
  }

  // 4. Trigger Direct Google Drive Download
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
    // URL parsing fallback
    window.open(url, '_blank');
  }
};
