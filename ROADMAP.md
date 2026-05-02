# tihikos.com — roadmap

Living document. Order = priority. Update statuses after every push.

**Working branch:** `main` (single trunk now). All future work goes
into `main` directly per the post-merge decision; if a change is
risky enough to want isolation, branch off and merge back.

| # | Task | Status | Effort | Notes |
|---|---|---|---|---|
| 1 | **SEO foundations**: `sitemap.xml`, `robots.txt`, OpenGraph metadata per page, Schema.org structured data (Article, NewsArticle, BreadcrumbList) | ⏳ pending | 2 h | Required before public launch. |
| 2 | **GDPR cookie banner + privacy policy page** (`/privacy`) | ⏳ pending | 1.5 h | Required before public launch. Mention petition / newsletter form data handling. |
| 3 | **Lighthouse + a11y audit** (target ≥ 95 on all four metrics) | ⏳ pending | 2 h | Before public launch. Image alt text, focus-visible, contrast, ARIA labels. |
| 4 | **Resend backend** for petition + newsletter forms (currently mock UI showing thank-you) | ⏳ pending | 2 h | Need Resend API key. Add `petition_signatures` + `newsletter_subscribers` tables. |
| 5 | **Real PDFs** for the 6 documents in `documents` table (currently placeholder paths) | ⏳ pending | depends on client | Synodal decision, Tychikos response, appeal explanation, Patriarchate decision, etc. |
| 6 | **Real photoshoot for the Metropolitan portrait** | ⏳ pending | — | Client said photos are coming. Will replace `portrait-1.jpg` right-half crop. |
| 7 | **Real photo galleries** for `/about` and `/media` (currently icon placeholders) | ⏳ pending | — | From client. |
| 8 | **Vercel Pro** ($20/mo) + custom domain `tihikos.com` (~$15/yr) | ⏳ pending | 30 min | Pro unlocks: disable preview auth, custom domains, more cron flexibility. Domain via Cloudflare Registrar. |
| 9 | **Re-seed Supabase** — push the 20 curated news entries (with bodies + image_urls) into the `news` table; currently DB has only 3 old entries with body/image_url overlay coming from `data.ts` | ⏳ pending | 30 sec | `npm run db:seed`. Destroys other tables too (timeline / videos / persons / documents) and re-inserts from `data.ts` — fine because no manual DB edits exist. |
| 10 | **Apply migration `00002_timeline_extras.sql`** in Supabase Dashboard → SQL Editor, then migrate `timeline-enrichment.ts` data into DB columns | ⏳ pending | 15 min | Lets event bodies + linked-doc-slugs be edited in DB. |
| 11 | **Apply migration `00003_news_sources.sql`** (extends `content_source` enum with new outlets) | ⏳ pending | 5 min | Currently we work around it by storing `'manual'` and resolving display label via URL host. |
| 12 | **Expand body content for the remaining 16 news entries** (currently short demo bodies; the 4 priority ones have full source-pulled trilingual content) | ⏳ pending | 4–6 h | Or wait for client to pick which ones matter most. |
| 13 | **Automatic RSS-driven news pipeline** with Claude translation (model: bohobortsi project) | ⏳ pending | 1 day | Phase 2 — after launch. Cron fetches feeds → Claude translates → writes to `news` table. |
| 14 | **Admin CMS** (edit news / videos / supporters / documents without code) | ⏳ pending | 2 days | Phase 2, when client needs editorial autonomy. |

## Open concerns / risks

1. **Editorial texts in `case-analysis.tsx` and `timeline-enrichment.ts` are AI-drafted placeholders.** Before the site goes public, a priest or canon-law theologian must read these for canonical errors. Don't ship to production without church-side review.
2. **Photo galleries on `/about` and `/media` are icon placeholders.** Need real photos before public launch.
3. **No legal page (privacy / terms / contacts).** Required before the site is shared widely or accepts real form submissions.
4. **Form submissions are mocked.** Petition and newsletter forms show a thank-you state but no email is sent and nothing is stored — must be wired to Resend + Supabase before going public.
5. **Russian-only canonical name fix applied** (`Тихикос` → `Тихик`) — apostle's name in RPOC. Greek `Τυχικός` and English `Tychikos` are unchanged (correct in modern Orthodox press).

## Recently completed

- ✅ **Merged `feat/v1-home-restructure` → `main`** (11 commits) and deleted both that branch and the abandoned `v2-design` Patek/Rolex experiment branch
- ✅ NYT/New Yorker-style editorial layout for `/news/[slug]`: drop cap, lead paragraph, h2 subheadings with hairline rule, pull-quote treatment for citations, ornament breaks between sections, sticky right-sidebar (source / date / reading time / share), floating left share rail (xl+)
- ✅ Full source-pulled body content + hero images for 4 priority news articles (`cypriot-synod-removes-tychikos`, `priest-suspended-for-defending-tychikos`, `tychikos-statement-after-appeal`, `trial-when-church-washes-hands`) — all trilingual EL/RU/EN
- ✅ Independent on-site news architecture — clicking a news item opens `/news/[slug]` on tihikos.com (not redirect to source); source URL surfaces only as attribution at the bottom of the article
- ✅ 20 curated news entries with trilingual title + excerpt + 1–2 paragraph body + accurate publication dates
- ✅ Source label resolution by URL host (СПЖ, OrthoChristian, gorthodox.com, Orthodox Times, Orthodoxia Post, OCP Society) without enum migration
- ✅ Lighter, premium news-stock cream paper (`#F7F3E8` from `#EDE7D7`)
- ✅ Two-column News + Chronology homepage block with click-to-expand chronicle accordion (linked-documents revealed inline)
- ✅ YouTube horizontal video row with inline player modal
- ✅ Five inner page skeletons (`/case`, `/about`, `/support`, `/media`, `/news`) with full structure + placeholder content in v1 design
- ✅ Cross direction in header/footer corrected (Russian Orthodox 8-pointed cross now slants `\`)
- ✅ Two factual canonical fixes: Constantinople Synod date `2025-10-20` → `2025-10-17`; saint-name spelling `Святая Фёкла` → `Святая Фекла`
- ✅ Russian Тихикос → Тихик across the site (canonical RPOC name); Greek and English unchanged
- ✅ News block: «сводки» → «новости»; Video block RU title → «Слово митрополита»
- ✅ ROADMAP.md as single source of truth for priorities
