// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxthub/core',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    'nuxt-studio',
  ],

  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Praxis Pflege Planer',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

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
    '/pflege-planer': { appLayout: 'pflege-planer-landing', prerender: false },
    '/pflege-planer/**': { appLayout: 'pflege-planer', prerender: false },
  },

  compatibilityDate: '2025-12-11',

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  hub: {
    db: 'sqlite',
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
  },
})
