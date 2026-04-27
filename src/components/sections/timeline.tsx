import { getTranslations } from 'next-intl/server';
import { getTimelineEvents } from '@/lib/queries/timeline';
import { TimelineClient } from './timeline-client';

export async function TimelineSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const events = await getTimelineEvents();

  const labels = {
    el: { kicker: 'Η Υπόθεση', expand: 'Αναλυτική προβολή', collapse: 'Συμπτυγμένη προβολή' },
    ru: { kicker: 'Дело', expand: 'Подробное описание', collapse: 'Свернуть' },
    en: { kicker: 'The Case', expand: 'Show details', collapse: 'Hide details' },
  }[locale as 'el' | 'ru' | 'en'];

  return (
    <TimelineClient
      events={events}
      locale={locale}
      title={t('timelineTitle')}
      kicker={labels.kicker}
      expandLabel={labels.expand}
      collapseLabel={labels.collapse}
    />
  );
}
