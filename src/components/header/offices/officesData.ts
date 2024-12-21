import { type IOffice } from '@ts/ui/offces/office'

const offices: IOffice[] = []

const volskaya: IOffice = {
  id: 'volskaya',
  name: 'оф. Вольская',
  address: 'ул. Вольская, 11',
  phone: '+7 (917) 302-63-08',
  phoneUrl: 'tel:+79173026308',
  working: 'Пн-Пт: 08:00-19:00\nCб: 10:00-17:00',
  default: true,
}

const rabochaya: IOffice = {
  id: 'rabochaya',
  name: 'оф. Рабочая',
  address: 'ул. Рабочая, 41/43',
  phone: '+7 (917) 980-94-62',
  phoneUrl: 'tel:+79179809462',
  working: 'Пн-Пт: 08:00-19:00\nCб: 10:00-17:00',
  default: false,
}

offices.push(volskaya, rabochaya)

export default offices
