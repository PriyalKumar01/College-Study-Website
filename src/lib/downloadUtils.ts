/** Download utility with browser preview and daily/monthly quota protection */
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
  return (
    url.includes('supabase.co/storage') ||
    url.includes('/storage/v1/object/public/') ||
    url.includes('axalbmmjqdezbkpffore') ||
    url.includes('xjxdauvimiflzbozycki')
  );
};

/**
 * Checks if a given URL belongs to Cloudflare R2 (zero egress storage).
 */
export const isCloudflareR2Url = (url?: string): boolean => {
  if (!url || url === '#') return false;
  return url.includes('.r2.dev') || url.includes('.r2.cloudflarestorage.com') || url.includes('pub-a7a8e9cce7e14983a69b9c28a6487e28');
};

/**
 * Checks if a URL points to any decommissioned/dead host.
 */
export const isBlockedServerUrl = (url?: string): boolean => {
  return !url || url === '#' || url.trim() === '';
};

/**
 * Zero-Egress URL Normalizer:
 * Safe passthrough helper that preserves working file URLs.
 * Notes already synced to Cloudflare R2 carry R2 URLs directly in the database.
 * Newly uploaded notes retain their valid Supabase Storage URLs until synced,
 * completely preventing 404 Not Found errors for new uploads.
 */
export const normalizeToZeroEgressUrl = (url?: string): string => {
  if (!url || url === '#' || url.trim() === '') return '';
  return url;
};

/**
 * Downloads a file using blob fetch or triggers direct browser download.
 * Handles Cloudflare R2, Supabase Storage, and provides seamless fallback
 * so newly uploaded and synced notes download reliably without 404 errors.
 */
export const downloadFile = async (rawUrl: string, filename: string) => {
  if (!rawUrl || rawUrl === '#') return;
  const safeFilename = filename?.endsWith('.pdf') ? filename : `${filename || 'study-material'}.pdf`;

  // 1. Supabase Storage URLs (newly uploaded / unsynced files)
  if (isSupabaseStorageUrl(rawUrl)) {
    try {
      const response = await fetch(rawUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = safeFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        return;
      }
    } catch {}

    // Fallback: direct download parameter for Supabase Storage
    const downloadUrl = rawUrl.includes('?')
      ? `${rawUrl}&download=${encodeURIComponent(safeFilename)}`
      : `${rawUrl}?download=${encodeURIComponent(safeFilename)}`;
    window.open(downloadUrl, '_blank');
    return;
  }

  // 2. Cloudflare R2 URLs (synced files)
  if (isCloudflareR2Url(rawUrl)) {
    try {
      const response = await fetch(rawUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = safeFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        return;
      }
    } catch {}

    // Fallback 2a: If R2 returns 404 or CORS fails, attempt Supabase Storage equivalent
    const match = rawUrl.match(/study-materials\/(.*)/);
    if (match) {
      const supabaseFallback = `https://axalbmmjqdezbkpffore.supabase.co/storage/v1/object/public/study-materials/${match[1]}`;
      try {
        const fbResp = await fetch(supabaseFallback);
        if (fbResp.ok) {
          const blob = await fbResp.blob();
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = safeFilename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
          return;
        }
      } catch {}
    }

    // Fallback 2b: Open in new tab
    window.open(rawUrl, '_blank');
    return;
  }

  // 3. Fallback for any other URL
  try {
    const response = await fetch(rawUrl);
    if (!response.ok) throw new Error('Download failed');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = safeFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(rawUrl, '_blank');
  }
};

/**
 * Opens a file in browser for preview.
 * - Converts Drive download links to preview /preview links.
 * - Opens newly uploaded Supabase Storage files directly (native browser PDF viewer, HTTP 200).
 * - Opens synced Cloudflare R2 files directly (zero egress).
 * - Never transforms unsynced files prematurely, preventing 404 errors.
 */
export const viewInBrowser = (rawUrl: string) => {
  if (!rawUrl || rawUrl === '#') return;

  if (isBlockedServerUrl(rawUrl)) {
    console.warn('[viewInBrowser] Skipping unreachable server link:', rawUrl);
    return;
  }

  try {
    // 1. Google Drive URLs
    const fileId =
      rawUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ||
      new URL(rawUrl).searchParams.get('id');

    if (fileId) {
      window.open(`https://drive.google.com/file/d/${fileId}/preview`, '_blank');
      return;
    }

    // 2. Supabase Storage URLs (newly uploaded files before sync):
    // Open directly in browser - Supabase Storage serves PDFs natively with HTTP 200
    if (isSupabaseStorageUrl(rawUrl)) {
      window.open(rawUrl, '_blank');
      return;
    }

    // 3. Cloudflare R2 and other direct URLs
    window.open(rawUrl, '_blank');
  } catch {
    window.open(rawUrl, '_blank');
  }
};

/**
 * Smart download handler:
 * - Direct PDF downloads enabled smoothly for community notes & all sources without blocking alert popups.
 * - Enforces verified student rate-limits (10/day, 30/month) to prevent abuse.
 * - Supports Google Drive, Supabase Storage, and Cloudflare R2 seamlessly.
 */
export const smartDownload = async (
  rawUrl: string,
  title: string = 'download.pdf',
  currentUser?: User | null
) => {
  if (!rawUrl || rawUrl === '#') return;

  if (isBlockedServerUrl(rawUrl)) {
    console.warn('[smartDownload] Skipping unreachable server link:', rawUrl);
    return;
  }

  // 1. Enforce Student Download Limits (10/day, 30/month) - Owner & Admins exempt
  const limitCheck = await checkAndRecordDownload(rawUrl, title, currentUser);
  if (!limitCheck.allowed) {
    alert(`🔒 Download Notice:\n\n${limitCheck.message}`);
    return;
  }

  const safeFilename = title.endsWith('.pdf') ? title : `${title}.pdf`;

  // 2. Google Drive direct download
  if (isGoogleDriveUrl(rawUrl)) {
    try {
      const parsed = new URL(rawUrl);
      if (parsed.hostname === 'drive.google.com') {
        const fileId = rawUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || parsed.searchParams.get('id');
        if (fileId) {
          const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
          window.open(downloadUrl, '_blank');
          return;
        }
      }

      if (parsed.hostname.includes('google.com') || parsed.protocol === 'https:') {
        window.open(rawUrl, '_blank');
        return;
      }
    } catch {
      window.open(rawUrl, '_blank');
      return;
    }
  }

  // 3. Supabase Storage, Cloudflare R2, and all direct PDF URLs: download directly!
  await downloadFile(rawUrl, safeFilename);
};
