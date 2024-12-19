import { Bot } from 'grammy'
import type { ParseMode } from 'grammy/types'

import { MsgTemplate } from '@enums/MsgTemplates'

interface ITG {
  template?: MsgTemplate
  token?: string
  chat_id?: string | number
  message: string
  parse_mode?: ParseMode
}

async function sendMessageToTelegram(props: ITG) {
  if (!props.message || typeof props.message !== 'string') {
    throw new Error('The message must contain text of type string.')
  }

  if (props.template) {
    switch (props.template) {
      case MsgTemplate.NewLead:
        props.token = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
        props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as string | number
        props.parse_mode = 'HTML'
        break

      case MsgTemplate.LeadToManager:
        if (!props.token) {
          throw new Error('This template requires a token.')
        }

        if (!props.chat_id) {
          throw new Error('This template requires a chat id.')
        }

        props.parse_mode = 'HTML'
        break

      case MsgTemplate.ManagerToLead:
        if (!props.token) {
          throw new Error('This template requires a token.')
        }

        if (!props.chat_id) {
          throw new Error('This template requires a chat id.')
        }
        props.parse_mode = 'HTML'
        break

      default:
        throw new Error('Unknown message template.')
    }
    props.token
  }

  if (!props.token || typeof props.token !== 'string') {
    props.token = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
  }

  if (!props.chat_id || typeof props.chat_id !== 'string') {
    props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as string | number
  }

  if (!props.parse_mode || typeof props.parse_mode !== 'string') {
    props.parse_mode = 'HTML'
  }

  const bot = new Bot(props.token)
  // Ответит "Привет!" на любое сообщение.

  bot.command('start', async (ctx) => {
    console.log(ctx)
    await ctx.reply('Bot is started!')
  })

  await bot.api.sendMessage(props.chat_id, props.message, {
    parse_mode: props.parse_mode,
  })

  bot.start()
}

export { sendMessageToTelegram }
