import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'

import isMobilePhone from 'validator/lib/isMobilePhone'

import { sendMessageToTelegram } from 'src/utils/telegram/send-to-telegram'
import { TGTemplates } from '@ts/telegram/TGMessageProps'

import { sendMessageToEmail } from 'src/utils/mail/send-to-email'
import { EmailTemplates } from '@ts/email/EmailMessageProps'

// console.log(isMobilePhone('+79030238585', 'any', { strictMode: true }))

export let lead = {
  create: defineAction({
    accept: 'form',
    input: z.object({
      leadName: z.string().trim().min(2).max(50),
      leadPhone: z
        .string()
        .trim()
        .refine(
          (val) => {
            return val.length <= 255
            // return isMobilePhone(val, 'any', { strictMode: true })
          },
          { message: 'Incorrect phone number.' }
        ),
      formConsent: z.boolean({ message: 'FormConsent is not boolean.' }),
    }),

    handler: async ({ leadName, leadPhone }, ctx) => {
      // let EmailConfig: EmailMessageConfig =

      // let TGConfig: TGMessageConfig =

      let TGResult = await sendMessageToTelegram({
        template: TGTemplates.NewLead,
        text: `<strong>${leadName}:</strong> ${leadPhone}`,
      })

      let EmailResult = await sendMessageToEmail({
        template: EmailTemplates.NewLead,
        from: {
          name: 'Сайт aladdin-s.ru',
          address: 'galechyan23@yandex.ru',
        },
        html: `<div><strong>${leadName}:</strong> ${leadPhone}</div>`,
      })

      if (TGResult.error && EmailResult.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'TG Bot and Nodemailer SMTPS server are not working',
        })
      }

      if (TGResult.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'TG Bot error',
        })
      }

      if (EmailResult.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Nodemailer SMTPS server error  ',
        })
      }

      return { tg: TGResult.data, email: EmailResult.data }
    },
  }),
}
