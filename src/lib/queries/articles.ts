import { createClient } from '@/lib/supabase/server';
import type { PositionTopic } from '@/types/database';

export async function getArticles(topic?: PositionTopic) {
  const supabase = await createClient();

  let query = supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (topic) {
    query = query.eq('topic', topic);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
}
