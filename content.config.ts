import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    aktuelles: defineCollection({
      // page-Collection: erhält in Nuxt Studio den WYSIWYG-Markdown-Editor für den
      // Body (data-Collections können das nicht, siehe ADR 0001). Es gibt aber
      // bewusst KEINE `[...path].vue`-Route – die Einträge werden ausschließlich als
      // Liste auf der Startseite gerendert; alte `/aktuelles/**`-URLs → 301 auf `/`.
      //
      // `title`/`description` sind die von page mitgelieferten Felder (deutsche Labels
      // fürs Studio via .editor). Eigene deutsche Alias-Keys würden im Studio-Formular
      // Doppelfelder erzeugen, daher bewusst nicht.
      type: 'page',
      source: 'aktuelles/*.md',
      schema: z.object({
        datum: z.date().editor({ label: 'Datum' }),
        farbe: z.enum(['grün', 'gelb', 'rot']).optional().editor({ label: 'Akzentfarbe' }),
        anzeigenAb: z.date().optional().editor({ label: 'Anzeigen ab' }),
        anzeigenBis: z.date().optional().editor({ label: 'Anzeigen bis' }),
      }),
      indexes: [
        { columns: ['path'] },
        { columns: ['datum'] },
      ],
    }),
    patienteninfos: defineCollection({
      type: 'data',
      source: 'patienteninfos/*.yml',
      schema: z.object({
        titel: z.string().editor({ label: 'Titel' }),
        icon: z.string().editor({ label: 'Icon', input: 'icon' }),
        beschreibung: z.string().editor({ label: 'Beschreibung' }),
        links: z.array(z.object({
          name: z.string().editor({ label: 'Name' }),
          url: z.string().editor({ label: 'URL' }),
        })).editor({ label: 'Links' }),
      }),
    }),
  },
})
