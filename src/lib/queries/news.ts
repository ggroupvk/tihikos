import { createClient } from '@/lib/supabase/server';

const PAGE_SIZE = 10;

export async function getLatestNews(limit = 3) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('news')
    .select('id, slug, title_el, title_ru, title_en, excerpt_el, excerpt_ru, excerpt_en, image_url, published_at, source')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getNewsPaginated(page = 1) {
  const supabase = await createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('news')
    .select('id, slug, title_el, title_ru, title_en, excerpt_el, excerpt_ru, excerpt_en, image_url, published_at, source', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return {
    items: data,
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
}

export async function getNewsBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
}
