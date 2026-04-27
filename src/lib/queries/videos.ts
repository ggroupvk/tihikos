import { createClient } from '@/lib/supabase/server';
import type { VideoCategory } from '@/types/database';

export async function getVideos(options?: {
  category?: VideoCategory;
  limit?: number;
}) {
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
  return data;
}

export async function getLatestVideos(limit = 4) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
