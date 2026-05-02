import { HeroSection } from '@/components/sections/hero';
import { NewsAndChronology } from '@/components/sections/news-and-chronology';
import { VideosRow } from '@/components/sections/videos-row';
import { SupportCarousel } from '@/components/sections/support-carousel';
import { CtaSection } from '@/components/sections/cta';
import { SectionsBlock } from '@/components/sections/sections-block';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
      <NewsAndChronology locale={locale} />
      <VideosRow locale={locale} />
      <SupportCarousel locale={locale} />
      <CtaSection locale={locale} />
      <SectionsBlock locale={locale} />
    </main>
  );
}
