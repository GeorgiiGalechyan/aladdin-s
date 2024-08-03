import { type IHeaderMenuItem } from '@interfaces/webComponents/menu'

const headerMenu: IHeaderMenuItem[] = []

// https://aladdin-s.ru/
const home: IHeaderMenuItem = {
  id: 'home',
  title: 'Главная',
  url: '/ru/',
}

// https://aladdin-s.ru/services/
const services: IHeaderMenuItem = {
  id: 'service',
  title: 'Услуги',
  url: '/ru/services/',
  sub: [],
}

// https://aladdin-s.ru/services/doc-translation/
const docTranslation: IHeaderMenuItem = {
  id: 'doc-translations',
  title: 'Переводы документов',
  description: `Простые и нотариально заверенные переводы документов для путешествий, учёбы, работы и бизнеса с/на иностранные языки.`,
  url: '/ru/service/doc-translations/',
}

// https://aladdin-s.ru/services/design-translation/
const designTranslation: IHeaderMenuItem = {
  id: 'design-translation',
  title: 'Дизайнерский перевод',
  description: `Перевод надписей на изображениях, эмблемах и логотипах с применением графических редакторов.`,
  url: '/ru/service/design-translations/',
}

// https://aladdin-s.ru/services/doc-apostill/
const docApostille = {
  id: 'apostille',
  title: 'Апостиль (упрощённая легализация)',
  description:
    'Упрощенная легализация документов путём проставления специального штампа (апостиля) для их использования на территории иностранных стран-участников Гаагской конвенции 1961 года.',
  url: '/ru/service/doc-apostille/',
}

// https://aladdin-s.ru/services/doc-legalization/
const docLegalization: IHeaderMenuItem = {
  id: 'doc-legalization',
  title: 'Легализация документов',
  description:
    'Придание российским документам юридической силы для их использования на территории иностранных стран, не подписавших Гаагскую конвенцию 1961 года.',
  url: '/ru/service/doc-legalization/',
}

// https://aladdin-s.ru/service/legal-migration/
const legalMigration: IHeaderMenuItem = {
  // service/migration/
  id: 'migration',
  title: 'Миграционные услуги',
  description: `Помощь в сборе и подаче документов для получения:\n
  - разрешения на временное прожвание (РВП),\n
  - разрешения на временное прожвание в целях получения образования (РВПО)\n
  - вида на жительство (ВНЖ),\n
  - трудового патента (для безвизовых стран),\n
  - разрешения на работу (для визовых стран),\n
  - гражданства Российской Федерации,\n
  - свидетельства участника Госпрограммы по переселению соотечественников,\n
  - консульских услуг`,
  url: '/ru/service/legal-migration/',
}

// https://aladdin-s.ru/service/legal-lawyer/
const legalLawyer: IHeaderMenuItem = {
  id: 'law',
  title: 'Юридические услуги',
  description: `Помощь юриста и адвоката в области миграционного права:\n
    - консультации,\n
    - cоставление нестандартных документов, запросов, писем и др.,\n
    - запрос и подача документов адвокатом в отсутствие доверителя,\n
    - представительство в судах всех инстанций,\n
    - оспаривание административных постановлений,\n
    - оспаривание решений компетентных органов,\n
    - оспаривание судебных решений (апелляция, кассация).`,
  url: '/ru/service/legal-lawyer/',
}

// https://aladdin-s.ru/price/
const price: IHeaderMenuItem = {
  id: 'price',
  title: 'Цены',
  url: '/ru/price/',
}

// https://aladdin-s.ru/vacancies/
const vacancies: IHeaderMenuItem = {
  id: 'vacancies',
  title: 'Вакансии',
  url: '/ru/vacancies/',
}

// https://aladdin-s.ru/articles/
const articles: IHeaderMenuItem = {
  id: 'articles',
  title: 'Статьи',
  url: '/ru/articles/',
}

// https://aladdin-s.ru/contacts/
const contacts: IHeaderMenuItem = {
  id: 'contacts',
  title: 'Контакты',
  url: '/ru/contacts/',
}

// push menuItem in menu
headerMenu.push(home, services, price, vacancies, articles, contacts)

// push sub in menuItem 'services'
services.sub?.push(docTranslation, designTranslation, docApostille, docLegalization, legalMigration, legalLawyer)

export default headerMenu
