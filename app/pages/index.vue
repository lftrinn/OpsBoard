<!-- pages/index.vue -->
<script setup lang="ts">
const { isLoggedIn } = useAuth()

onMounted(() => {
  navigateTo(isLoggedIn.value ? '/dashboard' : '/auth/login')
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center text-gray-500">
    Redirecting to {{ isLoggedIn ? 'Dashboard' : 'Login' }}...
  </div>
</template>
