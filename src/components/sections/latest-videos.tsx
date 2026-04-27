import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { videos } from '@/lib/mock/data';
import { localized } from '@/lib/utils';

export function LatestVideosSection() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const latestVideos = videos.slice(0, 4);

  return (
    <section className="py-20 md:py-32 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 md:mb-20 pb-5 border-b border-[var(--color-hairline-dark)]">
          <div>
            <span className="kicker text-[var(--color-gold-bright)] mb-4 block">III &middot; Media</span>
            <h2 className="display-lg font-[family-name:var(--font-heading)] text-[var(--color-paper)]">
              {t('latestVideos')}
            </h2>
          </div>
          <Link
            href={`/${locale}/media`}
            className="hidden md:inline-flex items-center gap-3 text-sm text-[var(--color-paper)] hover:text-[var(--color-gold-bright)] transition-colors border-b border-[var(--color-hairline-dark)] pb-1"
          >
            {tCommon('viewAll')}
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Cinematic 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-x-12 md:gap-y-16">
          {latestVideos.map((video, i) => (
            <article key={video.id} className="reveal group">
              <div className="relative aspect-[16/10] bg-[var(--color-ink-soft)] overflow-hidden mb-5">
                {video.youtube_id.startsWith('placeholder') ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-[var(--color-gold)]/40 flex items-center justify-center group-hover:border-[var(--color-gold)] transition-all group-hover:scale-110">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-gold-bright)">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtube_id}`}
                    title={localized(video, 'title', locale as any)}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                <div className="absolute top-8 left-8 roman text-[var(--color-gold-bright)] text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              <div>
                <span className="kicker text-[var(--color-gold-bright)]">{video.category}</span>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] text-[var(--color-paper)] mt-3 leading-tight group-hover:text-[var(--color-gold-bright)] transition-colors">
                  {localized(video, 'title', locale as any)}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
