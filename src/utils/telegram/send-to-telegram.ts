// export const prerender = а

interface ITG {
  botToken?: string
  chat_id?: string
  message?: string
  parse_mode?: string
}

async function sendMessageToTelegram(props: ITG) {
  if (!props.botToken || typeof props.botToken !== 'string') {
    props.botToken = import.meta.env.PUBLIC_TG_BOT_TOKEN
  }

  let allowSendMSG = `https://api.telegram.org/bot${props.botToken}/allowSendMessage`

  let isBotReadyURL = `https://api.telegram.org/bot${props.botToken}/canSendMessage`
  let INPUT_URL = `https://api.telegram.org/bot${props.botToken}/sendMessage`

  fetch(allowSendMSG)

  let isReady = await fetch(isBotReadyURL)
  let data = await isReady.json()

  if (data.ok) {
    console.log('Успех: Бот готов!')
  } else {
    console.error('Ошибка: Не удаётся подключитсься к боту')
  }

  if (!props.chat_id || typeof props.chat_id !== 'string') {
    props.chat_id = import.meta.env.PUBLIC_TG_CHAT_ID
  }

  if (!props.parse_mode || typeof props.parse_mode !== 'string') {
    props.parse_mode = 'HTML'
  }

  if (!props.message || typeof props.message !== 'string') {
    props.message = ''
  }

  let tgConfig = { chat_id: props.chat_id, parse_mode: props.parse_mode, message: props.message }

  console.log(tgConfig)

  let request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tgConfig),
  }

  let res = await fetch(INPUT_URL, request)
  let resData = await res.json()
  if (resData.ok) {
    console.log('Успех: Сообщение отправлено!')
  } else {
    console.error('Ошибка: Сообщение не отправлено!')
  }
}

export { sendMessageToTelegram }
