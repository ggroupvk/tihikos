import { User } from 'lucide-react';
import { getPersons } from '@/lib/queries/persons';
import { localized, cn } from '@/lib/utils';

const PHOTO_POSITION: Record<string, string> = {
  'dimos-serkelidis': 'object-[20%_center]',
  'neophytos-morphou': 'object-[25%_center]',
  'savvas-agiorritis': 'object-[center_top]',
  'theodoros-zisis': 'object-[center_top]',
  'athanasios-limassol': 'object-center',
  'seraphim-kythira': 'object-[center_top]',
};

const COPY = {
  el: {
    label: 'Φωνές',
    title: 'Δημόσια στήριξη',
    subtitle:
      'Επίσκοποι, ηγούμενοι, καθηγητές και πρεσβύτεροι από Κύπρο, Ελλάδα και Άγιον Όρος.',
    placeholder: 'Πλήρες αρχείο επιστολών και δηλώσεων ετοιμάζεται.',
  },
  ru: {
    label: 'Голоса',
    title: 'Публичная поддержка',
    subtitle:
      'Епископы, игумены, профессора и пресвитеры с Кипра, из Греции и со Святой Горы Афон.',
    placeholder: 'Полный архив писем и заявлений готовится.',
  },
  en: {
    label: 'Voices',
    title: 'Public support',
    subtitle:
      'Bishops, abbots, professors and presbyters from Cyprus, Greece and Mount Athos.',
    placeholder: 'A full archive of letters and statements is in preparation.',
  },
} as const;

export async function SupportVoices({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const all = await getPersons();
  const supporters = all.filter((p) => p.slug !== 'tychikos');

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="mb-10 pb-3 border-b border-[var(--color-hairline)]">
          <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
            {c.label}
          </span>
          <div className="flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
              {c.title}
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)] hidden md:block max-w-md text-right">
              {c.subtitle}
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {supporters.map((p) => {
            const name = localized(p, 'name', lang);
            const title = localized(p, 'title', lang);
            const bio = localized(p, 'bio', lang);
            return (
              <li
                key={p.id}
                className="bg-[var(--color-paper-deep)] border border-[var(--color-hairline)] p-5 md:p-6"
              >
                <div className="flex gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-full bg-[var(--color-paper)] border border-[var(--color-burgundy)]/15 flex items-center justify-center overflow-hidden shrink-0">
                    {p.photo_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={p.photo_url}
                        alt={name}
                        className={cn(
                          'absolute inset-0 w-full h-full object-cover',
                          PHOTO_POSITION[p.slug] ?? 'object-center',
                        )}
                      />
                    ) : (
                      <User size={28} strokeWidth={1.4} className="text-[var(--color-burgundy)]/40" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base text-[var(--color-ink)] leading-snug mb-1">
                      {name}
                    </h3>
                    <p className="text-xs italic text-[var(--color-ink-muted)] leading-snug">
                      {title}
                    </p>
                  </div>
                </div>
                {bio && (
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed pt-3 border-t border-[var(--color-hairline)]">
                    {bio}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm italic text-[var(--color-ink-muted)] text-center">
          {c.placeholder}
        </p>
      </div>
    </section>
  );
}
