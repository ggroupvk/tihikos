import { getTimelineEvents } from '@/lib/queries/timeline';
import { getDocuments } from '@/lib/queries/documents';
import { CaseChronologyClient } from './case-chronology-client';

export async function CaseChronology({ locale }: { locale: string }) {
  const [events, documents] = await Promise.all([
    getTimelineEvents(),
    getDocuments(),
  ]);
  return <CaseChronologyClient locale={locale} events={events} documents={documents} />;
}
