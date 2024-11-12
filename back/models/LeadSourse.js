// Нерешенные задачи:
// throw или return new Error()... Нужно определиться в будущем!!!

/*
    LeadSourse - должен сожержать информацию об источнике лида ()
*/

export class LeadSourse {
  constructor(id, name, type, description, url) {
    this.id = id
    this.name = name
    this.description = description

    try {
      if (typeof type === String && typeof url === String) {
        switch (type) {
          case 'Main site':
            this.type = type
            this.pageUrl = url
            break
          case 'Landing page':
            this.type = type
            this.pageUrl = url
            break
          case 'VK':
            this.type = type
            this.pageUrl = url
            break
          default:
            // Либо вернуть, либо сбросить ошибку... решу потом
            throw new Error('Unknown source of leads. Could it be an outside attack?')
        }
      }

      // Либо вернуть, либо сбросить ошибку... решу потом
      throw new TypeError('Type or url is not a string!')
    } catch (error) {
      // Либо вернуть, либо сбросить ошибку... решу потом
      console.error(error)
      return false
    }
  }
}
