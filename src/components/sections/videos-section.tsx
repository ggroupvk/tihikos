import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getLatestVideos } from '@/lib/queries/videos';
import { localized, youtubeThumbnailUrl } from '@/lib/utils';

export async function VideosSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const items = await getLatestVideos(3);

  return (
    <section className="py-16 md:py-20 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[var(--color-hairline)]">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
            {t('latestVideos')}
          </h2>
          <Link
            href={`/${locale}/media`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-burgundy)] hover:underline"
          >
            {tCommon('viewAll')} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video bg-[var(--color-ink)] overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={youtubeThumbnailUrl(video.youtube_id, 'hq')}
                  alt={localized(video, 'title', locale as 'el' | 'ru' | 'en')}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[var(--color-ink)]/30 group-hover:bg-[var(--color-ink)]/15 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-burgundy)]/95 flex items-center justify-center shadow-lg">
                    <Play size={20} className="text-[var(--color-paper)] ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              <p className="font-[family-name:var(--font-heading)] font-semibold text-base md:text-lg text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-tight">
                {localized(video, 'title', locale as 'el' | 'ru' | 'en')}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
