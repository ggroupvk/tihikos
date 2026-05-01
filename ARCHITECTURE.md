# tihikos.com — Architecture

## Overview

Trilingual (EL/RU/EN) informational website in support of Metropolitan Tychikos of Paphos.
SSR-first, content-driven, admin-managed.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 (App Router) | SSR/SSG, routing, API routes |
| Language | TypeScript (strict) | Type safety |
| Database | Supabase (PostgreSQL) | Data, auth, file storage |
| i18n | next-intl | Translations, locale routing |
| Styling | Tailwind CSS v4 | Design tokens, responsive |
| Testing | Vitest + Playwright | Unit + E2E |
| Hosting | Vercel | Deploy, preview, edge |
| CI/CD | GitHub Actions | Lint, typecheck, test, block deploy |

## URL Structure

```
tihikos.com/el/...  — Greek (default)
tihikos.com/ru/...  — Russian
tihikos.com/en/...  — English
```

Auto-redirect by browser `Accept-Language` header on first visit.

## Route Map

```
src/app/
├── [locale]/
│   ├── (public)/
│   │   ├── page/           → Home (/)
│   │   ├── about/          → About Metropolitan (/about)
│   │   ├── case/           → The Case (/case)
│   │   ├── position/       → Position & Accusations (/position)
│   │   ├── support/        → Support (/support)
│   │   ├── videos/         → Video Archive (/videos)
│   │   ├── documents/      → Documents & Articles (/documents)
│   │   ├── news/           → News (/news)
│   │   │   └── [slug]/     → Single news article
│   │   └── contacts/       → Contacts & How to Help (/contacts)
│   ├── (admin)/
│   │   ├── dashboard/      → Admin overview
│   │   ├── content/        → Content management (news, articles, documents)
│   │   └── media/          → Video & image management
│   └── layout.tsx          → Root layout with locale provider
├── api/
│   ├── contact/            → Contact form submission
│   ├── support-letter/     → Support letter submission
│   ├── rss/                → RSS feed parser (cron-triggered)
│   └── revalidate/         → On-demand ISR revalidation
└── layout.tsx              → HTML root
```

## Data Model (High Level)

### Core Entities

- **timeline_events** — Case timeline (2016–2026), 9 events at launch
- **news** — News articles (RSS-parsed as drafts + manual), 41 at launch
- **videos** — YouTube video references with metadata, 35+ at launch
- **documents** — PDF documents with download links, 6 at launch
- **support_letters** — User-submitted support letters (moderated)
- **persons** — Key people (metropolitan, clergy, lawyers, canonists)
- **categories** — Content categories (ecumenism, ukraine, canonical law)
- **translations** — Content translations (el/ru/en per entity)

### Admin

- **profiles** — User profiles linked to Supabase Auth
- **roles** — admin | editor (RLS-enforced)

## Content Strategy

All content is stored in Supabase with per-language fields.
YouTube videos are never hosted — only iframe embeds with `loading="lazy"`.
Images served as WebP via Next.js Image optimization.
PDFs stored in Supabase Storage with public download URLs.

## RSS Parsing

Sources:
- `spzh.eu` — tag "Тихик"
- `philenews.com` — search "Τυχικος"

Parsed via API route triggered by Vercel Cron (every 30 min).
All parsed articles land as **drafts** — require manual approval by editor.

## Security

- All forms protected by reCAPTCHA v3
- GDPR checkbox on all user-facing forms
- Supabase RLS on all tables
- Admin routes protected by middleware (auth + role check)
- OWASP top 10 considered in implementation

## Performance Targets

- PageSpeed: 80+ mobile, 90+ desktop
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

## Design Principles

- Mobile-first responsive (320px → 768px → 1280px)
- Church-style: strict, reverent, no commercial elements
- Minimal animation
- Serif headings (Cinzel), sans-serif body (16px min)
