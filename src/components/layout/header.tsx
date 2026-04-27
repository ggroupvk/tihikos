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
  ru: { top: 'В поддержку', bottom: 'митрополита Пафосского', big: 'ТИХИКОСА' },
  en: { top: 'In support of', bottom: 'Metropolitan of Paphos', big: 'TYCHIKOS' },
} as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const lang = locale as 'el' | 'ru' | 'en';
  const brand = BRAND_TEXT[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
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
        'sticky top-0 left-0 right-0 z-50 transition-shadow duration-200 bg-[var(--color-ink)] text-[var(--color-paper)]',
        scrolled ? 'shadow-md' : '',
      )}
    >
      <div className="mx-auto max-w-[var(--max-width-wide)] px-4 md:px-8">
        <div className="flex h-[68px] md:h-[76px] items-center gap-4 md:gap-8">
          {/* Logo + Brand */}
          <Link href={localizedHref('/')} className="flex items-center gap-3 shrink-0 group">
            {/* Orthodox eight-pointed cross emblem */}
            <span
              aria-hidden
              className="relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--color-gold)]/60 flex items-center justify-center bg-[var(--color-ink)]"
            >
              <span className="absolute inset-1 rounded-full border border-[var(--color-gold)]/30" />
              <svg viewBox="0 0 32 48" className="w-5 h-7 text-[var(--color-gold-bright)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                {/* vertical staff */}
                <line x1="16" y1="3" x2="16" y2="45" />
                {/* top crossbar (titulus) */}
                <line x1="11" y1="9" x2="21" y2="9" />
                {/* main crossbar */}
                <line x1="5" y1="17" x2="27" y2="17" />
                {/* slanted footrest (top-right higher, bottom-left lower) */}
                <line x1="9" y1="32" x2="23" y2="26" />
              </svg>
            </span>

            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[var(--color-paper)]/70">
                {brand.top}
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[var(--color-paper)]/70">
                {brand.bottom}
              </span>
              <span className="font-[family-name:var(--font-display)] text-base md:text-lg tracking-[0.22em] text-[var(--color-gold-bright)] mt-0.5">
                {brand.big}
              </span>
            </span>
          </Link>

          {/* Desktop nav — center / fill */}
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

          {/* Lang + mobile button */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            <div className="hidden md:flex items-center gap-1 text-[11px] font-[family-name:var(--font-display)] tracking-[0.15em]">
              {LOCALES.map(({ code, label }, i) => (
                <span key={code} className="flex items-center gap-1">
                  {i > 0 && <span className="text-[var(--color-paper)]/30">·</span>}
                  <Link
                    href={switchLocalePath(code)}
                    className={cn(
                      'px-1 transition-colors',
                      locale === code
                        ? 'text-[var(--color-gold-bright)]'
                        : 'text-[var(--color-paper)]/60 hover:text-[var(--color-paper)]',
                    )}
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-[var(--color-paper)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-6 pt-2 border-t border-[var(--color-hairline-dark)] space-y-1">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={localizedHref(href)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block py-3 text-base transition-colors',
                  currentPath === href
                    ? 'text-[var(--color-gold-bright)]'
                    : 'text-[var(--color-paper)] hover:text-[var(--color-gold-bright)]',
                )}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 mt-2 border-t border-[var(--color-hairline-dark)] text-xs font-[family-name:var(--font-display)] tracking-[0.15em]">
              {LOCALES.map(({ code, label }, i) => (
                <span key={code} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[var(--color-paper)]/30">·</span>}
                  <Link
                    href={switchLocalePath(code)}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-1',
                      locale === code
                        ? 'text-[var(--color-gold-bright)]'
                        : 'text-[var(--color-paper)]/60',
                    )}
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
