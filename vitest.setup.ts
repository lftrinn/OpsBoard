import { vi } from 'vitest'
import { reactive, computed } from 'vue'

vi.stubGlobal('useColorMode', () => {
  const mode = reactive({
    value: 'light' as 'light' | 'dark',
    _pref: 'light' as 'light' | 'dark',
    get preference() {
      return this._pref
    },
    set preference(v: 'light' | 'dark') {
      this._pref = v
      this.value = v
    },
  })
  return mode
})

vi.stubGlobal('computed', computed)
