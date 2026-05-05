import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Cinzel, Inter, Noto_Serif_Display } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import {
  alternateUrls,
  canonicalUrl,
  ogLocale,
  type SiteLocale,
} from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import '../globals.css';

const notoSerifDisplay = Noto_Serif_Display({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const lang = locale as SiteLocale;

  return {
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteTitle')}`,
    },
    description: t('siteDescription'),
    metadataBase: new URL('https://tihikos.com'),
    alternates: {
      canonical: canonicalUrl(lang, '/'),
      languages: alternateUrls('/'),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale(lang),
      siteName: t('siteTitle'),
      url: canonicalUrl(lang, '/'),
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const lang = locale as SiteLocale;

  return (
    <html lang={locale} dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema(lang)),
          }}
        />
      </head>
      <body className={`${notoSerifDisplay.variable} ${cinzel.variable} ${inter.variable}`}>
        <ScrollProgress />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
