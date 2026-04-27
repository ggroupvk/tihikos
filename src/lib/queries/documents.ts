import { createClient } from '@/lib/supabase/server';
import type { ContentStatus } from '@/types/database';

export type DocumentRow = {
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
};

export async function getDocuments(): Promise<DocumentRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data ?? []) as DocumentRow[];
}
