import { createClient } from '@supabase/supabase-js';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Missing env vars');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  const { data: profiles, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Profiles error:', error);
    process.exit(1);
  }
  console.log('Profiles:', JSON.stringify(profiles, null, 2));

  const { data: buckets, error: e2 } = await supabase.storage.listBuckets();
  if (e2) {
    console.error('Storage error:', e2);
    process.exit(1);
  }
  console.log('Buckets:', buckets.map((b) => `${b.name} (public: ${b.public})`).join(', '));
}

main();
