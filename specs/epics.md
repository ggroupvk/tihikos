# Epics — tihikos.com

Каждый эпик = автономная единица работы.
Порядок = приоритет. Каждый эпик проходит полный цикл:
Spec → Wireframe (Figma) → Tests → Code → Review → Preview Deploy → Утверждение заказчиком.

---

## ФАЗА 0: DISCOVERY & DATA

### EPIC-0.1: Wireframes & Утверждение структуры
**Цель:** Заказчик видит и утверждает каркас сайта ДО написания кода.

| Wireframe | Что показать | Приоритет |
|-----------|-------------|-----------|
| WF-01 Home | Hero + timeline + news grid + video grid + support carousel + CTA | P0 |
| WF-02 About | Bio layout + photo gallery grid + video playlist | P0 |
| WF-03 Case | Vertical timeline + document cards | P0 |
| WF-04 Support | Video grid + testimonial cards + support letter form | P0 |
| WF-05 Position | Tab navigation + article cards + video embeds | P1 |
| WF-06 Videos | Filter bar + 3/2/1 grid + video card anatomy | P1 |
| WF-07 Documents | Document card list + article list | P1 |
| WF-08 News | News feed + pagination + single article page | P1 |
| WF-09 Contacts | Contact form + social links + "how to help" blocks | P2 |
| WF-10 Admin | Dashboard stats + content table + media uploader | P2 |
| WF-11 Navigation | Header (logo, menu, lang switcher) + footer + mobile hamburger | P0 |
| WF-12 Responsive | Mobile (320px) + tablet (768px) breakpoints for Home + About | P0 |

**Figma-структура:**
```
tihikos.com/
├── 🎨 Design System
│   ├── Colors (#0d1f3c, #c9a84c, #f9f7f2, #f5e9c8)
│   ├── Typography (Cinzel headings, Inter body)
│   ├── Spacing (8px grid)
│   ├── Components (Button, Card, Form Input, Video Embed, Timeline Node)
│   └── Breakpoints (320 / 768 / 1280)
├── 📱 Mobile Wireframes (320px)
│   ├── WF-01–09 (все страницы)
│   └── WF-11 (навигация — hamburger)
├── 📟 Tablet Wireframes (768px)
│   └── WF-01–09
└── 🖥️ Desktop Wireframes (1280px)
    └── WF-01–09
```

**Deliverable:** Figma-ссылка для заказчика с комментариями.
**Acceptance:** Заказчик утверждает в Figma (✅ на каждом фрейме).

---

### EPIC-0.2: Сбор контента от заказчика
**Цель:** ВСЕ данные собраны, проверены и готовы к загрузке ДО начала фронтенда.

Детальный чеклист → `specs/content-checklist.md`

**Deliverable:** Google Drive / папка со всеми материалами.
**Acceptance:** Чеклист на 100%.

---

### EPIC-0.3: Design System в Figma
**Цель:** Все UI-компоненты спроектированы на реальных данных.

| Компонент | Варианты | Статус |
|-----------|---------|--------|
| Button | primary / secondary / ghost / sizes (sm, md, lg) | — |
| Card (News) | with image / without / skeleton | — |
| Card (Video) | thumbnail + title + category badge + subtitle icons | — |
| Card (Document) | PDF icon + title + description + size + download btn | — |
| Card (Person) | photo + name + title + quote | — |
| Timeline Node | date + title + description (horizontal + vertical) | — |
| Form Input | text / textarea / email / checkbox / select | — |
| Form Error | inline error message | — |
| Video Embed | YouTube iframe wrapper + play overlay | — |
| Language Switcher | ΕΛ / РУ / EN toggle | — |
| Navigation | desktop menu + mobile hamburger + sticky header | — |
| Footer | links + social icons + copyright | — |
| Page Hero | full-width image + overlay text + CTA buttons | — |
| Section Header | title + optional subtitle + optional "view all" link | — |
| Pagination | prev / next / page numbers | — |
| Tab Bar | active / inactive tabs (for position page) | — |
| Carousel | auto-scroll + manual arrows + dots | — |
| Lightbox | photo gallery overlay | — |
| Toast | success / error notification | — |
| Skeleton | loading placeholder for each card type | — |

**Acceptance:** Компоненты утверждены заказчиком на реальных данных (не lorem ipsum).

---

## ФАЗА 1: DATA FIRST

### EPIC-1.1: База данных и API
**Цель:** Схема развёрнута, данные залиты, API работает и протестирован.

| Задача | Описание |
|--------|----------|
| DB Deploy | Применить миграцию `00001_initial_schema.sql` на Supabase |
| Seed Data | Загрузить 9 timeline events, 6 documents, 35+ videos, 41 news, persons |
| RLS Test | Проверить: anon видит published, admin видит всё, editor может редактировать |
| API Helpers | `src/lib/queries/` — типизированные запросы для каждой таблицы |
| Storage | Buckets: `photos`, `documents` — загрузить фото и PDF |
| Validation | Zod-схемы для всех форм (`src/lib/validations/`) |

**Tests:**
- Unit: queries возвращают правильные данные
- Unit: Zod-валидация принимает/отклоняет корректно
- Integration: RLS policies работают как ожидается

---

### EPIC-1.2: Админка (MVP)
**Цель:** Редактор может управлять контентом через веб-интерфейс.

| Функция | Детали |
|---------|--------|
| Auth | Login через Supabase Auth (email/password) |
| Dashboard | Счётчики контента + последние черновики |
| CRUD News | Создать / редактировать / опубликовать / архивировать |
| CRUD Videos | Добавить YouTube ID → автопарс thumbnail + title |
| CRUD Documents | Загрузить PDF + метаданные |
| CRUD Timeline | Управление событиями |
| Модерация | RSS-черновики: approve → published / reject → archived |
| Письма | Просмотр support_letters, отметка is_approved |

**Tests:**
- E2E: Login → create news → publish → verify on public page

---

## ФАЗА 2: DESIGN SYSTEM → КОД

### EPIC-2.1: Layout & Navigation
**Цель:** Шапка, подвал, навигация, переключатель языков — работают на всех breakpoints.

| Компонент | Детали |
|-----------|--------|
| Header | Logo + nav menu + lang switcher (ΕΛ/РУ/EN) + sticky on scroll |
| Mobile Nav | Hamburger → slide-out menu |
| Footer | Навигация + соцсети + копирайт |
| Root Layout | Fonts (Cinzel + Inter), meta tags, locale provider |

**Tests:**
- E2E: навигация между страницами
- E2E: переключение языков меняет URL и контент
- E2E: мобильное меню открывается/закрывается
- Lighthouse: layout shift < 0.1

---

## ФАЗА 3: PAGES (по одной)

Порядок = приоритет из ТЗ: Главная → О митрополите → Дело → Поддержка → остальные.

### EPIC-3.1: Home Page
**Scope:** Hero + Timeline + Latest News + Latest Videos + Support Carousel + CTA
**Data:** 4 запроса к Supabase (timeline, news, videos, support videos)
**SEO:** Meta tags + OG image + structured data (Organization)
**Tests:**
- E2E: все 6 секций рендерятся
- E2E: YouTube iframes имеют loading="lazy"
- E2E: CTA-кнопки ведут на правильные страницы
- E2E: страница работает на el/ru/en
- Lighthouse: 80+ mobile, 90+ desktop

### EPIC-3.2: About Page
**Scope:** Biography + Photo Gallery (lightbox) + Sermon Videos
**Data:** persons(tychikos) + videos(sermons) + storage photos
**Tests:**
- E2E: биография отображается по периодам
- E2E: фотогалерея открывает lightbox
- E2E: видео-плейлист рендерится

### EPIC-3.3: Case Page
**Scope:** Interactive Timeline (vertical) + Document Cards
**Data:** timeline_events + documents
**Tests:**
- E2E: 9 событий в хронологическом порядке
- E2E: документы скачиваются
- E2E: timeline анимация при скролле

### EPIC-3.4: Support Page
**Scope:** Clergy Videos + Testimonials + Support Letter Form
**Data:** videos(support) + persons + insert support_letters
**Tests:**
- E2E: форма валидация (Zod)
- E2E: GDPR checkbox обязателен
- E2E: reCAPTCHA v3 вызывается при submit
- E2E: success message после отправки
- E2E: данные появляются в admin

### EPIC-3.5: Position Page
**Scope:** 3 tabs (ecumenism / ukraine / canonical_law) + Articles + Videos
**Data:** articles(grouped by topic) + videos(case)
**Tests:**
- E2E: переключение вкладок фильтрует контент
- E2E: статьи имеют ссылки на источники

### EPIC-3.6: Videos Page
**Scope:** Filter bar + responsive grid (3/2/1) + video cards
**Data:** videos(all published, filterable)
**Tests:**
- E2E: фильтры по категории и языку работают
- E2E: grid responsive (3 cols desktop, 2 tablet, 1 mobile)
- E2E: subtitle icons отображаются корректно

### EPIC-3.7: Documents Page
**Scope:** PDF catalog + articles list
**Data:** documents + articles
**Tests:**
- E2E: PDF скачивается по клику
- E2E: размер файла отображается

### EPIC-3.8: News Page
**Scope:** News feed + pagination + single article (/news/[slug])
**Data:** news(paginated) + news(by slug)
**Tests:**
- E2E: пагинация работает (10 per page)
- E2E: slug-страница рендерит полный текст
- E2E: RSS-источник отображается если есть

### EPIC-3.9: Contacts Page
**Scope:** Contact form + social links + "how to help" blocks
**Data:** insert contact_messages
**Tests:**
- E2E: форма с валидацией + reCAPTCHA
- E2E: соцсети ведут на правильные URL

---

## ФАЗА 4: QA & HARDENING

### EPIC-4.1: RSS Parser
**Scope:** Cron-job парсер spzh.eu + philenews.com
**Tests:**
- Unit: парсер извлекает правильные данные из RSS XML
- Integration: записи создаются как drafts в Supabase

### EPIC-4.2: Performance
| Метрика | Цель |
|---------|------|
| Lighthouse Mobile | > 80 all pages |
| Lighthouse Desktop | > 90 all pages |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| Bundle size | < 200kb first load JS |

### EPIC-4.3: Security Audit
- [ ] Forms: reCAPTCHA v3 on all
- [ ] GDPR: consent checkbox + privacy policy link
- [ ] RLS: no data leak (test with anon key)
- [ ] XSS: sanitize all user inputs
- [ ] CSRF: Supabase handles via JWT
- [ ] Headers: CSP, X-Frame-Options, HSTS
- [ ] Rate limiting on API routes

### EPIC-4.4: Cross-browser & Device Testing
- [ ] Chrome (latest)
- [ ] Safari (latest + iOS)
- [ ] Firefox (latest)
- [ ] Samsung Internet
- [ ] Real devices: iPhone SE, iPhone 14, iPad, Android mid-range

### EPIC-4.5: SEO Final Check
- [ ] Meta tags all pages / all languages
- [ ] hreflang attributes
- [ ] XML sitemap (per language)
- [ ] robots.txt
- [ ] Structured data (Organization, Article, BreadcrumbList)
- [ ] OG images for social sharing

---

## ФАЗА 5: LAUNCH

### EPIC-5.1: Production Setup
- [ ] Domain tihikos.com → Vercel
- [ ] DNS + SSL
- [ ] Cloudflare (free plan) — CDN + DDoS protection
- [ ] Environment variables on Vercel
- [ ] Supabase production project

### EPIC-5.2: Monitoring & Backup
- [ ] Sentry — error tracking
- [ ] Vercel Analytics — performance
- [ ] Supabase daily backups
- [ ] Backup verification (restore test)

### EPIC-5.3: Handoff
- [ ] Admin credentials for client
- [ ] Video tutorial for admin panel (screen recording)
- [ ] Documentation PDF
- [ ] Supabase project access
- [ ] Vercel project access
- [ ] Domain registrar access
- [ ] Cloudflare access
- [ ] Plugin/dependency license list (N/A for custom build — document npm packages)
