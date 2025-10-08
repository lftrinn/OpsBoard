import { reactive, ref, computed } from 'vue'
import { isEmail, required, minLength, type FieldErrors } from '@/utils/validation'
import { ROUTES } from '@/utils/routes'

export function useLoginForm() {
  const { login } = useAuth()
  const { t } = useI18n()

  const form = reactive({ email: '', password: '' })
  const errors = ref<FieldErrors<typeof form>>({})
  const generalError = ref('')
  const loading = ref(false)
  const canSubmit = computed(() => !loading.value)

  function validate() {
    const e: FieldErrors<typeof form> = {}
    if (!required(form.email)) e.email = t('auth.errors.required')
    else if (!isEmail(form.email)) e.email = t('auth.errors.email')

    if (!required(form.password)) e.password = t('auth.errors.required')
    else if (!minLength(form.password, 6)) e.password = t('auth.errors.min', { n: 6 })

    errors.value = e
    return Object.keys(e).length === 0
  }

  async function submit() {
    generalError.value = ''
    if (!validate()) return false
    loading.value = true
    try {
      await login(form.email, form.password)
      await navigateTo(ROUTES.DASHBOARD)
      return true
    } catch (err: unknown) {
      if (err instanceof Error) {
        generalError.value = err.message
      } else {
        generalError.value = t('auth.errors.general')
      }
      return false
    } finally {
      loading.value = false
    }
  }

  return { form, errors, generalError, loading, canSubmit, submit }
}
