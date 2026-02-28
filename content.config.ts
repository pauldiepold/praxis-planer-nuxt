import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    aktuelles: defineCollection({
      type: 'page',
      source: 'aktuelles/*.md',
      schema: z.object({
        date: z.string(),
        title: z.string(),
        hidden: z.boolean(),
        border: z.enum(['green', 'yellow', 'red']).optional(),
      }),
      indexes: [
        { columns: ['path'] },
        { columns: ['date'] },
        { columns: ['hidden'] },
      ],
    }),
  },
})
