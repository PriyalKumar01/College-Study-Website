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
 * Automatically routes any Supabase Storage URLs directly through Cloudflare R2 CDN,
 * ensuring 100% zero Supabase egress fees and zero storage bandwidth consumption.
 */
export const normalizeToZeroEgressUrl = (url?: string): string => {
  if (!url || url === '#' || url.trim() === '') return '';

  // Google Drive URLs remain intact
  if (isGoogleDriveUrl(url)) return url;

  // Cloudflare R2 URLs are already optimal
  if (isCloudflareR2Url(url)) return url;

  // Transform Supabase Storage URLs to Cloudflare R2
  if (isSupabaseStorageUrl(url)) {
    const match = url.match(/\/storage\/v1\/object\/public\/(.*)/) || url.match(/\/study-materials\/(.*)/);
    if (match) {
      const rawPath = decodeURIComponent(match[1]);
      // Normalize prefix to study-materials/...
      const cleanPath = rawPath.replace(/^study-materials\//, '');
      const encodedKey = cleanPath.split('/').map(part => encodeURIComponent(part)).join('/');
      return `https://pub-a7a8e9cce7e14983a69b9c28a6487e28.r2.dev/study-materials/${encodedKey}`;
    }
  }

  return url;
};

/**
 * Downloads a file using blob fetch or triggers direct browser download.
 * Direct PDF download is fully enabled for community notes and Cloudflare storage.
 */
export const downloadFile = async (rawUrl: string, filename: string) => {
  const url = normalizeToZeroEgressUrl(rawUrl);
  const safeFilename = filename?.endsWith('.pdf') ? filename : `${filename || 'study-material'}.pdf`;

  try {
    const response = await fetch(url);
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
    // Fallback: direct download parameter for Supabase Storage or open in new tab
    if (isSupabaseStorageUrl(url)) {
      const downloadUrl = url.includes('?')
        ? `${url}&download=${encodeURIComponent(safeFilename)}`
        : `${url}?download=${encodeURIComponent(safeFilename)}`;
      window.open(downloadUrl, '_blank');
    } else {
      window.open(url, '_blank');
    }
  }
};

/**
 * Opens a file in browser for preview.
 * - Converts Drive download links to preview /preview links.
 * - Normalizes Supabase Storage links to Cloudflare R2 to eliminate egress completely.
 */
export const viewInBrowser = (rawUrl: string) => {
  if (!rawUrl || rawUrl === '#') return;

  const url = normalizeToZeroEgressUrl(rawUrl);

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

    // Supabase Storage fallback: Use Google Docs Viewer to offload file delivery to Google CDN
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
 * - Direct PDF downloads enabled smoothly for community notes & all sources without blocking alert popups.
 * - Enforces verified student rate-limits (5/day, 20/month) to prevent abuse.
 * - Supports Google Drive, Supabase Storage, and Cloudflare R2 seamlessly.
 */
export const smartDownload = async (
  rawUrl: string,
  title: string = 'download.pdf',
  currentUser?: User | null
) => {
  if (!rawUrl || rawUrl === '#') return;

  const url = normalizeToZeroEgressUrl(rawUrl);

  if (isBlockedServerUrl(url)) {
    console.warn('[smartDownload] Skipping unreachable server link:', url);
    return;
  }

  // 1. Enforce Student Download Limits (5/day, 20/month) - Owner & Admins exempt
  const limitCheck = await checkAndRecordDownload(url, title, currentUser);
  if (!limitCheck.allowed) {
    alert(`🔒 Download Notice:\n\n${limitCheck.message}`);
    return;
  }

  const safeFilename = title.endsWith('.pdf') ? title : `${title}.pdf`;

  // 2. Google Drive direct download
  if (isGoogleDriveUrl(url)) {
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
      return;
    }
  }

  // 3. Supabase Storage, Cloudflare R2, and all direct PDF URLs: download directly!
  await downloadFile(url, safeFilename);
};
