import { Construction } from 'lucide-react';
import Link from 'next/link';

const TEXTS = {
  el: {
    label: 'Σύντομα',
    body: 'Αυτή η σελίδα ετοιμάζεται. Επιστρέψτε σύντομα.',
    back: 'Επιστροφή στην αρχική',
  },
  ru: {
    label: 'Скоро',
    body: 'Раздел готовится. Скоро здесь появится контент.',
    back: 'На главную',
  },
  en: {
    label: 'Coming soon',
    body: 'This page is being prepared. Please check back soon.',
    back: 'Back to home',
  },
} as const;

export function PageStub({
  locale,
  title,
  subtitle,
  kicker,
}: {
  locale: string;
  title: string;
  subtitle?: string;
  kicker?: string;
}) {
  const lang = (locale as 'el' | 'ru' | 'en') ?? 'el';
  const copy = TEXTS[lang];

  return (
    <section className="min-h-[70vh] bg-[var(--color-paper)] flex items-center">
      <div className="mx-auto max-w-3xl px-6 md:px-12 py-24 md:py-28 text-center">
        {kicker && (
          <p className="kicker text-[var(--color-burgundy)] mb-5">{kicker}</p>
        )}
        <h1 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-3xl md:text-5xl mb-6 tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-[var(--color-ink-muted)] mb-10 leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="inline-flex items-center gap-3 px-5 py-3 bg-[var(--color-paper-deep)] border border-[var(--color-burgundy)]/15 mb-10">
          <Construction size={18} strokeWidth={1.5} className="text-[var(--color-burgundy)]" />
          <span className="kicker text-[var(--color-burgundy)] text-[11px]">
            {copy.label}
          </span>
        </div>

        <p className="text-sm text-[var(--color-ink-muted)] mb-8">{copy.body}</p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-burgundy)] hover:underline"
        >
          ← {copy.back}
        </Link>
      </div>
    </section>
  );
}
