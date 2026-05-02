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
  ru: 'Митрополит Пафосский Тихик',
  en: 'Metropolitan Tychikos of Paphos',
} as const;

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tychikos = await getPerson('tychikos').catch(
    () => null as null | { photo_url: string | null },
  );
  const portraitSrc = tychikos?.photo_url ?? '/images/tychikos/portrait-mitre.jpg';
  const lang = locale as 'el' | 'ru' | 'en';

  return (
    <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
      {/* Full-bleed background image (only the left half is the actual portrait;
          the right half is the source's red/maroon backdrop, which we let
          continue under the text via a smooth horizontal gradient) */}
      <div className="absolute inset-0">
        <Image
          src={portraitSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[20%_center] md:object-[30%_center]"
        />
        {/* Subtle dark vignette across the whole image to lift contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/30 to-[var(--color-ink)]" />
        {/* Right-side darken to make text legible without covering the metropolitan */}
        <div className="absolute inset-y-0 right-0 w-[58%] md:w-[55%] bg-gradient-to-l from-[var(--color-ink)] from-50% to-transparent" />
        {/* Top fade to merge with header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-ink)]/95 to-transparent" />
      </div>

      {/* Content grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-[78vh] md:min-h-[85vh]">
        {/* Left empty space — the portrait is the visual */}
        <div className="hidden md:block md:col-span-5" />

        {/* Right side text */}
        <div className="md:col-span-7 flex items-center px-6 md:px-12 lg:px-16 pt-28 md:pt-0 pb-12 md:pb-0">
          <div className="max-w-2xl">
            <span className="kicker text-[var(--color-gold-bright)] mb-5 block">
              {locale === 'el'
                ? 'Ιερά Μητρόπολη Πάφου'
                : locale === 'ru'
                ? 'Пафосская митрополия'
                : 'Metropolis of Paphos'}
            </span>

            <blockquote
              className="font-[family-name:var(--font-heading)] font-semibold leading-[1.18] tracking-tight mb-6 text-[var(--color-paper)]"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.5rem)' }}
            >
              {QUOTES[lang]}
            </blockquote>

            <p className="text-sm md:text-base text-[var(--color-paper)]/70 mb-8">
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
