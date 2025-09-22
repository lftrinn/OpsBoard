<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  const { t, setLocale } = useI18n()
  const colorMode = useColorMode()
  const isDark = computed({
    get: () => colorMode.value === 'dark',
    set: v => colorMode.preference = v ? 'dark' : 'light'
  })
</script>


<template>
  <main class="min-h-screen bg-bg text-fg">
    <header class="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
      <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <h1 class="font-semibold">Vue-inspired Design System · Tokens & Components</h1>
        <div class="flex items-center gap-3">
          <span class="text-sm text-muted/90">Theme</span>
          <button
            class="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent/10"
            @click="isDark = !isDark"
          >
            {{ isDark ? 'Dark' : 'Light' }}
          </button>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <section>
        <h2 class="text-xl font-semibold mb-3">Color tokens</h2>
        <p class="text-sm text-muted/90 mb-4">
          Dựa trên thương hiệu Vue: <code>#42b883</code> (brand), <code>#35495e</code> (accent), kèm neutrals.
        </p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="rounded-xl border border-border overflow-hidden">
            <div class="h-16 bg-brand"></div>
            <div class="p-3 text-sm"><div class="font-medium">brand</div><div class="text-muted/90">primary actions</div></div>
          </div>
          <div class="rounded-xl border border-border overflow-hidden">
            <div class="h-16 bg-brand-600"></div>
            <div class="p-3 text-sm"><div class="font-medium">brand-600</div><div class="text-muted/90">hover</div></div>
          </div>
          <div class="rounded-xl border border-border overflow-hidden">
            <div class="h-16 bg-brand-700"></div>
            <div class="p-3 text-sm"><div class="font-medium">brand-700</div><div class="text-muted/90">active</div></div>
          </div>
          <div class="rounded-xl border border-border overflow-hidden">
            <div class="h-16 bg-accent"></div>
            <div class="p-3 text-sm"><div class="font-medium">accent</div><div class="text-muted/90">secondary emphasis</div></div>
          </div>
          <div class="rounded-xl border border-border overflow-hidden">
            <div class="h-16 bg-card"></div>
            <div class="p-3 text-sm"><div class="font-medium">card</div><div class="text-muted/90">surface</div></div>
          </div>
          <div class="rounded-xl border border-border overflow-hidden">
            <div class="h-16 bg-bg"></div>
            <div class="p-3 text-sm"><div class="font-medium">bg</div><div class="text-muted/90">app background</div></div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-3">Buttons</h2>
        <div class="flex flex-wrap items-center gap-3">
          <button class="inline-flex items-center rounded-lg px-4 py-2 text-white bg-brand hover:bg-brand-600 active:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand/50">Primary</button>
          <button class="inline-flex items-center rounded-lg px-4 py-2 border border-border text-fg bg-card hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/30">Secondary</button>
          <button disabled class="inline-flex items-center rounded-lg px-4 py-2 opacity-50 cursor-not-allowed border border-border text-fg bg-card">Disabled</button>
          <a href="#" class="text-brand hover:underline">Link action</a>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-3">Inputs</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <label class="block">
            <span class="text-sm text-muted/90">Text input</span>
            <input type="text" placeholder="Type here…" class="mt-1 w-full rounded-lg border border-border bg-card text-fg px-3 py-2 placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-brand/50" />
          </label>
          <label class="block">
            <span class="text-sm text-muted/90">Select</span>
            <select class="mt-1 w-full rounded-lg border border-border bg-card text-fg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/50">
              <option>Option A</option><option>Option B</option>
            </select>
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" class="rounded border-border text-brand focus:ring-brand/50" checked><span>Checkbox</span>
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="radio" name="r" class="border-border text-brand focus:ring-brand/50" checked><span>Radio</span>
          </label>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-3">Badges</h2>
        <div class="flex flex-wrap gap-2">
          <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-brand/15 text-brand">primary</span>
          <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border border-border">neutral</span>
          <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-accent/15 text-accent">accent</span>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-3">Alerts</h2>
        <div class="space-y-3">
          <div class="rounded-lg border border-brand/50 bg-brand/10 px-4 py-3"><b class="text-brand">Info</b> · Vue brand tone for informational messages.</div>
          <div class="rounded-lg border border-amber-400/50 bg-amber-400/10 px-4 py-3"><b class="text-amber-500">Warning</b> · Cảnh báo nhẹ.</div>
          <div class="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3"><b class="text-red-600">Error</b> · Lỗi cần chú ý.</div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-3">Card</h2>
        <article class="rounded-2xl border border-border bg-card p-4">
          <h3 class="font-semibold">Card title</h3>
          <p class="text-sm text-muted/90 mt-1">Mô tả ngắn cho card.</p>
          <div class="mt-3">
            <button class="rounded-lg bg-brand text-white px-3 py-1.5 hover:bg-brand-600">Action</button>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<style lang="scss">


</style>