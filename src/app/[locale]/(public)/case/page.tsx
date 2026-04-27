import { useTranslations } from 'next-intl';

export default function CasePage() {
  const t = useTranslations('nav');
  return (
    <main>
      <h1>{t('case')}</h1>
    </main>
  );
}
