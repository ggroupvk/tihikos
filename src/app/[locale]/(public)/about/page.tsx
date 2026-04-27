import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('nav');
  return (
    <main>
      <h1>{t('about')}</h1>
    </main>
  );
}
