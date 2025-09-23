![CI + SonarCloud](https://github.com/lftrinn/OpsBoard/actions/workflows/build.yml/badge.svg)
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=lftrinn_OpsBoard)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lftrinn_OpsBoard&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lftrinn_OpsBoard)

# OpsBoard — Nuxt 3 Starter

A production-ready starter using **Nuxt 3**, **Tailwind CSS**, **SCSS (dark/light tokens)**, **i18n (en/vi/ko)**, **Pinia**, **Vitest (with coverage)**, **ESLint + Prettier**, and **CI/CD with SonarCloud**.  
Local CI emulation supported via `act` + Docker.

> Current working branch prefix: `W1-04_...`

---

## Features

- ⚡ Nuxt 3 + TypeScript
- 🎨 Tailwind CSS with design tokens via SCSS and class-based dark mode
- 🌐 i18n (English, Vietnamese, Korean) with file-based JSON locales
- 📦 Pinia state management
- ✅ Unit testing with Vitest and LCOV coverage
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
├─ app.vue
├─ nuxt.config.ts
├─ i18n/
│  └─ locales/
│     ├─ en.json
│     ├─ vi.json
│     └─ ko.json
├─ assets/
│  └─ styles/
│     ├─ _tokens.scss
│     └─ main.scss
├─ tailwind.config.ts
├─ tests/
│  └─ *.spec.ts
├─ vitest.config.ts
├─ sonar-project.properties
├─ .eslintrc.cjs
├─ .prettierrc
├─ .prettierignore
└─ .gitignore
```

---

## Key Settings

### `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/eslint'],
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Tiếng Việt' },
      { code: 'ko', name: '한국어' },
    ],
    defaultLocale: 'en',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // auto-inject SCSS tokens into every <style lang="scss">
          additionalData: '@use "@/assets/styles/_tokens.scss" as *;',
        },
      },
    },
  },
})
```

### i18n JSON (per-locale)

`i18n/locales/en.json`

```json
{ "app": { "title": "Device Dashboard" } }
```

`i18n/locales/vi.json`

```json
{ "app": { "title": "Bảng điều khiển thiết bị" } }
```

`i18n/locales/ko.json`

```json
{ "app": { "title": "장치 대시보드" } }
```

`app.vue` (simple locale switch demo)

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>

<template>
  <div class="space-x-2 p-4">
    <h1 class="mb-4 text-xl font-semibold">{{ t('app.title') }}</h1>
    <button class="rounded border px-3 py-1" @click="locale = 'en'">EN</button>
    <button class="rounded border px-3 py-1" @click="locale = 'vi'">VI</button>
    <button class="rounded border px-3 py-1" @click="locale = 'ko'">KO</button>
  </div>
</template>
```

### SCSS tokens (dark/light)

`assets/styles/_tokens.scss`

```scss
:root {
  --bg: 255 255 255;
  --fg: 17 24 39;
  --card: 255 255 255;
  --border: 229 231 235;
  --brand: 59 130 246;
}
.dark {
  --bg: 17 24 39;
  --fg: 243 244 246;
  --card: 31 41 55;
  --border: 55 65 81;
  --brand: 96 165 250;
}
```

`assets/styles/main.scss`

```scss
@use './_tokens.scss' as *; /* must be first */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  darkMode: 'class',
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
      },
    },
  },
}
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

### Vitest — `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      provider: 'v8',
    },
  },
})
```

### SonarCloud — `sonar-project.properties`

```properties
sonar.projectKey=<YOUR_SONAR_PROJECT_KEY>
sonar.organization=<YOUR_SONAR_ORG_KEY>

sonar.sources=.
sonar.tests=.
sonar.exclusions=**/.nuxt/**,**/node_modules/**,**/.output/**,**/dist/**
sonar.test.inclusions=**/*.spec.* , **/*.test.*
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.tsconfigPath=tsconfig.json
```

> Replace `<YOUR_SONAR_PROJECT_KEY>`/`<YOUR_SONAR_ORG_KEY>` with the values from SonarCloud → _Project Information_.

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

### macOS

```bash
mkdir -p ~/.act
printf 'SONAR_TOKEN=YOUR_SONARCLOUD_TOKEN\n' > ~/.act/sonar.secrets

act push -j build-test-and-analyze   -P ubuntu-latest=catthehacker/ubuntu:act-22.04   --secret-file ~/.act/sonar.secrets
```

> If you **must** keep a secrets file in the repo for local runs, add it to `.gitignore` and to `sonar.exclusions`.

---

## Troubleshooting

- `vitest: not found` in CI: ensure devDependencies are installed (`npm ci --include=dev`) or set `NODE_ENV=development` for the install step.
- SCSS error “@use must be written before any other rules”: keep `@use "./_tokens.scss"` **before** any `@tailwind`.
- VS Code underlines `@tailwind` as unknown: add
  `"scss.lint.unknownAtRules": "ignore"`, `"css.lint.unknownAtRules": "ignore"` in `.vscode/settings.json`.
- Sonar 401/403: the `SONAR_TOKEN` must belong to a user who is a **member of the SonarCloud organization** and has **Browse / Execute Analysis** on the project; verify `organization` & `projectKey` in `sonar-project.properties`.
- Quality Gate on Windows with `act`: you may skip the QG step when `github.actor == 'nektos/act'`, or replace it with an inline script that calls SonarCloud API.

---

## License

MIT (adjust as needed).
