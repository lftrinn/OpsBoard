import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '../../layouts/default.vue'

// mock vue-i18n
const setLocaleMock = vi.fn()
const tMock = vi.fn((key: string) => `__${key}__`)

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: tMock, setLocale: setLocaleMock }),
}))

describe('layouts/default.vue', () => {
  beforeEach(() => {
    setLocaleMock.mockClear()
    tMock.mockClear()
  })

  it('renders i18n title and slot content', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div data-test="slot">Hello slot</div>',
      },
    })

    expect(tMock).toHaveBeenCalledWith('app.title')
    expect(wrapper.text()).toContain('__app.title__')

    expect(wrapper.find('[data-test="slot"]').exists()).toBe(true)
  })

  it('switches locale via buttons EN/VI/KO', async () => {
    const wrapper = mount(DefaultLayout)

    const btns = wrapper.findAll('button')
    // theo template: [EN, VI, KO, ThemeToggle]
    await btns[0]!.trigger('click') // EN
    await btns[1]!.trigger('click') // VI
    await btns[2]!.trigger('click') // KO

    expect(setLocaleMock).toHaveBeenCalledTimes(3)
    expect(setLocaleMock).toHaveBeenNthCalledWith(1, 'en')
    expect(setLocaleMock).toHaveBeenNthCalledWith(2, 'vi')
    expect(setLocaleMock).toHaveBeenNthCalledWith(3, 'ko')
  })

  it('toggles theme label and updates color mode', async () => {
    const wrapper = mount(DefaultLayout)

    const buttons = wrapper.findAll('button')
    const themeBtn = buttons[3]

    expect(themeBtn!.text()).toBe('Light')

    // click -> isDark = true -> preference = 'dark' -> value = 'dark' -> label 'Dark'
    await themeBtn!.trigger('click')
    expect(themeBtn!.text()).toBe('Dark')

    await themeBtn!.trigger('click')
    expect(themeBtn!.text()).toBe('Light')
  })
})
