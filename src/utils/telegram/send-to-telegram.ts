import { Bot } from 'grammy'
import { type TGMessageConfig, TGTemplates, ParseMode } from '@ts/telegram/TGMessageProps'

async function sendMessageToTelegram(props: TGMessageConfig) {
  console.log(props)
  if (!props.message) {
    throw new Error('Invalid or missing "message".')
  }

  if (props.template) {
    switch (props.template) {
      case TGTemplates.NewLead:
        props.token = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
        props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as string | number
        props.message = `<div>
            <strong>${props.message.leadName}: </strong>${props.message.leadPhone}
          </div>` as string
        break

      case TGTemplates.LeadToManager:
        if (!props.token) {
          throw new Error('This template requires a token.')
        }

        if (!props.chat_id) {
          throw new Error('This template requires a chat id.')
        }

        break

      case TGTemplates.ManagerToLead:
        if (!props.token) {
          throw new Error('This template requires a token.')
        }

        if (!props.chat_id) {
          throw new Error('This template requires a chat id.')
        }

        break

      default:
        throw new Error('Unknown message template.')
    }
  }

  if (!props.token || typeof props.token !== 'string') {
    props.token = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
  }

  if (!props.chat_id || typeof props.chat_id !== 'string') {
    props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as string | number
  }

  if (!props.parse_mode || typeof props.parse_mode !== 'string') {
    props.parse_mode = ParseMode.HTML
  }

  const bot = new Bot(props.token)

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
