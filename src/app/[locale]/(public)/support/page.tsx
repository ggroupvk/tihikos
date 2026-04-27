import { useTranslations } from 'next-intl';

export default function SupportPage() {
  const t = useTranslations('nav');
  return (
    <main>
      <h1>{t('support')}</h1>
    </main>
  );
}
