import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel/serverless'

import icon from 'astro-icon'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
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

  integrations: [icon(), react()],
})
