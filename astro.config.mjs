import { defineConfig, envField } from 'astro/config'

import vercel from '@astrojs/vercel'

import icon from 'astro-icon'
import react from '@astrojs/react'

// const siteUrl =
//   process.env.VERCEL_ENV === 'production'
//     ? 'aladdin-s-georgiigalechyans-projects.vercel.app/ru/' // 'your.prod.domain.here'
//     : 'http://localhost:4321/ru/'
//
// console.log('siteUrl', siteUrl)

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // site: siteUrl,

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'de', 'fr', 'tm', 'kz', 'uz'],
    routing: {
      prefixDefaultLocale: true,
    },
    // Резервные локали
    fallback: {
      en: 'en',
      de: 'de',
      fr: 'fr',
      tm: 'tm',
      kz: 'kz',
      uz: 'uz',
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ['@node-rs/argon2'],
    },
  },
  adapter: vercel(),
  outDir: './dist',
  env: {
    schema: {
      // API_URL: envField.string({ context: "client", access: "public", optional: true }),
      // PORT: envField.number({ context: "server", access: "public", default: 4321 }),

      // Telegram BOT and other TG data
      TG_CHAT_ID: envField.string({ context: 'server', access: 'secret' }),
      TG_BOT_TOKEN: envField.string({ context: 'server', access: 'secret' }),

      // Nodemailer or other SMTP
      SMTPS_NEW_LEADS_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      NEW_LEADS_TRANSPORT: envField.string({ context: 'server', access: 'secret' }),

      // Postgres config and other data
      PG_USER: envField.string({ context: 'server', access: 'secret' }),
      PG_PASS: envField.string({ context: 'server', access: 'secret' }),
      PG_HOST: envField.string({ context: 'server', access: 'secret' }),
      PG_PORT: envField.number({ context: 'server', access: 'secret' }),
      PG_DB: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  integrations: [icon(), react()],
})
