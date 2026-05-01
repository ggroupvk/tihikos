import { ExternalLink } from 'lucide-react';
import { getNewsPaginated } from '@/lib/queries/news';
import { localized } from '@/lib/utils';

const COPY = {
  el: {
    label: 'Αρχείο αναφορών',
    placeholder: 'Νέες αναφορές προστίθενται καθημερινά καθώς εμφανίζονται.',
  },
  ru: {
    label: 'Архив новостей',
    placeholder: 'Новые публикации добавляются ежедневно по мере появления.',
  },
  en: {
    label: 'Reports archive',
    placeholder: 'New reports are added daily as they emerge.',
  },
} as const;

function formatDate(iso: string | null, lang: 'el' | 'ru' | 'en'): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function NewsListing({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const { items, total } = await getNewsPaginated(1);

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[var(--color-hairline)]">
          <span className="kicker text-[var(--color-burgundy)]">{c.label}</span>
          <span className="text-xs text-[var(--color-ink-muted)] font-mono pb-0.5">
            {String(total).padStart(2, '0')}
          </span>
        </div>

        <ol>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const href = item.source_url ?? `/${locale}/news/${item.slug}`;
            const isExternal = !!item.source_url;
            return (
              <li
                key={item.id}
                className={!isLast ? 'border-b border-[var(--color-hairline)]' : ''}
              >
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group grid grid-cols-12 gap-x-4 md:gap-x-8 py-6 md:py-7 hover:bg-[var(--color-paper-deep)]/40 px-3 -mx-3 transition-colors"
                >
                  <div className="col-span-12 md:col-span-3 mb-3 md:mb-0">
                    <p className="kicker text-[var(--color-burgundy)] text-[10px]">
                      {formatDate(item.published_at, lang)}
                    </p>
                    {item.source && (
                      <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                        {item.source}
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-burgundy)] transition-colors mb-2">
                      {localized(item, 'title', lang)}
                    </h3>
                    {localized(item, 'excerpt', lang) && (
                      <p className="text-sm md:text-[15px] text-[var(--color-ink-muted)] leading-relaxed">
                        {localized(item, 'excerpt', lang)}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-burgundy)]">
                      {isExternal && <ExternalLink size={11} />}
                      <span>
                        {isExternal
                          ? lang === 'ru'
                            ? 'Источник'
                            : lang === 'el'
                            ? 'Πηγή'
                            : 'Source'
                          : lang === 'ru'
                          ? 'Читать'
                          : lang === 'el'
                          ? 'Ανάγνωση'
                          : 'Read'}
                      </span>
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>

        {items.length === 0 && (
          <p className="text-center py-12 text-sm italic text-[var(--color-ink-muted)]">
            {c.placeholder}
          </p>
        )}
      </div>
    </section>
  );
}
