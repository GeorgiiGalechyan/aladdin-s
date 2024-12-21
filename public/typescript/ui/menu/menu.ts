export interface IHeaderMenuItem {
  id: string
  icon?: SVGAElement
  title: string
  description?: string
  slug: string
  sub?: IHeaderMenuItem[]
}
