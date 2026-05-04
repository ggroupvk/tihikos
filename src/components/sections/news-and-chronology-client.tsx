'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
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
import type { NewsRow } from '@/lib/queries/news';
import type { TimelineRow } from '@/lib/queries/timeline';
import type { DocumentRow } from '@/lib/queries/documents';
import { getEnrichment } from '@/lib/data/timeline-enrichment';
import { newsSourceLabel } from '@/lib/news-sources';

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
    newsLabel: 'Νέα',
    newsTitle: 'Τελευταίες αναφορές',
    chronoLabel: 'Δελτίο',
    chronoTitle: 'Χρονολόγιο',
    viewAllNews: 'Όλες οι αναφορές',
    viewAllChrono: 'Πλήρες χρονολόγιο',
    documentsHeading: 'Συνδεδεμένα έγγραφα',
    expand: 'Ανάγνωση',
    collapse: 'Σύμπτυξη',
  },
  ru: {
    newsLabel: 'Новости',
    newsTitle: 'Последние новости',
    chronoLabel: 'Дело',
    chronoTitle: 'Хронология',
    viewAllNews: 'Все новости',
    viewAllChrono: 'Полная хронология',
    documentsHeading: 'Связанные документы',
    expand: 'Подробнее',
    collapse: 'Свернуть',
  },
  en: {
    newsLabel: 'News',
    newsTitle: 'Latest reports',
    chronoLabel: 'The Case',
    chronoTitle: 'Chronology',
    viewAllNews: 'All reports',
    viewAllChrono: 'Full chronology',
    documentsHeading: 'Linked documents',
    expand: 'Read more',
    collapse: 'Collapse',
  },
} as const;

function formatDate(iso: string | null, lang: 'el' | 'ru' | 'en'): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(lang, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(1)} MB`;
}

export function NewsAndChronologyClient({
  locale,
  news,
  events,
  documents,
}: {
  locale: string;
  news: NewsRow[];
  events: TimelineRow[];
  documents: DocumentRow[];
}) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [openId, setOpenId] = useState<string | null>(null);

  // Show first 8 events on homepage; full list lives on /case.
  const visibleEvents = events.slice(0, 8);

  // Build a doc lookup for fast resolution from related slugs.
  const docBySlug = new Map<string, DocumentRow>();
  for (const d of documents) docBySlug.set(d.slug, d);

  return (
    <section className="py-10 md:py-14 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* === NEWS column === */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-[var(--color-hairline)]">
              <div>
                <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
                  {c.newsLabel}
                </span>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-xl md:text-2xl tracking-tight">
                  {c.newsTitle}
                </h2>
              </div>
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-bright)] transition-colors whitespace-nowrap pb-1"
              >
                {c.viewAllNews} <ArrowRight size={12} />
              </Link>
            </div>

            <ul className="space-y-5">
              {news.map((item, idx) => {
                const isLast = idx === news.length - 1;
                return (
                  <li
                    key={item.id}
                    className={cn(!isLast && 'pb-5 border-b border-[var(--color-hairline)]')}
                  >
                    <Link
                      href={`/${locale}/news/${item.slug}`}
                      className="group flex flex-col gap-1.5"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="kicker text-[var(--color-burgundy)] text-[10px]">
                          {formatDate(item.published_at, lang)}
                        </span>
                        {newsSourceLabel(item.source, item.source_url) && (
                          <>
                            <span className="text-[var(--color-ink-muted)]/40">·</span>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                              {newsSourceLabel(item.source, item.source_url)}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base md:text-lg text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-snug">
                        {localized(item, 'title', lang)}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-2">
                        {localized(item, 'excerpt', lang)}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* === CHRONOLOGY column === */}
          <div className="lg:col-span-5">
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-[var(--color-hairline)]">
              <div>
                <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
                  {c.chronoLabel}
                </span>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-xl md:text-2xl tracking-tight">
                  {c.chronoTitle}
                </h2>
              </div>
              <Link
                href={`/${locale}/case`}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-bright)] transition-colors whitespace-nowrap pb-1"
              >
                {c.viewAllChrono} <ArrowRight size={12} />
              </Link>
            </div>

            <ol>
              {visibleEvents.map((event, idx) => {
                const Icon = ICON_BY_ORDER[event.sort_order] ?? Megaphone;
                const isOpen = openId === event.id;
                const isLast = idx === visibleEvents.length - 1;
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
                  month: 'short',
                });

                return (
                  <li
                    key={event.id}
                    className={cn(
                      !isLast && 'border-b border-[var(--color-hairline)]',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : event.id)}
                      aria-expanded={isOpen}
                      className="group w-full flex items-start gap-4 py-4 text-left hover:bg-[var(--color-paper-deep)]/40 px-2 -mx-2 transition-colors"
                    >
                      {/* Date column */}
                      <div className="flex flex-col items-center w-14 shrink-0 pt-0.5">
                        <span className="text-[10px] tracking-[0.16em] uppercase font-medium text-[var(--color-burgundy)]">
                          {eventYear}
                        </span>
                        <div className="mt-2 mb-2 w-9 h-9 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/30 flex items-center justify-center group-hover:border-[var(--color-burgundy)] transition-colors">
                          <Icon size={14} strokeWidth={1.6} className="text-[var(--color-burgundy)]" />
                        </div>
                        <span className="text-[10px] text-[var(--color-ink-muted)]">
                          {eventDate}
                        </span>
                      </div>

                      {/* Title + chevron */}
                      <div className="flex-1 min-w-0 pt-1.5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-[15px] md:text-base text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-burgundy)] transition-colors">
                            {localized(event, 'title', lang)}
                          </h3>
                          <ChevronDown
                            size={16}
                            className={cn(
                              'shrink-0 mt-0.5 text-[var(--color-burgundy)] transition-transform duration-300',
                              isOpen && 'rotate-180',
                            )}
                          />
                        </div>
                      </div>
                    </button>

                    {/* Accordion content */}
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-out',
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-2 sm:pl-[72px] pr-2 pb-5 -mt-1">
                          {shortDesc && (
                            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-3 italic">
                              {shortDesc}
                            </p>
                          )}
                          {longBody && (
                            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                              {longBody}
                            </p>
                          )}
                          {linkedDocs.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-[var(--color-hairline)]">
                              <p className="kicker text-[var(--color-burgundy)] text-[9px] mb-3">
                                {c.documentsHeading}
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
                                        className="group/doc flex items-center gap-2.5 text-xs text-[var(--color-ink)] hover:text-[var(--color-burgundy)] transition-colors"
                                      >
                                        <FileText
                                          size={12}
                                          className="text-[var(--color-burgundy)] shrink-0"
                                        />
                                        <span className="font-[family-name:var(--font-heading)] font-semibold underline decoration-[var(--color-burgundy)]/30 underline-offset-2 group-hover/doc:decoration-[var(--color-burgundy)]">
                                          {localized(doc, 'title', lang)}
                                        </span>
                                        <span className="text-[10px] text-[var(--color-ink-muted)] tracking-wider uppercase">
                                          PDF
                                          {doc.file_size_bytes
                                            ? ` · ${formatBytes(doc.file_size_bytes)}`
                                            : ''}
                                        </span>
                                        {isExternal && (
                                          <ExternalLink size={10} className="text-[var(--color-ink-muted)]" />
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
        </div>
      </div>
    </section>
  );
}
