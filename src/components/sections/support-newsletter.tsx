'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

const COPY = {
  el: {
    label: 'Ενημερώσεις',
    title: 'Λάβετε σύντομες αναφορές',
    subtitle:
      'Ένα μήνυμα όταν υπάρξει ουσιαστική εξέλιξη: συνοδικές αποφάσεις, εφέσεις, νέες δηλώσεις. Όχι spam.',
    placeholder: 'το email σας',
    submit: 'Εγγραφή',
    sent: 'Ευχαριστούμε. Η εγγραφή σας έχει καταχωρηθεί.',
  },
  ru: {
    label: 'Сводки',
    title: 'Получайте краткие сводки',
    subtitle:
      'Одно письмо при существенных изменениях: синодальные решения, апелляции, новые заявления. Без спама.',
    placeholder: 'ваш email',
    submit: 'Подписаться',
    sent: 'Спасибо. Ваша подписка зарегистрирована.',
  },
  en: {
    label: 'Briefings',
    title: 'Receive concise updates',
    subtitle:
      'One message when something material happens: synodal decisions, appeals, new statements. No spam.',
    placeholder: 'your email',
    submit: 'Subscribe',
    sent: 'Thank you. Your subscription has been recorded.',
  },
} as const;

export function SupportNewsletter({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [submitted, setSubmitted] = useState(false);

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

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-[var(--color-burgundy)]">
            <CheckCircle2 size={20} />
            <p className="font-[family-name:var(--font-heading)] font-semibold text-base">
              {c.sent}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
              />
              <input
                type="email"
                required
                placeholder={c.placeholder}
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-paper-deep)] border border-[var(--color-hairline)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-burgundy)] transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] font-medium text-sm tracking-wide hover:bg-[var(--color-ink-soft)] transition-colors"
            >
              {c.submit} →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
