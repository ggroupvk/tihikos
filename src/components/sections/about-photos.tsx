import { ImageIcon } from 'lucide-react';

const COPY = {
  el: {
    label: 'Φωτογραφικό αρχείο',
    title: 'Στιγμές της διακονίας',
    subtitle: 'Αρχιερατικές χοροστασίες, λειτουργίες, ποιμαντική παρουσία.',
    placeholder: 'Φωτογραφικό υλικό σε επεξεργασία.',
  },
  ru: {
    label: 'Фотоархив',
    title: 'Моменты служения',
    subtitle: 'Архиерейские служения, литургии, пастырские встречи.',
    placeholder: 'Фотоматериалы готовятся к публикации.',
  },
  en: {
    label: 'Photo archive',
    title: 'Moments of ministry',
    subtitle: 'Hierarchical services, liturgies, pastoral presence.',
    placeholder: 'Photographic material is being prepared.',
  },
} as const;

export function AboutPhotos({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper-deep)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="mb-8 pb-3 border-b border-[var(--color-hairline)]">
          <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
            {c.label}
          </span>
          <div className="flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
              {c.title}
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)] hidden md:block">
              {c.subtitle}
            </p>
          </div>
        </div>

        {/* Placeholder grid — 9 tiles, 3 across on md+ */}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <li
              key={i}
              className="relative aspect-[4/5] bg-[var(--color-paper)] border border-[var(--color-hairline)] flex items-center justify-center"
            >
              <ImageIcon
                size={32}
                strokeWidth={1.2}
                className="text-[var(--color-burgundy)]/15"
              />
              <span className="absolute bottom-2 right-2 text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink-muted)]/40 font-mono">
                #{String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm italic text-[var(--color-ink-muted)] text-center">
          {c.placeholder}
        </p>
      </div>
    </section>
  );
}
