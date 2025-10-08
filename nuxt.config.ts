export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  css: ['~/assets/styles/main.scss'],
  tailwindcss: {
    cssPath: '~/assets/styles/main.scss',
    configPath: 'tailwind.config',
  },
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
  },
})
