'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { key: 'home', href: '/' },
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

const BRAND_TEXT = {
  el: { top: 'Σε στήριξη του', bottom: 'Μητροπολίτη Πάφου', big: 'ΤΥΧΙΚΟΥ' },
  ru: { top: 'В поддержку', bottom: 'митрополита Пафосского', big: 'ТИХИКА' },
  en: { top: 'In support of', bottom: 'Metropolitan of Paphos', big: 'TYCHIKOS' },
} as const;

const MENU_LABEL = {
  el: { open: 'Μενοῦ', close: 'Κλείσιμο' },
  ru: { open: 'Меню', close: 'Закрыть' },
  en: { open: 'Menu', close: 'Close' },
} as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const lang = locale as 'el' | 'ru' | 'en';
  const brand = BRAND_TEXT[lang];
  const menu = MENU_LABEL[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the full-screen mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const currentPath = pathname.replace(`/${locale}`, '') || '/';
  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const switchLocalePath = (newLocale: string) =>
    `/${newLocale}${currentPath === '/' ? '' : currentPath}`;

  const headerSolid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-[var(--color-paper)]',
          headerSolid
            ? 'bg-[var(--color-ink)]/92 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
            : 'bg-gradient-to-b from-[var(--color-ink)]/80 via-[var(--color-ink)]/40 to-transparent',
        )}
      >
        <div className="mx-auto max-w-[var(--max-width-wide)] px-4 md:px-8">
          <div className="flex h-[64px] md:h-[76px] items-center gap-3 md:gap-8">
            {/* Logo + Brand */}
            <Link
              href={localizedHref('/')}
              className="flex items-center gap-2.5 md:gap-3 shrink-0 group"
              onClick={() => setMobileOpen(false)}
            >
              {/* Russian Orthodox eight-pointed cross */}
              <span
                aria-hidden
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--color-gold)]/70 flex items-center justify-center bg-transparent shrink-0"
              >
                <span className="absolute inset-[3px] rounded-full border border-[var(--color-gold)]/30" />
                <svg
                  viewBox="0 0 32 48"
                  className="w-4 h-6 md:w-5 md:h-7 text-[var(--color-gold-bright)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  aria-hidden
                >
                  <line x1="16" y1="3" x2="16" y2="45" />
                  <line x1="11" y1="9" x2="21" y2="9" />
                  <line x1="5" y1="17" x2="27" y2="17" />
                  <line x1="9" y1="26" x2="23" y2="32" />
                </svg>
              </span>

              <span className="flex flex-col leading-tight min-w-0">
                {/* Two small kicker lines — hidden on tightest screens */}
                <span className="hidden sm:block text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[var(--color-paper)]/70 truncate">
                  {brand.top}
                </span>
                <span className="hidden sm:block text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[var(--color-paper)]/70 truncate">
                  {brand.bottom}
                </span>
                {/* Big name — always shown */}
                <span className="font-[family-name:var(--font-display)] text-[15px] sm:text-base md:text-lg tracking-[0.18em] sm:tracking-[0.22em] text-[var(--color-gold-bright)] sm:mt-0.5 truncate">
                  {brand.big}
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 ml-auto">
              {NAV_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={localizedHref(href)}
                  className={cn(
                    'text-[13px] tracking-[0.06em] transition-colors',
                    currentPath === href
                      ? 'text-[var(--color-gold-bright)]'
                      : 'text-[var(--color-paper)] hover:text-[var(--color-gold-bright)]',
                  )}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            {/* Lang (md+) + hamburger (lg-) */}
            <div className="flex items-center gap-2 md:gap-3 ml-auto lg:ml-0">
              <div className="hidden md:flex items-center gap-1.5 font-[family-name:var(--font-display)] tracking-[0.12em]">
                {LOCALES.map(({ code, label }) => (
                  <Link
                    key={code}
                    href={switchLocalePath(code)}
                    className={cn(
                      'flex items-center justify-center min-w-[34px] h-[28px] px-1.5 text-[11px] border transition-all',
                      locale === code
                        ? 'border-[var(--color-gold-bright)] bg-[var(--color-gold-bright)]/10 text-[var(--color-gold-bright)]'
                        : 'border-[var(--color-paper)]/20 text-[var(--color-paper)]/60 hover:border-[var(--color-paper)]/50 hover:text-[var(--color-paper)]',
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-[var(--color-paper)] hover:text-[var(--color-gold-bright)] transition-colors"
                aria-label={mobileOpen ? menu.close : menu.open}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer — full-screen overlay below header bar */}
      <div
        id="mobile-drawer"
        aria-hidden={!mobileOpen}
        className={cn(
          'lg:hidden fixed inset-x-0 top-[64px] bottom-0 z-40 bg-[var(--color-ink)] flex flex-col transition-[opacity,transform] duration-300 ease-out',
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <nav className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
          <ul className="flex flex-col">
            {NAV_ITEMS.map(({ key, href }) => {
              const active = currentPath === href;
              return (
                <li key={key} className="border-b border-[var(--color-hairline-dark)]">
                  <Link
                    href={localizedHref(href)}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-5 transition-colors',
                      'font-[family-name:var(--font-heading)] text-[1.5rem] tracking-tight',
                      active
                        ? 'text-[var(--color-gold-bright)]'
                        : 'text-[var(--color-paper)] hover:text-[var(--color-gold-bright)]',
                    )}
                  >
                    {t(key)}
                    <span
                      aria-hidden
                      className={cn(
                        'text-base transition-transform',
                        active ? 'translate-x-0' : '-translate-x-2 opacity-70',
                      )}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language switcher pinned at bottom */}
        <div className="border-t border-[var(--color-hairline-dark)] px-6 py-5 bg-[var(--color-ink)]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-paper)]/55 mb-3">
            {locale === 'el' ? 'Γλώσσα' : locale === 'ru' ? 'Язык' : 'Language'}
          </p>
          <div className="flex items-center gap-3 font-[family-name:var(--font-display)] tracking-[0.12em]">
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href={switchLocalePath(code)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex-1 inline-flex items-center justify-center h-12 px-3 text-sm border transition-colors',
                  locale === code
                    ? 'border-[var(--color-gold-bright)] bg-[var(--color-gold-bright)]/10 text-[var(--color-gold-bright)]'
                    : 'border-[var(--color-paper)]/20 text-[var(--color-paper)]/70 hover:border-[var(--color-paper)]/50 hover:text-[var(--color-paper)]',
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
