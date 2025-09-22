<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale, setLocale } = useI18n()

async function switchLocale(code: 'en' | 'vi' | 'ko') {
  await setLocale(code)
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>

  <div class="space-x-2 p-4">
    <h1 class="text-xl font-semibold mb-4">{{ t('app.title') }}</h1>
    <button class="px-3 py-1 border rounded" @click="switchLocale('en')">EN</button>
    <button class="px-3 py-1 border rounded" @click="switchLocale('vi')">VI</button>
    <button class="px-3 py-1 border rounded" @click="switchLocale('ko')">KO</button>
  </div>
</template>

<style>
@import "@/assets/css/tailwind.css";
</style>
