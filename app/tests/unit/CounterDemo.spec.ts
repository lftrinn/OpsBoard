import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import CounterDemo from '../../components/CounterDemo.vue'
import { useCounterStore } from '../../stores/counter'

describe('CounterDemo.vue — with real actions (state changes)', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        stubActions: false,
        initialState: {
          counter: { n: 10, step: 2 },
        },
      }),
    )
  })

  it('renders initial state and derived double correctly', async () => {
    const wrapper = mount(CounterDemo)
    await flushPromises()

    expect(wrapper.text()).toContain('Step: 2')
    expect(wrapper.text()).toContain('Value: 10 (x2: 20)')
  })

  it('increments and updates UI based on current step', async () => {
    const wrapper = mount(CounterDemo)
    const store = useCounterStore()

    // click "+"
    await wrapper.get('button:nth-of-type(2)').trigger('click')
    await flushPromises()

    expect(store.n).toBe(12) // 10 + step(2)
    expect(wrapper.text()).toContain('Value: 12 (x2: 24)')

    const stepInput = wrapper.get('#step-input')
    await stepInput.setValue('5')
    await flushPromises()

    expect(store.step).toBe(5)
    await wrapper.get('button:nth-of-type(2)').trigger('click')
    await flushPromises()

    expect(store.n).toBe(17) // 12 + 5
    expect(wrapper.text()).toContain('Value: 17 (x2: 34)')
  })

  it('decrements based on current step', async () => {
    const wrapper = mount(CounterDemo)
    const store = useCounterStore()

    await wrapper.get('button:nth-of-type(1)').trigger('click') // "-"
    await flushPromises()

    expect(store.n).toBe(8) // 10 - 2
    expect(wrapper.text()).toContain('Value: 8 (x2: 16)')
  })
})

describe('CounterDemo.vue — verify Reset action is called (spy)', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        initialState: { counter: { n: 3, step: 7 } },
      }),
    )
  })

  it('calls store.reset() when clicking Reset', async () => {
    const wrapper = mount(CounterDemo)
    const store = useCounterStore()

    const buttons = wrapper.findAll('button')
    const resetBtn = buttons.find((b) => b.text().toLowerCase() === 'reset')
    expect(resetBtn).toBeTruthy()

    await resetBtn!.trigger('click')
    expect(store.reset).toHaveBeenCalledTimes(1)
  })
})
