import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
// import isMobilePhone from 'validator/lib/isMobilePhone'
// import { newLead } from './newLead'

export let server = {
  test: defineAction({
    accept: 'form',
    input: z.object({
      leadName: z.any(),
      // .string().trim().min(2).max(50),
      leadPhone: z.any(),
      // .string()
      // .trim()
      // .refine(
      //   (leadPhone) => {
      //     isMobilePhone(leadPhone, 'any', { strictMode: true })
      //   },
      //   { message: 'Incorrect phone number.' }
      // ),
      formConsent: z.any(),
    }),
    handler: (input) => {
      console.log(input)
      return {
        message: 'test',
        status: 999,
      }
    },
    // newLead,
  }),
}
