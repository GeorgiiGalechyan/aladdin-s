export enum EmailTemplates {
  NewLead = 'newLead',
  LeadToManager = 'fromLeadToManager',
  ManagerToLead = 'fromManagerToLead',
}

export type EmailSender = {
  name: string
  address: string
}

export type EmailMessage =
  | {
      leadName: string
      leadPhone: string
    }
  | string

export type EmailMessageConfig = {
  template?: EmailTemplates
  poolConfig?: string
  sender?: EmailSender
  subject?: string
  email?: string
  message: EmailMessage
}
