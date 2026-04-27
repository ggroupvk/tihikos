import { StoryBlock } from '@/components/sections/story-block';
import { EvidenceBlock } from '@/components/sections/evidence-block';
import { MediaCtaBlock } from '@/components/sections/media-cta-block';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <StoryBlock locale={locale} />
      <EvidenceBlock locale={locale} />
      <MediaCtaBlock locale={locale} />
    </main>
  );
}
