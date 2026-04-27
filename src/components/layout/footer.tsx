import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { socialLinks } from '@/lib/mock/data';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const year = new Date().getFullYear();

  const tagline =
    locale === 'el'
      ? 'Επίσημος ιστότοπος στήριξης του Μητροπολίτη Πάφου Τυχικού.'
      : locale === 'ru'
      ? 'Официальный веб-сайт в поддержку митрополита Пафосского Тихикоса.'
      : 'Official website in support of Metropolitan Tychikos of Paphos.';

  const blessing =
    locale === 'el' ? 'Ευλογείτε' : locale === 'ru' ? 'С благословением' : 'With blessings';

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 pt-16 md:pt-24 pb-10">
        {/* Big monogram */}
        <div className="mb-12 md:mb-16 pb-12 md:pb-16 border-b border-[var(--color-hairline-dark)]">
          <p className="font-[family-name:var(--font-display)] tracking-[0.4em] text-[var(--color-gold-bright)] text-sm md:text-base">
            TYCHIKOS
          </p>
          <p className="mt-6 max-w-xl text-lg md:text-xl font-[family-name:var(--font-heading)] text-[var(--color-paper)]/85 leading-snug">
            {tagline}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-10 md:pb-14 border-b border-[var(--color-hairline-dark)]">
          {/* Navigate */}
          <div className="md:col-span-5">
            <p className="kicker text-[var(--color-gold-bright)] mb-8">Navigate</p>
            <nav className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm">
              {(['home', 'about', 'case', 'support', 'media', 'news'] as const).map((key) => (
                <Link
                  key={key}
                  href={localizedHref(key === 'home' ? '/' : `/${key}`)}
                  className="font-[family-name:var(--font-heading)] text-[var(--color-paper)] hover:text-[var(--color-gold-bright)] transition-colors"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* How to help */}
          <div className="md:col-span-4">
            <p className="kicker text-[var(--color-gold-bright)] mb-8">{t('howToHelp')}</p>
            <ul className="space-y-3 text-sm text-[var(--color-paper)]/70 font-[family-name:var(--font-heading)]">
              <li>&mdash; {t('spread')}</li>
              <li>&mdash; {t('translate')}</li>
              <li>&mdash; {t('pray')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="kicker text-[var(--color-gold-bright)] mb-8">{t('contactTitle')}</p>
            <a
              href="mailto:info@tihikos.com"
              className="text-sm text-[var(--color-paper)] hover:text-[var(--color-gold-bright)] transition-colors block font-[family-name:var(--font-heading)] italic"
            >
              info@tihikos.com
            </a>
            <div className="flex gap-4 mt-6">
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-paper)]/50 hover:text-[var(--color-gold-bright)] transition-colors"
                  aria-label="YouTube"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.9 31.9 0 000 12a31.9 31.9 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.9 31.9 0 0024 12a31.9 31.9 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-[var(--color-paper)]/50 font-[family-name:var(--font-display)] tracking-wider">
          <p>&copy; {year} tihikos.com</p>
          <p>{blessing}</p>
        </div>
      </div>
    </footer>
  );
}
