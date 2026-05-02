import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getNewsBySlug, getLatestNews } from '@/lib/queries/news';
import { localized } from '@/lib/utils';
import { newsSourceLabel } from '@/lib/news-sources';

const COPY = {
  el: {
    backToNews: 'Σε όλα τα νέα',
    sourceLabel: 'Πηγή',
    relatedHeading: 'Σχετικές αναφορές',
    notFound: 'Το άρθρο δεν βρέθηκε.',
    readOriginal: 'Διαβάστε στο πρωτότυπο',
  },
  ru: {
    backToNews: 'Все новости',
    sourceLabel: 'Источник',
    relatedHeading: 'Связанные публикации',
    notFound: 'Статья не найдена.',
    readOriginal: 'Читать в первоисточнике',
  },
  en: {
    backToNews: 'All news',
    sourceLabel: 'Source',
    relatedHeading: 'Related reports',
    notFound: 'Article not found.',
    readOriginal: 'Read at original source',
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

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];

  const article = await getNewsBySlug(slug).catch(() => null);
  if (!article) notFound();

  const title = localized(article, 'title', lang);
  const body = localized(article, 'body', lang) || localized(article, 'excerpt', lang);
  const date = formatDate(article.published_at, lang);
  const source = newsSourceLabel(article.source, article.source_url);

  // Related — 3 most recent excluding current
  const latest = await getLatestNews(4);
  const related = latest.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <main className="bg-[var(--color-paper)]">
      {/* Top bar back-to-news */}
      <div className="bg-[var(--color-ink)] text-[var(--color-paper)] border-b border-[var(--color-hairline-dark)] pt-28 md:pt-32 pb-8">
        <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[var(--color-paper)]/70 hover:text-[var(--color-gold-bright)] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            {c.backToNews}
          </Link>
          {source && (
            <p className="kicker text-[var(--color-gold-bright)] mb-3">{source}</p>
          )}
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-3xl md:text-5xl tracking-tight leading-[1.05] max-w-3xl">
            {title}
          </h1>
          {date && (
            <p className="mt-5 text-sm text-[var(--color-paper)]/60 tracking-wide">{date}</p>
          )}
        </div>
      </div>

      {/* Hero image — pulled from source */}
      {article.image_url && (
        <figure className="bg-[var(--color-ink)]">
          <div className="mx-auto max-w-[var(--max-width-content)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-ink)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </figure>
      )}

      {/* Article body */}
      <article className="bg-[var(--color-paper)] py-12 md:py-16">
        <div className="mx-auto max-w-[var(--max-width-text)] px-6 md:px-12">
          <div className="prose prose-base md:prose-lg max-w-none font-[family-name:var(--font-body)] text-[var(--color-ink-soft)]">
            {body
              ?.split(/\n{2,}/)
              .filter((p) => p.trim())
              .map((para, i) => (
                <p key={i} className="mb-5 leading-[1.72] text-[16px] md:text-[17px]">
                  {para.trim()}
                </p>
              ))}
          </div>

          {/* Source attribution */}
          {article.source_url && (
            <div className="mt-12 pt-6 border-t border-[var(--color-hairline)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-2">
                {c.sourceLabel}
              </p>
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-2 text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-bright)] transition-colors"
              >
                <span className="font-[family-name:var(--font-heading)] font-semibold text-base">
                  {source || c.readOriginal}
                </span>
                <span className="text-xs text-[var(--color-ink-muted)] truncate max-w-md">
                  {article.source_url}
                </span>
                <ExternalLink size={12} className="shrink-0 self-center" />
              </a>
            </div>
          )}
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[var(--color-paper-deep)] py-12 md:py-16 border-t border-[var(--color-hairline)]">
          <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-xl md:text-2xl text-[var(--color-ink)] mb-8 pb-3 border-b border-[var(--color-hairline)]">
              {c.relatedHeading}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/${locale}/news/${r.slug}`}
                    className="group block"
                  >
                    <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-2">
                      {newsSourceLabel(r.source, r.source_url)}
                      {r.published_at && ` · ${formatDate(r.published_at, lang)}`}
                    </p>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-snug">
                      {localized(r, 'title', lang)}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
