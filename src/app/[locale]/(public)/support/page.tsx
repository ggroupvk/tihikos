import { PageHeader } from '@/components/sections/page-header';
import { SupportVoices } from '@/components/sections/support-voices';
import { SupportPetition } from '@/components/sections/support-petition';
import { SupportNewsletter } from '@/components/sections/support-newsletter';

const TEXT = {
  el: {
    kicker: 'Στήριξη',
    title: 'Σταθείτε δίπλα στον Μητροπολίτη',
    subtitle:
      'Φωνές κληρικών, υπογραφή έκκλησης, εγγραφή σε ενημερώσεις. Καμία οικονομική απαίτηση — μόνο φωνή και προσευχή.',
  },
  ru: {
    kicker: 'Поддержка',
    title: 'Встаньте рядом с митрополитом',
    subtitle:
      'Голоса клириков, подпись под обращением, подписка на сводки. Никаких финансовых требований — только голос и молитва.',
  },
  en: {
    kicker: 'Support',
    title: 'Stand alongside the Metropolitan',
    subtitle:
      'Clergy voices, sign the appeal, subscribe to briefings. No financial demands — only voice and prayer.',
  },
} as const;

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <main>
      <PageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} />
      <SupportVoices locale={locale} />
      <SupportPetition locale={locale} />
      <SupportNewsletter locale={locale} />
    </main>
  );
}
