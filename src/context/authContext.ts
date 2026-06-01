import { createContext } from 'react'
import type { LoginData } from '../services/auth'
import type { AuthUser } from '../services/session'

export interface AuthContextValue {
  user: AuthUser | null
  isLoggedIn: boolean
  role: string | null
  login: (data: LoginData) => Promise<AuthUser>
  loginEmpresa: (data: LoginData) => Promise<AuthUser>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
