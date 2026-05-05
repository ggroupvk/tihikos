import type { MetadataRoute } from 'next';
import { canonicalUrl, SITE_LOCALES, alternateUrls, type SiteLocale } from '@/lib/site';
import { getNewsPaginated } from '@/lib/queries/news';

const PUBLIC_PATHS = ['/', '/about', '/case', '/support', '/media', '/news'] as const;

/**
 * Dynamic sitemap covering:
 *   • Each public page × each locale
 *   • Each published news article × each locale (slug detail pages)
 *
 * `alternates.languages` is set on every entry so search engines can
 * discover the trilingual variants and rank them per locale.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Public pages
  for (const path of PUBLIC_PATHS) {
    for (const locale of SITE_LOCALES) {
      entries.push({
        url: canonicalUrl(locale as SiteLocale, path),
        lastModified: new Date(),
        changeFrequency: path === '/news' ? 'daily' : 'weekly',
        priority: path === '/' ? 1.0 : 0.8,
        alternates: { languages: alternateUrls(path) },
      });
    }
  }

  // News articles (paginated query, take first page = up to PAGE_SIZE)
  try {
    const { items } = await getNewsPaginated(1);
    for (const article of items) {
      const path = `/news/${article.slug}`;
      for (const locale of SITE_LOCALES) {
        entries.push({
          url: canonicalUrl(locale as SiteLocale, path),
          lastModified: article.published_at ? new Date(article.published_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: { languages: alternateUrls(path) },
        });
      }
    }
  } catch {
    // If Supabase is unreachable at build time, the static portion of the
    // sitemap still serves search engines. Safer than crashing the build.
  }

  return entries;
}
