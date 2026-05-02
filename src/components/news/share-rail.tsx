import { ShareControls } from './share-controls';

const COPY = {
  el: 'Μοιραστεῖτε',
  ru: 'Поделиться',
  en: 'Share',
} as const;

/**
 * Floating left-rail with share buttons. Visible on lg+ only.
 * Sticky alongside the article body.
 */
export function ShareRail({
  locale,
  title,
  url,
}: {
  locale: string;
  title: string;
  url: string;
}) {
  const lang = locale as 'el' | 'ru' | 'en';
  const label = COPY[lang];

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-32 flex flex-col items-center gap-4">
        <span
          className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-ink-muted)] writing-vertical"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          {label}
        </span>
        <span className="block w-px h-12 bg-[var(--color-hairline)]" />
        <ShareControls locale={locale} title={title} url={url} layout="column" />
      </div>
    </aside>
  );
}
