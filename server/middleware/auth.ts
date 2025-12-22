export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  // Auth-Routen nicht schützen
  if (path.startsWith('/auth/') || path.startsWith('/api/_auth/')) {
    return
  }

  // Alle anderen API-Routen schützen
  if (path.startsWith('/api/')) {
    try {
      await requireUserSession(event)
    }
    catch {
      throw createError({
        statusCode: 401,
        message: 'Nicht authentifiziert',
      })
    }
  }
})
