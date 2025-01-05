/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Nodemailer or any SMTP

  readonly NEW_LEADS_TRANSPORT: string
  readonly SMTPS_NEW_LEADS_EMAIL: string

  // Telegram BOT and other TG data
  readonly TG_BOT_TOKEN: string
  readonly TG_CHAT_ID: string | number

  // Postgres config and other data
  readonly PG_USER: string
  readonly PG_PASS: string
  readonly PG_HOST: string
  readonly PG_PORT: number
  readonly PG_DB: string
  readonly PG_SSL_CA: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
