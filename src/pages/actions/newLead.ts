import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import isMobilePhone from 'validator/lib/isMobilePhone'

import { sendMessageToTelegram } from 'src/utils/telegram/send-to-telegram'
import { TGTemplates, type TGMessageConfig } from '@ts/telegram/TGMessageProps'

import { sendMessageToEmail } from 'src/utils/mail/send-to-email'
import { EmailTemplates, type EmailMessageConfig } from '@ts/email/EmailMessageProps'

export let newLead = {
  createLead: defineAction({
    accept: 'form',
    input: z.object({
      leadName: z.string().trim().min(2).max(50),
      leadPhone: z
        .string()
        .trim()
        .refine(
          (leadPhone) => {
            isMobilePhone(leadPhone, 'any', { strictMode: true })
          },
          { message: 'Incorrect phone number.' }
        ),
      formConsent: z.boolean({ message: 'FormConsent is not boolean.' }),
    }),
    handler: async ({ leadName, leadPhone }: { leadName: string; leadPhone: string }, ctx) => {
      console.log('Avtion NewLead is started...')
      console.log({ payload: { leadName, leadPhone }, ctx })

      let EmailConfig: EmailMessageConfig = {
        template: EmailTemplates.NewLead,
        sender: {
          name: 'Auto message',
          address: 'galechyan23@yandex.ru',
        },
        message: { leadName, leadPhone },
      }

      let TGConfig: TGMessageConfig = {
        template: TGTemplates.NewLead,
        message: { leadName, leadPhone },
      }

      sendMessageToTelegram(TGConfig)
      sendMessageToEmail(EmailConfig)
      return new Response('Отправлено', { status: 23 })
    },
  }),
}

// export type EmailMessageConfig = {
//   template?: EmailTemplates
//   poolConfig?: string
//   sender?: EmailSender
//   subject?: string
//   email: string
//   message: EmailMessage
// }
