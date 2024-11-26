import { Bot } from 'grammy'
import type { Other } from 'node_modules/grammy/out/core/api'

enum Parse_Mode {
  'MarkdownV2',
  'HTML',
  'Markdown',
}

interface ITG {
  botToken?: string
  chat_id?: string | number
  message?: string
  parse_mode?:  ParseMode

async function sendMessageToTelegram(props: ITG) {
  if (!props.botToken || typeof props.botToken !== 'string') {
    props.botToken = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
  }

  const bot = new Bot(props.botToken)

  if (!props.chat_id || typeof props.chat_id !== 'string') {
    props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as string | number
  }

  if (!props.parse_mode || typeof props.parse_mode !== 'string') {
    props.parse_mode = Parse_Mode.HTML 
  }

  if (!props.message || typeof props.message !== 'string') {
    props.message = ''
  }



  // Ответит "Привет!" на любое сообщение.

  try {
    bot.command('start', async (ctx) => {
      await ctx.reply('Bot is started!')
    })

    await bot.api.sendMessage(
      props.chat_id, 
      props.message, 
      {
        props.parse_mode
      }
    )

    bot.on('message', async (ctx) => {
      await ctx.reply('Сообщение получено!')
      // new Response('Что-то возвращаю...', { status: 200 })
    })

    bot.start()
  } catch (error) {
    console.error(error)
  }
}

export { sendMessageToTelegram }
