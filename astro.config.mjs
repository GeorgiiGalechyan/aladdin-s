import { defineConfig } from 'astro/config'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://aladdin-s.ru',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'de', 'fr', 'tm', 'kz', 'uz'],
    routing: {
      prefixDefaultLocale: true,
    },
    // Резервные локали
    fallback: {
      en: 'ru',
      de: 'ru',
      fr: 'ru',
      tm: 'ru',
      kz: 'ru',
      uz: 'ru',
    },
  },
  integrations: [icon()],
})
