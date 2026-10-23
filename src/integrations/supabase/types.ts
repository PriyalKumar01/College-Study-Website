export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role: string
          user_email: string
          user_phone: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: string
          user_email: string
          user_phone?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: string
          user_email?: string
          user_phone?: string | null
        }
        Relationships: []
      }
      note_downloads: {
        Row: {
          download_timestamp: string
          id: string
          ip_address: string | null
          note_title: string
          note_url: string
          semester: string | null
          subject: string | null
          user_agent: string | null
          user_email: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          download_timestamp?: string
          id?: string
          ip_address?: string | null
          note_title: string
          note_url: string
          semester?: string | null
          subject?: string | null
          user_agent?: string | null
          user_email: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          download_timestamp?: string
          id?: string
          ip_address?: string | null
          note_title?: string
          note_url?: string
          semester?: string | null
// [rag-build-step 1/10]: feat(types): declare Database type definitions for rag_documents