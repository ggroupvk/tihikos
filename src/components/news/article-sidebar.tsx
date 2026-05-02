import { Clock, FileText } from 'lucide-react';
import { ShareControls } from './share-controls';

const COPY = {
  el: {
    sourceLabel: 'Πηγή',
    publishedLabel: 'Δημοσιεύθηκε',
    readingLabel: 'Χρόνος ἀναγνώσεως',
    minSuffix: 'λεπτά',
    shareLabel: 'Μοιραστεῖτε',
  },
  ru: {
    sourceLabel: 'Источник',
    publishedLabel: 'Опубликовано',
    readingLabel: 'Время чтения',
    minSuffix: 'мин',
    shareLabel: 'Поделиться',
  },
  en: {
    sourceLabel: 'Source',
    publishedLabel: 'Published',
    readingLabel: 'Reading time',
    minSuffix: 'min',
    shareLabel: 'Share',
  },
} as const;

function formatDate(iso: string | null, lang: 'el' | 'ru' | 'en'): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function readingMinutes(text: string | null | undefined): number {
  if (!text) return 1;
  // ~210 wpm averaged across our three languages
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 210));
}

export function ArticleSidebar({
  locale,
  sourceLabel,
  publishedAt,
  body,
  title,
  url,
}: {
  locale: string;
  sourceLabel: string | null;
  publishedAt: string | null;
  body: string | null;
  title: string;
  url: string;
}) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const minutes = readingMinutes(body);

  return (
    <aside className="lg:sticky lg:top-32 space-y-6 text-[var(--color-ink-soft)]">
      {sourceLabel && (
        <div>
          <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-2">
            {c.sourceLabel}
          </p>
          <p className="flex items-center gap-2 font-[family-name:var(--font-heading)] font-semibold text-base text-[var(--color-ink)]">
            <FileText size={14} className="text-[var(--color-burgundy)]" />
            {sourceLabel}
          </p>
        </div>
      )}

      {publishedAt && (
        <div>
          <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-2">
            {c.publishedLabel}
          </p>
          <p className="text-sm text-[var(--color-ink)]">
            {formatDate(publishedAt, lang)}
          </p>
        </div>
      )}

      <div>
        <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-2">
          {c.readingLabel}
        </p>
        <p className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
          <Clock size={13} className="text-[var(--color-burgundy)]" />
          {minutes} {c.minSuffix}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--color-hairline)]">
        <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-3">
          {c.shareLabel}
        </p>
        <ShareControls locale={locale} title={title} url={url} layout="row" />
      </div>
    </aside>
  );
}
