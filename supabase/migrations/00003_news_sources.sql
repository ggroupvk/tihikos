-- Migration 00003: extend content_source enum with the canonical news outlets
-- we curate from. Each value is the RSS / website-section identifier;
-- human-readable labels live in src/lib/news-sources.ts.
--
-- Postgres requires ALTER TYPE ADD VALUE per value; cannot be combined.
-- Apply via Supabase Dashboard → SQL Editor → Run.

alter type content_source add value if not exists 'rss_orthochristian';
alter type content_source add value if not exists 'rss_orthodox_times';
alter type content_source add value if not exists 'rss_orthodoxia_post';
alter type content_source add value if not exists 'rss_ocp_society';
alter type content_source add value if not exists 'rss_gorthodox';
alter type content_source add value if not exists 'rss_cyprus_times';
