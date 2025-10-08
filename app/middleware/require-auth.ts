export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn.value && !to.path.startsWith('/auth')) {
    return navigateTo('/auth/login')
  }
})
