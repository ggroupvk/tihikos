// Auto-generated types will come from: npx supabase gen types typescript
// This is a placeholder with manual types matching our schema

export type ContentStatus = 'draft' | 'published' | 'archived';
export type UserRole = 'admin' | 'editor';
export type ContentSource =
  | 'manual'
  | 'rss_spzh'
  | 'rss_philenews'
  | 'rss_orthochristian'
  | 'rss_orthodox_times'
  | 'rss_orthodoxia_post'
  | 'rss_ocp_society'
  | 'rss_gorthodox'
  | 'rss_cyprus_times';
export type VideoCategory = 'case' | 'support' | 'sermons' | 'other';
export type PositionTopic = 'ecumenism' | 'ukraine' | 'canonical_law';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          display_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      timeline_events: {
        Row: {
          id: string;
          event_date: string;
          sort_order: number;
          title_el: string;
          title_ru: string | null;
          title_en: string | null;
          description_el: string | null;
          description_ru: string | null;
          description_en: string | null;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['timeline_events']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['timeline_events']['Insert']>;
      };
      news: {
        Row: {
          id: string;
          slug: string;
          source: ContentSource;
          source_url: string | null;
          published_at: string | null;
          image_url: string | null;
          title_el: string;
          title_ru: string | null;
          title_en: string | null;
          excerpt_el: string | null;
          excerpt_ru: string | null;
          excerpt_en: string | null;
          body_el: string | null;
          body_ru: string | null;
          body_en: string | null;
          status: ContentStatus;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['news']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['news']['Insert']>;
      };
      videos: {
        Row: {
          id: string;
          youtube_id: string;
          category: VideoCategory;
          sort_order: number;
          published_at: string | null;
          title_el: string;
          title_ru: string | null;
          title_en: string | null;
          description_el: string | null;
          description_ru: string | null;
          description_en: string | null;
          has_subtitles_ru: boolean;
          has_subtitles_en: boolean;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['videos']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['videos']['Insert']>;
      };
      documents: {
        Row: {
          id: string;
          slug: string;
          file_path: string;
          file_size_bytes: number | null;
          source_url: string | null;
          sort_order: number;
          title_el: string;
          title_ru: string | null;
          title_en: string | null;
          description_el: string | null;
          description_ru: string | null;
          description_en: string | null;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['documents']['Insert']>;
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          topic: PositionTopic;
          source_url: string | null;
          published_at: string | null;
          image_url: string | null;
          title_el: string;
          title_ru: string | null;
          title_en: string | null;
          body_el: string | null;
          body_ru: string | null;
          body_en: string | null;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      support_letters: {
        Row: {
          id: string;
          author_name: string;
          author_title: string | null;
          author_country: string;
          author_email: string;
          message: string;
          gdpr_consent: boolean;
          is_approved: boolean;
          approved_by: string | null;
          approved_at: string | null;
          created_at: string;
        };
        Insert: Pick<Database['public']['Tables']['support_letters']['Row'], 'author_name' | 'author_country' | 'author_email' | 'message' | 'gdpr_consent'> & { author_title?: string };
        Update: Partial<Pick<Database['public']['Tables']['support_letters']['Row'], 'is_approved' | 'approved_by' | 'approved_at'>>;
      };
      persons: {
        Row: {
          id: string;
          slug: string;
          photo_url: string | null;
          sort_order: number;
          name_el: string;
          name_ru: string | null;
          name_en: string | null;
          title_el: string | null;
          title_ru: string | null;
          title_en: string | null;
          bio_el: string | null;
          bio_ru: string | null;
          bio_en: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['persons']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['persons']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          gdpr_consent: boolean;
          is_read: boolean;
          created_at: string;
        };
        Insert: Pick<Database['public']['Tables']['contact_messages']['Row'], 'name' | 'email' | 'message' | 'gdpr_consent'> & { subject?: string };
        Update: Partial<Pick<Database['public']['Tables']['contact_messages']['Row'], 'is_read'>>;
      };
    };
  };
}
