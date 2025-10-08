<script setup lang="ts">
const { isDark, toggle } = useTheme()
const { t } = useI18n()
const props = defineProps<{ variant?: 'fab' | 'button' }>()
</script>

<template>
  <button
    :aria-pressed="isDark"
    :aria-label="t('themeToggle')"
    class="group rounded-full border border-gray-200/60 bg-white text-gray-700 shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-white"
    :class="props.variant === 'fab' ? 'flex h-11 w-11 items-center justify-center' : 'px-3 py-2'"
    @click="toggle"
  >
    <span v-if="!isDark" class="h-5 w-5" aria-hidden="true">☀️</span>
    <span v-else class="h-5 w-5" aria-hidden="true">🌙</span>
  </button>
</template>
