import { getTranslations } from 'next-intl/server';
import {
  Building2,
  ScrollText,
  Megaphone,
  Ban,
  Scale,
  Gavel,
  HandHeart,
  Users,
  Hourglass,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getTimelineEvents } from '@/lib/queries/timeline';
import { localized } from '@/lib/utils';

const ICON_BY_ORDER: Record<number, LucideIcon> = {
  1: Building2,    // Election
  2: ScrollText,   // Enthronement
  3: Megaphone,    // First confrontation
  4: Ban,          // Charges
  5: Scale,        // Removal vote
  6: Hourglass,    // Response
  7: Gavel,        // Appeal rejected
  8: Users,        // Clergy support
  9: HandHeart,    // Continuing case
};

export async function TimelineSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const events = await getTimelineEvents();
  const lang = locale as 'el' | 'ru' | 'en';

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        {/* Section heading */}
        <div className="text-center mb-10 md:mb-14">
          <span className="kicker text-[var(--color-burgundy)] block mb-2">
            {locale === 'el' ? 'Η Υπόθεση' : locale === 'ru' ? 'Дело' : 'The Case'}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
            {t('timelineTitle')}
          </h2>
        </div>

        {/* Horizontal mini-timeline (desktop) */}
        <div className="hidden md:block relative mb-12">
          <div className="absolute top-7 left-[5%] right-[5%] h-px border-t border-dashed border-[var(--color-burgundy)]/35" />
          <ol className="relative grid grid-cols-9 gap-2">
            {events.map((event, i) => {
              const Icon = ICON_BY_ORDER[event.sort_order] ?? Megaphone;
              return (
                <li key={event.id} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center mb-2">
                    <Icon size={20} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
                  </div>
                  <p className="kicker text-[var(--color-burgundy)] text-[10px]">
                    {new Date(event.event_date).getFullYear()}
                  </p>
                  <p className="text-[10px] leading-snug text-[var(--color-ink-muted)] mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detailed list — 3-col grid on desktop, single column on mobile */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-7 md:gap-y-9">
          {events.map((event, i) => {
            const Icon = ICON_BY_ORDER[event.sort_order] ?? Megaphone;
            return (
              <li key={event.id} className="flex gap-4">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-paper-deep)] border border-[var(--color-burgundy)]/25 flex items-center justify-center">
                    <Icon size={16} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
                  </div>
                  <span className="text-[10px] kicker text-[var(--color-burgundy)] mt-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="pt-0.5">
                  <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-1.5">
                    {new Date(event.event_date).toLocaleDateString(lang, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base md:text-lg text-[var(--color-ink)] leading-tight mb-1.5">
                    {localized(event, 'title', lang)}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    {localized(event, 'description', lang)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
