// Nicht-öffentliche Pfade — werden sowohl in robots.txt disallowed als auch aus
// der Sitemap ausgeschlossen.
const nonPublicPaths = [
  '/pflege-planer',
  '/login',
  '/_studio',
  '/platzhalter-patienteninformationen-datenschutz',
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    // @nuxtjs/sitemap muss vor @nuxt/content geladen werden, sonst greift die
    // Content-Integration (defineSitemapSchema) nicht.
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxthub/core',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    'nuxt-studio',
    '@nuxtjs/seo',
    '@nuxtjs/robots',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      titleTemplate: '%s — Holstein-Diepold & Dr. Diepold',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://praxis-hd.de',
    name: 'Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold',
    description: 'Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold in Northeim: Vorsorgen, Impfungen, Akutsprechstunde, Neuropädiatrie, Allergologie und Osteopathie.',
    defaultLocale: 'de',
  },

  // Farbmodus: Die öffentliche Website ist ausschließlich hell — kein System-Dark-Mode.
  // Dark Mode gibt es nur im Pflege-Planer, dort per `definePageMeta({ colorMode: 'dark' })`
  // erzwungen (erzwungene Seiten schreiben nichts in den Storage, können also nicht
  // auf die öffentliche Seite durchschlagen).
  // `storageKey` ist bewusst neu gesetzt: entwertet die alten, in Browsern gespeicherten
  // 'dark'-Werte aus der früheren Layout-Logik.
  colorMode: {
    preference: 'light',
    fallback: 'light',
    storageKey: 'praxis-color-mode',
  },

  content: {
    experimental: { sqliteConnector: 'native' as const },
    // Ohne das würde der Parser bei page-Collections den ersten Absatz des Bodys
    // als `description` (und ein führendes H1 als `title`) übernehmen. Für
    // `aktuelles` unerwünscht – Titel stehen im Frontmatter, eine description
    // brauchen die Einträge nicht. Entfernt nichts aus dem gerenderten Body.
    build: {
      markdown: { contentHeading: false },
    },
  },

  runtimeConfig: {
    allowedUsers: process.env.NUXT_ALLOWED_USERS || '',
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID || '',
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET || '',
      },
    },
    session: {
      password: process.env.NUXT_SESSION_PASSWORD || '',
    },
  },

  routeRules: {
    // Default: alle Routen beim Build vorrendern (statisch). Default-Layout = praxis (app/layouts/default.vue)
    '/**': { prerender: true },
    // Nuxt Studio: nicht vorrendern (wird bei Production mit SSR für Auth benötigt)
    '/_studio': { prerender: false },
    '/_studio/**': { prerender: false },
    // OAuth: dynamisch, nicht prerendern (sonst wird localhost-redirect_uri eingebacken)
    '/auth/**': { prerender: false },
    // Pflege-Planer: nicht vorrendern (SPA/on-demand), eigenes Layout
    '/pflege-planer': { appLayout: 'pflege-planer', prerender: false },
    '/pflege-planer/**': { appLayout: 'pflege-planer', prerender: false },
    // Alte WP-URLs: server-seitige 301-Redirects auf neue Routes (SEO/Ranking erhalten)
    '/kontakt': { redirect: { to: '/termine', statusCode: 301 } },
    '/startseite': { redirect: { to: '/', statusCode: 301 } },
    '/uber-uns': { redirect: { to: '/ueber-uns', statusCode: 301 } },
    '/uber-uns/mitarbeiterinnen': { redirect: { to: '/ueber-uns', statusCode: 301 } },
    '/uber-uns/der-arzt': { redirect: { to: '/ueber-uns', statusCode: 301 } },
    '/uber-uns/die-aerztin': { redirect: { to: '/ueber-uns', statusCode: 301 } },
    '/uber-uns/leistungsspektrum': { redirect: { to: '/leistungen', statusCode: 301 } },
    '/uber-uns/praxisansichten': { redirect: { to: '/ueber-uns', statusCode: 301 } },
    '/kontakt-und-anfahrt': { redirect: { to: '/termine#anfahrt', statusCode: 301 } },
    '/sprechzeiten': { redirect: { to: '/termine', statusCode: 301 } },
    '/patienteninfos/dgkj-elterninformationen': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/patienteninfos/allergie-informationen': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/patienteninfos/link-sammlung': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/patienteninfos/verschiedenes': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/patienteninfos/corona-impfung': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/patienteninfos/ernaehrung': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/patienteninfos/rund-ums-internet': { redirect: { to: '/patienteninfos', statusCode: 301 } },
    '/notfaelle-bereitschaftsdienst': { redirect: { to: '/notfaelle', statusCode: 301 } },
    // Die App-Sektion liegt auf /termine, nicht auf der Startseite.
    '/praxis-app': { redirect: { to: '/termine#app', statusCode: 301 } },
    // Aktuelles ist jetzt eine data-Collection ohne Einzelseiten – alte, evtl.
    // indexierte URLs auf die Startseite umleiten.
    '/aktuelles': { redirect: { to: '/', statusCode: 301 } },
    '/aktuelles/**': { redirect: { to: '/', statusCode: 301 } },
  },

  experimental: {
    viteEnvironmentApi: true,
  },

  compatibilityDate: '2025-12-11',

  nitro: {
    experimental: {
      tasks: true,
    },
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  hub: {
    db: 'sqlite',
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'date-fns',
        'date-fns/locale',
      ],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: true,
    },
    customCollections: [{
      prefix: 'praxis',
      dir: './app/assets/icons',
    }],
  },

  // OAuth-Routen existieren nur zur Laufzeit (prerender: false) und antworten beim
  // Prerender zwangsläufig mit 404 – für den Link-Checker ein Falsch-Positiv.
  linkChecker: {
    excludeLinks: ['/auth/**'],
  },

  // OG-Image-Modul ist Teil von @nuxtjs/seo, brauchen wir aktuell aber nicht
  // (Issue für späteres Setup mit @takumi-rs/core ist angelegt).
  ogImage: {
    enabled: false,
  },

  // Indexing-Steuerung: Disallow in robots.txt; ergänzend setzen wir pro Page bei Bedarf
  // useSeoMeta({ robots: 'noindex' }).
  robots: {
    disallow: nonPublicPaths,
  },

  // Nicht-öffentliche Routen aus der Sitemap fernhalten (`/**` deckt Unterrouten ab).
  // zeroRuntime: Sitemap wird beim Build statisch erzeugt — kein Runtime-Code im Server-Bundle.
  // Passt, weil Content via Files kommt und Studio-Edits einen Deploy auslösen.
  sitemap: {
    exclude: nonPublicPaths.flatMap(p => [p, `${p}/**`]),
    zeroRuntime: true,
  },

  studio: {
    route: '/_studio',
    // Repository für Production-Publish: Cloudflare erkennt Repo nicht automatisch.
    // Bitte owner/repo/branch anpassen (siehe https://nuxt.studio/setup):
    repository: {
      provider: 'github',
      owner: 'pauldiepold',
      repo: 'praxis-planer-nuxt',
      branch: 'main',
    },
    // Steuert die Studio-UI-Sprache *und* das Nuxt-UI-Locale der Editor-App –
    // damit rendern Datumsfelder als TT.MM.JJJJ statt mm/dd/yyyy.
    i18n: {
      defaultLocale: 'de',
    },
    editor: {
      iconLibraries: ['lucide'],
    },
  },
})
