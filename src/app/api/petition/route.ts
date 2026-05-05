import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { petitionSubmitSchema } from '@/lib/forms/schemas';
import { rateLimit, hashIp, clientIpFromRequest } from '@/lib/forms/rate-limit';
import { sendMail } from '@/lib/forms/mailer';

export const runtime = 'nodejs';

const MODERATOR_EMAIL = process.env.MODERATOR_EMAIL ?? 'info@tihikos.com';

/**
 * POST /api/petition
 *
 * Accepts a petition signature, validates it, rate-limits per IP,
 * stores the row in Supabase with status='pending' (so it doesn't
 * appear publicly until reviewed), and notifies moderators by email.
 *
 * Defenses:
 * - zod schema rejects malformed input
 * - honeypot field (_hp) auto-blocks bots that fill every field
 * - rate-limit: 3 submissions per IP per 10 minutes
 * - email + name length caps
 * - service-role Supabase client; bypasses RLS for the insert
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = petitionSubmitSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_input', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot: silently succeed without writing anything.
  if (data._hp && data._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIpFromRequest(req);
  const ipHash = await hashIp(ip);

  const limit = rateLimit({
    key: `petition:${ipHash}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retryAt: limit.resetAt },
      { status: 429 },
    );
  }

  // Persist
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('[petition] missing supabase env');
    return NextResponse.json({ error: 'misconfigured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { error: insertErr } = await supabase
    .from('petition_signatures')
    .insert({
      full_name: data.fullName,
      position_title: data.positionTitle || null,
      country: data.country || null,
      email: data.email,
      message: data.message || null,
      locale: data.locale ?? null,
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
      ip_hash: ipHash,
      hp_filled: false,
      status: 'pending',
    });

  if (insertErr) {
    console.error('[petition] insert failed:', insertErr.message);
    // Map duplicate-by-email-on-pending if we had a unique constraint;
    // currently we don't, multiple signatures from same email allowed
    // until review.
    return NextResponse.json({ error: 'storage_failed' }, { status: 500 });
  }

  // Notify moderators (mocked locally if RESEND_API_KEY not set)
  const subject = `[tihikos] Petition signature: ${data.fullName}`;
  const text = [
    `New signature on ${new Date().toISOString()}`,
    `Locale: ${data.locale ?? '—'}`,
    '',
    `Name: ${data.fullName}`,
    `Position: ${data.positionTitle || '—'}`,
    `Country: ${data.country || '—'}`,
    `Email: ${data.email}`,
    '',
    `Message:`,
    data.message || '—',
  ].join('\n');

  await sendMail({
    to: MODERATOR_EMAIL,
    subject,
    text,
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true });
}
