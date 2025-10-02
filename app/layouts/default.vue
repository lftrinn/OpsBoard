<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, setLocale } = useI18n()

async function switchLocale(code: 'en' | 'vi' | 'ko') {
  await setLocale(code)
}
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v) => (colorMode.preference = v ? 'dark' : 'light'),
})
</script>

<template>
  <main class="min-h-screen bg-bg text-fg">
    <header class="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 class="font-semibold">Vue-inspired Design System · Tokens & Components</h1>
        <div class="space-x-2 p-4">
          <h1 class="mb-4 text-xl font-semibold">{{ t('app.title') }}</h1>
          <button class="rounded border px-3 py-1" @click="switchLocale('en')">EN</button>
          <button class="rounded border px-3 py-1" @click="switchLocale('vi')">VI</button>
          <button class="rounded border px-3 py-1" @click="switchLocale('ko')">KO</button>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-muted/90">Theme</span>
          <button
            class="rounded-lg border border-border bg-card px-3 py-1.5 hover:bg-accent/10"
            @click="isDark = !isDark"
          >
            {{ isDark ? 'Dark' : 'Light' }}
          </button>
        </div>
      </div>
    </header>
    <slot />
  </main>
</template>
