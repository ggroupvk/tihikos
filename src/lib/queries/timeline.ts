import { createClient } from '@/lib/supabase/server';
import type { ContentStatus } from '@/types/database';

export type TimelineRow = {
  id: string;
  event_date: string;
  sort_order: number;
  title_el: string;
  title_ru: string | null;
  title_en: string | null;
  description_el: string | null;
  description_ru: string | null;
  description_en: string | null;
  status: ContentStatus;
};

export async function getTimelineEvents(limit?: number): Promise<TimelineRow[]> {
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
  return (data ?? []) as TimelineRow[];
}
