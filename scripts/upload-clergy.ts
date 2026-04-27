/**
 * Upload all clergy photos to Storage and update persons records.
 * Replaces previous placeholder records with real Cyprus/Greece bishops
 * who publicly supported Metropolitan Tychikos.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { persons } from '../src/lib/mock/data';

const PHOTO_FILES: Record<string, string | null> = {
  // slug -> local file (or null = silhouette)
  'tychikos': null, // already uploaded earlier as portrait-mitre.jpg
  'savvas-agiorritis': 'public/images/clergy/savvas.jpg',
  'theodoros-zisis': 'public/images/clergy/zisis.jpg',
  'seraphim-kythira': 'public/images/clergy/seraphim.jpg',
  'athanasios-limassol': 'public/images/clergy/athanasios.jpg',
  'neophytos-morphou': 'public/images/clergy/neophytos.jpg',
  'dimos-serkelidis': 'public/images/clergy/dimos.jpg',
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing env');
    process.exit(1);
  }
  const supabase = createClient(url, serviceKey);

  // 1. Wipe old persons (we change id-set), keep tychikos linked photo URL
  console.log('Clearing old persons...');
  await supabase.from('persons').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // 2. Upload photos and build slug -> publicUrl map
  const photoUrls: Record<string, string | null> = {};
  for (const [slug, localPath] of Object.entries(PHOTO_FILES)) {
    if (!localPath) {
      photoUrls[slug] = null;
      continue;
    }
    const buf = readFileSync(join(process.cwd(), localPath));
    const storagePath = `clergy/${slug}.jpg`;
    const { error } = await supabase.storage
      .from('photos')
      .upload(storagePath, buf, { contentType: 'image/jpeg', upsert: true });
    if (error) {
      console.error(`✗ ${slug}:`, error.message);
      photoUrls[slug] = null;
    } else {
      const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(storagePath);
      photoUrls[slug] = publicUrl;
      console.log(`✓ ${slug}`);
    }
  }

  // 3. Insert all persons with proper photo URLs
  // Tychikos uses the previously-uploaded mitre portrait
  const tychikosUrl = supabase.storage.from('photos').getPublicUrl('tychikos/portrait-mitre.jpg').data.publicUrl;

  const rows = persons.map((p) => ({
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
    photo_url: p.slug === 'tychikos' ? tychikosUrl : photoUrls[p.slug] ?? null,
    sort_order: p.sort_order,
  }));

  const { error: insErr } = await supabase.from('persons').insert(rows);
  if (insErr) {
    console.error('Insert failed:', insErr);
    process.exit(1);
  }
  console.log(`\n✓ Inserted ${rows.length} persons`);
}

main().catch((e) => { console.error(e); process.exit(1); });
