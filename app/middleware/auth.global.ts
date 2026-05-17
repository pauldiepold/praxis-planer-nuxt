export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/pflege-planer')
  }

  if (!loggedIn.value && to.path.startsWith('/pflege-planer')) {
    return navigateTo('/login')
  }
})
