import { PageStub } from '@/components/ui/page-stub';
import { getTranslations } from 'next-intl/server';

const TEXT = {
  el: {
    title: 'Ο Μητροπολίτης Τυχικός',
    subtitle: 'Βιογραφία κατά περιόδους ζωής και διακονίας, φωτογραφικό αρχείο και κηρύγματα.',
  },
  ru: {
    title: 'Митрополит Тихикос',
    subtitle: 'Биография по периодам жизни и служения, фотоархив и проповеди.',
  },
  en: {
    title: 'Metropolitan Tychikos',
    subtitle: 'Biography by life and ministry periods, photo archive and homilies.',
  },
} as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const lang = locale as 'el' | 'ru' | 'en';
  const copy = TEXT[lang];

  return (
    <PageStub locale={locale} kicker={t('about')} title={copy.title} subtitle={copy.subtitle} />
  );
}
