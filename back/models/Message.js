// Это будет любое сообщение.

export class Message {
  constructor(text, author) {
    try {
      this.date = new Date()

      if (typeof author === 'string') {
        this.author = author
      }

      if (typeof text === 'string') {
        this.text = text
      } else {
        throw new Error("A message can't exist without text!")
      }

      this.meta = { created: this.date, changed: false, lastChangeDate: false }
    } catch (error) {
      throw error
    }
  }

  changeMessage(text) {
    this.text = text
    this.meta = { created: this.date, changed: true, lastChangeDate: new Date() }

    // Должно что-то возвращать и где-то сохранять сообщение. Скорее всего в БД
  }

  forwardMessage() {}

  deleteMessage() {}
}
