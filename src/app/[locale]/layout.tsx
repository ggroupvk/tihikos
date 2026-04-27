import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Cinzel, Inter, Noto_Serif_Display } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/scroll-progress';
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

  return {
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteTitle')}`,
    },
    description: t('siteDescription'),
    metadataBase: new URL('https://tihikos.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: { el: '/el', ru: '/ru', en: '/en' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'el' ? 'el_GR' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: t('siteTitle'),
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

  return (
    <html lang={locale} dir="ltr">
      <body className={`${notoSerifDisplay.variable} ${cinzel.variable} ${inter.variable}`}>
        <ScrollProgress />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
