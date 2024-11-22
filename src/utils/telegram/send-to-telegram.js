async function sendMessageToTelegram(botToken, chat_id, message, parse_mode) {
  if (!botToken || typeof botToken !== 'string') {
    botToken = import.meta.env.PUBLIC_TG_BOT_TOKEN
  }

  let isBotReadyURL = `https://api.telegram.org/bot${botToken}/canSendMessage`
  const INPUT_URL = `https://api.telegram.org/bot${botToken}/sendMessage`

  if (!chat_id) {
    chat_id = import.meta.env.PUBLIC_TG_CHAT_ID
  }

  if (!parse_mode) {
    parse_mode = 'HTML'
  }

  if (!message) {
    message = ''
  }

  let config = {
    chat_id,
    parse_mode,
    message,
  }

  await fetch(isBotReadyURL)
    .then((req) => {
      req
    })
    .then((data) => {
      console.log(data)
    })
    .finally(console.log('Конец проверки'))

  await fetch(INPUT_URL, config)
    .then((req) => {
      req
    })
    .then((data) => {
      console.log(data)
    })
    .finally(console.log('Конец отправки сообщения в Telegramm'))
}

export { sendMessageToTelegram }
