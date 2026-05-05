import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { AboutBio } from '@/components/sections/about-bio';
import { AboutPhotos } from '@/components/sections/about-photos';
import { AboutSermons } from '@/components/sections/about-sermons';
import { buildPageMetadata } from '@/lib/seo';
import type { SiteLocale } from '@/lib/site';

const TEXT = {
  el: {
    kicker: 'Πορτρέτο',
    title: 'Ο Μητροπολίτης Πάφου Τυχικός',
    subtitle:
      'Βιογραφία κατά περιόδους ζωής και διακονίας, φωτογραφικό αρχείο και κηρύγματα.',
  },
  ru: {
    kicker: 'Портрет',
    title: 'Митрополит Пафосский Тихик',
    subtitle: 'Биография по периодам жизни и служения, фотоархив и проповеди.',
  },
  en: {
    kicker: 'Portrait',
    title: 'Metropolitan Tychikos of Paphos',
    subtitle:
      'Biography by life and ministry periods, photo archive and homilies.',
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
    path: '/about',
    title: t.title,
    description: t.subtitle,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
      <AboutBio locale={locale} />
      <AboutPhotos locale={locale} />
      <AboutSermons locale={locale} />
    </main>
  );
}
