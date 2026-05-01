import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Send, Mail, MapPin } from 'lucide-react';

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.9 31.9 0 000 12a31.9 31.9 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.9 31.9 0 0024 12a31.9 31.9 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.3l-.5 3.5h-2.8v8.4C19.6 23 24 18.1 24 12.1z" />
    </svg>
  );
}
import { socialLinks } from '@/lib/mock/data';

const BRAND = {
  el: { top: 'Σε στήριξη του', bottom: 'Μητροπολίτη Πάφου', big: 'ΤΥΧΙΚΟΥ' },
  ru: { top: 'В поддержку', bottom: 'митрополита Пафосского', big: 'ТИХИКОСА' },
  en: { top: 'In support of', bottom: 'Metropolitan of Paphos', big: 'TYCHIKOS' },
} as const;

const COL_LABELS = {
  el: { nav: 'Πλοήγηση', help: 'Πώς να βοηθήσετε', socials: 'Στα κοινωνικά δίκτυα', contacts: 'Επικοινωνία' },
  ru: { nav: 'Навигация', help: 'Как помочь', socials: 'Мы в соцсетях', contacts: 'Контакты' },
  en: { nav: 'Navigation', help: 'How to help', socials: 'On social networks', contacts: 'Contacts' },
} as const;

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const lang = locale as 'el' | 'ru' | 'en';
  const brand = BRAND[lang];
  const col = COL_LABELS[lang];

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 pt-12 md:pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href={localizedHref('/')} className="inline-flex items-center gap-3 group">
              <span
                aria-hidden
                className="relative w-12 h-12 rounded-full border border-[var(--color-gold)]/70 flex items-center justify-center bg-transparent shrink-0"
              >
                <span className="absolute inset-[3px] rounded-full border border-[var(--color-gold)]/30" />
                <svg
                  viewBox="0 0 32 48"
                  className="w-5 h-7 text-[var(--color-gold-bright)]"
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
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper)]/70">
                  {brand.top}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper)]/70">
                  {brand.bottom}
                </span>
                <span className="font-[family-name:var(--font-display)] text-base tracking-[0.22em] text-[var(--color-gold-bright)] mt-0.5">
                  {brand.big}
                </span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="kicker text-[var(--color-gold-bright)] mb-4 text-[10px]">{col.nav}</p>
            <ul className="space-y-2 text-sm">
              {(['home', 'about', 'case', 'support', 'media', 'news'] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={localizedHref(key === 'home' ? '/' : `/${key}`)}
                    className="text-[var(--color-paper)]/75 hover:text-[var(--color-gold-bright)] transition-colors"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* How to help */}
          <div className="md:col-span-3">
            <p className="kicker text-[var(--color-gold-bright)] mb-4 text-[10px]">{col.help}</p>
            <ul className="space-y-2 text-sm text-[var(--color-paper)]/75">
              <li>· {tFooter('spread')}</li>
              <li>· {tFooter('translate')}</li>
              <li>· {tFooter('pray')}</li>
            </ul>
          </div>

          {/* Socials + Contacts */}
          <div className="md:col-span-3">
            <p className="kicker text-[var(--color-gold-bright)] mb-4 text-[10px]">{col.socials}</p>
            <div className="flex gap-3 mb-6">
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 border border-[var(--color-paper)]/20 flex items-center justify-center text-[var(--color-paper)]/70 hover:border-[var(--color-gold-bright)] hover:text-[var(--color-gold-bright)] transition-colors"
                >
                  <YoutubeIcon size={16} />
                </a>
              )}
              {socialLinks.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-9 h-9 border border-[var(--color-paper)]/20 flex items-center justify-center text-[var(--color-paper)]/70 hover:border-[var(--color-gold-bright)] hover:text-[var(--color-gold-bright)] transition-colors"
                >
                  <Send size={16} />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 border border-[var(--color-paper)]/20 flex items-center justify-center text-[var(--color-paper)]/70 hover:border-[var(--color-gold-bright)] hover:text-[var(--color-gold-bright)] transition-colors"
                >
                  <FacebookIcon size={16} />
                </a>
              )}
            </div>

            <p className="kicker text-[var(--color-gold-bright)] mb-3 text-[10px]">{col.contacts}</p>
            <ul className="space-y-1.5 text-sm text-[var(--color-paper)]/75">
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-[var(--color-paper)]/50 shrink-0" />
                <a href="mailto:info@tihikos-support.org" className="hover:text-[var(--color-gold-bright)] transition-colors">
                  info@tihikos-support.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={13} className="text-[var(--color-paper)]/50 shrink-0" />
                <span>
                  {locale === 'el' ? 'Πάφος, Κύπρος' : locale === 'ru' ? 'Кипр, Пафос' : 'Cyprus, Paphos'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--color-hairline-dark)] text-center text-xs text-[var(--color-paper)]/50">
          © {year} {locale === 'el'
            ? 'σε στήριξη του Μητροπολίτη Πάφου Τυχικού. Με επιφύλαξη παντός δικαιώματος.'
            : locale === 'ru'
            ? 'В поддержку митрополита Пафосского Тихикоса. Все права защищены.'
            : 'In support of Metropolitan Tychikos of Paphos. All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}
