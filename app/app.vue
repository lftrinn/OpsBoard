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

    <div class="mx-auto max-w-6xl space-y-10 px-4 py-8">
      <section>
        <h2 class="mb-3 text-xl font-semibold">Color tokens</h2>
        <p class="mb-4 text-sm text-muted/90">
          Dựa trên thương hiệu Vue: <code>#42b883</code> (brand), <code>#35495e</code> (accent), kèm
          neutrals.
        </p>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div class="overflow-hidden rounded-xl border border-border">
            <div class="h-16 bg-brand"><span class="sr-only">brand</span></div>
            <div class="p-3 text-sm">
              <div class="font-medium">brand</div>
              <div class="text-muted/90">primary actions</div>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl border border-border">
            <div class="h-16 bg-brand-600"><span class="sr-only">brand</span></div>
            <div class="p-3 text-sm">
              <div class="font-medium">brand-600</div>
              <div class="text-muted/90">hover</div>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl border border-border">
            <div class="h-16 bg-brand-700"><span class="sr-only">brand</span></div>
            <div class="p-3 text-sm">
              <div class="font-medium">brand-700</div>
              <div class="text-muted/90">active</div>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl border border-border">
            <div class="h-16 bg-accent"><span class="sr-only">brand</span></div>
            <div class="p-3 text-sm">
              <div class="font-medium">accent</div>
              <div class="text-muted/90">secondary emphasis</div>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl border border-border">
            <div class="h-16 bg-card"><span class="sr-only">brand</span></div>
            <div class="p-3 text-sm">
              <div class="font-medium">card</div>
              <div class="text-muted/90">surface</div>
            </div>
          </div>
          <div class="overflow-hidden rounded-xl border border-border">
            <div class="h-16 bg-bg"><span class="sr-only">brand</span></div>
            <div class="p-3 text-sm">
              <div class="font-medium">bg</div>
              <div class="text-muted/90">app background</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-3 text-xl font-semibold">Buttons</h2>
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand/50 active:bg-brand-700"
          >
            Primary
          </button>
          <button
            class="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-fg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            Secondary
          </button>
          <button
            disabled
            class="inline-flex cursor-not-allowed items-center rounded-lg border border-border bg-card px-4 py-2 text-fg opacity-50"
          >
            Disabled
          </button>
          <a href="#" class="text-brand hover:underline">Link action</a>
        </div>
      </section>

      <section>
        <h2 class="mb-3 text-xl font-semibold">Inputs</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block">
            <span class="text-sm text-muted/90">Text input</span>
            <input
              type="text"
              placeholder="Type here…"
              class="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-fg placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </label>
          <label class="block">
            <span class="text-sm text-muted/90">Select</span>
            <select
              class="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-fg focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              <option>Option A</option>
              <option>Option B</option>
            </select>
          </label>
          <label class="inline-flex items-center gap-2">
            <input
              type="checkbox"
              class="rounded border-border text-brand focus:ring-brand/50"
              checked
            /><span>Checkbox</span>
          </label>
          <label class="inline-flex items-center gap-2">
            <input
              type="radio"
              name="r"
              class="border-border text-brand focus:ring-brand/50"
              checked
            /><span>Radio</span>
          </label>
        </div>
      </section>

      <section>
        <h2 class="mb-3 text-xl font-semibold">Badges</h2>
        <div class="flex flex-wrap gap-2">
          <span
            class="inline-flex items-center rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand"
            >primary</span
          >
          <span
            class="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium"
            >neutral</span
          >
          <span
            class="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent"
            >accent</span
          >
        </div>
      </section>

      <section>
        <h2 class="mb-3 text-xl font-semibold">Alerts</h2>
        <div class="space-y-3">
          <div class="rounded-lg border border-brand/50 bg-brand/10 px-4 py-3">
            <b class="text-brand">Info</b> · Vue brand tone for informational messages.
          </div>
          <div class="rounded-lg border border-amber-400/50 bg-amber-400/10 px-4 py-3">
            <b class="text-amber-500">Warning</b> · Cảnh báo nhẹ.
          </div>
          <div class="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3">
            <b class="text-red-600">Error</b> · Lỗi cần chú ý.
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-3 text-xl font-semibold">Card</h2>
        <article class="rounded-2xl border border-border bg-card p-4">
          <h3 class="font-semibold">Card title</h3>
          <p class="mt-1 text-sm text-muted/90">Mô tả ngắn cho card.</p>
          <div class="mt-3">
            <button class="rounded-lg bg-brand px-3 py-1.5 text-white hover:bg-brand-600">
              Action
            </button>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>
