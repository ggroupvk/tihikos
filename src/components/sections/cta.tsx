import Link from 'next/link';
import { Share2, Bell, HandHeart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const TAGLINES = {
  el: {
    title: 'Στηρίξτε την αλήθεια',
    actions: 'Μοιραστείτε. Εγγραφείτε. Προσευχηθείτε.',
    body: 'Η προσευχή σας, ο λόγος σας και η συμμετοχή σας έχουν σημασία. Μαζί μαρτυρούμε την αλήθεια εν αγάπη.',
  },
  ru: {
    title: 'Поддержите правду',
    actions: 'Поделитесь. Подпишитесь. Помолитесь.',
    body: 'Ваша молитва, ваше слово и ваше участие имеют значение. Вместе мы свидетельствуем истину в любви.',
  },
  en: {
    title: 'Support the truth',
    actions: 'Share. Subscribe. Pray.',
    body: 'Your prayer, your word and your participation matter. Together we witness the truth in love.',
  },
} as const;

export async function CtaSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const lang = locale as 'el' | 'ru' | 'en';
  const copy = TAGLINES[lang];

  return (
    <section className="bg-[var(--color-burgundy)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left: praying-hands icon as decorative element */}
          <div className="md:col-span-1 hidden md:flex items-start justify-center pt-2">
            <HandHeart size={48} strokeWidth={1.2} className="text-[var(--color-gold-bright)]" />
          </div>

          {/* Middle: text */}
          <div className="md:col-span-7">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-paper)] text-2xl md:text-4xl tracking-tight mb-3">
              {copy.title}
            </h2>
            <p className="font-[family-name:var(--font-heading)] text-lg md:text-xl text-[var(--color-gold-bright)] mb-4">
              {copy.actions}
            </p>
            <p className="text-sm md:text-base text-[var(--color-paper)]/80 max-w-2xl leading-relaxed">
              {copy.body}
            </p>
          </div>

          {/* Right: 2 buttons stacked */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <Link
              href={`/${locale}/support`}
              className="group flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-gold-bright)] text-[var(--color-ink)] font-medium hover:brightness-110 transition-all"
            >
              <Share2 size={16} />
              <span className="uppercase tracking-wider text-sm">{t('ctaShare')}</span>
            </Link>
            <Link
              href={`/${locale}/news`}
              className="group flex items-center justify-center gap-3 px-6 py-4 border border-[var(--color-paper)]/40 text-[var(--color-paper)] font-medium hover:bg-[var(--color-paper)] hover:text-[var(--color-burgundy)] transition-colors"
            >
              <Bell size={16} />
              <span className="uppercase tracking-wider text-sm">{t('ctaSubscribe')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
