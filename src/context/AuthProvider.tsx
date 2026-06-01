import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { login as loginRequest, loginEmpresa as loginEmpresaRequest } from '../services/auth'
import type { LoginData } from '../services/auth'
import { clearSession, getUser, setSession } from '../services/session'
import { AuthContext } from './authContext'
import type { AuthContextValue } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => getUser())

  async function login(data: LoginData) {
    const { token, user: autenticado } = await loginRequest(data)
    setSession(token, autenticado)
    setUser(autenticado)
    return autenticado
  }

  async function loginEmpresa(data: LoginData) {
    const { token, user: autenticado } = await loginEmpresaRequest(data)
    setSession(token, autenticado)
    setUser(autenticado)
    return autenticado
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      role: user?.role ?? null,
      login,
      loginEmpresa,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
