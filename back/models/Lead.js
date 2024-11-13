// нужно ли определять дату в конструкторе или вне его???

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
      return `Дата создания: ${this.createDate}\nИмя: ${this.name}\nТелефон: ${this.phone}\nИсточник: ${this.sourse.description}`
    }
    return new TypeError('Лид может быть преобразован только в строку')
  }

  async getMessageForSend() {
    let msg = `${this}`
    console.log(msg)
    return msg
  }

  async sendLeadToTelegram() {
    let msgForTg = this.getMessageForSend()
    consolelog(msgForTg)
  }

  async sendLeadToMail() {
    let msgForMail = this.getMessageForSend()
    console.log(msgForMail)
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
