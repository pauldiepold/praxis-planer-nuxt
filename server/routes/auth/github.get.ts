export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens: _tokens }) {
    console.log('GitHub OAuth Success - Starting authentication process')
    
    try {
      const { allowedUsers } = useRuntimeConfig(event)
      console.log('Runtime config loaded, allowedUsers:', allowedUsers)
      
      // Hole die erlaubten E-Mails aus der ENV
      const allowed = (allowedUsers || '').split(',').map(e => e.trim().toLowerCase())
      console.log('Parsed allowed users:', allowed)
      console.log('User login:', user.login)
      console.log('User object:', JSON.stringify(user, null, 2))
      
      // Prüfe, ob die User-Email in der Liste ist
      if (!user.login || !allowed.includes(user.login.toLowerCase())) {
        console.log('User not allowed - login:', user.login, 'allowed users:', allowed)
        // Session löschen, falls schon gesetzt
        await setUserSession(event, { user: null })
        console.log('Session cleared for unauthorized user')
        // Weiterleitung mit Fehler
        return sendRedirect(event, '/')
      }

      console.log('User authorized, setting session...')
      await setUserSession(event, {
        user: {
          provider: 'github',
          id: String(user.id),
          name: user.name || user.login,
          avatar: user.avatar_url,
          url: user.html_url,
          email: user.email
        }
      })
      console.log('Session set successfully')

      return sendRedirect(event, '/')
    } catch (error: unknown) {
      console.error('Error in GitHub OAuth handler:', error)
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      console.error('User object that caused error:', JSON.stringify(user, null, 2))
      
      // Fallback: Session löschen und zur Startseite weiterleiten
      try {
        await setUserSession(event, { user: null })
        console.log('Session cleared after error')
      } catch (sessionError) {
        console.error('Error clearing session:', sessionError)
      }
      
      return sendRedirect(event, '/')
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
