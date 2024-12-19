import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const server = {
  createProduct: defineAction({
    accept: 'form',
    input: z.object({
      /* ... */
    }),
    handler: async (input) => {
      const product = await persistToDatabase(input)
      return { id: product.id }
    },
  }),
}
