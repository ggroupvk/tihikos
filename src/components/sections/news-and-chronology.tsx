import { getLatestNews } from '@/lib/queries/news';
import { getTimelineEvents } from '@/lib/queries/timeline';
import { getDocuments } from '@/lib/queries/documents';
import { NewsAndChronologyClient } from './news-and-chronology-client';

export async function NewsAndChronology({ locale }: { locale: string }) {
  const [news, events, documents] = await Promise.all([
    getLatestNews(4),
    getTimelineEvents(),
    getDocuments(),
  ]);

  return (
    <NewsAndChronologyClient
      locale={locale}
      news={news}
      events={events}
      documents={documents}
    />
  );
}
