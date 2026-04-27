-- tihikos.com — Initial Database Schema
-- All content tables support trilingual content (el/ru/en)

-- === ENUMS ===

create type content_status as enum ('draft', 'published', 'archived');
create type user_role as enum ('admin', 'editor');
create type content_source as enum ('manual', 'rss_spzh', 'rss_philenews');
create type video_category as enum ('case', 'support', 'sermons', 'other');
create type position_topic as enum ('ecumenism', 'ukraine', 'canonical_law');

-- === PROFILES (linked to Supabase Auth) ===

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'editor',
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- === TIMELINE EVENTS ===
-- Key events from 2016–2026 (Cretan Council, Tomos, suspension, appeals, court)

create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  sort_order int not null default 0,

  -- Trilingual fields
  title_el text not null,
  title_ru text,
  title_en text,
  description_el text,
  description_ru text,
  description_en text,

  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- === NEWS ===

create table news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  source content_source not null default 'manual',
  source_url text,                    -- Original URL for RSS-parsed articles
  published_at timestamptz,
  image_url text,

  -- Trilingual fields
  title_el text not null,
  title_ru text,
  title_en text,
  excerpt_el text,
  excerpt_ru text,
  excerpt_en text,
  body_el text,
  body_ru text,
  body_en text,

  status content_status not null default 'draft',
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_news_status_published on news(status, published_at desc);
create index idx_news_slug on news(slug);

-- === VIDEOS ===
-- YouTube references only — no direct video hosting

create table videos (
  id uuid primary key default gen_random_uuid(),
  youtube_id text not null,           -- YouTube video ID (e.g., "dQw4w9WgXcQ")
  category video_category not null default 'other',
  sort_order int not null default 0,
  published_at timestamptz,

  -- Trilingual fields
  title_el text not null,
  title_ru text,
  title_en text,
  description_el text,
  description_ru text,
  description_en text,

  -- Subtitles (manual upload to YouTube)
  has_subtitles_ru boolean not null default false,
  has_subtitles_en boolean not null default false,

  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_videos_category on videos(category, sort_order);

-- === DOCUMENTS ===
-- PDF documents with Supabase Storage

create table documents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  file_path text not null,            -- Supabase Storage path
  file_size_bytes bigint,
  source_url text,                    -- Link to churchofcyprus.org.cy or original
  sort_order int not null default 0,

  -- Trilingual fields
  title_el text not null,
  title_ru text,
  title_en text,
  description_el text,
  description_ru text,
  description_en text,

  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- === ARTICLES (Position & Analysis) ===

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  topic position_topic not null,
  source_url text,                    -- e.g., SPZh article link
  published_at timestamptz,
  image_url text,

  -- Trilingual fields
  title_el text not null,
  title_ru text,
  title_en text,
  body_el text,
  body_ru text,
  body_en text,

  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_articles_topic on articles(topic, published_at desc);

-- === SUPPORT LETTERS ===
-- User-submitted, moderated, never auto-published

create table support_letters (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_title text,                  -- Position/rank (e.g., clergy title)
  author_country text not null,
  author_email text not null,
  message text not null,
  gdpr_consent boolean not null default false,

  is_approved boolean not null default false,
  approved_by uuid references profiles(id),
  approved_at timestamptz,

  created_at timestamptz not null default now()
);

-- === PERSONS ===
-- Key people: metropolitan, clergy, lawyers, canonists

create table persons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  photo_url text,
  sort_order int not null default 0,

  -- Trilingual fields
  name_el text not null,
  name_ru text,
  name_en text,
  title_el text,                      -- e.g., "Μητροπολίτης Πάφου"
  title_ru text,
  title_en text,
  bio_el text,
  bio_ru text,
  bio_en text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- === CONTACT MESSAGES ===

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  gdpr_consent boolean not null default false,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- === RLS POLICIES ===

alter table profiles enable row level security;
alter table timeline_events enable row level security;
alter table news enable row level security;
alter table videos enable row level security;
alter table documents enable row level security;
alter table articles enable row level security;
alter table support_letters enable row level security;
alter table persons enable row level security;
alter table contact_messages enable row level security;

-- Public read access for published content
create policy "Public can read published timeline events"
  on timeline_events for select using (status = 'published');

create policy "Public can read published news"
  on news for select using (status = 'published');

create policy "Public can read published videos"
  on videos for select using (status = 'published');

create policy "Public can read published documents"
  on documents for select using (status = 'published');

create policy "Public can read published articles"
  on articles for select using (status = 'published');

create policy "Public can read persons"
  on persons for select using (true);

-- Public can submit support letters and contact messages
create policy "Public can insert support letters"
  on support_letters for insert with check (gdpr_consent = true);

create policy "Public can insert contact messages"
  on contact_messages for insert with check (gdpr_consent = true);

-- Admin/editor full access
create policy "Admins have full access to all tables"
  on timeline_events for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Editors can manage content"
  on news for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor'))
  );

create policy "Editors can manage videos"
  on videos for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor'))
  );

create policy "Editors can manage documents"
  on documents for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor'))
  );

create policy "Editors can manage articles"
  on articles for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor'))
  );

create policy "Editors can manage support letters"
  on support_letters for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'editor'))
  );

create policy "Admins can manage contact messages"
  on contact_messages for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can manage profiles"
  on profiles for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Users can read their own profile
create policy "Users can read own profile"
  on profiles for select using (id = auth.uid());

-- === UPDATED_AT TRIGGER ===

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on profiles
  for each row execute function update_updated_at();
create trigger set_updated_at before update on timeline_events
  for each row execute function update_updated_at();
create trigger set_updated_at before update on news
  for each row execute function update_updated_at();
create trigger set_updated_at before update on videos
  for each row execute function update_updated_at();
create trigger set_updated_at before update on documents
  for each row execute function update_updated_at();
create trigger set_updated_at before update on articles
  for each row execute function update_updated_at();
create trigger set_updated_at before update on persons
  for each row execute function update_updated_at();
