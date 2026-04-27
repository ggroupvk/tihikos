import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getTimelineEvents } from '@/lib/queries/timeline';
import { getPerson } from '@/lib/queries/persons';
import { caseNumbers } from '@/lib/mock/data';
import { localized } from '@/lib/utils';
import { toRoman } from '@/lib/roman';
import { plural } from '@/lib/plural';

export async function StoryBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const [events, tychikos] = await Promise.all([
    getTimelineEvents(),
    getPerson('tychikos').catch(() => null),
  ]);

  const portraitSrc = tychikos?.photo_url ?? '/images/tychikos/portrait-3.jpg';

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

  const yearsLabel = plural(locale, caseNumbers.yearsAsMetropolitan, {
    el: { one: 'Έτος στον θρόνο', other: 'Έτη στον θρόνο' },
    ru: { one: 'Год на кафедре', few: 'Года на кафедре', many: 'Лет на кафедре', other: 'Лет на кафедре' },
    en: { one: 'Year on throne', other: 'Years on throne' },
  }[locale as 'el' | 'ru' | 'en']);

  const clergyLabel = plural(locale, caseNumbers.clergySupport, {
    el: { one: 'Κληρικός που στηρίζει', other: 'Κληρικοί που στηρίζουν' },
    ru: { one: 'Клирик в поддержку', few: 'Клирика в поддержку', many: 'Клириков в поддержку', other: 'Клириков в поддержку' },
    en: { one: 'Cleric in support', other: 'Clergy in support' },
  }[locale as 'el' | 'ru' | 'en']);

  const docsLabel = plural(locale, caseNumbers.officialDocuments, {
    el: { one: 'Επίσημο έγγραφο', other: 'Επίσημα έγγραφα' },
    ru: { one: 'Официальный документ', few: 'Официальных документа', many: 'Официальных документов', other: 'Официальных документов' },
    en: { one: 'Official document', other: 'Official documents' },
  }[locale as 'el' | 'ru' | 'en']);

  const voteLabel =
    locale === 'el' ? 'Ψηφοφορία Συνόδου' : locale === 'ru' ? 'Голосование Синода' : 'Synod vote';

  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="relative md:grid md:grid-cols-12">
        {/* LEFT: sticky portrait + hero text */}
        <div className="md:col-span-5 md:sticky md:top-0 md:h-screen md:overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={portraitSrc}
              alt="Metropolitan Tychikos of Paphos"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover object-[center_top]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/20 via-[var(--color-ink)]/40 to-[var(--color-ink)]" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-[var(--color-ink)]" />
          </div>

          <div className="relative z-10 flex flex-col min-h-[85vh] md:h-full p-6 md:p-10 pt-24 md:pt-28">
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-[var(--color-gold)]" />
              <span className="kicker text-[var(--color-gold-bright)]">{kicker}</span>
            </div>

            <div className="flex-1 min-h-[32vh] md:min-h-0" aria-hidden />

            <div className="mb-6 md:mb-8">
              <h1
                className="font-[family-name:var(--font-heading)] font-bold leading-[1.05] tracking-tight"
                style={{
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  color: 'var(--color-paper)',
                }}
              >
                {t('heroTitle')}
              </h1>
              <p
                className="mt-5 md:mt-6 text-base md:text-lg max-w-md leading-relaxed"
                style={{ color: 'rgba(237, 231, 215, 0.8)' }}
              >
                {lede}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-5 border-t border-[var(--color-hairline-dark)]">
              <Stat number={caseNumbers.synodVote} label={voteLabel} />
              <Stat number={caseNumbers.yearsAsMetropolitan} label={yearsLabel} />
              <Stat number={caseNumbers.clergySupport} label={clergyLabel} />
              <Stat number={caseNumbers.officialDocuments} label={docsLabel} />
            </div>
          </div>
        </div>

        {/* RIGHT: scrolling timeline */}
        <div className="md:col-span-7 bg-[var(--color-ink)] md:pt-32 md:pb-32">
          <div className="px-6 md:px-12 py-12 md:py-0">
            <div className="mb-10 md:mb-14 pb-5 border-b border-[var(--color-hairline-dark)]">
              <span className="kicker text-[var(--color-gold-bright)] block mb-3">
                I &middot; {t('timelineTitle')}
              </span>
            </div>

            <div className="space-y-0">
              {events.map((event, i) => (
                <article
                  key={event.id}
                  className="py-8 md:py-10 border-t border-[var(--color-hairline-dark)] first:border-t-0 grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10"
                >
                  <div className="flex flex-col gap-1">
                    <span className="roman text-[var(--color-gold-bright)] text-xs">
                      {toRoman(i + 1)}
                    </span>
                    <div className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-paper)] leading-none text-3xl md:text-5xl">
                      {new Date(event.event_date).getFullYear()}
                    </div>
                    <span className="kicker text-[10px] text-[var(--color-paper)]/50 mt-1">
                      {new Date(event.event_date).toLocaleDateString(locale, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-2xl text-[var(--color-paper)] mb-3 leading-tight">
                      {localized(event, 'title', locale as 'el' | 'ru' | 'en')}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--color-paper)]/70 leading-relaxed">
                      {localized(event, 'description', locale as 'el' | 'ru' | 'en')}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string | number; label: string }) {
  return (
    <div>
      <div className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-[var(--color-gold-bright)]">
        {number}
      </div>
      <div className="kicker text-[10px] text-[var(--color-paper)]/60 mt-1">{label}</div>
    </div>
  );
}
