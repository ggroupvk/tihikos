-- Migration 00004: form-submission storage for the petition and the
-- newsletter signup. Both tables hold the data the user gave us via the
-- public forms; RLS allows public anon to INSERT but not SELECT, so the
-- forms can write but the data is only visible from the admin/service-
-- role context.
--
-- Apply via Supabase Dashboard → SQL Editor.

-- =========================================================
-- petition_signatures
-- =========================================================
create table if not exists petition_signatures (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  position_title text,                -- e.g. priest / theologian / lay
  country text,
  email text not null,
  message text,                       -- optional short statement

  -- spam mitigation: a honeypot field that real users never fill in
  hp_filled boolean default false,

  -- contextual capture for moderation
  locale text,
  user_agent text,
  ip_hash text,                       -- sha256 of IP + per-day salt; never raw IP

  created_at timestamptz not null default now(),
  -- moderation status: signatures default to 'pending' so they don't
  -- appear on the public list until reviewed.
  status text not null default 'pending',
  constraint petition_status_chk check (status in ('pending', 'approved', 'rejected'))
);

create index if not exists idx_petition_status on petition_signatures(status, created_at desc);
create index if not exists idx_petition_email on petition_signatures(lower(email));

alter table petition_signatures enable row level security;

-- Anon can INSERT (form submission), nothing else. SELECT/UPDATE/DELETE
-- require service-role (admin or server-side API).
drop policy if exists "petition_anon_insert" on petition_signatures;
create policy "petition_anon_insert"
  on petition_signatures for insert
  to anon, authenticated
  with check (true);

-- =========================================================
-- newsletter_subscribers
-- =========================================================
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text,
  user_agent text,
  ip_hash text,
  hp_filled boolean default false,
  confirmed_at timestamptz,           -- null until double-opt-in confirms
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_newsletter_email on newsletter_subscribers(lower(email));
create index if not exists idx_newsletter_active on newsletter_subscribers(confirmed_at)
  where unsubscribed_at is null;

alter table newsletter_subscribers enable row level security;

drop policy if exists "newsletter_anon_insert" on newsletter_subscribers;
create policy "newsletter_anon_insert"
  on newsletter_subscribers for insert
  to anon, authenticated
  with check (true);
