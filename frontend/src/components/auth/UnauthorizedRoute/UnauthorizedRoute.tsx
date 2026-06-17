import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { selectIsAuth } from '@/store/auth'
import type { ReactNode } from 'react'

interface UnauthorizedRouteProps {
  children: ReactNode
}

const UnauthorizedRoute = ({ children }: UnauthorizedRouteProps) => {
  const isAuth = useAppSelector(selectIsAuth)

  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return children
}

export default UnauthorizedRoute
