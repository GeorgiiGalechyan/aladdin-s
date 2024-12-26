import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'

import isMobilePhone from 'validator/lib/isMobilePhone'

import { sendMessageToTelegram } from 'src/utils/telegram/send-to-telegram'
import { TGTemplates, type TGMessageConfig } from '@ts/telegram/TGMessageProps'

import { sendMessageToEmail } from 'src/utils/mail/send-to-email'
import { EmailTemplates, type EmailMessageConfig } from '@ts/email/EmailMessageProps'
import { error } from 'node_modules/astro/dist/core/logger/core'

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
      let EmailConfig: EmailMessageConfig = {
        template: EmailTemplates.NewLead,
        from: {
          name: 'Сайт aladdin-s.ru',
          address: 'galechyan23@yandex.ru',
        },
        html: `<div><strong>${leadName}:</strong> ${leadPhone}</div>`,
      }

      let TGConfig: TGMessageConfig = {
        template: TGTemplates.NewLead,
        text: `<strong>${leadName}:</strong> ${leadPhone}`,
      }

      let TGResult = await sendMessageToTelegram(TGConfig)
      let EmailResult = await sendMessageToEmail(EmailConfig)

      if (!TGResult.error && !EmailResult.error) {
        return {
          succes: true,
          error: undefined,
          result: {
            TG: TGResult.data,
            Email: EmailResult.data,
          },
        }
      } else if (TGResult.error && EmailResult.error) {
        return {
          succes: false,
          error: {
            TG: TGResult.error,
            Email: EmailResult.error,
          },
          result: undefined,
        }
      } else if (TGResult.error || EmailResult.error) {
        return {
          succes: false,
          error: {
            TG: TGResult.error || undefined,
            Email: EmailResult.error || undefined,
          },
          result: undefined,
        }
      }
    },
  }),
}
