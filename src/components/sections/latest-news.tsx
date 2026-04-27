import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { news } from '@/lib/mock/data';
import { localized } from '@/lib/utils';

export function LatestNewsSection() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const latestNews = news.slice(0, 3);

  function formatDate(iso?: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <section className="py-20 md:py-32 bg-[var(--color-paper-deep)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 md:mb-20 pb-5 border-b border-[var(--color-hairline)]">
          <div>
            <span className="kicker text-[var(--color-burgundy)] mb-4 block">II &middot; Latest</span>
            <h2 className="display-lg font-[family-name:var(--font-heading)] text-[var(--color-ink)]">
              {t('latestNews')}
            </h2>
          </div>
          <Link
            href={`/${locale}/news`}
            className="hidden md:inline-flex items-center gap-3 text-sm text-[var(--color-ink)] hover:text-[var(--color-burgundy)] transition-colors border-b border-[var(--color-hairline)] pb-1"
          >
            {tCommon('viewAll')}
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Editorial layout: lead + secondary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          {/* Lead article */}
          {latestNews[0] && (
            <Link
              href={`/${locale}/news/${latestNews[0].slug}`}
              className="md:col-span-7 group reveal"
            >
              <div className="aspect-[4/3] bg-[var(--color-ink)] mb-8 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-[12rem] text-[var(--color-gold)]/10 leading-none">
                    T
                  </span>
                </div>
              </div>
              <p className="kicker text-[var(--color-burgundy)] mb-4">
                {formatDate(latestNews[0].published_at)}
              </p>
              <h3 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-[1.05] mb-5">
                {localized(latestNews[0], 'title', locale as any)}
              </h3>
              <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed max-w-[var(--max-width-text)]">
                {localized(latestNews[0], 'excerpt', locale as any)}
              </p>
            </Link>
          )}

          {/* Secondary articles */}
          <div className="md:col-span-5 space-y-12 md:space-y-16">
            {latestNews.slice(1).map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/news/${item.slug}`}
                className="reveal block group pb-12 border-b border-[var(--color-hairline)] last:border-b-0 last:pb-0"
              >
                <p className="kicker text-[var(--color-burgundy)] mb-3">
                  {formatDate(item.published_at)}
                </p>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-tight mb-3">
                  {localized(item, 'title', locale as any)}
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-3">
                  {localized(item, 'excerpt', locale as any)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
