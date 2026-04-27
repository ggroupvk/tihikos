import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getLatestNews } from '@/lib/queries/news';
import { localized } from '@/lib/utils';

export async function NewsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const items = await getLatestNews(3);

  function formatDate(iso?: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return (
    <section className="py-16 md:py-20 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[var(--color-hairline)]">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
            {t('latestNews')}
          </h2>
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-burgundy)] hover:underline"
          >
            {tCommon('viewAll')} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/news/${item.slug}`}
              className="group block"
            >
              {/* Placeholder image */}
              <div className="relative aspect-[4/3] bg-[var(--color-paper-deep)] overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-[6rem] text-[var(--color-burgundy)]/15 leading-none">
                    T
                  </span>
                </div>
              </div>

              <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-2">
                {formatDate(item.published_at)}
              </p>
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-tight mb-3">
                {localized(item, 'title', locale as 'el' | 'ru' | 'en')}
              </h3>
              <p className="text-sm text-[var(--color-ink-muted)] line-clamp-2 leading-relaxed mb-3">
                {localized(item, 'excerpt', locale as 'el' | 'ru' | 'en')}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--color-burgundy)] font-medium">
                {tCommon('readMore')} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
