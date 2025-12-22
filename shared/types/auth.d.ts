import type { Ref } from 'vue'

// Nuxt Auth Utils Modul-Definition
declare module '#auth-utils' {
  interface User {
    provider: string
    id: string
    name: string
    avatar?: string
    url?: string
    email?: string
  }

  interface UserSession {
    // Session wird automatisch von nuxt-auth-utils verwaltet
    _placeholder?: never
  }

  interface SecureSessionData {
    // Hier können sensitive Daten gespeichert werden
    _placeholder?: never
  }
}

// Globale Typdefinitionen für nuxt-auth-utils
declare global {
  function useUserSession(): {
    loggedIn: Ref<boolean>
    user: Ref<User | null>
    ready: Ref<boolean>
    signIn: (provider?: string) => Promise<void>
    signOut: () => Promise<void>
  }
}

export {}
