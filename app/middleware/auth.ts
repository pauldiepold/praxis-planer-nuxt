export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, ready } = useUserSession()

  // Warten bis die Session bereit ist
  while (!ready.value) {
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  // Nur Pflege-Planer-Bereich schützen; nicht eingeloggt → zur öffentlichen Startseite
  if (!loggedIn.value && to.path.startsWith('/pflege-planer')) {
    return navigateTo('/')
  }
})
