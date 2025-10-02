import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../../stores/counter'
describe('counter store', () => {
  it('increments, custom step and reset', () => {
    setActivePinia(createPinia())
    const s = useCounterStore()

    expect(s.n).toBe(0)
    s.increment()
    expect(s.n).toBe(1)

    s.setStep(3)
    s.increment()
    expect(s.n).toBe(4)

    s.decrement()
    expect(s.n).toBe(1)

    s.reset()
    expect(s.n).toBe(0)
    expect(s.step).toBe(1)

    expect(s.double).toBe(0)
  })
})
