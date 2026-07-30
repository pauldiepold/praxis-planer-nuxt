export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  // Kein Redirect weg von /anmelden: der Anmelde-Hub zeigt beide Zugänge samt Status und
  // muss auch für Angemeldete erreichbar bleiben (sonst ist die Redaktion unerreichbar).
  if (!loggedIn.value && to.path.startsWith('/pflege-planer')) {
    return navigateTo('/anmelden')
  }
})
