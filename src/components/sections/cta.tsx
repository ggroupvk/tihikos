import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function CtaSection() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="py-20 md:py-32 bg-[var(--color-burgundy)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
          <div className="md:col-span-7">
            <span className="kicker text-[var(--color-paper)]/60 mb-4 block">V &middot; Act</span>
            <h2 className="display-lg font-[family-name:var(--font-heading)] text-[var(--color-paper)]">
              {t('ctaTitle')}
            </h2>
          </div>

          <div className="md:col-span-5 flex flex-col">
            <Link
              href={`/${locale}/support`}
              className="group flex items-center justify-between px-8 py-6 bg-[var(--color-paper)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-bright)] transition-colors"
            >
              <span>{t('ctaShare')}</span>
              <span className="transition-transform group-hover:translate-x-2">&rarr;</span>
            </Link>
            <a
              href="https://www.youtube.com/@IeraMitropoliPaphou"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-8 py-6 border-x border-b border-[var(--color-paper)]/30 text-[var(--color-paper)] font-medium hover:bg-[var(--color-paper)] hover:text-[var(--color-burgundy)] transition-colors"
            >
              <span>{t('ctaSubscribe')}</span>
              <span className="transition-transform group-hover:translate-x-2">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
