import { Play } from 'lucide-react';
import { getVideos } from '@/lib/queries/videos';
import { localized, youtubeThumbnailUrl } from '@/lib/utils';
import type { VideoCategory } from '@/types/database';

const COPY = {
  el: {
    label: 'Βίντεο',
    title: 'Βιντεοθήκη',
    case: 'Η Υπόθεση',
    support: 'Στήριξη',
    sermons: 'Κηρύγματα',
    other: 'Άλλα',
  },
  ru: {
    label: 'Видео',
    title: 'Видеоархив',
    case: 'Дело',
    support: 'Поддержка',
    sermons: 'Проповеди',
    other: 'Прочее',
  },
  en: {
    label: 'Video',
    title: 'Video archive',
    case: 'The Case',
    support: 'Support',
    sermons: 'Sermons',
    other: 'Other',
  },
} as const;

export async function MediaVideos({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const videos = await getVideos();

  // Group by category in display order
  const order: VideoCategory[] = ['sermons', 'case', 'support', 'other'];
  const grouped = order
    .map((cat) => ({
      cat,
      label: c[cat],
      items: videos.filter((v) => v.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="mb-10 pb-3 border-b border-[var(--color-hairline)]">
          <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
            {c.label}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
            {c.title}
          </h2>
        </div>

        {grouped.map(({ cat, label, items }) => (
          <div key={cat} className="mb-12 last:mb-0">
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[var(--color-ink)] tracking-tight mb-5 flex items-baseline gap-3">
              {label}
              <span className="text-xs font-normal text-[var(--color-ink-muted)]">
                {items.length}
              </span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {items.map((video) => (
                <li key={video.id}>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-video overflow-hidden bg-[var(--color-ink)] mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={youtubeThumbnailUrl(video.youtube_id, 'hq')}
                        alt={localized(video, 'title', lang)}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[var(--color-burgundy)]/95 group-hover:bg-[var(--color-burgundy-bright)] transition-colors flex items-center justify-center">
                          <Play
                            size={14}
                            className="text-[var(--color-paper)] ml-0.5"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>
                    <h4 className="font-[family-name:var(--font-heading)] font-semibold text-sm md:text-base text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-snug line-clamp-2">
                      {localized(video, 'title', lang)}
                    </h4>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
