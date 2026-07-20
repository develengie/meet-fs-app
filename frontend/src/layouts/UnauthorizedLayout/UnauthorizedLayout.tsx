import { Outlet } from 'react-router-dom'
import { UnauthorizedRoute } from '@/components/auth'
import { ThemeButton } from '@/ui'

const UnauthorizedLayout = () => {
  return (
    <UnauthorizedRoute>
      <Outlet />
      <ThemeButton />
    </UnauthorizedRoute>
  )
}

export default UnauthorizedLayout
