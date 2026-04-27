import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supportLetterSchema } from '@/lib/validations';
import { verifyRecaptcha } from '@/lib/recaptcha';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = supportLetterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const isHuman = await verifyRecaptcha(result.data.recaptcha_token);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 403 },
      );
    }

    const supabase = getServiceClient();
    const { error } = await supabase.from('support_letters').insert({
      author_name: result.data.author_name,
      author_title: result.data.author_title || null,
      author_country: result.data.author_country,
      author_email: result.data.author_email,
      message: result.data.message,
      gdpr_consent: result.data.gdpr_consent,
    });

    if (error) {
      console.error('Failed to insert support letter:', error);
      return NextResponse.json({ error: 'Failed to send letter' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
