import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  loadSession,
  loginCustomer,
  registerCustomer,
  refreshSession,
  type CustomerSession,
  type RegisterCustomerPayload,
} from '../lib/woocommerce'

interface AuthContextValue {
  user: CustomerSession | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<CustomerSession>
  register: (payload: RegisterCustomerPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerSession | null>(() => loadSession())
  const hasSession = user !== null

  useEffect(() => {
    if (!hasSession) return

    let active = true
    void refreshSession().then((session) => { if (active) setUser(session) })
    return () => { active = false }
  }, [hasSession])

  const login = useCallback(async (email: string, password: string) => {
    const session = await loginCustomer(email, password)
    setUser(session)
    return session
  }, [])

  const register = useCallback(async (payload: RegisterCustomerPayload) => {
    await registerCustomer(payload)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
