import { PageStub } from '@/components/ui/page-stub';
import { getTranslations } from 'next-intl/server';

const TEXT = {
  el: {
    title: 'Στήριξη του Μητροπολίτη',
    subtitle: 'Φωνές κληρικών, δηλώσεις ειδικών και φόρμα γραμμάτων στήριξης.',
  },
  ru: {
    title: 'Поддержка митрополита',
    subtitle: 'Голоса клириков, заявления специалистов и форма писем поддержки.',
  },
  en: {
    title: 'Support the Metropolitan',
    subtitle: 'Clergy voices, specialist statements and letters of support form.',
  },
} as const;

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const copy = TEXT[locale as 'el' | 'ru' | 'en'];

  return (
    <PageStub locale={locale} kicker={t('support')} title={copy.title} subtitle={copy.subtitle} />
  );
}
