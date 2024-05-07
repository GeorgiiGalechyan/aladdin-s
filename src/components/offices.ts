interface office {
  id: string,
  address: string,
  phone: string,
  phoneUrl: string,
  working: string
}

const offices: office[] = [
  {  
    id: 'volskaya',
    address: 'Саратов, Вольская, 11',
    phone: '+7 (917) 302-63-08',
    phoneUrl: 'tel:+79173026308',
    working: `Пн-Пт: 08:00-19:00
                 Cб: 10:00-17:00 
                 Вс: Выходной`
  },
  {  
    id: 'rabochaya',
    address: 'Саратов, Рабочая, 41/43',
    phone: '+7 (917) 980-94-62',
    phoneUrl: 'tel:+79173026308',
    working: `Пн-Пт: 08:00-19:00
                 Cб: 10:00-17:00 
                 Вс: Выходной`
  },
]

export default offices