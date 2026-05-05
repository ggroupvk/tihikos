import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { MediaVideos } from '@/components/sections/media-videos';
import { MediaPhotos } from '@/components/sections/media-photos';
import { buildPageMetadata } from '@/lib/seo';
import type { SiteLocale } from '@/lib/site';

const TEXT = {
  el: {
    kicker: 'Μέσα',
    title: 'Αρχείο μέσων',
    subtitle:
      'Πλήρες αρχείο βίντεο και φωτογραφιών, ομαδοποιημένο κατά κατηγορία.',
  },
  ru: {
    kicker: 'Медиа',
    title: 'Медиа-архив',
    subtitle:
      'Полный архив видео и фотографий, сгруппированный по категориям.',
  },
  en: {
    kicker: 'Media',
    title: 'Media archive',
    subtitle:
      'Full archive of videos and photographs, grouped by category.',
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
    path: '/media',
    title: t.title,
    description: t.subtitle,
  });
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
      <MediaVideos locale={locale} />
      <MediaPhotos locale={locale} />
    </main>
  );
}
