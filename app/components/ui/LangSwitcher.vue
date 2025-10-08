<script setup lang="ts">
import type { Variant, LangCode } from '~/types/i18n'
import { computed } from 'vue'
import { useLocaleSwitch } from '@/composables/useLocaleSwitch'

const props = defineProps<{
  variant?: Variant
  only?: LangCode[]
}>()

const { locale, items, setLang } = useLocaleSwitch(props.only)

const currentCode = computed(() =>
  ((locale as unknown as { value?: string })?.value ?? String(locale)).toLowerCase(),
)

function flagOf(code: LangCode) {
  switch (code) {
    case 'vi':
      return '🇻🇳'
    case 'en':
      return '🇺🇸'
    case 'ko':
      return '🇰🇷'
    default:
      return '🏳️'
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="opt in items"
      :key="opt.code"
      type="button"
      :title="opt.label"
      :aria-pressed="opt.code === currentCode"
      class="inline-flex items-center justify-center rounded-full border border-gray-200/60 bg-white text-base text-gray-700 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:shadow"
      :class="[
        props.variant === 'fab' ? 'h-11 w-11' : 'h-9 w-9',
        opt.code === currentCode
          ? 'ring-2 ring-black dark:ring-white'
          : 'hover:ring-1 hover:ring-gray-400/60 dark:hover:ring-gray-500/60',
      ]"
      @click="setLang(opt.code)"
    >
      <span class="mb-1 text-lg leading-none">
        {{ flagOf(opt.code as LangCode) }}
      </span>
    </button>
  </div>
</template>
