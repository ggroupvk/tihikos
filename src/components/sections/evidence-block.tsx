import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getLatestNews } from '@/lib/queries/news';
import { getPersons } from '@/lib/queries/persons';
import { localized } from '@/lib/utils';

export async function EvidenceBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const [latestNews, allPersons] = await Promise.all([
    getLatestNews(3),
    getPersons(),
  ]);

  const supporters = allPersons.filter((p) => p.slug !== 'tychikos');

  const quote =
    locale === 'el'
      ? 'Υποστηρίζουμε τον Μητροπολίτη Τυχικό στον αγώνα του για την κανονική αλήθεια.'
      : locale === 'ru'
      ? 'Мы поддерживаем митрополита Тихикоса в борьбе за каноническую правду.'
      : 'We stand with Metropolitan Tychikos in his fight for canonical truth.';

  function formatDate(iso?: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <section className="py-20 md:py-28 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 md:gap-16">
          {/* LEFT: News */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-[var(--color-hairline)]">
              <span className="kicker text-[var(--color-burgundy)]">
                II &middot; {t('latestNews')}
              </span>
              <Link
                href={`/${locale}/news`}
                className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-burgundy)] transition-colors"
              >
                {tCommon('viewAll')} &rarr;
              </Link>
            </div>

            <div className="space-y-6 md:space-y-8">
              {latestNews.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/${locale}/news/${item.slug}`}
                  className={`block group pb-6 md:pb-8 ${
                    idx < latestNews.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="kicker text-[var(--color-burgundy)] text-[10px]">
                      {formatDate(item.published_at)}
                    </span>
                    {item.source_url && (
                      <span className="kicker text-[10px] text-[var(--color-ink-muted)]">
                        &middot; {new URL(item.source_url).hostname.replace('www.', '')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl md:text-2xl text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-tight mb-2">
                    {localized(item, 'title', locale as 'el' | 'ru' | 'en')}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-ink-muted)] leading-relaxed line-clamp-2">
                    {localized(item, 'excerpt', locale as 'el' | 'ru' | 'en')}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Voices */}
          <div className="lg:col-span-5">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-[var(--color-hairline)]">
              <span className="kicker text-[var(--color-burgundy)]">
                III &middot; {t('supportTitle')}
              </span>
              <Link
                href={`/${locale}/support`}
                className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-burgundy)] transition-colors"
              >
                {tCommon('viewAll')} &rarr;
              </Link>
            </div>

            <div className="space-y-8">
              {supporters.map((person) => (
                <article
                  key={person.id}
                  className="pb-8 border-b border-[var(--color-hairline)] last:border-b-0 last:pb-0"
                >
                  <div
                    className="font-[family-name:var(--font-heading)] text-[var(--color-burgundy)]/40 leading-none mb-1"
                    style={{ fontSize: '3rem' }}
                  >
                    &ldquo;
                  </div>
                  <blockquote className="text-base md:text-lg text-[var(--color-ink)] font-[family-name:var(--font-heading)] leading-snug mb-5">
                    {quote}
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--color-ink)] flex items-center justify-center shrink-0">
                      <span className="font-[family-name:var(--font-display)] text-[var(--color-gold-bright)] text-sm">
                        {localized(person, 'name', locale as 'el' | 'ru' | 'en').charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-heading)] font-semibold text-sm text-[var(--color-ink)]">
                        {localized(person, 'name', locale as 'el' | 'ru' | 'en')}
                      </p>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {localized(person, 'title', locale as 'el' | 'ru' | 'en')}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
