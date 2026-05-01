import { FileText, ExternalLink } from 'lucide-react';
import { getDocuments } from '@/lib/queries/documents';
import { localized } from '@/lib/utils';

const COPY = {
  el: {
    label: 'Αρχείο',
    title: 'Έγγραφα του φακέλου',
    description: 'Συνοδικά πρακτικά, επιστολές και δηλώσεις.',
    open: 'Άνοιγμα',
  },
  ru: {
    label: 'Архив',
    title: 'Документы по делу',
    description: 'Синодальные протоколы, письма и заявления.',
    open: 'Открыть',
  },
  en: {
    label: 'Archive',
    title: 'Case documents',
    description: 'Synodal minutes, letters, and statements.',
    open: 'Open',
  },
} as const;

function formatBytes(bytes: number | null): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(1)} MB`;
}

export async function CaseDocuments({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];
  const documents = await getDocuments();

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper-deep)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        <div className="mb-8 pb-3 border-b border-[var(--color-hairline)]">
          <span className="kicker text-[var(--color-burgundy)] block mb-1.5">
            {c.label}
          </span>
          <div className="flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight">
              {c.title}
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)] hidden md:block">
              {c.description}
            </p>
          </div>
        </div>

        <ol>
          {documents.map((doc, i) => {
            const href = doc.source_url ?? doc.file_path;
            const isExternal = !!doc.source_url;
            return (
              <li key={doc.id} className="border-b border-[var(--color-hairline)]">
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group grid grid-cols-12 gap-x-4 md:gap-x-6 items-baseline py-5 md:py-6 hover:bg-[var(--color-paper)]/60 px-2 -mx-2 transition-colors"
                >
                  <span className="col-span-2 md:col-span-1 text-xs text-[var(--color-ink-muted)] font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <h3 className="flex items-center gap-2 font-[family-name:var(--font-heading)] font-semibold text-base md:text-lg text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-burgundy)] transition-colors">
                      <FileText size={14} className="text-[var(--color-burgundy)] shrink-0" />
                      {localized(doc, 'title', lang)}
                    </h3>
                    {localized(doc, 'description', lang) && (
                      <p className="mt-1.5 text-sm text-[var(--color-ink-muted)] leading-relaxed">
                        {localized(doc, 'description', lang)}
                      </p>
                    )}
                  </div>
                  <div className="hidden md:flex md:col-span-2 text-xs text-[var(--color-ink-muted)] tracking-wide uppercase">
                    PDF{doc.file_size_bytes ? ` · ${formatBytes(doc.file_size_bytes)}` : ''}
                  </div>
                  <div className="col-span-12 md:col-span-2 flex md:justify-end items-center gap-1.5 text-xs text-[var(--color-burgundy)] mt-2 md:mt-0">
                    {c.open}
                    {isExternal && <ExternalLink size={11} />}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
