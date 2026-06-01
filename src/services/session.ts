const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export type AuthUser = {
  nome: string
  email: string
  role: string
  cnpj?: string
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function getRole() {
  return getUser()?.role ?? null
}

export function isLoggedIn() {
  return Boolean(getToken())
}

export function setSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
