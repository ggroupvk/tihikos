'use client';

import { useState } from 'react';
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
  ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { localized, cn } from '@/lib/utils';
import type { TimelineRow } from '@/lib/queries/timeline';

const ICON_BY_ORDER: Record<number, LucideIcon> = {
  1: Building2,
  2: ScrollText,
  3: Megaphone,
  4: Ban,
  5: Scale,
  6: Hourglass,
  7: Gavel,
  8: Users,
  9: HandHeart,
};

interface Props {
  events: TimelineRow[];
  locale: string;
  title: string;
  kicker: string;
  expandLabel: string;
  collapseLabel: string;
}

export function TimelineClient({
  events,
  locale,
  title,
  kicker,
  expandLabel,
  collapseLabel,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const lang = locale as 'el' | 'ru' | 'en';

  return (
    <section className="py-10 md:py-12 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <span className="kicker text-[var(--color-burgundy)] block mb-2">{kicker}</span>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
            {title}
          </h2>
        </div>

        {/* Compact horizontal mini-rail (always visible on desktop) */}
        <div className="hidden md:block relative mb-6">
          <div className="absolute top-7 left-[5%] right-[5%] h-px border-t border-dashed border-[var(--color-burgundy)]/35" />
          <ol className="relative grid grid-cols-9 gap-2">
            {events.map((event) => {
              const Icon = ICON_BY_ORDER[event.sort_order] ?? Megaphone;
              return (
                <li key={event.id} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center mb-2">
                    <Icon size={20} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
                  </div>
                  <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-1">
                    {new Date(event.event_date).getFullYear()}
                  </p>
                  <p className="text-[11px] leading-snug text-[var(--color-ink)] max-w-[14ch] font-[family-name:var(--font-heading)] font-semibold">
                    {localized(event, 'title', lang)}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile compact list (always visible) */}
        <ol className="md:hidden space-y-3 mb-6">
          {events.map((event) => {
            const Icon = ICON_BY_ORDER[event.sort_order] ?? Megaphone;
            return (
              <li key={event.id} className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center">
                  <Icon size={16} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="kicker text-[var(--color-burgundy)] text-[10px]">
                    {new Date(event.event_date).getFullYear()}
                  </p>
                  <p className="text-sm font-[family-name:var(--font-heading)] font-semibold text-[var(--color-ink)] leading-tight truncate">
                    {localized(event, 'title', lang)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Toggle button */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 text-sm text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-bright)] transition-colors"
          >
            <span className="kicker text-[11px]">
              {expanded ? collapseLabel : expandLabel}
            </span>
            <ChevronDown
              size={16}
              className={cn(
                'transition-transform duration-300',
                expanded ? 'rotate-180' : 'rotate-0',
              )}
            />
          </button>
        </div>

        {/* Expandable details */}
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-500 ease-out',
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-7 pt-4">
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
        </div>
      </div>
    </section>
  );
}
