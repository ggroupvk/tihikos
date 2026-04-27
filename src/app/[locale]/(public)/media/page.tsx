import { PageStub } from '@/components/ui/page-stub';
import { getTranslations } from 'next-intl/server';

const TEXT = {
  el: {
    title: 'Μέσα και Έγγραφα',
    subtitle: 'Πλήρες αρχείο βίντεο, φωτογραφιών και επίσημων εγγράφων.',
  },
  ru: {
    title: 'Медиа и документы',
    subtitle: 'Полный архив видео, фотографий и официальных документов.',
  },
  en: {
    title: 'Media and Documents',
    subtitle: 'Full archive of videos, photographs and official documents.',
  },
} as const;

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const copy = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <PageStub locale={locale} kicker={t('media')} title={copy.title} subtitle={copy.subtitle} />
  );
}
