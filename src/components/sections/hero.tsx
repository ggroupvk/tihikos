'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('home');
  const locale = useLocale();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    function onScroll() {
      const y = window.scrollY;
      if (!el) return;
      el.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const kicker =
    locale === 'el'
      ? 'Ιερά Μητρόπολη Πάφου'
      : locale === 'ru'
      ? 'Пафосская митрополия'
      : 'Metropolis of Paphos';

  const lede =
    locale === 'el'
      ? 'Χρονικό μιας υπόθεσης για την κανονική αλήθεια, τη δικαιοσύνη και την ιερή συνείδηση.'
      : locale === 'ru'
      ? 'Хроника дела о канонической правде, справедливости и священной совести.'
      : 'A chronicle of a case about canonical truth, justice, and sacred conscience.';

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
      {/* Parallax background layer */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(184, 147, 90, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(92, 26, 27, 0.18) 0%, transparent 60%)',
          }}
        />
        {/* Archival grain texture via SVG noise */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-between pt-28 md:pt-32 pb-10 md:pb-14">
        {/* Top kicker row */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-px bg-[var(--color-gold)]" />
          <span className="kicker text-[var(--color-gold-bright)]">{kicker}</span>
        </div>

        {/* Middle: title */}
        <div className="max-w-5xl">
          <h1 className="display-xl font-[family-name:var(--font-heading)] text-[var(--color-paper)]">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-[var(--color-paper)]/75 max-w-2xl leading-relaxed italic font-[family-name:var(--font-heading)]">
            {lede}
          </p>
        </div>

        {/* Bottom: actions + meta */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-8 border-t border-[var(--color-hairline-dark)]">
          <div className="flex flex-wrap gap-0">
            <Link
              href={`/${locale}/case`}
              className="group inline-flex items-center gap-3 px-6 py-4 bg-[var(--color-burgundy)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-burgundy-bright)] transition-colors"
            >
              {t('ctaCase')}
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href={`/${locale}/media`}
              className="group inline-flex items-center gap-3 px-6 py-4 border border-l-0 border-[var(--color-hairline-dark)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)] transition-colors"
            >
              {t('ctaVideo')}
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[var(--color-paper)]/50">
            <span className="kicker text-[10px]">
              {locale === 'el' ? 'Κυλήστε' : locale === 'ru' ? 'Листайте' : 'Scroll'}
            </span>
            <div className="w-16 h-px bg-[var(--color-gold)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
