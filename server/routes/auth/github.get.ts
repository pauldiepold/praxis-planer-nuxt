export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens: _tokens }) {
    try {
      const { allowedUsers } = useRuntimeConfig(event)

      // Hole die erlaubten E-Mails aus der ENV
      const allowed = (allowedUsers || '').split(',').map(e => e.trim().toLowerCase())

      // Prüfe, ob die User-Email in der Liste ist
      if (!user.login || !allowed.includes(user.login.toLowerCase())) {
        console.log('Unauthorized login attempt:', user.login)
        // Session löschen, falls schon gesetzt
        await setUserSession(event, { user: null })
        // Weiterleitung mit Fehler
        return sendRedirect(event, '/')
      }

      await setUserSession(event, {
        user: {
          provider: 'github',
          id: String(user.id),
          name: user.name || user.login,
          avatar: user.avatar_url,
          url: user.html_url,
          email: user.email,
        },
      })

      return sendRedirect(event, '/')
    }
    catch (error: unknown) {
      console.error('GitHub OAuth error:', error)

      // Fallback: Session löschen und zur Startseite weiterleiten
      try {
        await setUserSession(event, { user: null })
      }
      catch (sessionError) {
        console.error('Error clearing session:', sessionError)
      }

      return sendRedirect(event, '/')
    }
  },
  // Optional, will return a JSON error and 401 statuscode by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
