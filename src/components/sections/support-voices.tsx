import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { persons } from '@/lib/mock/data';
import { localized } from '@/lib/utils';

export function SupportVoicesSection() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const supporters = persons.filter((p) => p.slug !== 'tychikos');

  const quote =
    locale === 'el'
      ? 'Υποστηρίζουμε τον Μητροπολίτη Τυχικό στον αγώνα του για την κανονική αλήθεια.'
      : locale === 'ru'
      ? 'Мы поддерживаем митрополита Тихикоса в его борьбе за каноническую правду.'
      : 'We stand with Metropolitan Tychikos in his struggle for canonical truth.';

  return (
    <section className="py-20 md:py-32 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 md:mb-20 pb-5 border-b border-[var(--color-hairline)]">
          <div>
            <span className="kicker text-[var(--color-burgundy)] mb-4 block">IV &middot; Voices</span>
            <h2 className="display-lg font-[family-name:var(--font-heading)] text-[var(--color-ink)]">
              {t('supportTitle')}
            </h2>
          </div>
          <Link
            href={`/${locale}/support`}
            className="hidden md:inline-flex items-center gap-3 text-sm text-[var(--color-ink)] hover:text-[var(--color-burgundy)] transition-colors border-b border-[var(--color-hairline)] pb-1"
          >
            {tCommon('viewAll')}
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Large editorial quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {supporters.map((person) => (
            <article key={person.id} className="reveal group">
              {/* Opening quote */}
              <div
                className="font-[family-name:var(--font-heading)] text-[var(--color-burgundy)]/50 mb-2 leading-none"
                style={{ fontSize: 'clamp(5rem, 10vw, 10rem)' }}
              >
                &ldquo;
              </div>

              <blockquote className="text-xl md:text-3xl text-[var(--color-ink)] font-[family-name:var(--font-heading)] leading-snug mb-10 italic">
                {quote}
              </blockquote>

              {/* Attribution */}
              <div className="flex items-start gap-5 pt-6 border-t border-[var(--color-hairline)]">
                <div className="w-14 h-14 bg-[var(--color-ink)] flex items-center justify-center shrink-0">
                  <span className="font-[family-name:var(--font-display)] text-[var(--color-gold-bright)] text-xl">
                    {localized(person, 'name', locale as any).charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-ink)]">
                    {localized(person, 'name', locale as any)}
                  </p>
                  <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                    {localized(person, 'title', locale as any)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
