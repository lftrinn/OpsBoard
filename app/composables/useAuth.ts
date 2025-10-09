export function useAuth() {
  // Replace with Pinia or real API later
  const isLoggedIn = useState<boolean>('auth:isLoggedIn', () => false)
  const user = useState<{ email?: string } | null>('auth:user', () => null)

  async function login(email: string, _password: string) {
    // mock delay & success
    await new Promise((r) => setTimeout(r, 300))
    isLoggedIn.value = true
    user.value = { email }
  }

  async function logout() {
    await new Promise((r) => setTimeout(r, 100))
    isLoggedIn.value = false
    user.value = null
  }

  async function register(email: string, _password: string) {
    // mock register -> auto login
    await login(email, _password)
  }

  return { isLoggedIn, user, login, logout, register }
}
