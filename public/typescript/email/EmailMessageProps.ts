export enum EmailTemplates {
  NewLead = 'newLead',
  Reg = 'registration',
  LeadToManager = 'fromLeadToManager',
  ManagerToLead = 'fromManagerToLead',
}

export type EmailSender = {
  name: string
  address: string
}

export type NodemailerAddresObject = {
  name: string
  address: string
}

export type EmailMessageConfig = {
  template?: EmailTemplates
  poolConfig?: string
  from?: NodemailerAddresObject
  subject?: string
  email?: string
  cc?: []
  bcc?: []
  text?: string
  html?: string
  attachments?: any
}

export type NodemailerSendMessageConfig = {
  from: NodemailerAddresObject
  to: string
  cc?: []
  bcc?: []
  subject: string
  text?: string
  html?: string
  attachments?: any
}
