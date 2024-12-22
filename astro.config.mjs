import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'

import icon from 'astro-icon'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'http://localhost:4321/',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'de', 'fr', 'tm', 'kz', 'uz'],
    routing: {
      prefixDefaultLocale: true,
    },
    // Резервные локали
    // fallback: {
    //   en: 'en',
    //   de: 'de',
    //   fr: 'fr',
    //   tm: 'tm',
    //   kz: 'kz',
    //   uz: 'uz',
    // },
  },

  integrations: [icon(), react()],
  adapter: vercel(),
})
