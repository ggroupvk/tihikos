import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';
import { getVideos } from '@/lib/queries/videos';
import { localized, youtubeThumbnailUrl } from '@/lib/utils';

const COPY = {
  el: {
    label: 'Κηρύγματα',
    title: 'Στα δικά του λόγια',
    subtitle: 'Επιλογή κηρυγμάτων και δημόσιων ομιλιών.',
    viewAll: 'Όλο το αρχείο',
  },
  ru: {
    label: 'Проповеди',
    title: 'В его собственных словах',
    subtitle: 'Подборка проповедей и публичных обращений.',
    viewAll: 'Полный архив',
  },
  en: {
    label: 'Homilies',
    title: 'In his own words',
    subtitle: 'A selection of sermons and public addresses.',
    viewAll: 'Full archive',
  },
} as const;

export async function AboutSermons({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const videos = await getVideos({ limit: 6 });

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[var(--color-hairline)]">
          <div>
            <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
              {c.label}
            </span>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
              {c.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/media`}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:underline pb-1"
          >
            {c.viewAll} <ArrowRight size={12} />
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {videos.map((video) => (
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
                      <Play size={14} className="text-[var(--color-paper)] ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-1.5">
                  {video.category}
                </p>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm md:text-base text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-snug line-clamp-2">
                  {localized(video, 'title', lang)}
                </h3>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
