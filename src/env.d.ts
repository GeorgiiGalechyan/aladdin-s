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
  readonly PG_CONFIG: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
