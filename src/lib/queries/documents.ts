import { createClient } from '@/lib/supabase/server';

export async function getDocuments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data;
}
