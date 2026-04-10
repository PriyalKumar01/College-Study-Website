/**
 * Downloads a file using blob fetch to force download instead of opening in browser.
 * Works for cross-origin URLs (e.g., Supabase storage).
 */
export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Download failed");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    // Fallback: open in new tab
    window.open(url, "_blank");
  }
};

/**
 * Smart download handler that handles both Google Drive and Supabase storage URLs.
 * - Google Drive URLs: extracts file ID and opens direct download link
 * - Supabase/other URLs: uses blob fetch to force download
 */
export const smartDownload = async (url: string, title: string = 'download.pdf') => {
  if (url === '#') return;
  
  // Google Drive URL handling
  const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (fileId) {
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    window.open(downloadUrl, '_blank');
    return;
  }
  
  // For Supabase storage and other URLs, use blob download
  const filename = title.replace(/[^a-zA-Z0-9._-]/g, '_') + '.pdf';
  await downloadFile(url, filename);
};
