import { PageHeader } from '@/components/sections/page-header';
import { CaseChronology } from '@/components/sections/case-chronology';
import { CaseDocuments } from '@/components/sections/case-documents';
import { CaseAnalysis } from '@/components/sections/case-analysis';

const TEXT = {
  el: {
    kicker: 'Η Υπόθεση',
    title: 'Η υπόθεση του Μητροπολίτη Πάφου',
    subtitle:
      'Πλήρες χρονολόγιο των γεγονότων, επίσημα έγγραφα της Ιεράς Συνόδου και του Φαναρίου, κανονικός σχολιασμός και πηγές.',
  },
  ru: {
    kicker: 'Дело',
    title: 'Дело митрополита Пафосского',
    subtitle:
      'Полная хронология событий, официальные документы Синода и Фанара, канонический разбор и источники.',
  },
  en: {
    kicker: 'The Case',
    title: 'The case of the Metropolitan of Paphos',
    subtitle:
      'Full chronology, official documents from the Holy Synod and the Phanar, canonical commentary and sources.',
  },
} as const;

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
      <CaseChronology locale={locale} />
      <CaseDocuments locale={locale} />
      <CaseAnalysis locale={locale} />
    </main>
  );
}
