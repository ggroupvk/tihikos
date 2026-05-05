import { Resend } from 'resend';

/**
 * Thin wrapper around Resend so callers don't have to handle the
 * "no API key configured" branch repeatedly. In dev / preview /
 * pre-production the env var is unset and we just log instead of
 * sending; the caller still sees a successful response so the form
 * UX works.
 */

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  /** Optional override for the From field. */
  from?: string;
  /** Where to BCC moderators on petition submissions, etc. */
  bcc?: string;
  replyTo?: string;
};

export type SendResult =
  | { ok: true; id: string | null; mocked: boolean }
  | { ok: false; error: string };

let client: Resend | null | undefined;

function getClient(): Resend | null {
  if (client !== undefined) return client;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    client = null;
    return null;
  }
  client = new Resend(key);
  return client;
}

export async function sendMail(args: SendArgs): Promise<SendResult> {
  const c = getClient();
  const from = args.from ?? process.env.RESEND_FROM_EMAIL ?? 'noreply@tihikos.com';

  if (!c) {
    // Mock mode — log and pretend it succeeded.
    console.warn(
      '[mailer] RESEND_API_KEY not set, skipping send.',
      JSON.stringify({ to: args.to, subject: args.subject }),
    );
    return { ok: true, id: null, mocked: true };
  }

  try {
    const { data, error } = await c.emails.send({
      from,
      to: args.to,
      subject: args.subject,
      text: args.text,
      bcc: args.bcc,
      replyTo: args.replyTo,
    });
    if (error) {
      console.error('[mailer] resend error:', error);
      return { ok: false, error: error.message ?? 'send failed' };
    }
    return { ok: true, id: data?.id ?? null, mocked: false };
  } catch (e) {
    console.error('[mailer] unexpected:', e);
    return { ok: false, error: 'send failed' };
  }
}
