import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout'
import { ThemeButton } from '@/ui'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ThemeButton />
    </>
  )
}

export default MainLayout
