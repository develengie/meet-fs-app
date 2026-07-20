import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '@/components/auth'
import { ErrorMessage } from '@/components/common'
import { formMessages, internalPaths } from '@/locales'
import '../style.scss'

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleSetLoginError = (error: string | null) => {
    setLoginError(error)
  }

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__inner">
          <h1 className="auth__title">{formMessages.login.title}</h1>
          <LoginForm onSetLoginError={handleSetLoginError} />
          {loginError && <ErrorMessage error={loginError} />}
          <p className="text-center">
            <Link className="link" to={internalPaths.signup}>
              {formMessages.login.linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
