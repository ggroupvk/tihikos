import type { ContentSource } from '@/types/database';

/**
 * Display labels for the canonical news outlets the site curates from.
 * Indexed by URL host (lowercased, no www.) — keeps the runtime
 * `source` enum values free of churn while still showing accurate
 * source names in the UI.
 */
const HOST_LABELS: Record<string, string> = {
  'spzh.eu': 'СПЖ',
  'orthochristian.com': 'OrthoChristian',
  'orthodoxtimes.com': 'Orthodox Times',
  'orthodoxiapost.com': 'Orthodoxia Post',
  'ocpsociety.org': 'OCP Society',
  'gorthodox.com': 'gorthodox.com',
  'cyprustimes.com': 'Cyprus Times',
  'philenews.com': 'Philenews',
};

/** Display label for a news source enum value (legacy fallback). */
const ENUM_LABELS: Record<ContentSource, string> = {
  manual: 'Архив',
  rss_spzh: 'СПЖ',
  rss_philenews: 'Philenews',
  rss_orthochristian: 'OrthoChristian',
  rss_orthodox_times: 'Orthodox Times',
  rss_orthodoxia_post: 'Orthodoxia Post',
  rss_ocp_society: 'OCP Society',
  rss_gorthodox: 'gorthodox.com',
  rss_cyprus_times: 'Cyprus Times',
};

/**
 * Resolve a human-readable label for a news item.
 * Prefer the URL host (most accurate when source enum is 'manual');
 * fall back to the enum's own label.
 */
export function newsSourceLabel(
  source: ContentSource | null | undefined,
  sourceUrl: string | null | undefined,
): string {
  if (sourceUrl) {
    try {
      const host = new URL(sourceUrl).host.replace(/^www\./, '').toLowerCase();
      if (HOST_LABELS[host]) return HOST_LABELS[host];
    } catch {
      // ignore malformed URLs, fall through to enum label
    }
  }
  if (source && ENUM_LABELS[source]) return ENUM_LABELS[source];
  return '';
}
