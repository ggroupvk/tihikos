import { User } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getPersons } from '@/lib/queries/persons';
import { localized } from '@/lib/utils';

export async function SupportCarousel({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const all = await getPersons();
  const supporters = all.filter((p) => p.slug !== 'tychikos');

  return (
    <section className="py-10 md:py-12 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <h2 className="text-center font-[family-name:var(--font-heading)] font-bold mb-8 text-2xl md:text-3xl tracking-tight">
          {t('supportTitle')}
        </h2>

        {/* Auto-scrolling row on desktop, swipe on mobile */}
        <div className="overflow-x-auto scrollbar-none">
          <ul className="flex gap-6 md:gap-10 px-2 md:px-6 justify-center md:justify-around min-w-max md:min-w-0">
            {supporters.map((person) => (
              <li key={person.id} className="flex flex-col items-center text-center w-[120px] md:w-[140px] shrink-0">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-[var(--color-paper)]/5 border border-[var(--color-hairline-dark)] flex items-center justify-center mb-3 overflow-hidden">
                  {person.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photo_url}
                      alt={localized(person, 'name', locale as 'el' | 'ru' | 'en')}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <User size={36} strokeWidth={1.2} className="text-[var(--color-gold-bright)]/60" />
                  )}
                </div>
                <p className="text-xs md:text-sm font-[family-name:var(--font-heading)] font-semibold text-[var(--color-paper)] leading-tight mb-1">
                  {localized(person, 'name', locale as 'el' | 'ru' | 'en')}
                </p>
                <p className="text-[10px] md:text-xs text-[var(--color-paper)]/55">
                  {localized(person, 'title', locale as 'el' | 'ru' | 'en')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
