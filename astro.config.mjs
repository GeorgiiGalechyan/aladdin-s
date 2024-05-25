import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://aladdin-s.ru',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },
})
