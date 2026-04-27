import { createClient } from '@/lib/supabase/server';

export async function getTimelineEvents(limit?: number) {
  const supabase = await createClient();

  let query = supabase
    .from('timeline_events')
    .select('*')
    .eq('status', 'published')
    .order('event_date', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
