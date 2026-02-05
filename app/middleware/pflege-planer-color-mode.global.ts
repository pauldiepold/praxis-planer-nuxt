/**
 * Setzt den Color Mode abhängig vom URL-Pfad:
 * - Unter /pflege-planer/* immer Dark Mode
 * - Außerhalb davon Light Mode (öffentliche Praxis-Seiten)
 * Läuft nur im Browser (useColorMode ist client-seitig).
 */
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return
  const colorMode = useColorMode()
  if (to.path.startsWith('/pflege-planer')) {
    colorMode.preference = 'dark'
  } else {
    colorMode.preference = 'light'
  }
})
