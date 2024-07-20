import { defineConfig } from 'astro/config';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://aladdin-s.ru',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en']
  },
  integrations: [icon()]
});