import { ImageIcon } from 'lucide-react';

const COPY = {
  el: {
    label: 'Φωτογραφίες',
    title: 'Φωτογραφικό αρχείο',
    placeholder: 'Πλήρες φωτογραφικό αρχείο σε προετοιμασία.',
  },
  ru: {
    label: 'Фотографии',
    title: 'Фотоархив',
    placeholder: 'Полный фотоархив готовится к публикации.',
  },
  en: {
    label: 'Photographs',
    title: 'Photo archive',
    placeholder: 'A full photo archive is in preparation.',
  },
} as const;

export function MediaPhotos({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper-deep)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="mb-10 pb-3 border-b border-[var(--color-hairline)]">
          <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
            {c.label}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
            {c.title}
          </h2>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <li
              key={i}
              className={
                'relative bg-[var(--color-paper)] border border-[var(--color-hairline)] flex items-center justify-center ' +
                (i % 5 === 0 ? 'aspect-[3/4]' : i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]')
              }
            >
              <ImageIcon
                size={28}
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
