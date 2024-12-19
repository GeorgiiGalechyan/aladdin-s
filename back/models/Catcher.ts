import { sendMessageToTelegram } from 'src/utils/telegram/send-to-telegram'
import { MsgTemplate } from '@enums/MsgTemplates'
import type { ParseMode } from 'grammy/types'

/* Задачи:
   Прописать как нужно обрабатывать payload перед отправкой тем или иным методом
*/

type Payload = JSON | FormData

enum Method {
  TG = 'tg',
  EMAIL = 'email',
}

interface ITGProps {
  template?: MsgTemplate
  token?: string
  chat_id?: string | number
  message: string
  parse_mode?: ParseMode
}

export class Catcher {
  sendAll(payload: Payload) {
    const message = ''

    switch (template) {
      case MsgTemplate.NewLead:
        break
      case MsgTemplate.LeadToManager:
        break
      case MsgTemplate.ManagerToLead:
        break
      default:
        throw new Error('Unknown message template.')
    }

    let tgProps: ITGProps = {
      message,
    }

    let emailProps = {
      message,
    }

    sendMessageToTelegram(tgProps)
    console.log('Send payload by all methods!')
  }

  sendByTelegram() {}

  sendBy(payload: Payload, config: IConfig | IConfig[]) {
    if (!payload) {
      throw new Error('Invalid payload')
    }

    if (!config) {
      throw new Error('')
    }

    if (!Array.isArray(config)) {
      switch (config?.method) {
        case Method.EMAIL:
          // импортируем функцию / сервис по отправке сообщений
          // подготовить payload для отправки
          // вызвать функцию передав в неё payload
          console.log(config?.method)
          return config.method
        case Method.TG:
          // импортируем функцию / сервис по отправке сообщений
          // подготовить payload для отправки
          // вызвать функцию передав в неё payload
          console.log(config?.method)
          return config.method
        default:
          throw new Error('Unknown method of sending messages')
      }
    }

    if (Array.isArray(config)) {
      config?.forEach((e) => {
        switch (e.method) {
          case Method.EMAIL:
            // импортируем функцию / сервис по отправке сообщений
            // подготовить payload для отправки
            // вызвать функцию передав в неё payload
            console.log(e.method)
            return e.method
          case Method.TG:
            // импортируем функцию / сервис по отправке сообщений
            // подготовить payload для отправки
            // вызвать функцию передав в неё payload
            console.log(e.method)
            return e.method
          default:
            throw new Error('Unknown method of sending messages')
        }
      })
    }
  }
}
