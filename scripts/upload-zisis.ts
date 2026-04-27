import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const buf = readFileSync('public/images/clergy/zisis.jpg');
  const { error: upErr } = await supabase.storage
    .from('photos')
    .upload('clergy/zisis.jpg', buf, { contentType: 'image/jpeg', upsert: true });
  if (upErr) { console.error(upErr); process.exit(1); }
  const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl('clergy/zisis.jpg');
  const { error } = await supabase.from('persons').update({ photo_url: publicUrl }).eq('slug', 'theodoros-zisis');
  if (error) { console.error(error); process.exit(1); }
  console.log('✓', publicUrl);
}

main();
