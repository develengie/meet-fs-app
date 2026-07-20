import { Outlet } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth'

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}

export default ProtectedLayout
