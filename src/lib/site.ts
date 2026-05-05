/**
 * Site-wide constants and URL helpers used across SEO, sitemaps,
 * structured data and email content.
 *
 * Source of truth for the canonical origin: `NEXT_PUBLIC_SITE_URL`
 * env var when set, else the Vercel-provided preview URL, else a
 * sensible fallback so dev / preview don't crash.
 */

import { routing } from '@/i18n/routing';

export const SITE_NAME = 'tihikos';
export const SITE_LOCALES = routing.locales;
export type SiteLocale = (typeof routing.locales)[number];

export function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://tihikos.vercel.app';
}

/**
 * Build a fully-qualified URL for a given locale + path.
 *  pathname starts with '/' but excludes the locale prefix:
 *    canonicalUrl('ru', '/news/foo')  → https://tihikos.com/ru/news/foo
 *    canonicalUrl('ru', '/')          → https://tihikos.com/ru
 */
export function canonicalUrl(locale: SiteLocale, pathname: string): string {
  const path = pathname === '/' ? '' : pathname;
  return `${siteOrigin()}/${locale}${path}`;
}

/**
 * Build the alternate-language map for a given path. Used by
 * Next.js `metadata.alternates.languages`.
 */
export function alternateUrls(pathname: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const loc of SITE_LOCALES) out[loc] = canonicalUrl(loc, pathname);
  return out;
}

/** Open Graph locale string for a given site locale. */
export function ogLocale(locale: SiteLocale): string {
  return locale === 'el' ? 'el_GR' : locale === 'ru' ? 'ru_RU' : 'en_US';
}
