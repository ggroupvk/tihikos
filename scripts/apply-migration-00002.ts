/**
 * Apply migration 00002 directly via service role.
 *
 * `supabase db push` requires a linked CLI session; for a one-off
 * column add we just execute the SQL via the JS client.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Missing env: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const sql = readFileSync(
    join(process.cwd(), 'supabase/migrations/00002_timeline_extras.sql'),
    'utf-8',
  );

  const supabase = createClient(url, serviceKey);

  // Supabase JS does not expose a raw SQL exec by default; use the
  // `pg-meta` REST endpoint via `rpc` if available, otherwise the
  // recommended path is to paste this SQL into the SQL editor.
  // We attempt the rpc first.
  const { error } = await supabase.rpc('exec_sql', { sql });
  if (error) {
    console.error('RPC exec_sql not available — run the SQL manually:');
    console.error('-----');
    console.error(sql);
    console.error('-----');
    process.exit(1);
  }
  console.log('✓ migration 00002 applied');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
