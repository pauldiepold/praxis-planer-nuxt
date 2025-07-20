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

export {} 