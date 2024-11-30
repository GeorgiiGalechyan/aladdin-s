// export const prerender = false

import { sendMessageToEmail } from 'src/utils/mail/send-to-email'
import { sendMessageToTelegram } from 'src/utils/telegram/send-to-telegram'

export class Lead {
  constructor(leadSourse, formData, message) {
    try {
      this.createDate = new Date()

      // class LeadSourse
      this.sourse = leadSourse
      this.name = formData.leadName

      if (
        (formData.leadPhone.substr(0, 2) === '+7' && formData.leadPhone.length === 12) ||
        (formData.leadPhone[0] === '8' && formData.leadPhone.length === 11) ||
        (formData.leadPhone[0] !== '8' && formData.leadPhone.substr(0, 2) !== '+7' && formData.leadPhone.length === 10)
      ) {
        this.phone = formData.leadPhone
      } else {
        throw new Error('Incorrect phone number!')
      }

      if (!message) {
        this.messages = []
      } else {
        this.messages = [
          {
            author: message.author || this.name,
            date: message.date,
            text: message.text,
          },
        ]
      }

      // Statuses: New => Processing => Qualified | Unqualified
      this.status = 'New'
    } catch (error) {
      throw new Error('В конструктор переданы невалидные данные!')
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      let LeadToStr = [
        `Дата создания: ${this.createDate.toDateString()}`,
        `Имя: ${this.name}`,
        `Телефон: ${this.phone}`,
        `Источник: ${this.sourse.description}`,
      ]
      return LeadToStr.join('\n')
    }
    return new TypeError('Лид может быть преобразован только в строку')
  }

  getSubject() {
    switch (this.sourse.type) {
      case 'Main site':
        return 'Заявка с Главного сайта'
      case 'Landing page':
        return 'Заявка с Лендинга'
      case 'VK':
        return 'Заявка из VK'
      default:
        console.log(this.sourse)
        throw new Error(
          'Неизвестный источник лида... Очень странно, в этой части кода такого в принципе быть не должно!'
        )
    }
  }

  async sendLeadToTelegram(botToken, chatID, message, parse_mode) {
    if (!botToken) {
      botToken = undefined
    }

    if (!chatID) {
      chatID = undefined
    }

    if (!message) {
      message = `${this.name}: ${this.phone}`
    }

    if (!parse_mode) {
      parse_mode = undefined
    }

    let config = {
      botToken,
      chatID,
      message,
      parse_mode,
    }

    try {
      sendMessageToTelegram(config)
      return new Response(
        JSON.stringify({
          message: 'Заявка отправлена в телеграм',
        }),
        { status: 200 }
      )
    } catch (error) {
      console.error(error)
    }
  }

  async sendLeadToMail(email, subject, htmlText) {
    if (!email) {
      email = import.meta.env.PUBLIC_M_USER || 'galechyan23@yandex.ru'
    }

    if (!subject) {
      subject = this.getSubject()
    }

    if (!htmlText) {
      htmlText = [
        `<h1><b>Информация о лиде:</b></h1>`,
        `<b>Имя:</b> ${this.name}`,
        `<b>Контакты:</b> ${this.phone}`,
        `<b>Источник:</b>`,
        `- <b>id:</b> ${this.sourse.id},`,
        `- <b>type:</b> ${this.sourse.type},`,
        `- <b>name:</b> ${this.sourse.name},`,
        `- <b>url:</b> ${this.sourse.url}`,
      ].join('<br>')
    }

    let mailProps = {
      email,
      subject,
      htmlText,
    }

    await sendMessageToEmail(mailProps)

    // return new Response(
    //   JSON.stringify({
    //     message: 'Ваша заявка принята. Мы свяжемся с Вами в ближайшее время.',
    //   }),
    //   { status: 200 }
    // )
  }

  // Доработать, чтобы в зависимости от прошедшего времени выдавался возраст в секундах, минутах, часах, днях, месяцах.

  async getAge() {
    console.log({ createDate: this.createDate })
    let nowDate = new Date()
    console.log({ nowDate: nowDate })
    let age = nowDate - this.createDate
    console.log({ age })
  }
}
