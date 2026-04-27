import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Vercel Cron triggers this every 30 minutes
// vercel.json: { "crons": [{ "path": "/api/rss", "schedule": "*/30 * * * *" }] }

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

interface RssItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  imageUrl?: string;
}

async function fetchAndParseRss(url: string): Promise<RssItem[]> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'tihikos.com RSS Parser/1.0' },
  });
  const xml = await response.text();
  return parseRssXml(xml);
}

function parseRssXml(xml: string): RssItem[] {
  const items: RssItem[] = [];

  // Simple XML parser for RSS items — no dependency needed
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description');
    const pubDate = extractTag(itemXml, 'pubDate');

    if (title && link) {
      items.push({
        title,
        link,
        description: description ? stripHtml(description) : undefined,
        pubDate: pubDate || undefined,
      });
    }
  }

  return items;
}

function extractTag(xml: string, tag: string): string | null {
  // Handle CDATA
  const cdataMatch = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
  if (cdataMatch) return cdataMatch[1].trim();

  const match = xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`, 's'));
  return match ? match[1].trim() : null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

const RSS_SOURCES = [
  {
    name: 'rss_spzh' as const,
    url: 'https://spzh.news/ru/tag/tihikos/rss', // Tag-based RSS
    lang: 'ru',
  },
  // philenews.com — may need scraping instead of RSS, placeholder
];

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized triggers
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getServiceClient();
  let totalInserted = 0;

  for (const source of RSS_SOURCES) {
    try {
      const items = await fetchAndParseRss(source.url);

      for (const item of items) {
        const slug = slugify(item.title);

        // Skip if already exists (by source_url)
        const { data: existing } = await supabase
          .from('news')
          .select('id')
          .eq('source_url', item.link)
          .single();

        if (existing) continue;

        // Insert as draft
        const insertData: Record<string, unknown> = {
          slug: `${slug}-${Date.now()}`,
          source: source.name,
          source_url: item.link,
          status: 'draft',
          published_at: item.pubDate ? new Date(item.pubDate).toISOString() : null,
          title_el: source.lang === 'el' ? item.title : item.title,
          title_ru: source.lang === 'ru' ? item.title : null,
          title_en: source.lang === 'en' ? item.title : null,
          excerpt_el: source.lang === 'el' ? item.description : null,
          excerpt_ru: source.lang === 'ru' ? item.description : null,
          excerpt_en: source.lang === 'en' ? item.description : null,
        };

        const { error } = await supabase.from('news').insert(insertData);

        if (!error) totalInserted++;
      }
    } catch (err) {
      console.error(`RSS parse failed for ${source.name}:`, err);
    }
  }

  return NextResponse.json({ success: true, inserted: totalInserted });
}
