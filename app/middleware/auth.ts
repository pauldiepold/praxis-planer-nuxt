export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, ready } = useUserSession()
  
  // Warten bis die Session bereit ist
  while (!ready.value) {
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  
  // Wenn nicht eingeloggt, zur Startseite weiterleiten (dort ist der Login-Button)
  if (!loggedIn.value && to.path !== '/') {
    return navigateTo('/')
  }
}) 