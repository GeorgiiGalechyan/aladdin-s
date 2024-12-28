import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'

// Actions
import { lead } from './lead'

export let server = {
  test: defineAction({
    accept: 'form',
    input: z.object({
      leadName: z.string().min(2, { message: 'Input value too short.' }).max(50, { message: 'Input value too long.' }),
      leadPhone: z
        .string()
        .min(10, { message: 'Input value too short.' })
        .max(20, { message: 'Input value too long.' }),
      formConsent: z.boolean({ message: 'Input value not a boolean.' }),
    }),
    handler: (input) => {
      if (!input) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Error: Invalid or empty "input".' })
      }
      console.log(input)
      return {
        message: 'test',
        status: 200,
      }
    },
  }),
  lead,
}
