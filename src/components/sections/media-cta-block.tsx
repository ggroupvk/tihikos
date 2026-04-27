import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getLatestVideos } from '@/lib/queries/videos';
import { localized, youtubeThumbnailUrl } from '@/lib/utils';

export async function MediaCtaBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const latestVideos = await getLatestVideos(4);

  return (
    <>
      {/* Media */}
      <section className="py-20 md:py-28 bg-[var(--color-paper-deep)]">
        <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-[var(--color-hairline)]">
            <span className="kicker text-[var(--color-burgundy)]">
              IV &middot; {t('latestVideos')}
            </span>
            <Link
              href={`/${locale}/media`}
              className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-burgundy)] transition-colors"
            >
              {tCommon('viewAll')} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {latestVideos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video bg-[var(--color-ink)] overflow-hidden mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={youtubeThumbnailUrl(video.youtube_id, 'hq')}
                    alt={localized(video, 'title', locale as 'el' | 'ru' | 'en')}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[var(--color-ink)]/30 group-hover:bg-[var(--color-ink)]/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-burgundy)]/90 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="kicker text-[10px] text-[var(--color-burgundy)]">
                  {video.category}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm md:text-base text-[var(--color-ink)] mt-1 leading-tight line-clamp-2 group-hover:text-[var(--color-burgundy)] transition-colors">
                  {localized(video, 'title', locale as 'el' | 'ru' | 'en')}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[var(--color-burgundy)] text-[var(--color-paper)]">
        <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span className="kicker text-[var(--color-paper)]/60 mb-2 block">V &middot; Act</span>
              <h2 className="font-[family-name:var(--font-heading)] font-semibold text-[var(--color-paper)] text-2xl md:text-4xl leading-tight">
                {t('ctaTitle')}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={`/${locale}/support`}
                className="group inline-flex items-center justify-between gap-6 px-6 py-4 bg-[var(--color-paper)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-bright)] transition-colors min-w-[200px]"
              >
                <span>{t('ctaShare')}</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <a
                href="https://www.youtube.com/@IeraMitropoliPaphou"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-6 px-6 py-4 border border-[var(--color-paper)]/40 text-[var(--color-paper)] font-medium hover:bg-[var(--color-paper)] hover:text-[var(--color-burgundy)] transition-colors min-w-[200px]"
              >
                <span>{t('ctaSubscribe')}</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
