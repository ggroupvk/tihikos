'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const COPY = {
  el: {
    label: 'Έκκληση',
    title: 'Υπογράψτε την έκκληση',
    subtitle:
      'Δημόσια έκκληση για επανεξέταση της απόφασης. Η υπογραφή σας θα συμπεριληφθεί στον δημόσιο πίνακα υποστηρικτών.',
    fields: {
      name: 'Όνομα και επώνυμο',
      title: 'Ιδιότητα / Σαν',
      country: 'Χώρα',
      message: 'Σύντομη δήλωση (προαιρετικό)',
    },
    submit: 'Υπογραφή',
    sent: 'Ευχαριστούμε. Η υπογραφή σας έχει καταχωρηθεί.',
    sentBody:
      'Θα λάβετε μήνυμα επιβεβαίωσης στο email που δηλώσατε. Σύντομα η υπογραφή σας θα προστεθεί στον δημόσιο πίνακα.',
  },
  ru: {
    label: 'Обращение',
    title: 'Подпишите обращение',
    subtitle:
      'Публичное обращение с просьбой о пересмотре решения. Ваша подпись будет включена в открытый список поддерживающих.',
    fields: {
      name: 'Имя и фамилия',
      title: 'Должность / Сан',
      country: 'Страна',
      message: 'Краткое заявление (по желанию)',
    },
    submit: 'Подписать',
    sent: 'Спасибо. Ваша подпись зарегистрирована.',
    sentBody:
      'Письмо подтверждения придёт на указанный e-mail. В ближайшее время ваша подпись появится в открытом списке.',
  },
  en: {
    label: 'Appeal',
    title: 'Sign the appeal',
    subtitle:
      'A public appeal calling for review of the decision. Your signature will be included in the open list of supporters.',
    fields: {
      name: 'Full name',
      title: 'Position / Rank',
      country: 'Country',
      message: 'Brief statement (optional)',
    },
    submit: 'Sign',
    sent: 'Thank you. Your signature has been recorded.',
    sentBody:
      'A confirmation email will arrive at the address you provided. Your signature will appear in the open list shortly.',
  },
} as const;

export function SupportPetition({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [submitted, setSubmitted] = useState(false);

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

        {submitted ? (
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <Field label={c.fields.name} required />
            <Field label={c.fields.title} />
            <Field label={c.fields.country} />
            <Field label="Email" required type="email" />
            <Field label={c.fields.message} multiline />

            <button
              type="submit"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--color-burgundy)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-burgundy-bright)] transition-colors"
            >
              {c.submit} →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  multiline,
  type = 'text',
}: {
  label: string;
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
          required={required}
          rows={4}
          className="w-full px-4 py-3 bg-[var(--color-paper)] border border-[var(--color-hairline)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] transition-colors text-sm"
        />
      ) : (
        <input
          type={type}
          required={required}
          className="w-full px-4 py-3 bg-[var(--color-paper)] border border-[var(--color-hairline)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] transition-colors text-sm"
        />
      )}
    </label>
  );
}
