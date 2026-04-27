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
  // Prefer mitre portrait if available, otherwise fall back to general portrait
  const portraitSrc = tychikos?.photo_url ?? '/images/tychikos/portrait-mitre.jpg';
  const lang = locale as 'el' | 'ru' | 'en';

  return (
    <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[78vh] md:min-h-[82vh]">
        {/* Photo — full bleed left */}
        <div className="relative md:col-span-5 aspect-[4/5] md:aspect-auto bg-[var(--color-ink)]">
          <Image
            src={portraitSrc}
            alt="Metropolitan Tychikos of Paphos"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover object-left"
          />
          {/* Right edge fade into ink for seamless join */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[var(--color-ink)]" />
          {/* Bottom fade on mobile */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-ink)]" />
        </div>

        {/* Quote + CTA */}
        <div className="md:col-span-7 flex items-center px-6 md:px-12 lg:px-16 py-12 md:py-0">
          <div className="max-w-2xl">
            <span className="kicker text-[var(--color-gold-bright)] mb-5 block">
              {locale === 'el'
                ? 'Ιερά Μητρόπολη Πάφου'
                : locale === 'ru'
                ? 'Пафосская митрополия'
                : 'Metropolis of Paphos'}
            </span>

            <blockquote
              className="font-[family-name:var(--font-heading)] font-semibold leading-[1.2] tracking-tight mb-7 text-[var(--color-paper)]"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.5rem)' }}
            >
              {QUOTES[lang]}
            </blockquote>

            <p className="text-sm md:text-base text-[var(--color-paper)]/70 mb-9">
              — {ATTRIBUTIONS[lang]}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/case`}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-gold-bright)] text-[var(--color-ink)] font-medium text-sm tracking-wide hover:brightness-110 transition-all"
              >
                {t('ctaCase')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`/${locale}/media`}
                className="group inline-flex items-center gap-3 px-6 py-3.5 border border-[var(--color-paper)]/40 text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-colors"
              >
                <Play size={14} fill="currentColor" />
                {t('ctaVideo')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
