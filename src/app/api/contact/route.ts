import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contactSchema } from '@/lib/validations';
import { verifyRecaptcha } from '@/lib/recaptcha';

// Use service role for server-side inserts (bypasses RLS)
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(result.data.recaptcha_token);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 403 },
      );
    }

    // Insert into database
    const supabase = getServiceClient();
    const { error } = await supabase.from('contact_messages').insert({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject || null,
      message: result.data.message,
      gdpr_consent: result.data.gdpr_consent,
    });

    if (error) {
      console.error('Failed to insert contact message:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
