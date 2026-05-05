'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

const COPY = {
  el: {
    label: 'Ἐνημερώσεις',
    title: 'Λάβετε σύντομες ἀναφορές',
    subtitle:
      'Ἕνα μήνυμα ὅταν ὑπάρξει οὐσιαστική ἐξέλιξη: συνοδικὲς ἀποφάσεις, ἐφέσεις, νέες δηλώσεις. Ὄχι spam.',
    placeholder: 'τὸ email σας',
    submit: 'Ἐγγραφή',
    sending: 'Ἀποστολή…',
    sent: 'Εὐχαριστοῦμε. Ἡ ἐγγραφή σας ἔχει καταχωρηθεῖ.',
    rateLimited: 'Πάρα πολλὲς ἀποστολές. Δοκιμάστε σὲ λίγη ὥρα.',
    error: 'Κάτι πῆγε στραβά. Δοκιμάστε ξανά.',
  },
  ru: {
    label: 'Сводки',
    title: 'Получайте краткие сводки',
    subtitle:
      'Одно письмо при существенных изменениях: синодальные решения, апелляции, новые заявления. Без спама.',
    placeholder: 'ваш email',
    submit: 'Подписаться',
    sending: 'Отправка…',
    sent: 'Спасибо. Ваша подписка зарегистрирована.',
    rateLimited: 'Слишком много попыток. Попробуйте через час.',
    error: 'Что-то пошло не так. Попробуйте ещё раз.',
  },
  en: {
    label: 'Briefings',
    title: 'Receive concise updates',
    subtitle:
      'One message when something material happens: synodal decisions, appeals, new statements. No spam.',
    placeholder: 'your email',
    submit: 'Subscribe',
    sending: 'Sending…',
    sent: 'Thank you. Your subscription has been recorded.',
    rateLimited: 'Too many attempts. Please try again in an hour.',
    error: 'Something went wrong. Please try again.',
  },
} as const;

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'rate_limited';

export function SupportNewsletter({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const fd = new FormData(e.currentTarget);
    const payload = {
      email: String(fd.get('email') ?? ''),
      _hp: String(fd.get('_hp') ?? ''),
      locale,
    };

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      if (res.status === 429) {
        setStatus('rate_limited');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="newsletter"
      className="py-12 md:py-16 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]"
    >
      <div className="mx-auto max-w-[var(--max-width-text)] px-6 md:px-12">
        <div className="text-center">
          <span className="kicker text-[var(--color-burgundy)] block mb-3">
            {c.label}
          </span>
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-base text-[var(--color-ink-muted)] mb-8 leading-relaxed max-w-md mx-auto">
            {c.subtitle}
          </p>
        </div>

        {status === 'sent' ? (
          <div className="flex items-center justify-center gap-3 text-[var(--color-burgundy)]">
            <CheckCircle2 size={20} />
            <p className="font-[family-name:var(--font-heading)] font-semibold text-base">
              {c.sent}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] pointer-events-none"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={c.placeholder}
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-paper-deep)] border border-[var(--color-hairline)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] transition-colors text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'sending' ? c.sending : `${c.submit} →`}
              </button>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {(status === 'error' || status === 'rate_limited') && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-3 p-3 border border-[var(--color-burgundy)]/40 bg-[var(--color-paper-deep)] text-sm text-[var(--color-burgundy)]"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{status === 'rate_limited' ? c.rateLimited : c.error}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
