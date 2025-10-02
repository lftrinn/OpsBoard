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
