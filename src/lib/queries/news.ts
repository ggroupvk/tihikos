import { createClient } from '@/lib/supabase/server';
import type { ContentSource, ContentStatus } from '@/types/database';
import { news as localNews } from '@/lib/mock/data';

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

/**
 * Until Supabase is reseeded with `body_el/ru/en` content, overlay
 * locally-curated bodies (and missing entries) from `data.ts` so the
 * detail pages have substance. Removable once `npm run db:seed` runs
 * with the full dataset and the DB has all 20 articles.
 */
const LOCAL_BY_SLUG = new Map(localNews.map((n) => [n.slug, n]));

function mergeWithLocal(row: NewsRow): NewsRow {
  const local = LOCAL_BY_SLUG.get(row.slug);
  if (!local) return row;
  type LocalEnrich = {
    body_el?: string;
    body_ru?: string;
    body_en?: string;
    image_url?: string;
  };
  const le = local as LocalEnrich;
  return {
    ...row,
    body_el: row.body_el ?? le.body_el ?? null,
    body_ru: row.body_ru ?? le.body_ru ?? null,
    body_en: row.body_en ?? le.body_en ?? null,
    image_url: row.image_url ?? le.image_url ?? null,
  };
}

export async function getLatestNews(limit = 3): Promise<NewsRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return ((data ?? []) as NewsRow[]).map(mergeWithLocal);
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
    items: ((data ?? []) as NewsRow[]).map(mergeWithLocal),
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
  return mergeWithLocal(data as NewsRow);
}
