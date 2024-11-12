// нужно ли определять дату в конструкторе или вне его???

class Lead {
  constructor(sourse, formData) {
    this.sourse = sourse

    // нужно ли определять дату в конструкторе или вне его???
    this.createDate = new Date()
    this.name = formData.name
    this.contacts = formData.contacts
    this.messages = [formData.message]
  }

  // Statuses: New, Processing, Qualified, Unqualified
  status = 'New'

  getAge() {
    let nowDate = new date()
    let age = nowDate - createDate
    return age
  }
}
