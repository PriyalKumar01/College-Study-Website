/**
 * Unified Subject Notes Contracts
 */

export interface NoteItem {
  name: string;
  url: string;
  contributor?: string;
  uploadedAt?: string;
}

export interface CuratedPlaylistMeta {
  playlistUrl: string;
  title: string;
  instructor?: string;
  videoCount?: number;
}

export interface UnifiedSubject {
  id: string;
  name: string;
  semester: number;
  branches: string[];
  notes: NoteItem[];
  playlistUrl?: string;
  courseCode?: string;
}
