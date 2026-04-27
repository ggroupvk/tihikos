import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getPerson } from '@/lib/queries/persons';

const QUOTES = {
  el: '«Η αλήθεια του Χριστού δεν εξαρτάται από την απόφαση της πλειοψηφίας. Παραμένει στην Εκκλησία και στους κανόνες των αγίων Πατέρων.»',
  ru: '«Истина Христова не зависит от решения большинства. Она пребывает в Церкви и в канонах святых отцов.»',
  en: '"The truth of Christ does not depend on the decision of the majority. It abides in the Church and in the canons of the holy Fathers."',
} as const;

const ATTRIBUTIONS = {
  el: 'Μητροπολίτης Πάφου Τυχικός',
  ru: 'Митрополит Пафосский Тихикос',
  en: 'Metropolitan Tychikos of Paphos',
} as const;

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tychikos = await getPerson('tychikos').catch(
    () => null as null | { photo_url: string | null },
  );
  const portraitSrc = tychikos?.photo_url ?? '/images/tychikos/portrait-mitre.jpg';
  const lang = locale as 'el' | 'ru' | 'en';

  const kicker =
    locale === 'el'
      ? 'Ιερά Μητρόπολη Πάφου · 70ός Μητροπολίτης'
      : locale === 'ru'
      ? 'Пафосская митрополия · 70-й митрополит'
      : 'Metropolis of Paphos · 70th Metropolitan';

  return (
    <section className="relative bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden">
      {/* Decorative paper texture / vignette */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 80% 50%, rgba(92, 26, 27, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(184, 147, 90, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center min-h-[70vh]">
          {/* LEFT: Editorial copy */}
          <div className="md:col-span-7 order-2 md:order-1">
            {/* Decorative top line + kicker */}
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-12 h-px bg-[var(--color-burgundy)]" />
              <span className="kicker text-[var(--color-burgundy)]">{kicker}</span>
            </div>

            {/* Headline quote — large editorial serif, opening mark detached */}
            <div className="relative mb-8">
              <span
                aria-hidden
                className="absolute -left-1 -top-6 md:-left-3 md:-top-10 font-[family-name:var(--font-heading)] text-[var(--color-burgundy)]/15 leading-none select-none"
                style={{ fontSize: 'clamp(7rem, 14vw, 14rem)' }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative font-[family-name:var(--font-heading)] font-semibold leading-[1.18] tracking-tight text-[var(--color-ink)]"
                style={{ fontSize: 'clamp(1.6rem, 2.9vw, 2.75rem)' }}
              >
                {QUOTES[lang]}
              </blockquote>
            </div>

            {/* Attribution — gold rule + name */}
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-8 h-px bg-[var(--color-gold)]" />
              <p className="text-sm md:text-base font-[family-name:var(--font-heading)] text-[var(--color-ink-muted)] tracking-wide">
                {ATTRIBUTIONS[lang]}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/case`}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[var(--color-burgundy)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-burgundy-bright)] transition-colors"
              >
                {t('ctaCase')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${locale}/media`}
                className="group inline-flex items-center gap-3 px-7 py-4 border border-[var(--color-ink)]/25 text-[var(--color-ink)] font-medium text-sm tracking-wide hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] hover:border-[var(--color-ink)] transition-colors"
              >
                <Play size={14} fill="currentColor" />
                {t('ctaVideo')}
              </Link>
            </div>
          </div>

          {/* RIGHT: Portrait with halo + corner ornaments */}
          <div className="md:col-span-5 order-1 md:order-2 relative flex items-center justify-center py-4">
            {/* Decorative golden halo behind portrait */}
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="w-[110%] h-[110%] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(184, 147, 90, 0.18) 0%, rgba(92, 26, 27, 0.06) 45%, transparent 70%)',
                }}
              />
            </div>

            {/* Corner ornaments — thin gold L-frames */}
            <span aria-hidden className="absolute top-0 left-0 w-12 h-12 border-l border-t border-[var(--color-gold)]/60" />
            <span aria-hidden className="absolute top-0 right-0 w-12 h-12 border-r border-t border-[var(--color-gold)]/60" />
            <span aria-hidden className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-[var(--color-gold)]/60" />
            <span aria-hidden className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-[var(--color-gold)]/60" />

            {/* Portrait — full bleed inside container, soft fade at edges */}
            <div
              className="relative w-full aspect-[4/5] max-h-[68vh] overflow-hidden"
              style={{
                maskImage:
                  'radial-gradient(ellipse at center, black 55%, rgba(0,0,0,0.85) 75%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at center, black 55%, rgba(0,0,0,0.85) 75%, transparent 100%)',
              }}
            >
              <Image
                src={portraitSrc}
                alt="Metropolitan Tychikos of Paphos"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-[center_top]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
