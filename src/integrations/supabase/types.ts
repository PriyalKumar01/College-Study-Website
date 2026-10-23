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
          id: string
          image_url: string | null
          likes_count: number | null
          location: string
          title: string
          type: string
          user_name: string
        }
        Insert: {
          apply_url: string
          comments_count?: number | null
          company: string
          created_at?: string | null
          created_by: string
          deadline?: string | null
          description: string
          id?: string
          image_url?: string | null
          likes_count?: number | null
          location: string
          title: string
          type: string
          user_name: string
        }
        Update: {
          apply_url?: string
          comments_count?: number | null
          company?: string
          created_at?: string | null
          created_by?: string
          deadline?: string | null
          description?: string
          id?: string
          image_url?: string | null
          likes_count?: number | null
          location?: string
          title?: string
          type?: string
          user_name?: string
        }
        Relationships: []
      }
      opportunity_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          opportunity_id: string
          user_email: string
          user_id: string
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          opportunity_id: string
          user_email: string
          user_id: string
          user_name: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          opportunity_id?: string
          user_email?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_comments_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunity_likes: {
        Row: {
          created_at: string | null
          id: string
          opportunity_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          opportunity_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          opportunity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_likes_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          branch: string | null
          college: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          mobile_number: string | null
          updated_at: string
          user_id: string
          year: string | null
        }
        Insert: {
          avatar_url?: string | null
          branch?: string | null
          college?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          mobile_number?: string | null
          updated_at?: string
          user_id: string
          year?: string | null
        }
        Update: {
          avatar_url?: string | null
          branch?: string | null
          college?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          mobile_number?: string | null
          updated_at?: string
          user_id?: string
          year?: string | null
        }
        Relationships: []
      }
      resume_analyses: {
        Row: {
          analysis_result: Json | null
          created_at: string
          file_name: string | null
          file_path: string | null
          id: string
          overall_score: number | null
          user_id: string | null
        }
        Insert: {
          analysis_result?: Json | null
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          id?: string
          overall_score?: number | null
          user_id?: string | null
        }
        Update: {
          analysis_result?: Json | null
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          id?: string
          overall_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          amount: string
          amount_num: number
          apply_url: string
          approval_status: string
          created_at: string | null
          deadline: string
          description: string
          id: string
          income: string
          level: string
          marks: string
          name: string
          org: string
          status: string
          streams: string[]
          submitted_by: string | null
          submitted_by_email: string | null
          tags: string[]
          type: string
          who: string[]
        }
        Insert: {
          amount: string
          amount_num?: number
          apply_url: string
          approval_status?: string
          created_at?: string | null
          deadline: string
          description: string
          id?: string
          income?: string
          level?: string
          marks?: string
          name: string
          org: string
          status?: string
          streams?: string[]
          submitted_by?: string | null
          submitted_by_email?: string | null
          tags?: string[]
          type?: string
          who?: string[]
        }
        Update: {
          amount?: string
          amount_num?: number
          apply_url?: string
          approval_status?: string
          created_at?: string | null
          deadline?: string
          description?: string
          id?: string
          income?: string
          level?: string
          marks?: string
          name?: string
          org?: string
          status?: string
          streams?: string[]
          submitted_by?: string | null
          submitted_by_email?: string | null
          tags?: string[]
          type?: string
          who?: string[]
        }
        Relationships: []
      }
    }
      rag_documents: {
        Row: {
          id: string
          title: string
          source_type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'md' | 'site'
          storage_path: string | null
          public_url: string | null
          subject: string | null
          branch: string | null
          semester: string | null
          program: 'btech' | 'bsms' | 'bba' | 'mba' | 'general' | null
          doc_type: 'notes' | 'pyq' | 'syllabus' | 'lab' | 'book' | 'site_knowledge' | null
          file_hash: string | null
          page_count: number | null
          status: 'pending' | 'processing' | 'ready' | 'failed'
          error: string | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          source_type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'md' | 'site'
          storage_path?: string | null
          public_url?: string | null
          subject?: string | null
          branch?: string | null
          semester?: string | null
          program?: 'btech' | 'bsms' | 'bba' | 'mba' | 'general' | null
          doc_type?: 'notes' | 'pyq' | 'syllabus' | 'lab' | 'book' | 'site_knowledge' | null
          file_hash?: string | null
          page_count?: number | null
          status?: 'pending' | 'processing' | 'ready' | 'failed'
          error?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          source_type?: 'pdf' | 'docx' | 'pptx' | 'txt' | 'md' | 'site'
          storage_path?: string | null
          public_url?: string | null
          subject?: string | null
          branch?: string | null
          semester?: string | null
          program?: 'btech' | 'bsms' | 'bba' | 'mba' | 'general' | null
          doc_type?: 'notes' | 'pyq' | 'syllabus' | 'lab' | 'book' | 'site_knowledge' | null
          file_hash?: string | null
          page_count?: number | null
          status?: 'pending' | 'processing' | 'ready' | 'failed'
          error?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      rag_chunks: {
        Row: {
          id: string
          document_id: string
          chunk_index: number
          page_start: number | null
          page_end: number | null
          content: string
          token_count: number | null
          embedding: string | number[] | null
          content_tsv: unknown
          metadata: Json
        }
        Insert: {
          id?: string
          document_id: string
          chunk_index: number
          page_start?: number | null
          page_end?: number | null
          content: string
          token_count?: number | null
          embedding?: string | number[] | null
          content_tsv?: unknown
          metadata?: Json
        }
        Update: {
          id?: string
          document_id?: string
          chunk_index?: number
          page_start?: number | null
          page_end?: number | null
          content?: string
          token_count?: number | null
          embedding?: string | number[] | null
          content_tsv?: unknown
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "rag_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "rag_documents"
            referencedColumns: ["id"]
          }
        ]
      }
      ai_usage: {
        Row: {
          identifier: string
          usage_date: string
          count: number
        }
        Insert: {
          identifier: string
          usage_date: string
          count?: number
        }
        Update: {
          identifier?: string
          usage_date?: string
          count?: number
        }
        Relationships: []
      }
      ai_sessions: {
        Row: {
          token_hash: string
          created_at: string
          expires_at: string
          identifier: string | null
        }
        Insert: {
          token_hash: string
          created_at?: string
          expires_at: string
// [rag-build-step 7/10]: feat(types): add match_rag_chunks function signature to Supabase types