'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { key: 'about', href: '/about' },
  { key: 'case', href: '/case' },
  { key: 'support', href: '/support' },
  { key: 'media', href: '/media' },
  { key: 'news', href: '/news' },
] as const;

const LOCALES = [
  { code: 'el', label: 'ΕΛ' },
  { code: 'ru', label: 'РУ' },
  { code: 'en', label: 'EN' },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentPath = pathname.replace(`/${locale}`, '') || '/';

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const switchLocalePath = (newLocale: string) =>
    `/${newLocale}${currentPath === '/' ? '' : currentPath}`;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || mobileOpen
          ? 'bg-[var(--color-ink)]/95 backdrop-blur-md border-b border-[var(--color-hairline-dark)]'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href={localizedHref('/')}
            className="font-[family-name:var(--font-display)] text-base tracking-[0.3em] text-[var(--color-gold-bright)]"
          >
            TYCHIKOS
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={localizedHref(href)}
                className={cn(
                  'text-sm font-[family-name:var(--font-heading)] transition-colors',
                  currentPath === href
                    ? 'text-[var(--color-gold-bright)]'
                    : 'text-[var(--color-paper)] hover:text-[var(--color-gold-bright)]',
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Lang + mobile */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs">
              {LOCALES.map(({ code, label }, i) => (
                <span key={code} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[var(--color-paper)]/30">&middot;</span>}
                  <Link
                    href={switchLocalePath(code)}
                    className={cn(
                      'tracking-[0.15em] transition-colors font-[family-name:var(--font-display)]',
                      locale === code
                        ? 'text-[var(--color-gold-bright)]'
                        : 'text-[var(--color-paper)]/50 hover:text-[var(--color-paper)]',
                    )}
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[var(--color-paper)]"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 8h18M3 16h18" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-10 pt-2 space-y-1 border-t border-[var(--color-hairline-dark)]">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={localizedHref(href)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block py-3 text-2xl font-[family-name:var(--font-heading)] transition-colors',
                  currentPath === href
                    ? 'text-[var(--color-gold-bright)]'
                    : 'text-[var(--color-paper)]',
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
