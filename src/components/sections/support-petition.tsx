'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const COPY = {
  el: {
    label: 'Έκκληση',
    title: 'Υπογράψτε την έκκληση',
    subtitle:
      'Δημόσια έκκληση για επανεξέταση της απόφασης. Η υπογραφή σας θα συμπεριληφθεί στον δημόσιο πίνακα υποστηρικτών μετὰ ἀπὸ ἔλεγχο.',
    fields: {
      name: 'Όνομα και επώνυμο',
      title: 'Ιδιότητα / Σαν',
      country: 'Χώρα',
      message: 'Σύντομη δήλωση (προαιρετικό)',
    },
    submit: 'Υπογραφή',
    sending: 'Ἀποστολή…',
    sent: 'Εὐχαριστοῦμε. Ἡ ὑπογραφή σας ἔχει καταχωρηθεῖ.',
    sentBody:
      'Σύντομα ἡ ὑπογραφή σας θὰ ἐλεγχθεῖ καὶ θὰ προστεθεῖ στὸν δημόσιο πίνακα.',
    rateLimited: 'Πάρα πολλὲς ἀποστολές. Δοκιμάστε σὲ λίγα λεπτά.',
    error: 'Κάτι πῆγε στραβά. Δοκιμάστε ξανά.',
  },
  ru: {
    label: 'Обращение',
    title: 'Подпишите обращение',
    subtitle:
      'Публичное обращение с просьбой о пересмотре решения. Ваша подпись после проверки будет добавлена в открытый список поддерживающих.',
    fields: {
      name: 'Имя и фамилия',
      title: 'Должность / Сан',
      country: 'Страна',
      message: 'Краткое заявление (по желанию)',
    },
    submit: 'Подписать',
    sending: 'Отправка…',
    sent: 'Спасибо. Ваша подпись зарегистрирована.',
    sentBody:
      'В ближайшее время после проверки ваша подпись будет добавлена в открытый список.',
    rateLimited: 'Слишком много попыток. Попробуйте через несколько минут.',
    error: 'Что-то пошло не так. Попробуйте ещё раз.',
  },
  en: {
    label: 'Appeal',
    title: 'Sign the appeal',
    subtitle:
      'A public appeal calling for review of the decision. Your signature, after moderation, will be added to the open list of supporters.',
    fields: {
      name: 'Full name',
      title: 'Position / Rank',
      country: 'Country',
      message: 'Brief statement (optional)',
    },
    submit: 'Sign',
    sending: 'Sending…',
    sent: 'Thank you. Your signature has been recorded.',
    sentBody:
      'After moderation, your signature will be added to the open list shortly.',
    rateLimited: 'Too many attempts. Please try again in a few minutes.',
    error: 'Something went wrong. Please try again.',
  },
} as const;

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'rate_limited';

export function SupportPetition({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get('fullName') ?? ''),
      positionTitle: String(fd.get('positionTitle') ?? ''),
      country: String(fd.get('country') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      _hp: String(fd.get('_hp') ?? ''),
      locale,
    };

    try {
      const res = await fetch('/api/petition', {
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
      id="petition"
      className="py-12 md:py-16 bg-[var(--color-paper-deep)] border-t border-[var(--color-hairline)]"
    >
      <div className="mx-auto max-w-[var(--max-width-text)] px-6 md:px-12">
        <span className="kicker text-[var(--color-burgundy)] block mb-3">
          {c.label}
        </span>
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight mb-4">
          {c.title}
        </h2>
        <p className="text-base text-[var(--color-ink-muted)] mb-8 leading-relaxed">
          {c.subtitle}
        </p>

        {status === 'sent' ? (
          <div className="border border-[var(--color-burgundy)]/30 bg-[var(--color-paper)] p-6 md:p-8 flex items-start gap-4">
            <CheckCircle2 size={22} className="text-[var(--color-burgundy)] shrink-0 mt-0.5" />
            <div>
              <p className="font-[family-name:var(--font-heading)] font-semibold text-base text-[var(--color-ink)] mb-2">
                {c.sent}
              </p>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                {c.sentBody}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <Field label={c.fields.name} name="fullName" required />
            <Field label={c.fields.title} name="positionTitle" />
            <Field label={c.fields.country} name="country" />
            <Field label="Email" name="email" required type="email" />
            <Field label={c.fields.message} name="message" multiline />

            {/* Honeypot — hidden from humans, bots fill all fields */}
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
                className="flex items-start gap-3 p-4 border border-[var(--color-burgundy)]/40 bg-[var(--color-paper)] text-sm text-[var(--color-burgundy)]"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{status === 'rate_limited' ? c.rateLimited : c.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-burgundy)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-burgundy-bright)] transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {status === 'sending' ? c.sending : `${c.submit} →`}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  multiline,
  type = 'text',
}: {
  label: string;
  name: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="kicker text-[var(--color-ink-muted)] text-[10px] block mb-2">
        {label}
        {required && <span className="text-[var(--color-burgundy)]"> *</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          className="w-full px-4 py-3 bg-[var(--color-paper)] border border-[var(--color-hairline)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] transition-colors text-sm"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="w-full px-4 py-3 bg-[var(--color-paper)] border border-[var(--color-hairline)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] transition-colors text-sm"
        />
      )}
    </label>
  );
}
