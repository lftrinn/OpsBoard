<script setup lang="ts">
import { ROUTES } from '@/utils/routes'
const { t } = useI18n()
const { form, errors, generalError, loading, canSubmit, submit } = useLoginForm()
</script>

<template>
  <div class="space-y-6">
    <header class="flex items-center justify-center text-center">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {{ t('auth.login.title') }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('auth.login.subtitle') }}</p>
      </div>
    </header>

    <form class="space-y-4" novalidate @submit.prevent="submit">
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-800 dark:text-gray-200" for="email">
          {{ t('auth.login.email') }}
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
          class="w-full rounded-lg border bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <p v-if="errors.email" id="email-error" class="text-xs text-red-600">
          {{ errors.email }}
        </p>
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-800 dark:text-gray-200" for="password">
          {{ t('auth.login.password') }}
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          :aria-invalid="!!errors.password"
          :aria-describedby="errors.password ? 'password-error' : undefined"
          class="w-full rounded-lg border bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <p v-if="errors.password" id="password-error" class="text-xs text-red-600">
          {{ errors.password }}
        </p>
      </div>

      <button
        :disabled="!canSubmit || loading"
        class="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {{ loading ? '…' : t('auth.login.cta') }}
      </button>

      <p v-if="generalError" class="text-sm text-red-600">{{ generalError }}</p>

      <div class="text-center text-sm">
        <NuxtLink :to="ROUTES.AUTH_FORGOT" class="text-gray-700 underline dark:text-gray-300">
          {{ t('auth.login.forgot') }}
        </NuxtLink>
      </div>
    </form>

    <p class="text-center text-sm text-gray-600 dark:text-gray-300">
      {{ t('auth.login.noAccount') }}
      <NuxtLink :to="ROUTES.AUTH_REGISTER" class="underline">
        {{ t('auth.login.createOne') }}
      </NuxtLink>
    </p>
  </div>
</template>
