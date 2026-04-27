import { createClient } from '@/lib/supabase/server';
import type { ContentSource, ContentStatus } from '@/types/database';

export type NewsRow = {
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
};

const PAGE_SIZE = 10;

export async function getLatestNews(limit = 3): Promise<NewsRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as NewsRow[];
}

export async function getNewsPaginated(page = 1) {
  const supabase = await createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('news')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return {
    items: (data ?? []) as NewsRow[],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
}

export async function getNewsBySlug(slug: string): Promise<NewsRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data as NewsRow;
}
