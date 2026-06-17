import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { selectIsAuth } from '@/store/auth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const isAuth = useAppSelector(selectIsAuth)

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
