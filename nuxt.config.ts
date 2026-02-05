// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@pinia/nuxt',
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
    // Öffentliche statische Praxis-Seiten: Pre-Rendering für bessere Performance & SEO
    '/': { prerender: true },
    '/datenschutz': { prerender: true },
    '/impressum': { prerender: true },
    '/leistungen': { prerender: true },
    '/notdienst': { prerender: true },
    '/patienteninfos': { prerender: true },
    '/termine': { prerender: true },
    '/ueber-uns': { prerender: true },
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
})
