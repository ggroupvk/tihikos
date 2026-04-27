import { useTranslations } from 'next-intl';

export default function MediaPage() {
  const t = useTranslations('nav');
  return (
    <main>
      <h1>{t('media')}</h1>
    </main>
  );
}
