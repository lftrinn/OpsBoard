import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()
  // If already logged in, block visiting /auth/*
  if (isLoggedIn.value && to.path.startsWith('/auth')) {
    return navigateTo('/dashboard')
  }
})
