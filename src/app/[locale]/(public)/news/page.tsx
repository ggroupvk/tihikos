import { PageStub } from '@/components/ui/page-stub';
import { getTranslations } from 'next-intl/server';

const TEXT = {
  el: {
    title: 'Νέα και Δηλώσεις',
    subtitle: 'Επίσημες δηλώσεις, αναφορές μέσων και αναλυτικά άρθρα.',
  },
  ru: {
    title: 'Новости и заявления',
    subtitle: 'Официальные заявления, обзоры СМИ и аналитические статьи.',
  },
  en: {
    title: 'News and Statements',
    subtitle: 'Official statements, media coverage and analytical articles.',
  },
} as const;

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const copy = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <PageStub locale={locale} kicker={t('news')} title={copy.title} subtitle={copy.subtitle} />
  );
}
