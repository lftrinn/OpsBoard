export function useTheme() {
  const isDark = useState<boolean>('theme:isDark', () => false)

  function apply() {
    const root = document.documentElement
    if (isDark.value) root.classList.add('dark')
    else root.classList.remove('dark')
  }

  function toggle() {
    isDark.value = !isDark.value
    apply()
  }

  onMounted(apply)
  return { isDark, toggle }
}
