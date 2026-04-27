/**
 * Upload new mitre portrait to Storage and update tychikos person row.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing env vars');
    process.exit(1);
  }
  const supabase = createClient(url, serviceKey);

  const buffer = readFileSync(join(process.cwd(), 'public/images/tychikos/portrait-mitre.jpg'));
  const { error: upErr } = await supabase.storage
    .from('photos')
    .upload('tychikos/portrait-mitre.jpg', buffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });
  if (upErr) {
    console.error('Upload failed:', upErr.message);
    process.exit(1);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl('tychikos/portrait-mitre.jpg');

  const { error: updErr } = await supabase
    .from('persons')
    .update({ photo_url: publicUrl })
    .eq('slug', 'tychikos');
  if (updErr) {
    console.error('Update failed:', updErr.message);
    process.exit(1);
  }

  console.log('✓ Tychikos portrait updated:', publicUrl);
}

main();
