/**
 * Seed Supabase with content from mock data.
 * Idempotent: TRUNCATE → INSERT.
 *
 * Usage: npm run db:seed
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  timelineEvents,
  videos,
  news,
  persons,
  tychikosPhotos,
} from '../src/lib/mock/data';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Missing SUPABASE env vars');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  console.log('=== Tihikos seed ===');

  // 1. Upload portrait photos to Storage
  console.log('\n1. Uploading photos to bucket "photos"...');
  const photoFiles = [
    { localPath: 'public/images/tychikos/portrait-3.jpg', storagePath: 'tychikos/portrait.jpg' },
    { localPath: 'public/images/tychikos/portrait-2.jpg', storagePath: 'tychikos/with-archbishop.jpg' },
    { localPath: 'public/images/tychikos/enthronement-2023.png', storagePath: 'tychikos/enthronement-2023.png' },
  ];

  for (const file of photoFiles) {
    const buffer = readFileSync(join(process.cwd(), file.localPath));
    const { error } = await supabase.storage
      .from('photos')
      .upload(file.storagePath, buffer, {
        contentType: file.storagePath.endsWith('.png') ? 'image/png' : 'image/jpeg',
        upsert: true,
      });
    if (error) {
      console.error(`  ✗ ${file.storagePath}:`, error.message);
    } else {
      console.log(`  ✓ ${file.storagePath}`);
    }
  }

  // Get public URL for portrait
  const { data: { publicUrl: portraitUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl('tychikos/portrait.jpg');

  // 2. Clear and insert timeline_events
  console.log('\n2. Seeding timeline_events...');
  await supabase.from('timeline_events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const timelineRows = timelineEvents.map((e) => ({
    event_date: e.event_date,
    sort_order: e.sort_order,
    title_el: e.title_el,
    title_ru: e.title_ru,
    title_en: e.title_en,
    description_el: e.description_el,
    description_ru: e.description_ru,
    description_en: e.description_en,
    status: e.status,
  }));
  const { error: tlErr, count: tlCount } = await supabase
    .from('timeline_events')
    .insert(timelineRows, { count: 'exact' });
  if (tlErr) {
    console.error('  ✗', tlErr.message);
  } else {
    console.log(`  ✓ inserted ${tlCount ?? timelineRows.length} events`);
  }

  // 3. Clear and insert videos
  console.log('\n3. Seeding videos...');
  await supabase.from('videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const videoRows = videos.map((v) => ({
    youtube_id: v.youtube_id,
    category: v.category,
    sort_order: v.sort_order,
    title_el: v.title_el,
    title_ru: v.title_ru,
    title_en: v.title_en,
    status: v.status,
  }));
  const { error: vErr, count: vCount } = await supabase
    .from('videos')
    .insert(videoRows, { count: 'exact' });
  if (vErr) {
    console.error('  ✗', vErr.message);
  } else {
    console.log(`  ✓ inserted ${vCount ?? videoRows.length} videos`);
  }

  // 4. Clear and insert news
  console.log('\n4. Seeding news...');
  await supabase.from('news').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const newsRows = news.map((n) => ({
    slug: n.slug,
    source: n.source,
    source_url: n.source_url,
    published_at: n.published_at,
    title_el: n.title_el,
    title_ru: n.title_ru,
    title_en: n.title_en,
    excerpt_el: n.excerpt_el,
    excerpt_ru: n.excerpt_ru,
    excerpt_en: n.excerpt_en,
    status: n.status,
  }));
  const { error: nErr, count: nCount } = await supabase
    .from('news')
    .insert(newsRows, { count: 'exact' });
  if (nErr) {
    console.error('  ✗', nErr.message);
  } else {
    console.log(`  ✓ inserted ${nCount ?? newsRows.length} news`);
  }

  // 5. Clear and insert persons
  console.log('\n5. Seeding persons...');
  await supabase.from('persons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const personRows = persons.map((p) => ({
    slug: p.slug,
    name_el: p.name_el,
    name_ru: p.name_ru,
    name_en: p.name_en,
    title_el: p.title_el,
    title_ru: p.title_ru,
    title_en: p.title_en,
    bio_el: p.bio_el,
    bio_ru: p.bio_ru,
    bio_en: p.bio_en,
    photo_url: p.slug === 'tychikos' ? portraitUrl : p.photo_url,
    sort_order: p.sort_order,
  }));
  const { error: pErr, count: pCount } = await supabase
    .from('persons')
    .insert(personRows, { count: 'exact' });
  if (pErr) {
    console.error('  ✗', pErr.message);
  } else {
    console.log(`  ✓ inserted ${pCount ?? personRows.length} persons`);
  }

  console.log('\n=== Seed complete ===');
  console.log(`Portrait public URL: ${portraitUrl}`);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
