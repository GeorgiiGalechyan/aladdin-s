interface IUser {
  // constructor()
  id: string
  username: string
  hashedPass: string
  joined: Date

  // Добавление полей
  addFirstName: (firstName: string) => void
  addLastName: (lastName: string) => void

  addEmail: (email: string) => void
  addPhone: (phone: string) => void
  addPhoto: (URL: string) => void
  addBirthday: (birthday: string) => void

  // Получение отдельных полей
  getUsersJoinedDate: () => Date
  getUsersFirstName: () => string
  getUserslastName: () => string
  getUsersFullName: (firstname: string, lastname: string) => string
  getUsersBirthday: () => Date
  getUsersEmails: () =>
    | string[]
    | {
        name: string
        address: string
      }[]
  getUsersPhone: () => string[]
  getUsersPhoto: () => string

  // Операции с сущностью User
  getUserById: (id: string) => User
  getUserByOrder: (order: unknown) => User
  getUserByName: (name: string | object) => User
  deleteUser: (id: string) => User
}

interface ICustomer {}

interface IService {
  id: string
  article: string // артикул
  category: string
  name: string
  price: number
  description: string
  desc_short: string
  imageURL: string[]
  status: boolean // available, temporarily unavailable, archive
  count: (config?: object) => number
}

interface IOrder {
  id: string
  services: IService[]
  customer: {
    id: string // customers id
    photoURL: string
    fname: string
    lname: string
    emails: string[]
    phones: string[]
  }
  count: () => number
}

interface IDiscountPoints {}
