import { sendMail } from 'src/utils/mail/send-mail'

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

  sendLeadToTelegram() {
    let msgForTg = `${this}`
    consolelog(msgForTg)
  }

  async sendLeadToMail(email, subject, html) {
    if (!email) {
      email = import.meta.env.PUBLIC_M_USER || 'galechyan23@yandex.ru'
    }

    if (!subject) {
      switch (this.sourse.type) {
        case 'Main site':
          subject = 'Заявка с Главного сайта'
          break
        case 'Landing page':
          subject = 'Заявка с Лендинга'
        case 'VK':
          subject = 'Заявка из VK'
        default:
          console.log(this.sourse)
          throw new Error(
            'Неизвестный источник лида... Очень странно, в этой части кода такого в принципе быть не должно!'
          )
      }
    }

    let htmlText = [
      `<h1><b>Информация о лиде:</b></h1>`,
      `<b>Имя:</b> ${this.name}`,
      `<b>Контакты:</b> ${this.phone}`,
      `<b>Источник:</b>`,
      `- <b>id:</b> ${this.sourse.id},`,
      `- <b>type:</b> ${this.sourse.type},`,
      `- <b>name:</b> ${this.sourse.name},`,
      `- <b>url:</b> ${this.sourse.url}`,
    ].join('<br>')

    let mailProps = {
      email,
      subject,
      htmlText,
    }

    // console.log(mailProps)
    await sendMail(mailProps)
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
