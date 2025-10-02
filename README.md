![CI + SonarCloud](https://github.com/lftrinn/OpsBoard/actions/workflows/build.yml/badge.svg)
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=lftrinn_OpsBoard)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lftrinn_OpsBoard&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lftrinn_OpsBoard)

# OpsBoard — Nuxt 4 Starter

A production-ready starter powered by **Nuxt 4**, **Tailwind CSS**, **SCSS design tokens (light/dark)**, **i18n (en/vi/ko)**, **Pinia**, **Vitest (with coverage + Vue Test Utils)**, **ESLint + Prettier**, **color mode support**, and **CI/CD with SonarCloud**.

Local CI emulation supported via `act` + Docker.

> Current working branch prefix: `W1-04_...`

---

## Features

- ⚡ Nuxt 4 + TypeScript + file-based routing/layouts in `app/`
- 🎨 Tailwind CSS driven by SCSS design tokens (dark/light) and class-based color mode
- 🌓 Theme toggle powered by `@nuxtjs/color-mode`
- 🌐 i18n (English, Vietnamese, Korean) using file-based JSON locales
- 📦 Pinia store example with full HMR support
- ✅ Unit & component testing via Vitest + Vue Test Utils + coverage reporting
- 🧹 ESLint + Prettier + Tailwind class sorting
- 🛰️ GitHub Actions CI (install → lint → test → build → Sonar scan)
- ☁️ SonarCloud integration (PR decoration, Quality Gate, coverage)
- 🐳 Run CI locally with `act` + Docker

---

## Requirements

- **Node.js**: v22 (recommended)
- **npm**: 10+
- **Git**
- **Docker Desktop** (only if you want to run CI locally with `act`)
  - Windows: enable **WSL2**; Docker in **Linux containers**

Check:

```bash
node -v && npm -v
```

---

## Getting Started

### macOS / Linux

```bash
npm ci
npm run dev
# open http://localhost:3000
```

### Windows (PowerShell / cmd)

```powershell
npm ci
npm run dev
# open http://localhost:3000
```

### Useful npm scripts

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint . --ext .js,.ts,.vue",
    "lint:fix": "eslint . --ext .js,.ts,.vue --fix",
    "format": "prettier --write .",
    "test": "vitest run --coverage"
  }
}
```

---

## Project Structure

```
OpsBoard/
├─ app/
│  ├─ app.vue
│  ├─ assets/
│  │  └─ styles/
│  │     ├─ _tokens.scss
│  │     └─ main.scss
│  ├─ components/
│  │  └─ CounterDemo.vue
│  ├─ layouts/
│  │  └─ default.vue
│  ├─ pages/
│  │  └─ index.vue
│  ├─ stores/
│  │  └─ counter.ts
│  └─ tests/
│     ├─ smoke.spec.ts
│     ├─ stores/counter.spec.ts
│     └─ unit/*.spec.ts
├─ i18n/
│  └─ locales/
│     ├─ en.json
│     ├─ vi.json
│     └─ ko.json
├─ nuxt.config.ts
├─ i18n.config.ts
├─ tailwind.config.ts
├─ vitest.config.ts
├─ vitest.setup.ts
└─ sonar-project.properties
```

---

## Key Settings & Highlights

### `nuxt.config.ts`

```ts
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
    defaultLocale: 'ko',
    vueI18n: './i18n.config.ts',
  },
})
```

### i18n configuration & locales

`i18n.config.ts`

```ts
import type { I18nOptions } from 'vue-i18n'

export default (): I18nOptions => ({
  legacy: false,
  fallbackLocale: 'ko',
})
```

`i18n/locales/en.json`

```json
{
  "app": {
    "title": "Device Dashboard"
  }
}
```

`i18n/locales/vi.json`

```json
{
  "app": {
    "title": "Bảng điều khiển thiết bị"
  }
}
```

`i18n/locales/ko.json`

```json
{
  "app": {
    "title": "장치 대시보드"
  }
}
```

### Layout + theme toggle

`app/layouts/default.vue`

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, setLocale } = useI18n()
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v) => (colorMode.preference = v ? 'dark' : 'light'),
})

async function switchLocale(code: 'en' | 'vi' | 'ko') {
  await setLocale(code)
}
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
```

### SCSS tokens (dark/light)

`app/assets/styles/_tokens.scss`

```scss
@layer base {
  :root {
    --bg: 255 255 255;
    --fg: 33 53 71;
    --card: 250 250 250;
    --muted: 113 113 122;
    --border: 228 228 231;
    --brand: 66 184 131;
    --brand-600: 58 168 118;
    --brand-700: 46 143 106;
    --accent: 53 73 94;
  }
  .dark {
    --bg: 24 24 27;
    --fg: 228 228 231;
    --card: 39 39 42;
    --muted: 161 161 170;
    --border: 63 63 70;
    --brand: 90 216 161;
    --brand-600: 74 197 145;
    --brand-700: 59 176 129;
    --accent: 150 170 190;
  }
}
```

`app/assets/styles/main.scss`

```scss
@use './_tokens.scss' as *;
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
        'brand-600': 'rgb(var(--brand-600) / <alpha-value>)',
        'brand-700': 'rgb(var(--brand-700) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
    },
  },
  plugins: [],
} satisfies Partial<Config>
```

### Pinia store example — `app/stores/counter.ts`

```ts
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    n: 0,
    step: 1,
  }),
  getters: {
    double: (state) => state.n * 2,
  },
  actions: {
    increment() {
      this.n += this.step
    },
    decrement() {
      this.n -= this.step
    },
    setStep(newStep: number) {
      this.step = newStep
    },
    reset() {
      this.n = 0
      this.step = 1
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
```

### Vitest — `vitest.config.ts`

```ts
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
```

### ESLint — `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  env: { browser: true, node: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'never', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: [
    '.nuxt/**',
    '.output/**',
    'dist/**',
    'node_modules/**',
    'coverage/**',
    '.scannerwork/**',
  ],
}
```

`.prettierrc`

```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 100,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`

```
node_modules
.nuxt
.output
dist
coverage
.scannerwork
```

### Vitest setup — `vitest.setup.ts`

```ts
import { vi } from 'vitest'
import { reactive, computed } from 'vue'

vi.stubGlobal('useColorMode', () => {
  const mode = reactive({
    value: 'light' as 'light' | 'dark',
    _pref: 'light' as 'light' | 'dark',
    get preference() {
      return this._pref
    },
    set preference(v: 'light' | 'dark') {
      this._pref = v
      this.value = v
    },
  })
  return mode
})

vi.stubGlobal('computed', computed)
```

### SonarCloud — `sonar-project.properties`

```properties
sonar.projectKey=lftrinn_OpsBoard
sonar.organization=lftrinn

sonar.sources=.
sonar.tests=.
sonar.exclusions=**/.nuxt/**,**/node_modules/**,**/.output/**,**/dist/**
sonar.test.inclusions=**/*.spec.* , **/*.test.*
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

> Update the project and organisation keys with your SonarCloud identifiers when forking.

---

## CI/CD (GitHub Actions)

Workflow file: `.github/workflows/build.yml`
Runs on `push` / `pull_request`: **checkout → setup-node → npm ci → lint → test (coverage) → build → Sonar scan**.
Actions are pinned to full commit SHAs.

PRs are decorated by SonarCloud if the project is bound to the SonarCloud GitHub App.
Optionally enforce **Quality Gate** via branch protection on `main`.

---

## Run CI locally with `act` + Docker

> Keep secrets **outside** the repo to avoid accidental leaks.

### Windows

1. Create `C:\Users\<you>\.act\sonar.secrets` with one line:

```
SONAR_TOKEN=YOUR_SONARCLOUD_TOKEN
```

2. Run:

```powershell
act push -j build-test-and-analyze `
  -P ubuntu-latest=catthehacker/ubuntu:act-22.04 `
  --secret-file C:\Users\<you>\.act\sonar.secrets
```

### macOS / Linux

```bash
mkdir -p ~/.act
printf 'SONAR_TOKEN=YOUR_SONARCLOUD_TOKEN\n' > ~/.act/sonar.secrets

act push -j build-test-and-analyze \
  -P ubuntu-latest=catthehacker/ubuntu:act-22.04 \
  --secret-file ~/.act/sonar.secrets
```

> If you **must** keep a secrets file in the repo for local runs, add it to `.gitignore` and to `sonar.exclusions`.

---

## Troubleshooting

- `vitest: not found` in CI: ensure devDependencies are installed (`npm ci --include=dev`) or set `NODE_ENV=development` for the install step.
- SCSS error “@use must be written before any other rules”: keep `@use "./_tokens.scss"` **before** any `@tailwind`.
- VS Code underlines `@tailwind` as unknown: add `"scss.lint.unknownAtRules": "ignore"`, `"css.lint.unknownAtRules": "ignore"` in `.vscode/settings.json`.
- Sonar 401/403: the `SONAR_TOKEN` must belong to a user who is a **member of the SonarCloud organization** and has **Browse / Execute Analysis** on the project; verify `organization` & `projectKey` in `sonar-project.properties`.
- Quality Gate on Windows with `act`: you may skip the QG step when `github.actor == 'nektos/act'`, or replace it with an inline script that calls SonarCloud API.

---

## License

MIT (adjust as needed).
