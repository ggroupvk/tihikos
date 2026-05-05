import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { newsletterSubmitSchema } from '@/lib/forms/schemas';
import { rateLimit, hashIp, clientIpFromRequest } from '@/lib/forms/rate-limit';
import { sendMail } from '@/lib/forms/mailer';

export const runtime = 'nodejs';

const MODERATOR_EMAIL = process.env.MODERATOR_EMAIL ?? 'info@tihikos.com';

/**
 * POST /api/newsletter
 *
 * Accepts a newsletter subscription. Validates, rate-limits, stores
 * (idempotent on email via UNIQUE constraint), and sends a moderator
 * notification.
 *
 * Defenses identical to /api/petition: zod, honeypot, rate-limit
 * (5 per IP / hour), service-role insert.
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = newsletterSubmitSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_input', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;

  if (data._hp && data._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIpFromRequest(req);
  const ipHash = await hashIp(ip);

  const limit = rateLimit({
    key: `newsletter:${ipHash}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retryAt: limit.resetAt },
      { status: 429 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('[newsletter] missing supabase env');
    return NextResponse.json({ error: 'misconfigured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error: insertErr } = await supabase
    .from('newsletter_subscribers')
    .insert({
      email: data.email,
      locale: data.locale ?? null,
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
      ip_hash: ipHash,
      hp_filled: false,
    });

  if (insertErr) {
    // Unique-violation on email = treat as success (already subscribed).
    if (insertErr.code === '23505') {
      return NextResponse.json({ ok: true, already: true });
    }
    console.error('[newsletter] insert failed:', insertErr.message);
    return NextResponse.json({ error: 'storage_failed' }, { status: 500 });
  }

  await sendMail({
    to: MODERATOR_EMAIL,
    subject: `[tihikos] Newsletter signup: ${data.email}`,
    text: `Locale: ${data.locale ?? '—'}\nEmail: ${data.email}`,
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true });
}
