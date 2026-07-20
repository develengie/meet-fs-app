import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formMessages, internalPaths } from '@/locales'
import { InputField, PasswordField, PrimaryButton } from '@/ui'
import {
  authErrorHandler,
  loginSchema,
  type LoginFormData
} from '@/utils/helpers'
import { useLoginMutation } from '@/store/auth'

interface LoginFormProps {
  onSetLoginError: (error: string | null) => void
}

const LoginForm = ({ onSetLoginError }: LoginFormProps) => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [login] = useLoginMutation()
  const email = watch('email')
  const password = watch('password')

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap()
      navigate(internalPaths.main, { replace: true })
    } catch (e) {
      authErrorHandler(e, onSetLoginError)
    }
  }

  useEffect(() => {
    onSetLoginError(null)
  }, [email, password])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__group">
        <InputField
          fieldName="email"
          control={control}
          errors={errors}
          label={formMessages.login.emailLabel}
        />
      </div>
      <div className="form__group">
        <PasswordField
          fieldName="password"
          control={control}
          errors={errors}
          label={formMessages.login.passwordLabel}
        />
      </div>
      <PrimaryButton
        type="submit"
        text={formMessages.login.submit}
        isDisabled={!isValid}
      />
    </form>
  )
}

export default LoginForm
