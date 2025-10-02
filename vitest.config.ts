import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    setupFiles: ['vitest.setup.ts'],
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      provider: 'v8',
      include: ['app/**/*.{ts,vue}', 'server/**/*.ts'],
    },
  },
})
