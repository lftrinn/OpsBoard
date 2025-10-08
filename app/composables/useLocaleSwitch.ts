import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'
import { detectBrowserLang, SUPPORTED_LANGS, type LangCode } from '@/utils/i18n'

export function useLocaleSwitch(only?: LangCode[]) {
  const { locale, locales, t, setLocale } = useI18n()
  const open = ref(false)

  const switchLocalePath = (() => {
    try {
      return useSwitchLocalePath?.()
    } catch {
      return null
    }
  })()

  const visibleCodes = computed<LangCode[]>(() => {
    const supported = only?.length
      ? SUPPORTED_LANGS.filter((c) => only.includes(c))
      : SUPPORTED_LANGS
    const fromConfig = (Array.isArray(locales.value) ? locales.value : [])
      .map((l: { code?: string } | string) =>
        String(typeof l === 'string' ? l : (l.code ?? ''))
          .toLowerCase()
          .slice(0, 2),
      )
      .filter((c) => (supported as string[]).includes(c))
    return SUPPORTED_LANGS.filter((c) => fromConfig.includes(c) && supported.includes(c))
  })

  const items = computed(() =>
    visibleCodes.value.map((code) => ({
      code,
      label: t?.(`locales.${code}`) || code.toUpperCase(),
    })),
  )

  function setLang(code: LangCode) {
    const current =
      (locale as unknown as { value?: string })?.value ?? (typeof locale === 'string' ? locale : '')
    if (current?.toLowerCase() === code) {
      open.value = false
      return
    }
    if (switchLocalePath) {
      const path = switchLocalePath(code)
      navigateTo(path)
    } else {
      setLocale(code)
    }
    open.value = false
  }

  onMounted(() => {
    if (!visibleCodes.value.length) return
    const target = detectBrowserLang(visibleCodes.value, 'en')
    const current =
      (locale as unknown as { value?: string })?.value ?? (typeof locale === 'string' ? locale : '')
    if (current?.toLowerCase() !== target) setLang(target)
  })

  return {
    open,
    locale,
    items,
    setLang,
  }
}
