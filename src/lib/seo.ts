import type { Metadata } from 'next';
import {
  alternateUrls,
  canonicalUrl,
  ogLocale,
  siteOrigin,
  SITE_NAME,
  type SiteLocale,
} from './site';

/**
 * Build per-page Metadata with sensible defaults: canonical URL,
 * hreflang alternates, OpenGraph, Twitter Card. Pass an absolute or
 * Supabase-hosted image URL for the social card; falls back to a
 * generic site image.
 */
export function buildPageMetadata(opts: {
  locale: SiteLocale;
  /** Pathname WITHOUT the locale prefix, starting with '/'. */
  path: string;
  title: string;
  description: string;
  /** Absolute URL or root-relative path for the OG image. */
  image?: string | null;
  type?: 'website' | 'article';
  publishedTime?: string | null;
  authors?: string[];
}): Metadata {
  const url = canonicalUrl(opts.locale, opts.path);
  const image = opts.image ?? `${siteOrigin()}/og-default.jpg`;
  const type = opts.type ?? 'website';

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages: alternateUrls(opts.path),
    },
    openGraph: {
      type,
      url,
      title: opts.title,
      description: opts.description,
      siteName: SITE_NAME,
      locale: ogLocale(opts.locale),
      images: [{ url: image }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.authors ? { authors: opts.authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

// ============================================================
// Structured data (JSON-LD)
// ============================================================

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tychikos Support',
    alternateName: 'tihikos.com',
    url: siteOrigin(),
    logo: `${siteOrigin()}/icon.png`,
    description: 'Site in support of Metropolitan Tychikos of Paphos.',
  };
}

export function websiteSchema(locale: SiteLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: canonicalUrl(locale, '/'),
    inLanguage:
      locale === 'el' ? 'el-GR' : locale === 'ru' ? 'ru-RU' : 'en-US',
  };
}

export function newsArticleSchema(opts: {
  locale: SiteLocale;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  publishedAt: string | null;
  modifiedAt?: string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
}) {
  const url = canonicalUrl(opts.locale, `/news/${opts.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: opts.title,
    description: opts.description,
    image: opts.image ? [opts.image] : undefined,
    datePublished: opts.publishedAt ?? undefined,
    dateModified: opts.modifiedAt ?? opts.publishedAt ?? undefined,
    inLanguage:
      opts.locale === 'el' ? 'el-GR' : opts.locale === 'ru' ? 'ru-RU' : 'en-US',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${siteOrigin()}/icon.png` },
    },
    ...(opts.sourceUrl
      ? {
          isBasedOn: opts.sourceUrl,
          ...(opts.sourceName
            ? { sourceOrganization: { '@type': 'Organization', name: opts.sourceName } }
            : {}),
        }
      : {}),
  };
}

export function breadcrumbSchema(
  locale: SiteLocale,
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: canonicalUrl(locale, item.path),
    })),
  };
}
