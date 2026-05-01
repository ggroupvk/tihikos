'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, X } from 'lucide-react';
import { cn, localized, youtubeEmbedUrl, youtubeThumbnailUrl } from '@/lib/utils';
import type { VideoRow } from '@/lib/queries/videos';

const COPY = {
  el: {
    label: 'Βίντεο',
    title: 'Σε δικά του λόγια',
    viewAll: 'Όλα τα βίντεο',
    close: 'Κλείσιμο',
  },
  ru: {
    label: 'Видео',
    title: 'Его собственные слова',
    viewAll: 'Все видео',
    close: 'Закрыть',
  },
  en: {
    label: 'Video',
    title: 'In his own words',
    viewAll: 'All videos',
    close: 'Close',
  },
} as const;

export function VideosRowClient({
  locale,
  videos,
}: {
  locale: string;
  videos: VideoRow[];
}) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeVideo = activeId ? videos.find((v) => v.id === activeId) : null;

  return (
    <section className="py-10 md:py-14 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-[var(--color-hairline)]">
          <div>
            <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
              {c.label}
            </span>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-xl md:text-2xl tracking-tight">
              {c.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/media`}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] hover:text-[var(--color-burgundy-bright)] transition-colors whitespace-nowrap pb-1"
          >
            {c.viewAll} <ArrowRight size={12} />
          </Link>
        </div>

        {/* Horizontal row — 5 across at lg, scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-none -mx-6 md:mx-0">
          <ul className="flex gap-4 md:gap-5 px-6 md:px-0 lg:grid lg:grid-cols-5 lg:gap-5">
            {videos.map((video) => {
              const title = localized(video, 'title', lang);
              return (
                <li
                  key={video.id}
                  className="shrink-0 w-[78%] sm:w-[44%] md:w-[32%] lg:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(video.id)}
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-video overflow-hidden bg-[var(--color-ink)] mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={youtubeThumbnailUrl(video.youtube_id, 'hq')}
                        alt={title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--color-burgundy)]/95 group-hover:bg-[var(--color-burgundy-bright)] transition-colors flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]">
                          <Play
                            size={16}
                            className="text-[var(--color-paper)] ml-0.5"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="kicker text-[var(--color-burgundy)] text-[10px] mb-1.5">
                      {video.category}
                    </p>
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-sm md:text-[15px] text-[var(--color-ink)] group-hover:text-[var(--color-burgundy)] transition-colors leading-snug line-clamp-2">
                      {title}
                    </h3>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Lightweight inline player modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-[var(--color-ink)]/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label={c.close}
              className="absolute -top-12 right-0 inline-flex items-center gap-1.5 text-sm text-[var(--color-paper)]/80 hover:text-[var(--color-paper)] transition-colors"
            >
              <X size={16} />
              {c.close}
            </button>
            <div className="relative aspect-video bg-black">
              <iframe
                key={activeVideo.id}
                src={`${youtubeEmbedUrl(activeVideo.youtube_id)}?autoplay=1&rel=0`}
                title={localized(activeVideo, 'title', lang)}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="mt-4 font-[family-name:var(--font-heading)] font-semibold text-base text-[var(--color-paper)]">
              {localized(activeVideo, 'title', lang)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
