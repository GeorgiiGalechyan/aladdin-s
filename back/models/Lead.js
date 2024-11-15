import { sendMail } from 'src/utils/mail/ya'

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
        this.message = []
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
      throw error
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      let LeadToStr = [
        `Дата создания: ${this.createDate}`,
        `Имя: ${this.name}`,
        `Телефон: ${this.phone}`,
        `Источник: ${this.sourse.description}`,
      ].join('\n')

      return LeadToStr
    }
    return new TypeError('Лид может быть преобразован только в строку')
  }

  sendLeadToTelegram() {
    let msgForTg = `${this}`
    consolelog(msgForTg)
  }

  static sendLeadToMail(lead) {
    let email = import.meta.env.PUBLIC_M_USER
    let subject
    switch (lead.sourse.name) {
      case 'Main site':
        subject = 'Заявка с Главного сайта'
        break
      case 'Landing page':
        subject = 'Заявка с Лендинга'
      case 'VK':
        subject = 'Заявка из VK'
      default:
        throw new Error(
          'Неизвестный источник лида... Очень странно, в этой части кода такого в принципе быть не должно'
        )
    }

    let html = [
      `<h1>Информация о лиде:</h1><br>`,
      `<b>Имя</b>: ${lead.name}<br>`,
      `<b>Контакты</b>: ${lead.phone}<br>`,
      `<b>ID источника</b>: ${lead.sourse.id}`,
    ].join('\n')

    let mailProps = {
      email,
      subject,
      html,
    }
    sendMail(mailProps)
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
