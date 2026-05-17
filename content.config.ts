import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    aktuelles: defineCollection({
      type: 'page',
      source: 'aktuelles/*.md',
      schema: z.object({
        date: z.string(),
        title: z.string(),
        description: z.string(),
        hidden: z.boolean(),
        border: z.enum(['green', 'yellow', 'red']).optional(),
        sitemap: defineSitemapSchema({
          name: 'aktuelles',
          filter: entry => !entry.hidden,
          onUrl: (url, entry) => {
            url.lastmod = entry.date
          },
        }),
      }),
      indexes: [
        { columns: ['path'] },
        { columns: ['date'] },
        { columns: ['hidden'] },
      ],
    }),
  },
})
