import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '../../pages/index.vue'

// ---- Mock i18n ----
const tMock = vi.fn((key: string) => `__${key}__`)
vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: tMock }),
}))

describe('pages/index.vue', () => {
  beforeEach(() => {
    tMock.mockClear()
  })

  const mountPage = () =>
    mount(IndexPage, {
      global: {
        stubs: {
          CounterDemo: { template: '<div data-test="counter-stub" />' },
        },
      },
    })

  it('renders i18n title and main sections', () => {
    const wrapper = mountPage()

    expect(tMock).toHaveBeenCalledWith('app.title')
    expect(wrapper.find('h1.text-2xl').text()).toBe('__app.title__')

    const h2s = wrapper.findAll('h2.text-xl')
    const titles = h2s.map((h) => h.text())
    expect(titles).toEqual(['Color tokens', 'Buttons', 'Inputs', 'Badges', 'Alerts', 'Card'])
  })

  it('renders color token cards (at least 6 items)', () => {
    const wrapper = mountPage()
    const colorCards = wrapper.findAll('.rounded-xl.border')
    expect(colorCards.length).toBeGreaterThanOrEqual(6)

    const labels = colorCards.map((c) => c.text())
    expect(labels.join(' ')).toContain('brand')
    expect(labels.join(' ')).toContain('accent')
    expect(labels.join(' ')).toContain('bg')
  })

  it('renders buttons with correct states and a link', () => {
    const wrapper = mountPage()
    const btnSection = wrapper.findAll('section').find((s) => s.text().includes('Buttons'))
    expect(btnSection).toBeTruthy()

    const buttons = btnSection!.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
    expect(buttons[0]!.text()).toBe('Primary')
    expect(buttons[1]!.text()).toBe('Secondary')

    expect(buttons[2]!.attributes('disabled')).toBeDefined()

    const link = btnSection!.find('a')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Link action')
    expect(link.attributes('href')).toBe('#')
  })

  it('renders inputs, select, checkbox and radio', () => {
    const wrapper = mountPage()
    const inputSection = wrapper.findAll('section').find((s) => s.text().includes('Inputs'))
    expect(inputSection).toBeTruthy()

    // text input
    const textInput = inputSection!.find('input[type="text"]')
    expect(textInput.exists()).toBe(true)
    expect(textInput.attributes('placeholder')).toBe('Type here…')

    // select + options
    const select = inputSection!.find('select')
    expect(select.exists()).toBe(true)
    const options = select.findAll('option').map((o) => o.text())
    expect(options).toEqual(['Option A', 'Option B'])

    const checkbox = inputSection!.find('input[type="checkbox"]')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.element).toHaveProperty('checked', true)

    const radio = inputSection!.find('input[type="radio"]')
    expect(radio.exists()).toBe(true)
    expect(radio.element).toHaveProperty('checked', true)
  })

  it('renders badges and alerts content', () => {
    const wrapper = mountPage()

    const badgesSection = wrapper.findAll('section').find((s) => s.text().includes('Badges'))
    expect(badgesSection).toBeTruthy()
    const badges = badgesSection!.findAll('span.inline-flex')
    expect(badges.length).toBeGreaterThanOrEqual(3)
    const badgeTexts = badges.map((b) => b.text())
    expect(badgeTexts).toEqual(['primary', 'neutral', 'accent'])

    const alertsSection = wrapper.findAll('section').find((s) => s.text().includes('Alerts'))
    expect(alertsSection).toBeTruthy()
    const alerts = alertsSection!.findAll('div.rounded-lg')
    expect(alerts.length).toBeGreaterThanOrEqual(3)
    const alertsText = alerts.map((a) => a.text()).join(' ')
    expect(alertsText).toContain('Info')
    expect(alertsText).toContain('Warning')
    expect(alertsText).toContain('Error')
  })

  it('renders card block', () => {
    const wrapper = mountPage()
    const cardSection = wrapper.findAll('section').find((s) => s.text().includes('Card'))
    expect(cardSection).toBeTruthy()

    const card = cardSection!.find('article')
    expect(card.exists()).toBe(true)
    expect(card.text()).toContain('Card title')
    expect(card.text()).toContain('Mô tả ngắn cho card.')

    const actionBtn = card.find('button')
    expect(actionBtn.exists()).toBe(true)
    expect(actionBtn.text()).toBe('Action')
  })

  it('renders CounterDemo (stubbed)', () => {
    const wrapper = mountPage()
    expect(wrapper.find('[data-test="counter-stub"]').exists()).toBe(true)
  })
})
