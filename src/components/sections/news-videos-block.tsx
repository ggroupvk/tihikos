import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getLatestNews } from '@/lib/queries/news';
import { getLatestVideos } from '@/lib/queries/videos';
import { localized, youtubeThumbnailUrl } from '@/lib/utils';

export async function NewsVideosBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const lang = locale as 'el' | 'ru' | 'en';

  const [news, videos] = await Promise.all([
    getLatestNews(3),
    getLatestVideos(3),
  ]);

  function formatDate(iso?: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(lang, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* NEWS column */}
          <div>
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-[var(--color-hairline)]">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-xl md:text-2xl tracking-tight">
                {t('latestNews')}
              </h2>
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:underline whitespace-nowrap"
              >
                {tCommon('viewAll')} <ArrowRight size={12} />
              </Link>
            </div>

            <ul className="space-y-5">
              {news.map((item, idx) => (
                <li
                  key={item.id}
                  className={`pb-5 ${
                    idx < news.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
                  }`}
                >
                  <Link
                    href={`/${locale}/news/${item.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    {/* Compact thumb */}
                    <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 bg-[var(--color-paper-deep)] flex items-center justify-center overflow-hidden">
                      <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-burgundy)]/20">
                        T
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-1.5">
                        {formatDate(item.published_at)}
                      </p>
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm md:text-base text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-tight mb-1.5">
                        {localized(item, 'title', lang)}
                      </h3>
                      <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed line-clamp-2">
                        {localized(item, 'excerpt', lang)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* VIDEOS column */}
          <div>
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-[var(--color-hairline)]">
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-xl md:text-2xl tracking-tight">
                {t('latestVideos')}
              </h2>
              <Link
                href={`/${locale}/media`}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:underline whitespace-nowrap"
              >
                {tCommon('viewAll')} <ArrowRight size={12} />
              </Link>
            </div>

            <ul className="space-y-5">
              {videos.map((video, idx) => (
                <li
                  key={video.id}
                  className={`pb-5 ${
                    idx < videos.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
                  }`}
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 items-start"
                  >
                    {/* Compact thumb with play */}
                    <div className="relative shrink-0 w-32 h-20 md:w-36 md:h-24 bg-[var(--color-ink)] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={youtubeThumbnailUrl(video.youtube_id, 'hq')}
                        alt={localized(video, 'title', lang)}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[var(--color-ink)]/30 group-hover:bg-[var(--color-ink)]/15 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-burgundy)]/95 flex items-center justify-center">
                          <Play size={12} className="text-[var(--color-paper)] ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <span className="kicker text-[var(--color-burgundy)] text-[10px] mb-1.5 block">
                        {video.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm md:text-base text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-tight">
                        {localized(video, 'title', lang)}
                      </h3>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
