import { getTranslations } from 'next-intl/server';
import {
  Building2,
  ScrollText,
  Megaphone,
  Ban,
  Scale,
  Gavel,
} from 'lucide-react';
import { getTimelineEvents } from '@/lib/queries/timeline';
import { localized } from '@/lib/utils';
import type { ComponentType } from 'react';

// Map sort_order ranges to thematic icons
function iconFor(sortOrder: number): ComponentType<{ size?: number; strokeWidth?: number; className?: string }> {
  if (sortOrder <= 1) return Building2;     // Election
  if (sortOrder <= 2) return ScrollText;    // Enthronement / formal acts
  if (sortOrder <= 3) return Megaphone;     // Public position / conflict
  if (sortOrder <= 4) return Ban;            // Charges
  if (sortOrder <= 5) return Scale;          // Removal / vote
  if (sortOrder <= 7) return Gavel;          // Court / appeals
  return Megaphone;                          // Support / current
}

export async function TimelineSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const events = await getTimelineEvents();

  // Group consecutive years for compact display (e.g. 2021–2023)
  // For simplicity show 6 cells, merging where dates are close
  const cells = events.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <h2 className="text-center font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] mb-12 md:mb-16 text-2xl md:text-3xl tracking-tight">
          {t('timelineTitle')}
        </h2>

        {/* Horizontal timeline — desktop */}
        <div className="hidden md:block relative">
          {/* Dotted line behind nodes */}
          <div className="absolute top-8 left-[8%] right-[8%] h-px border-t border-dashed border-[var(--color-burgundy)]/40" />

          <ol className="relative grid grid-cols-6 gap-4">
            {cells.map((event) => {
              const Icon = iconFor(event.sort_order);
              return (
                <li key={event.id} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center mb-4">
                    <Icon size={24} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
                  </div>
                  <p className="kicker text-[var(--color-burgundy)] text-[11px] mb-2">
                    {new Date(event.event_date).getFullYear()}
                  </p>
                  <p className="text-xs leading-snug text-[var(--color-ink-muted)] max-w-[14ch] mx-auto">
                    {localized(event, 'title', locale as 'el' | 'ru' | 'en')}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: vertical compact list */}
        <ol className="md:hidden space-y-5">
          {cells.map((event) => {
            const Icon = iconFor(event.sort_order);
            return (
              <li key={event.id} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center">
                  <Icon size={20} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
                </div>
                <div className="pt-1">
                  <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-1">
                    {new Date(event.event_date).getFullYear()}
                  </p>
                  <p className="text-sm font-[family-name:var(--font-heading)] font-semibold text-[var(--color-ink)] leading-tight">
                    {localized(event, 'title', locale as 'el' | 'ru' | 'en')}
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
