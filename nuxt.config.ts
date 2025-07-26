// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@pinia/nuxt'
  ],

  ssr: false,

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    allowedUsers: process.env.NUXT_ALLOWED_USERS || ''
  },

  app: {
    head: {
      title: 'Praxis Pflege Planer'
    }
  },

  compatibilityDate: '2025-07-16',

  nitro: {
    experimental: {
      tasks: true
    }
  },

  hub: {
    database: true
  }
})