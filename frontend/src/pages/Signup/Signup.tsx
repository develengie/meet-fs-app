import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignupForm } from '@/components/auth'
import { ErrorMessage } from '@/components/common'
import { formMessages, internalPaths } from '@/locales'
import '../style.scss'

const Signup = () => {
  const [signupError, setSignupError] = useState<string | null>(null)

  const handleSetSignupError = (error: string | null) => {
    setSignupError(error)
  }

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__inner">
          <h1 className="auth__title">{formMessages.signup.title}</h1>
          <SignupForm onSetSignupError={handleSetSignupError} />
          {signupError && <ErrorMessage error={signupError} />}
          <p className="text-center">
            <Link className="link" to={internalPaths.login}>
              {formMessages.signup.linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
