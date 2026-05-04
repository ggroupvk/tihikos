'use client';

import { useState } from 'react';
import {
  Building2,
  ScrollText,
  Megaphone,
  Ban,
  Scale,
  Hourglass,
  Gavel,
  Users,
  HandHeart,
  ChevronDown,
  FileText,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn, localized } from '@/lib/utils';
import type { TimelineRow } from '@/lib/queries/timeline';
import type { DocumentRow } from '@/lib/queries/documents';
import { getEnrichment } from '@/lib/data/timeline-enrichment';

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

const COPY = {
  el: {
    label: 'Χρονολόγιο',
    title: 'Όλα τα γεγονότα του φακέλου',
    docsHeading: 'Συνδεδεμένα έγγραφα',
    expandAll: 'Όλα ανοιχτά',
    collapseAll: 'Όλα κλειστά',
  },
  ru: {
    label: 'Хронология',
    title: 'Все события дела',
    docsHeading: 'Связанные документы',
    expandAll: 'Раскрыть все',
    collapseAll: 'Свернуть все',
  },
  en: {
    label: 'Chronology',
    title: 'All events of the case',
    docsHeading: 'Linked documents',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
  },
} as const;

function formatBytes(bytes: number | null): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(1)} MB`;
}

export function CaseChronologyClient({
  locale,
  events,
  documents,
}: {
  locale: string;
  events: TimelineRow[];
  documents: DocumentRow[];
}) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const docBySlug = new Map<string, DocumentRow>();
  for (const d of documents) docBySlug.set(d.slug, d);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOpen = openIds.size === events.length;
  const toggleAll = () => {
    setOpenIds(allOpen ? new Set() : new Set(events.map((e) => e.id)));
  };

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[var(--color-hairline)]">
          <div>
            <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
              {c.label}
            </span>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
              {c.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs text-[var(--color-burgundy)] hover:underline pb-1"
          >
            {allOpen ? c.collapseAll : c.expandAll}
          </button>
        </div>

        <ol>
          {events.map((event, idx) => {
            const Icon = ICON_BY_ORDER[event.sort_order] ?? Megaphone;
            const isOpen = openIds.has(event.id);
            const isLast = idx === events.length - 1;
            const enrichment = getEnrichment(event.sort_order);
            const linkedDocs = enrichment
              ? enrichment.related_doc_slugs
                  .map((slug) => docBySlug.get(slug))
                  .filter((d): d is DocumentRow => !!d)
              : [];
            const longBody = enrichment
              ? lang === 'el'
                ? enrichment.body_el
                : lang === 'ru'
                ? enrichment.body_ru
                : enrichment.body_en
              : '';
            const shortDesc = localized(event, 'description', lang);
            const eventYear = new Date(event.event_date).getFullYear();
            const eventDate = new Date(event.event_date).toLocaleDateString(lang, {
              day: 'numeric',
              month: 'long',
            });

            return (
              <li
                key={event.id}
                className={cn(!isLast && 'border-b border-[var(--color-hairline)]')}
              >
                <button
                  type="button"
                  onClick={() => toggle(event.id)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-start gap-5 py-5 md:py-6 text-left hover:bg-[var(--color-paper-deep)]/40 px-3 -mx-3 transition-colors"
                >
                  <div className="flex flex-col items-center w-16 shrink-0 pt-1">
                    <span className="text-[10px] tracking-[0.18em] uppercase font-medium text-[var(--color-burgundy)]">
                      {eventYear}
                    </span>
                    <div className="mt-2 mb-2 w-11 h-11 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center group-hover:border-[var(--color-burgundy)] transition-colors">
                      <Icon size={16} strokeWidth={1.6} className="text-[var(--color-burgundy)]" />
                    </div>
                    <span className="text-[10px] text-[var(--color-ink-muted)]">
                      {eventDate}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pt-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base md:text-lg text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-burgundy)] transition-colors mb-1.5">
                          {localized(event, 'title', lang)}
                        </h3>
                        {!isOpen && shortDesc && (
                          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-2">
                            {shortDesc}
                          </p>
                        )}
                      </div>
                      <ChevronDown
                        size={18}
                        className={cn(
                          'shrink-0 mt-1 text-[var(--color-burgundy)] transition-transform duration-300',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </div>
                  </div>
                </button>

                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pl-2 sm:pl-[84px] pr-3 pb-6">
                      {shortDesc && (
                        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-3 italic">
                          {shortDesc}
                        </p>
                      )}
                      {longBody && (
                        <p className="text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                          {longBody}
                        </p>
                      )}
                      {linkedDocs.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-[var(--color-hairline)]">
                          <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-3">
                            {c.docsHeading}
                          </p>
                          <ul className="space-y-2">
                            {linkedDocs.map((doc) => {
                              const docHref = doc.source_url ?? doc.file_path;
                              const isExternal = !!doc.source_url;
                              return (
                                <li key={doc.id}>
                                  <a
                                    href={docHref}
                                    target={isExternal ? '_blank' : undefined}
                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                    className="group/doc flex items-center gap-2.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-burgundy)] transition-colors"
                                  >
                                    <FileText size={13} className="text-[var(--color-burgundy)] shrink-0" />
                                    <span className="font-[family-name:var(--font-heading)] font-semibold underline decoration-[var(--color-burgundy)]/30 underline-offset-2 group-hover/doc:decoration-[var(--color-burgundy)]">
                                      {localized(doc, 'title', lang)}
                                    </span>
                                    <span className="text-[10px] text-[var(--color-ink-muted)] tracking-wider uppercase">
                                      PDF{doc.file_size_bytes ? ` · ${formatBytes(doc.file_size_bytes)}` : ''}
                                    </span>
                                    {isExternal && (
                                      <ExternalLink size={11} className="text-[var(--color-ink-muted)]" />
                                    )}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
