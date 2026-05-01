# Page Specifications — tihikos.com

Spec-first: каждая страница описана ДО написания кода.
Тесты пишутся по этим спекам. Код пишется чтобы тесты прошли.

---

## 1. Home (`/`)

### Что видит пользователь:
1. **Hero-блок** — фото митрополита Тихика в облачении, актуальная цитата, 2 кнопки: «Узнать дело» → /case, «Смотреть видео» → /videos
2. **Таймлайн дела** — горизонтальная лента 5–7 ключевых дат (2016–2026), кликабельные → /case
3. **Последние новости** — 3 карточки последних опубликованных новостей, кнопка «Все новости» → /news
4. **Последние видео** — 3–4 YouTube-embed (lazy), кнопка «Все видео» → /videos
5. **Карусель поддержки** — видеообращения клириков, автопрокрутка, YouTube-embed
6. **CTA-блок** — «Поделитесь / Подпишитесь», ссылки на соцсети

### Данные:
- `timeline_events` (published, order by sort_order, limit 7)
- `news` (published, order by published_at desc, limit 3)
- `videos` (published, order by published_at desc, limit 4)
- `videos` (published, category = 'support', order by sort_order)

### SEO:
- Title: "{siteTitle} — {locale-specific tagline}"
- Description: site description from translations
- OG image: hero photo

---

## 2. About Metropolitan (`/about`)

### Что видит пользователь:
1. **Биография** — текст, разбитый по периодам жизни и служения
2. **Фотогалерея** — сетка фотографий, lightbox при клике
3. **Видеопроповеди** — плейлист YouTube-embed с канала @IeraMitropoliPaphou

### Данные:
- `persons` (slug = 'tychikos') — биография
- `videos` (category = 'sermons', published)
- Фото из Supabase Storage

---

## 3. The Case (`/case`)

### Что видит пользователь:
1. **Интерактивный таймлайн** — вертикальный, 9 событий (2016 Критский собор → 2026 текущее состояние). Каждое событие: дата, заголовок, описание
2. **Официальные документы** — карточки с иконкой PDF, заголовок, описание, кнопка скачивания. Ссылки на churchofcyprus.org.cy

### Данные:
- `timeline_events` (published, order by event_date)
- `documents` (published, order by sort_order)

---

## 4. Position & Accusations (`/position`)

### Что видит пользователь:
1. **Три вкладки/секции**: Экуменизм | Украинский вопрос | Каноническое право
2. **Статьи** — карточки с заголовком, превью, ссылкой на источник
3. **Видеокомментарии** — YouTube-embed канонистов и адвокатов (Вавускос и др.)

### Данные:
- `articles` (published, grouped by topic)
- `videos` (published, category = 'case', filtered by topic tag)

---

## 5. Support (`/support`)

### Что видит пользователь:
1. **Видеообращения клириков** — YouTube-embed сетка (о. Савва Святогорец, протопресвитер Феодор Зисис и др.)
2. **Текстовые заявления** — карточки с цитатами от адвокатов, канонистов, верующих
3. **Форма письма поддержки**:
   - Поля: имя*, должность/сан, страна*, email*, текст письма*
   - Чекбокс GDPR (обязательный)
   - reCAPTCHA v3
   - Отправка на email администратора (без автопубликации)
   - Success/error feedback

### Данные:
- `videos` (published, category = 'support')
- `persons` (supporters)
- INSERT в `support_letters`

### Валидация (Zod):
- name: min 2, max 200
- country: min 2, max 100
- email: valid email
- message: min 10, max 5000
- gdpr_consent: must be true

---

## 6. Video Archive (`/videos`)

### Что видит пользователь:
1. **Фильтры**: по категории (все | дело | поддержка | проповеди) и языку
2. **Сетка видео**: 3 колонки десктоп, 2 планшет, 1 мобильный
3. **Каждая карточка**: YouTube thumbnail, заголовок, категория, иконки субтитров

### Данные:
- `videos` (published, с фильтрацией)
- Плейлисты: «Дело Тихика» (8), «Поддержка от клириков» (16), «Проповеди» (17)

---

## 7. Documents & Articles (`/documents`)

### Что видит пользователь:
1. **Каталог документов** — карточки с иконкой PDF, заголовок, описание, размер файла, кнопка «Скачать»
2. **Аналитические статьи** — список статей с превью

### Данные:
- `documents` (published, order by sort_order)
- `articles` (published, order by published_at)

---

## 8. News (`/news`)

### Что видит пользователь:
1. **Лента новостей** — карточки: изображение, заголовок, дата, превью текста
2. **Пагинация** — 10 новостей на страницу
3. **Страница статьи** (`/news/[slug]`) — полный текст, ссылка на источник (если RSS)

### Данные:
- `news` (published, order by published_at desc, paginated)

### RSS-парсер (фоновый):
- spzh.eu (тег «Тихик/Тихик»)
- philenews.com (поиск «Τυχικος»)
- Результат: draft-записи в `news` с source = 'rss_spzh' | 'rss_philenews'

---

## 9. Contacts & How to Help (`/contacts`)

### Что видит пользователь:
1. **Форма обратной связи**: имя*, email*, тема, сообщение*, GDPR-чекбокс, reCAPTCHA v3
2. **Соцсети**: YouTube, Telegram, Facebook — иконки + ссылки
3. **Как помочь**: 3 блока — распространять материалы, участвовать в переводах, молиться

### Данные:
- INSERT в `contact_messages`

---

## Admin Pages

### Dashboard (`/admin/dashboard`)
- Статистика: кол-во новостей, видео, документов, непрочитанных писем
- Последние RSS-черновики на модерацию
- Последние письма поддержки

### Content (`/admin/content`)
- CRUD для: news, articles, timeline_events, documents, videos, persons
- Bulk-действия: publish/archive
- Модерация RSS-черновиков (approve/reject)
- Модерация писем поддержки

### Media (`/admin/media`)
- Загрузка изображений (автоконверт в WebP)
- Загрузка PDF-документов
- Управление YouTube-видео (добавить ID → автопарс метаданных)
