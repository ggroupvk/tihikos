import { useTranslations } from 'next-intl';

export default function NewsPage() {
  const t = useTranslations('nav');
  return (
    <main>
      <h1>{t('news')}</h1>
    </main>
  );
}
