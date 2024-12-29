import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'

import validator from 'validator'

import { sendMessageToTelegram } from 'src/utils/telegram/send-to-telegram'
import { TGTemplates } from '@ts/telegram/TGMessageProps'

import { sendMessageToEmail } from 'src/utils/mail/send-to-email'
import { EmailTemplates } from '@ts/email/EmailMessageProps'

export let lead = {
  create: defineAction({
    accept: 'form',
    input: z.object({
      leadName: z
        .string()
        .trim()
        .min(2, { message: 'The name is too short.' })
        .max(40, { message: 'The name is too long.' }),
      leadPhone: z
        .string()
        .trim()
        .transform((val) => val.replaceAll(' ', ''))
        .refine((val) => validator.isMobilePhone(val, 'any', { strictMode: true }), {
          message: 'Enter the number in international format with +',
        }),
      formConsent: z.string().refine((val) => val === 'on', { message: 'You must agree to the privacy policy.' }),
    }),

    handler: async ({ leadName, leadPhone }, ctx) => {
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
        console.log(TGResult.error, EmailResult.error)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'TG Bot and Nodemailer SMTPS server are not working.',
        })
      }

      if (TGResult.error) {
        console.log(TGResult.error)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'TG Bot error.',
        })
      }

      if (EmailResult.error) {
        console.log(EmailResult.error)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Nodemailer SMTPS server error.',
        })
      }

      return { tg: TGResult.data, email: EmailResult.data }
    },
  }),
}
