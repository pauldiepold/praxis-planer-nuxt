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
    '/home/kontakt': { redirect: '/home/termine' },
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
