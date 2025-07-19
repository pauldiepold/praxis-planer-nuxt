export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    const { allowedUsers } = useRuntimeConfig(event)
    console.log(user)
    console.log(user.login)
    console.log(allowedUsers)
    // Hole die erlaubten E-Mails aus der ENV
    const allowed = (allowedUsers || '').split(',').map(e => e.trim().toLowerCase())
    // Prüfe, ob die User-Email in der Liste ist
    if (!user.login || !allowed.includes(user.login.toLowerCase())) {
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
        email: user.email
      }
    })

    return sendRedirect(event, '/')
  }
})
