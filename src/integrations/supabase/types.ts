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
          subject?: string | null
          user_agent?: string | null
          user_email?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          approved: boolean | null
          approved_at: string | null
          approved_by: string | null
          description: string | null
          file_name: string
          file_url: string
          id: string
          material_type: string
          semester: string
          status: string
          subject: string
          title: string
          uploaded_at: string | null
          uploaded_by: string
          user_email: string
          user_name: string
          year: string | null
        }
        Insert: {
          approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          description?: string | null
          file_name: string
          file_url: string
          id?: string
          material_type?: string
          semester: string
          status?: string
          subject: string
          title: string
          uploaded_at?: string | null
          uploaded_by: string
          user_email: string
          user_name: string
          year?: string | null
        }
        Update: {
          approved?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          description?: string | null
          file_name?: string
          file_url?: string
          id?: string
          material_type?: string
          semester?: string
          status?: string
          subject?: string
          title?: string
          uploaded_at?: string | null
          uploaded_by?: string
          user_email?: string
          user_name?: string
          year?: string | null
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          apply_url: string
          comments_count: number | null
          company: string
          created_at: string | null
          created_by: string
          deadline: string | null
          description: string
// [rag-build-step 2/10]: feat(types): add Row and Insert interfaces for rag_documents