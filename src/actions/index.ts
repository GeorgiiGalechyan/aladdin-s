import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

// Actions
import { lead } from './lead'

export let server = {
  test: defineAction({
    accept: 'form',
    input: z.object({
      leadName: z.any(),
      leadPhone: z.any(),
      formConsent: z.any(),
    }),
    handler: (input) => {
      console.log(input)
      return {
        message: 'test',
        status: 999,
      }
    },
  }),
  lead,
}
