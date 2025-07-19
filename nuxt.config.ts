// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils'
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    allowedUsers: ''
  },

  compatibilityDate: '2025-07-16'
})
