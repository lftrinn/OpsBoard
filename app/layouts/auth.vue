<script setup lang="ts">
import LangSwitcher from '~/components/ui/LangSwitcher.vue'
import ThemeToggle from '~/components/ui/ThemeToggle.vue'
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-colors duration-300 dark:bg-gray-900"
  >
    <section
      class="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-900 shadow-lg transition-colors duration-300 dark:bg-gray-800 dark:text-gray-100"
    >
      <slot />
    </section>
    <div class="absolute right-4 top-4 flex items-center gap-2">
      <ThemeToggle />
      <LangSwitcher />
    </div>
  </main>
</template>
