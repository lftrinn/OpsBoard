import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from '../../app.vue'
describe('App (Nuxt shell)', () => {
  it('mounts successfully with Nuxt stubs (smoke test)', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          NuxtRouteAnnouncer: true,
          NuxtLayout: true,
        },
      },
    })

    expect(wrapper.findComponent({ name: 'NuxtLayout' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'NuxtRouteAnnouncer' }).exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          NuxtRouteAnnouncer: true,
          NuxtLayout: true,
        },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
