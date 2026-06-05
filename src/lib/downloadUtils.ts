/**
 * Downloads a file using blob fetch to force download instead of opening in browser.
 * Works for cross-origin URLs (e.g., Supabase storage).
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
 * Opens a Google Drive file for in-browser preview (not download).
 * Converts uc?export=download or any Drive link to a /view link.
 * Falls back to opening the URL as-is for non-Drive or Supabase links.
 */
export const viewInBrowser = (url: string) => {
  if (url === '#') return;
  try {
    // Extract file ID from either /d/ID or ?id= patterns
    const fileId =
      url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] ||
      new URL(url).searchParams.get('id');
    if (fileId) {
      window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
    } else {
      window.open(url, '_blank');
    }
  } catch {
    window.open(url, '_blank');
  }
};

/**
 * Smart download handler that handles both Google Drive and Supabase storage URLs.
 * - Google Drive file URLs (drive.google.com): extracts file ID and opens direct download link
 * - Google Docs/Sheets/Slides URLs (docs.google.com) and other links: open as-is in new tab
 * - Supabase/other URLs: uses blob fetch to force download
 */
export const smartDownload = async (url: string, title: string = 'download.pdf') => {
  if (url === '#') return;

  try {
    const parsed = new URL(url);

    // Only convert drive.google.com file links to downloadable links
    if (parsed.hostname === 'drive.google.com') {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        window.open(downloadUrl, '_blank');
        return;
      }
      // uc?export=download links that have ?id= param
      const idParam = parsed.searchParams.get('id');
      if (idParam) {
        window.open(url, '_blank');
        return;
      }
    }

    // Google Docs, Sheets, Slides, Forms, or any other web URL — open as-is
    if (parsed.hostname.includes('google.com') || parsed.protocol === 'https:') {
      window.open(url, '_blank');
      return;
    }
  } catch {
    // Not a valid URL, fall through to blob download
  }

  // For Supabase storage and other non-HTTP URLs, use blob download
  const filename = title.replace(/[^a-zA-Z0-9._-]/g, '_') + '.pdf';
  await downloadFile(url, filename);
};
