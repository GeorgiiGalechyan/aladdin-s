import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import isMobilePhone from 'validator/lib/isMobilePhone'

export const lead = {
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
      formConsent: z.boolean(),
    }),
    handler: async (input, ctx) => {
      console.log({
        input: input,
        context: ctx,
      })
    },
  }),
}
