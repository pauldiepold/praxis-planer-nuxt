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
      titleTemplate: '%s — Kinder- und Jugendarztpraxis',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://praxis-hd.de',
    name: 'Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold',
    description: 'Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold. Vorsorgen, Impfungen, Akutsprechstunde, Neuropädiatrie, Allergologie, Osteopathie.',
    defaultLocale: 'de',
  },

  content: {
    experimental: { sqliteConnector: 'native' as const },
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
    '/praxis-app': { redirect: { to: '/#app', statusCode: 301 } },
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

  // OG-Image-Modul ist Teil von @nuxtjs/seo, brauchen wir aktuell aber nicht
  // (Issue für späteres Setup mit @takumi-rs/core ist angelegt).
  ogImage: {
    enabled: false,
  },

  // Indexing-Steuerung: Disallow in robots.txt; ergänzend setzen wir pro Page bei Bedarf
  // useSeoMeta({ robots: 'noindex' }) (z.B. aktuelles/[...path].vue bei hidden:true).
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
      branch: 'neue-website',
    },
    editor: {
      iconLibraries: ['lucide'],
    },
  },
})