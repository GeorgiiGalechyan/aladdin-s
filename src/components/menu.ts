interface IMenuItem {
	id: string, 
	icon?: SVGAElement,
	title: string, 
  description?: string, 
	url: string, 
	sub?: IMenuItem[],
}


const menu: IMenuItem[] = [
  { // '/'
    id: 'home', 
    title: 'Главная', 
    url: "/"
  },
  { // '/services/'
    id: 'service', 
    title: 'Услуги', 
    url: "/services/", 
    sub: [
      { // services/doc-translation/
        id: 'doc-translations', 
        title: 'Переводы документов', 
        description: `Простые и нотариально заверенные переводы документов для путешествий, учёбы, работы и бизнеса с/на иностранные языки.`, 
        url: '/service/doc-translations/'
      },
      { // services/design-translation/
        id: 'design-translation', 
        title: 'Дизайнерский перевод', 
        description: `Перевод надписей на изображениях, эмблемах и логотипах с применением графических редакторов.`, 
        url: '/service/design-translations/'
      },
      { // services/doc-apostille/
        id: 'apostille',
        title: 'Апостиль (упрощённая легализация)', 
        description: 'Упрощенная легализация документов путём проставления специального штампа (апостиля) для их использования на территории иностранных стран-участников Гаагской конвенции 1961 года.',
        url: '/service/doc-apostille/'
      },
      { // service/doc-legalization/
        id: 'document-legalization',
        title: 'Легализация документов', 
        description: 'Придание российским документам юридической силы для их использования на территории иностранных стран, не подписавших Гаагскую конвенцию 1961 года.',
        url: '/service/doc-legalization/'
      },
      { // service/migration/
        id: 'migration', 
        title: 'Миграционные услуги', 
        description: `Помощь в сборе и подаче документов для получения: 
        - разрешения на временное прожвание (РВП),
        - разрешения на временное прожвание в целях получения образования (РВПО) 
        - вида на жительство (ВНЖ),
        - трудового патента (для безвизовых стран),
        - разрешения на работу (для визовых стран),
        - гражданства Российской Федерации,
        - свидетельства участника Госпрограммы по переселению соотечественников, 
        - консульских услуг`,
        url: '/service/legal-migration/'
      },
      { // service/law/
        id: 'law', 
        title: 'Юридические услуги', 
        description: `Помощь юриста и адвоката в области миграционного права:
        - консультации,
        - cоставление нестандартных документов, запросов, писем и др.,
        - запрос и подача документов адвокатом в отсутствие доверителя,
        - представительство в судах всех инстанций,
        - оспаривание административных постановлений,
        - оспаривание решений компетентных органов,
        - оспаривание судебных решений (апелляция, кассация).`,
        url: '/service/legal-lawyer/'
      },
    ]
  },
  { // '/price/'
    id: 'price', 
    title: 'Цены', 
    url: "/price/"
  },
  { // '/vacancies/'
    id: 'vacancies', 
    title: 'Вакансии', 
    url: "/vacancies/"
  },
  { // '/blog/'
    id: 'blog', 
    title: 'Статьи', 
    url: '/blog/'
  },
  { // '/contacts/'
    id: 'contacts', 
    title: 'Контакты', 
    url: "/contacts/"
  },
]

export default menu
export type { IMenuItem }

// const pages = {
//   home: {
//     id: 'home',
//     title: 'Главная',
//     url: '/',
//   },
//   services: {
//     id: 'services',
//     title: 'Услуги',
//     url: '/services/',
//     sub: {
//       doc: {
//         translation: {
//           id: 'translation',
//           title: 'Переводы документов',
//           url: '/services/',
//         }
//       },
//       legal: {
// 
//       }
//     }
//   }
// }