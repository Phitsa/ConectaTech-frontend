import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../services/auth'

interface RequireAuthProps {
  children: ReactNode
  redirectTo?: string
}

export default function RequireAuth({ children, redirectTo = '/login' }: RequireAuthProps) {
  const location = useLocation()

  if (!isLoggedIn()) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  return <>{children}</>
}
