'use client';

import { useState } from 'react';
import { Send, Link2, Check } from 'lucide-react';

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.3l-.5 3.5h-2.8v8.4C19.6 23 24 18.1 24 12.1z" />
    </svg>
  );
}

const COPY = {
  el: {
    telegram: 'Telegram',
    facebook: 'Facebook',
    copy: 'Σύνδεσμος',
    copied: 'Ἀντιγράφηκε',
  },
  ru: {
    telegram: 'Telegram',
    facebook: 'Facebook',
    copy: 'Ссылка',
    copied: 'Скопировано',
  },
  en: {
    telegram: 'Telegram',
    facebook: 'Facebook',
    copy: 'Link',
    copied: 'Copied',
  },
} as const;

function YoutubeXIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareControls({
  locale,
  title,
  url,
  layout = 'row',
}: {
  locale: string;
  title: string;
  url: string;
  layout?: 'row' | 'column';
}) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const tgHref = `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallthrough
    }
  };

  const wrap =
    layout === 'column'
      ? 'flex flex-col gap-3'
      : 'flex flex-wrap gap-2.5 items-center';

  const btnBase =
    'group inline-flex items-center justify-center w-9 h-9 border border-[var(--color-hairline)] hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)] text-[var(--color-ink-muted)] transition-colors';

  return (
    <div className={wrap}>
      <a
        href={tgHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className={btnBase}
      >
        <Send size={14} strokeWidth={1.6} />
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X / Twitter"
        className={btnBase}
      >
        <YoutubeXIcon size={13} />
      </a>
      <a
        href={fbHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={btnBase}
      >
        <FacebookIcon size={13} />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? c.copied : c.copy}
        className={btnBase}
      >
        {copied ? <Check size={14} strokeWidth={1.6} /> : <Link2 size={14} strokeWidth={1.6} />}
      </button>
    </div>
  );
}
