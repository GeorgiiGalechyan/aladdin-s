import { Bot } from 'grammy'
import type { ParseMode } from 'grammy/types'

interface ITG {
  token?: string
  chat_id?: string | number
  message?: string
  parse_mode?: ParseMode
}

async function sendMessageToTelegram(props: ITG) {
  if (!props.token || typeof props.token !== 'string') {
    props.token = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
  }

  const bot = new Bot(props.token)

  if (!props.chat_id || typeof props.chat_id !== 'string') {
    props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as string | number
  }

  if (!props.parse_mode || typeof props.parse_mode !== 'string') {
    props.parse_mode = 'HTML'
  }

  if (!props.message || typeof props.message !== 'string') {
    props.message = ''
  }

  // Ответит "Привет!" на любое сообщение.

  bot.command('start', async (ctx) => {
    console.log(ctx)
    await ctx.reply('Bot is started!')
  })

  await bot.api.sendMessage(props.chat_id, props.message, {
    parse_mode: props.parse_mode,
  })

  bot.on('message', async (ctx) => {
    await ctx.reply('Сообщение получено!')
    // new Response('Что-то возвращаю...', { status: 200 })
  })

  bot.start()
}

export { sendMessageToTelegram }
