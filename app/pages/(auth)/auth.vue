<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['redirect-if-authenticated'],
})
</script>

<template>
  <NuxtPage />
</template>
