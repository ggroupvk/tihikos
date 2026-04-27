import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
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
  const tychikos = await getPerson('tychikos').catch(() => null as null | { photo_url: string | null });
  const portraitSrc = tychikos?.photo_url ?? '/images/tychikos/portrait-3.jpg';
  const lang = locale as 'el' | 'ru' | 'en';

  return (
    <section className="relative bg-[var(--color-paper)] overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 pt-24 md:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center min-h-[calc(85vh-7rem)]">
          {/* Photo */}
          <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-[70vh] order-1 overflow-hidden rounded-sm">
            <Image
              src={portraitSrc}
              alt="Metropolitan Tychikos of Paphos"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover object-[center_top]"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 to-transparent" />
          </div>

          {/* Quote + CTA */}
          <div className="md:col-span-7 order-2 py-6 md:py-12">
            <div className="max-w-xl">
              <span className="kicker text-[var(--color-burgundy)] mb-6 block">
                {locale === 'el'
                  ? 'Ιερά Μητρόπολη Πάφου'
                  : locale === 'ru'
                  ? 'Пафосская митрополия'
                  : 'Metropolis of Paphos'}
              </span>

              <blockquote
                className="font-[family-name:var(--font-heading)] text-[var(--color-ink)] font-semibold leading-[1.15] tracking-tight mb-8"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
              >
                {QUOTES[lang]}
              </blockquote>

              <p className="text-base md:text-lg text-[var(--color-ink-muted)] mb-10">
                — {ATTRIBUTIONS[lang]}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/case`}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-burgundy)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-burgundy-bright)] transition-colors"
                >
                  {t('ctaCase')}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/${locale}/media`}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 border border-[var(--color-ink)] text-[var(--color-ink)] font-medium text-sm tracking-wide hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
                >
                  <PlayCircle size={16} />
                  {t('ctaVideo')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
