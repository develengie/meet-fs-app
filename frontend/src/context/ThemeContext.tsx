import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContext {
  theme: Theme
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: ReactNode
}

const THEME_KEY = 'theme'

const ThemeContext = createContext<ThemeContext | undefined>(undefined)

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = localStorage.getItem(THEME_KEY)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return 'light'
}

export const useTheme = () => {
  const context = use(ThemeContext)

  if (!context) {
    throw new Error('useTheme необходимо использовать внутри ThemeProvider!')
  }

  return context
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export default ThemeProvider
