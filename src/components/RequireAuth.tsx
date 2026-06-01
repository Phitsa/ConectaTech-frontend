import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

interface RequireAuthProps {
  children: ReactNode
  redirectTo?: string
  role?: string | string[]
}

export default function RequireAuth({ children, redirectTo = '/login', role }: RequireAuthProps) {
  const location = useLocation()
  const { isLoggedIn, role: papelAtual } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  if (role) {
    const permitidos = Array.isArray(role) ? role : [role]
    if (!permitidos.includes(papelAtual ?? '')) {
      return <Navigate to={redirectTo} replace />
    }
  }

  return <>{children}</>
}
