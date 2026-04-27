import Link from 'next/link';
import { FileText, Scale, Users, HandHeart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const TILES = {
  el: [
    { icon: FileText, title: 'Επίσημα έγγραφα', body: 'Όλα τα έγγραφα διαθέσιμα για ενημέρωση και λήψη.', href: '/case' },
    { icon: Scale, title: 'Κανονική θέση', body: 'Διευκρινίσεις κανονολόγων και νομικά υλικά.', href: '/case' },
    { icon: Users, title: 'Στήριξη Μητροπολίτη', body: 'Λόγοι κληρικών, λαϊκών και ειδικών.', href: '/support' },
    { icon: HandHeart, title: 'Προσευχή και ενότητα', body: 'Η μεγαλύτερη δύναμη — στην προσευχή και στην αλήθεια.', href: '/support' },
  ],
  ru: [
    { icon: FileText, title: 'Официальные документы', body: 'Все документы доступны для ознакомления и скачивания.', href: '/case' },
    { icon: Scale, title: 'Каноническая позиция', body: 'Пояснения канонистов и правовые материалы.', href: '/case' },
    { icon: Users, title: 'Поддержка митрополита', body: 'Обращения духовенства, мирян и специалистов.', href: '/support' },
    { icon: HandHeart, title: 'Молитва и единство', body: 'Главная наша сила — в молитве и правде Христовой.', href: '/support' },
  ],
  en: [
    { icon: FileText, title: 'Official documents', body: 'All documents available for review and download.', href: '/case' },
    { icon: Scale, title: 'Canonical position', body: 'Clarifications by canonists and legal materials.', href: '/case' },
    { icon: Users, title: 'Metropolitan’s support', body: 'Statements from clergy, laity and specialists.', href: '/support' },
    { icon: HandHeart, title: 'Prayer and unity', body: 'Our greatest strength is in prayer and the truth of Christ.', href: '/support' },
  ],
} as const;

export async function SectionsBlock({ locale }: { locale: string }) {
  await getTranslations({ locale });
  const lang = locale as 'el' | 'ru' | 'en';
  const tiles = TILES[lang];

  return (
    <section className="py-12 md:py-14 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <li key={tile.title}>
                <Link
                  href={`/${locale}${tile.href}`}
                  className="group block text-center"
                >
                  <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-paper-deep)] border border-[var(--color-burgundy)]/20 flex items-center justify-center mb-5 transition-all group-hover:border-[var(--color-burgundy)]/60 group-hover:bg-[var(--color-paper-deep)]">
                    <Icon size={28} strokeWidth={1.4} className="text-[var(--color-burgundy)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-base md:text-lg text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-burgundy)] transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-[28ch] mx-auto">
                    {tile.body}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
