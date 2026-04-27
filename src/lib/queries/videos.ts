import { createClient } from '@/lib/supabase/server';
import type { ContentStatus, VideoCategory } from '@/types/database';

export type VideoRow = {
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
};

export async function getVideos(options?: {
  category?: VideoCategory;
  limit?: number;
}): Promise<VideoRow[]> {
  const supabase = await createClient();

  let query = supabase
    .from('videos')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (options?.category) {
    query = query.eq('category', options.category);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as VideoRow[];
}

export async function getLatestVideos(limit = 4): Promise<VideoRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as VideoRow[];
}
