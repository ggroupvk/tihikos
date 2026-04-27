import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { timelineEvents } from '@/lib/mock/data';
import { localized } from '@/lib/utils';
import { toRoman } from '@/lib/roman';

export function TimelineSection() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const events = timelineEvents.slice(0, 7);

  return (
    <section className="py-20 md:py-32 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 md:mb-20 pb-5 border-b border-[var(--color-hairline)]">
          <div>
            <span className="kicker text-[var(--color-burgundy)] mb-4 block">I &middot; Timeline</span>
            <h2 className="display-lg font-[family-name:var(--font-heading)] text-[var(--color-ink)]">
              {t('timelineTitle')}
            </h2>
          </div>
          <Link
            href={`/${locale}/case`}
            className="hidden md:inline-flex items-center gap-3 text-sm text-[var(--color-ink)] hover:text-[var(--color-burgundy)] transition-colors border-b border-[var(--color-hairline)] pb-1"
          >
            {tCommon('viewAll')}
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Monument timeline: huge year, text sticks beside */}
        <div className="space-y-0">
          {events.map((event, i) => (
            <article
              key={event.id}
              className="reveal grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-t border-[var(--color-hairline)]"
            >
              {/* Roman numeral */}
              <div className="md:col-span-1 roman text-[var(--color-burgundy)] text-sm self-start pt-3">
                {toRoman(i + 1)}
              </div>

              {/* Year as monument */}
              <div className="md:col-span-4">
                <div className="monument font-[family-name:var(--font-heading)] text-[var(--color-ink)]">
                  {new Date(event.event_date).getFullYear()}
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-7 max-w-[var(--max-width-text)] self-end pb-2 md:pb-4">
                <h3 className="text-xl md:text-3xl font-[family-name:var(--font-heading)] text-[var(--color-ink)] mb-4">
                  {localized(event, 'title', locale as any)}
                </h3>
                <p className="text-base md:text-lg text-[var(--color-ink-muted)] leading-relaxed">
                  {localized(event, 'description', locale as any)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-16 md:hidden">
          <Link
            href={`/${locale}/case`}
            className="inline-flex items-center gap-3 text-sm text-[var(--color-burgundy)] border-b border-[var(--color-burgundy)] pb-1"
          >
            {tCommon('viewAll')} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
