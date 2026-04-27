import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get localized field from a database row.
 * Falls back: requested locale → el → first non-null.
 */
export function localized<T extends Record<string, unknown>>(
  row: T,
  field: string,
  locale: Locale,
): string {
  const value = row[`${field}_${locale}`];
  if (typeof value === 'string' && value) return value;

  const fallback = row[`${field}_el`];
  if (typeof fallback === 'string' && fallback) return fallback;

  return '';
}

/**
 * Build YouTube embed URL with privacy-enhanced mode.
 */
export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/**
 * Build YouTube thumbnail URL.
 */
export function youtubeThumbnailUrl(videoId: string, quality: 'default' | 'hq' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    maxres: 'maxresdefault',
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}
