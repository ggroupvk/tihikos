import { createClient } from '@/lib/supabase/server';

export type PersonRow = {
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
};

export async function getPerson(slug: string): Promise<PersonRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as PersonRow;
}

export async function getPersons(): Promise<PersonRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data ?? []) as PersonRow[];
}
