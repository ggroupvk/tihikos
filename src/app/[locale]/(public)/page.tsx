import { HeroSection } from '@/components/sections/hero';
import { TimelineSection } from '@/components/sections/timeline';
import { NewsVideosBlock } from '@/components/sections/news-videos-block';
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
      <TimelineSection locale={locale} />
      <NewsVideosBlock locale={locale} />
      <SupportCarousel locale={locale} />
      <CtaSection locale={locale} />
      <SectionsBlock locale={locale} />
    </main>
  );
}
