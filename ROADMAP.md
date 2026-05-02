# tihikos.com — roadmap

Living document. Order = priority. Update statuses after every push.

| # | Task | Status | Effort | Notes |
|---|---|---|---|---|
| 1 | Merge `feat/v1-home-restructure` → `main` | ⏳ pending client review | 10 min | Wait for client visual sign-off on Vercel preview of the feature branch first. |
| 2 | Curate ~20 news items from 4 sources (cyprustimes.com, orthodoxtimes.com, spzh.eu, gorthodox.com) and add to `data.ts` with EL/RU/EN | 🔵 in progress | 3–4 h | Real headlines + excerpts + source URLs. Translations done by Claude. |
| 3 | Resend backend for petition + newsletter forms (currently mock UI) | ⏳ pending | 2 h | Need Resend API key from project owner. |
| 4 | Real PDFs for the 6 documents in `documents` table (currently placeholders) | ⏳ pending | depends | Need files from client (synodal decision, appeal letters, etc.). |
| 5 | Real photoshoot for the Metropolitan portrait | ⏳ pending | — | Client said photos are coming. |
| 6 | SEO foundations: `sitemap.xml`, `robots.txt`, OpenGraph metadata, Schema.org structured data | ⏳ pending | 2 h | Required before public launch. |
| 7 | GDPR cookie banner + privacy policy page | ⏳ pending | 1 h | Required before public launch. |
| 8 | Vercel Pro upgrade ($20/mo) + custom domain `tihikos.com` (~$15/yr) | ⏳ pending | 30 min | Pro unlocks: disabled preview auth (so anyone can view client previews), custom domain assignment, more cron flexibility. |
| 9 | Apply migration `00002_timeline_extras.sql` in Supabase Dashboard SQL Editor and migrate `timeline-enrichment.ts` data into the DB columns | ⏳ pending | 15 min | Lets event bodies + linked-doc-slugs be edited in DB instead of code. |
| 10 | Automatic RSS-driven news pipeline with Claude translation (model: bohobortsi project) | ⏳ pending | 1 day | After launch. Cron fetches Cyprus Times / SPZH / Orthodox Times feeds, runs articles through Claude for trilingual translation, writes to `news` table. |
| 11 | Admin CMS (edit news / videos / supporters / documents without code) | ⏳ pending | 2 days | Phase 2, when client needs editorial autonomy. |
| 12 | Delete `v2-design` branch (Patek/Rolex experiment, abandoned) | ⏳ pending | 1 min | After main has the v1 restructure merged. |
| 13 | Lighthouse + a11y audit (target ≥ 95 on all four metrics) | ⏳ pending | 2 h | Before public launch. |

## Open concerns / risks

1. **Editorial texts in `case-analysis.tsx` and `timeline-enrichment.ts` are AI-drafted placeholders.** Before the site goes public, a priest or canon-law theologian must read these for canonical errors. Don't ship to production without church-side review.
2. **Photo galleries on `/about` and `/media` are icon placeholders.** Need real photos before public launch.
3. **No legal page (privacy / terms / contacts).** Required before the site is shared with a wide audience or accepts form submissions (which it already does for petition + newsletter — currently mock).
4. **Russian-only canonical name fix applied** (`Тихикос` → `Тихик`) — the apostle's name in RPOC. Greek `Τυχικός` and English `Tychikos` are unchanged (correct in modern Orthodox press).
5. **The `feat/v1-home-restructure` branch is the chosen direction.** The earlier `v2-design` branch (Patek/Rolex newspaper experiment) was rejected by the client and is to be deleted, not merged.

## Recently completed

- ✅ Cross direction in header/footer (Russian Orthodox 8-pointed cross now slants `\` correctly)
- ✅ Two-column News + Chronology homepage block with click-to-expand chronicle accordion
- ✅ YouTube horizontal video row with inline player modal
- ✅ Five inner page skeletons (`/case`, `/about`, `/support`, `/media`, `/news`) with full structure + placeholder content in v1 design language
- ✅ Two factual canonical fixes: Constantinople Synod date `2025-10-20` → `2025-10-17`; saint-name spelling `Святая Фёкла` → `Святая Фекла`
- ✅ Russian Тихикос → Тихик across the site
- ✅ News block: «сводки» → «новости»; Video block RU title → «Слово митрополита»
