'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const COPY = {
  el: {
    body:
      'Χρησιμοποιοῦμε μόνο τὰ ἀπαραίτητα cookies γιὰ τὴ λειτουργία τοῦ ἱστοτόπου (γλώσσα, σύνδεση διαχειριστῆ). Δὲν ἐνεργοποιοῦμε analytics ἢ διαφημιστικὰ cookies χωρὶς τὴ συγκατάθεσή σας.',
    privacy: 'Πολιτικὴ ἀπορρήτου',
    accept: 'Κατανοητό',
  },
  ru: {
    body:
      'Мы используем только функциональные cookies для работы сайта (язык, авторизация в админке). Аналитические и рекламные cookies без вашего согласия не активируем.',
    privacy: 'Политика конфиденциальности',
    accept: 'Понятно',
  },
  en: {
    body:
      'We use only functional cookies necessary for the site to work (language, admin sign-in). No analytics or advertising cookies are loaded without your consent.',
    privacy: 'Privacy policy',
    accept: 'Got it',
  },
} as const;

const STORAGE_KEY = 'tihikos.cookie-ack-v1';

export function CookieBanner({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setShow(true);
      }
    } catch {
      // localStorage may be disabled (private browsing, blocked) —
      // in that case just don't show, since we can't persist the
      // dismissal anyway.
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.privacy}
      className="fixed bottom-0 inset-x-0 z-[60] px-4 sm:px-6 pb-4 sm:pb-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-hairline-dark)] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] px-5 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="flex-1 text-sm leading-relaxed text-[var(--color-paper)]/85">
            {c.body}{' '}
            <Link
              href={`/${locale}/privacy`}
              className="underline underline-offset-2 decoration-[var(--color-gold-bright)]/40 hover:decoration-[var(--color-gold-bright)] text-[var(--color-gold-bright)] whitespace-nowrap"
            >
              {c.privacy}
            </Link>
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 inline-flex items-center justify-center px-5 h-11 bg-[var(--color-gold-bright)] text-[var(--color-ink)] font-medium text-sm tracking-wide hover:brightness-110 transition-all"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
