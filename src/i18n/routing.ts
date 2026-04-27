import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['el', 'ru', 'en'],
  defaultLocale: 'el',
});
