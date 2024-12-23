import { defineConfig, envField } from 'astro/config'

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
  env: {
    schema: {
      // API_URL: envField.string({ context: "client", access: "public", optional: true }),
      // PORT: envField.number({ context: "server", access: "public", default: 4321 }),

      // Nodemailer or other SMTP
      NEW_LEADS_TRANSPORT: envField.string({ context: 'server', access: 'secret' }),
      SMTPS_NEW_LEADS_EMAIL: envField.string({ context: 'server', access: 'secret' }),

      // Telegram BOT and other TG data
      TG_BOT_TOKEN: envField.string({ context: 'server', access: 'secret' }),
      TG_CHAT_ID: envField.string({ context: 'server', access: 'secret' }),

      // Postgres config and other data
      PG_CONFIG: envField.string({ context: 'server', access: 'secret' }),
    },
  },
})
