// Нерешенные задачи:
// throw или return new Error()... Нужно определиться в будущем!!!

/*
 * LeadSourse - должен сожержать информацию об источнике лида ()
 */

export class LeadSourse {
  constructor(id, name, type, url, description) {
    try {
      // Проверяем значение id
      if (typeof id === 'string') {
        this.id = id
      } else {
        throw new TypeError('"Id" должно иметь тип "string"!')
      }

      // Проверяем значение name
      if (typeof name === 'string') {
        this.name = name
      } else {
        throw new TypeError('"Name" должно иметь тип "string"!')
      }

      if (typeof description === 'string') {
        this.description = description
      } else {
        this.description = 'No description'
      }

      if (type && typeof type === 'string') {
        // На данный момент источники: Main site, Landing page и VK
        switch (type) {
          case 'Main site':
            this.type = type
            break
          case 'Landing page':
            this.type = type
            break
          case 'VK':
            this.type = type

            break
          default:
            // Либо вернуть, либо сбросить ошибку... решу потом
            throw new Error('Unknown source of leads. Could it be an outside attack?')
        }
      } else {
        // Либо вернуть, либо сбросить ошибку... решу потом
        throw new TypeError('"Type" is not a string!')
      }

      if (url && typeof url === 'string') {
        this.url = url
      } else {
        throw new TypeError('"URL" is not a string!')
      }
    } catch (error) {
      // Либо вернуть, либо сбросить ошибку... решу потом
      console.error(error)
      return false
    }
  }
}
