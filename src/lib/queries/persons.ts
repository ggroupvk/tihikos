import { createClient } from '@/lib/supabase/server';

export async function getPerson(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getPersons() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data;
}
