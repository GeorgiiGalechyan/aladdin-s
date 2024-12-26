import { Bot } from 'grammy'
import { type TGMessageConfig, TGTemplates, ParseMode } from '@ts/telegram/TGMessageProps'

export async function sendMessageToTelegram(props: TGMessageConfig) {
  try {
    // props.text должен ВСЕГДА передаваться из вне!!!
    if (!props.text) {
      throw new Error('Invalid or missing "message".')
    }

    // Для частых бизнес-сценариев используются шаблоны, передаваемые из вне
    if (props.template) {
      switch (props.template) {
        // Шаблон сообщения при создании лида (из html-формы или др. источника)
        case TGTemplates.NewLead:
          props.token = import.meta.env.TG_BOT_TOKEN as string
          props.chat_id = import.meta.env.TG_CHAT_ID as string | number

          break
        // Шаблон сообщения лида (не клиента) менеджеру
        case TGTemplates.LeadToManager:
          if (!props.token) {
            throw new Error('This template needs a token.')
          }

          if (!props.chat_id) {
            throw new Error('This template needs a chat id.')
          }

          break

        // Шаблон сообщения менеджера лиду (не клиенту)
        case TGTemplates.ManagerToLead:
          if (!props.token) {
            throw new Error('This template needs a token.')
          }

          if (!props.chat_id) {
            throw new Error('This template needs a chat id.')
          }

          break

        default:
          throw new Error('Unknown message template.')
      }
    }

    // Проверка props при отсутствии шаблона
    if (!props.token || typeof props.token !== 'string') {
      throw new Error('Sending a message without a template needs a bot token.')
    }

    if (!props.chat_id) {
      throw new Error('Sending a message without a template needs a chat_id.')
    }

    if (typeof props.chat_id !== 'string' && typeof props.chat_id !== 'number') {
      throw new Error('TypeError: Chat_id must be of type string or number')
    }

    if (!props.parse_mode || typeof props.parse_mode !== 'string') {
      props.parse_mode = ParseMode.HTML
    }

    // Если props ваилдны, то создаём бота
    const bot = new Bot(props.token)

    bot.command('start', async (ctx) => {
      await ctx.reply('Bot is started!')
    })

    // Бот отправляет сообщение
    let data = await bot.api.sendMessage(props.chat_id, props.text as string, { parse_mode: props.parse_mode })

    // Стартуем бота!
    bot.start()

    function stopBotAfterMessage() {
      setTimeout(() => {
        bot.stop()
      }, 1000)
    }

    stopBotAfterMessage()
    // Возвращаем некий результат по итогам отправки сообщения ботом
    return { data, error: undefined }
  } catch (error) {
    return { data: undefined, error }
  }
}
