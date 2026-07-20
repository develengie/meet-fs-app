import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@/context'
import './style.scss'

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={'theme-button ' + (theme === 'light' ? 'dark' : 'light')}
      type="button"
      onClick={toggleTheme}
    >
      {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
    </button>
  )
}

export default ThemeButton
