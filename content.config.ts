import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    aktuelles: defineCollection({
      // page-Collection: erhält in Nuxt Studio den WYSIWYG-Markdown-Editor für den
      // Body (data-Collections können das nicht, siehe ADR 0001). Es gibt aber
      // bewusst KEINE `[...path].vue`-Route – die Einträge werden ausschließlich als
      // Liste auf der Startseite gerendert; alte `/aktuelles/**`-URLs → 301 auf `/`.
      //
      // `title` ist das von page mitgelieferte Feld, hier nur mit deutschem Label
      // überschrieben. Ein eigener deutscher Alias-Key würde im Studio-Formular ein
      // Doppelfeld erzeugen, daher bewusst nicht.
      type: 'page',
      source: 'aktuelles/*.md',
      schema: z.object({
        title: z.string().editor({ label: 'Überschrift' }),
        // Ohne eigene Route sind `description`, `seo` und `navigation` wirkungslos –
        // im Studio-Formular wären es nur verwirrende Leerfelder. Typgleich zum
        // page-Schema neu deklariert (inkl. Defaults, sonst kippen die Spalten auf
        // NULL), damit `hidden` greift, ohne die Daten zu ändern. Die Auto-Befüllung
        // der description aus dem Body unterbindet
        // `content.build.markdown.contentHeading: false` in der nuxt.config.
        description: z.string().optional().editor({ hidden: true }),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
        }).default({}).editor({ hidden: true }),
        navigation: z.union([
          z.boolean(),
          z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            icon: z.string().optional(),
          }),
        ]).default(true).editor({ hidden: true }),
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
