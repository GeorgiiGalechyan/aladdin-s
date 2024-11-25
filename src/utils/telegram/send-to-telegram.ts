export const prerender = false

import TelegramBot, { type ChatId, type Message, type ParseMode } from 'node-telegram-bot-api'

interface ITG {
  botToken?: string
  chat_id?: ChatId
  message?: string
  parse_mode?: ParseMode
}

async function sendMessageToTelegram(props: ITG) {
  if (!props.botToken || typeof props.botToken !== 'string') {
    props.botToken = import.meta.env.PUBLIC_TG_BOT_TOKEN as string
  }

  const Bot = new TelegramBot(props.botToken, { polling: true })

  if (!props.chat_id || typeof props.chat_id !== 'string') {
    props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID as ChatId
  }

  if (!props.parse_mode || typeof props.parse_mode !== 'string') {
    props.parse_mode = 'HTML'
  }

  if (!props.message || typeof props.message !== 'string') {
    props.message = ''
  }

  // Additional Telegram query options
  let options = { parse_mode: props.parse_mode as ParseMode }

  try {
    let data = await Bot.sendMessage(props.chat_id, props.message, options)
    console.log(data)
  } catch (error) {
    console.error(error)
  }

  // if (resData.ok) {
  //   console.log('Успех: Сообщение отправлено!')
  // } else {
  //   console.error('Ошибка: Сообщение не отправлено!')
  // }
}

export { sendMessageToTelegram }
