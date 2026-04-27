import { PageStub } from '@/components/ui/page-stub';
import { getTranslations } from 'next-intl/server';

const TEXT = {
  el: {
    title: 'Η Υπόθεση',
    subtitle: 'Πλήρης χρονολογία, επίσημα έγγραφα και κανονικές διευκρινίσεις.',
  },
  ru: {
    title: 'Дело митрополита',
    subtitle: 'Полная хронология, официальные документы и канонические разъяснения.',
  },
  en: {
    title: 'The Case',
    subtitle: 'Full timeline, official documents and canonical clarifications.',
  },
} as const;

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const copy = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <PageStub locale={locale} kicker={t('case')} title={copy.title} subtitle={copy.subtitle} />
  );
}
