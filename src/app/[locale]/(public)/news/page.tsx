import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { NewsListing } from '@/components/sections/news-listing';
import { buildPageMetadata } from '@/lib/seo';
import type { SiteLocale } from '@/lib/site';

const TEXT = {
  el: {
    kicker: 'Νέα',
    title: 'Νέα και δηλώσεις',
    subtitle:
      'Επίσημες δηλώσεις του Μητροπολίτη, δημοσιεύματα του διεθνούς τύπου, αναλυτικά άρθρα.',
  },
  ru: {
    kicker: 'Новости',
    title: 'Новости и заявления',
    subtitle:
      'Официальные заявления митрополита, публикации международной прессы, аналитические статьи.',
  },
  en: {
    kicker: 'News',
    title: 'News and statements',
    subtitle:
      'Official statements of the Metropolitan, international press coverage, analytical articles.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = TEXT[locale as SiteLocale];
  return buildPageMetadata({
    locale: locale as SiteLocale,
    path: '/news',
    title: t.title,
    description: t.subtitle,
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
      <NewsListing locale={locale} />
    </main>
  );
}
