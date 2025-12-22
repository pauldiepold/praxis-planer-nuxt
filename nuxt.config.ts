// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
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
    oauthGithubClientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET || '',
    sessionPassword: process.env.NUXT_SESSION_PASSWORD || '',
    public: {
      oauthGithubClientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID || '',
    },
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
})
