export enum TGTemplates {
  NewLead = 'newLead',
  LeadToManager = 'fromLeadToManager',
  ManagerToLead = 'fromManagerToLead',
}

export enum ParseMode {
  HTML = 'HTML',
  MD = 'Markdown',
  MDv2 = 'MarkdownV2',
}

export type TGTextMessage = string

export type TGLeadMessage = {
  leadName: string
  leadPhone: string
}

export interface TGMessageConfig {
  template?: TGTemplates
  token?: string
  chat_id?: string | number
  message: TGTextMessage | TGLeadMessage
  parse_mode?: ParseMode
}
