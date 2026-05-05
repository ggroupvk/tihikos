import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getNewsBySlug, getLatestNews } from '@/lib/queries/news';
import { localized } from '@/lib/utils';
import { newsSourceLabel } from '@/lib/news-sources';
import { ArticleBody } from '@/components/news/article-body';
import { ArticleSidebar } from '@/components/news/article-sidebar';
import { ShareRail } from '@/components/news/share-rail';
import { buildPageMetadata, newsArticleSchema, breadcrumbSchema } from '@/lib/seo';
import { canonicalUrl, type SiteLocale } from '@/lib/site';

const COPY = {
  el: {
    backToNews: 'Σὲ ὅλα τὰ νέα',
    sourceLabel: 'Πηγή',
    relatedHeading: 'Σχετικὲς ἀναφορές',
    notFound: 'Τὸ ἄρθρο δὲν βρέθηκε.',
    readOriginal: 'Διαβάστε στὸ πρωτότυπο',
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale as SiteLocale;
  const article = await getNewsBySlug(slug).catch(() => null);
  if (!article) {
    return { title: COPY[lang].notFound };
  }
  return buildPageMetadata({
    locale: lang,
    path: `/news/${slug}`,
    title: localized(article, 'title', lang),
    description:
      localized(article, 'excerpt', lang) ||
      localized(article, 'title', lang),
    image: article.image_url ?? null,
    type: 'article',
    publishedTime: article.published_at,
    authors: article.source ? [String(article.source)] : undefined,
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
  const articleUrl = canonicalUrl(lang as SiteLocale, `/news/${slug}`);

  // Structured data: NewsArticle + breadcrumb trail
  const newsLd = newsArticleSchema({
    locale: lang as SiteLocale,
    slug,
    title,
    description: localized(article, 'excerpt', lang) || title,
    image: article.image_url,
    publishedAt: article.published_at,
    sourceName: source || null,
    sourceUrl: article.source_url,
  });
  const crumbLd = breadcrumbSchema(lang as SiteLocale, [
    { name: c.backToNews, path: '/news' },
    { name: title, path: `/news/${slug}` },
  ]);

  // Related — 3 most recent excluding current
  const latest = await getLatestNews(4);
  const related = latest.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <main className="bg-[var(--color-paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      {/* Top bar back-to-news + masthead */}
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

      {/* Article grid: floating share rail + body + sidebar */}
      <article className="bg-[var(--color-paper)] py-12 md:py-16">
        <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10">
            {/* Floating share rail (xl+) */}
            <div className="hidden xl:block xl:col-span-1">
              <ShareRail locale={locale} title={title} url={articleUrl} />
            </div>

            {/* Body */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-7">
              <ArticleBody body={body} />

              {/* Source attribution at the bottom of the article body */}
              {article.source_url && (
                <div className="mt-12 pt-6 border-t border-[var(--color-hairline)]">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-2">
                    {c.sourceLabel}
                  </p>
                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-bright)] transition-colors flex-wrap"
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

            {/* Right sidebar (lg+) */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3 xl:col-start-9">
              <ArticleSidebar
                locale={locale}
                sourceLabel={source || null}
                publishedAt={article.published_at}
                body={body}
                title={title}
                url={articleUrl}
              />
            </div>
          </div>
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
