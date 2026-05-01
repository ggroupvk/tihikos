-- Migration 00002: chronicle event enrichment
--
-- Adds two fields to timeline_events so each chronicle entry on the
-- homepage can reveal a richer accordion-expanded view:
--
-- 1. body_*  — long-form text per locale (the description shown when
--    a chronicle entry is clicked open). Distinct from description_*
--    which stays as the short one-liner under the entry's title.
--
-- 2. related_doc_slugs  — array of document slugs (matching
--    documents.slug) that should appear as clickable links inside
--    the expanded accordion body. Soft FK by slug — easier to seed
--    and avoids cascade complexity with the existing documents table.

alter table timeline_events
  add column if not exists body_el        text,
  add column if not exists body_ru        text,
  add column if not exists body_en        text,
  add column if not exists related_doc_slugs text[] not null default '{}'::text[];

-- Index for cheap "events that link to a given document" lookups.
create index if not exists timeline_events_related_doc_slugs_gin
  on timeline_events using gin (related_doc_slugs);

comment on column timeline_events.body_el is
  'Long-form Greek body shown in the homepage accordion when the entry is expanded.';
comment on column timeline_events.body_ru is
  'Long-form Russian body shown in the homepage accordion when the entry is expanded.';
comment on column timeline_events.body_en is
  'Long-form English body shown in the homepage accordion when the entry is expanded.';
comment on column timeline_events.related_doc_slugs is
  'Soft references (by slug) to rows in documents that are linked from this event.';
