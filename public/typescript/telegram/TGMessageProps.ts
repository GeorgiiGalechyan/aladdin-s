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

export interface TGMessageConfig {
  template?: TGTemplates
  token?: string
  chat_id?: string | number
  text: string
  parse_mode?: ParseMode
}
