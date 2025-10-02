<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { n, step, double } = storeToRefs(store)
</script>

<template>
  <div class="space-y-3 rounded border p-4">
    <div class="text-sm">Step: {{ step }}</div>
    <div class="text-sm">Value: {{ n }} (x2: {{ double }})</div>

    <div class="flex items-center gap-2">
      <button class="rounded border px-3 py-1" @click="store.decrement()">-</button>
      <button class="rounded border px-3 py-1" @click="store.increment()">+</button>

      <label class="text-sm" for="step-input">step:</label>
      <input
        id="step-input"
        v-model.number="store.step"
        type="number"
        class="w-20 rounded border px-2 py-1"
      />

      <button class="rounded border px-3 py-1" @click="store.reset()">Reset</button>
    </div>
  </div>
</template>
