import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formMessages, internalPaths } from '@/locales'
import {
  CheckboxField,
  InputField,
  MultiSelectField,
  PasswordField,
  PrimaryButton,
  RadioField,
  SelectField
} from '@/ui'
import {
  authErrorHandler,
  signupSchema,
  type SignupFormData
} from '@/utils/helpers'
import { useGetProfessionsQuery } from '@/store/professions'
import { useGetQualitiesQuery } from '@/store/qualities'
import { useSignupMutation } from '@/store/auth'

interface SignupFormProps {
  onSetSignupError: (error: string | null) => void
}

const SignupForm = ({ onSetSignupError }: SignupFormProps) => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      profession: undefined,
      sex: '',
      qualities: [],
      license: false
    }
  })
  const { data: professions } = useGetProfessionsQuery()
  const professionsList = professions?.map((profession) => ({
    value: profession._id,
    label: profession.name
  }))
  const { data: qualities } = useGetQualitiesQuery()
  const qualitiesList = qualities?.map((quality) => ({
    value: quality._id,
    label: quality.name
  }))
  const [signup] = useSignupMutation()
  const email = watch('email')

  const onSubmit = async (data: SignupFormData) => {
    const { qualities, license, ...rest } = data
    const signupData = {
      ...rest,
      qualities: qualities.filter(
        (quality): quality is string => typeof quality === 'string'
      )
    }

    try {
      await signup(signupData).unwrap()
      navigate(internalPaths.main, { replace: true })
    } catch (e) {
      authErrorHandler(e, onSetSignupError)
    }
  }

  useEffect(() => {
    onSetSignupError(null)
  }, [email])

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__group">
        <InputField
          fieldName="email"
          control={control}
          errors={errors}
          label={formMessages.signup.emailLabel}
        />
      </div>
      <div className="form__group">
        <InputField
          fieldName="name"
          control={control}
          errors={errors}
          label={formMessages.signup.nameLabel}
        />
      </div>
      <div className="form__group">
        <PasswordField
          fieldName="password"
          control={control}
          errors={errors}
          label={formMessages.signup.passwordLabel}
        />
      </div>
      <div className="form__group">
        <SelectField
          fieldName="profession"
          control={control}
          errors={errors}
          label={formMessages.signup.professionLabel}
          options={professionsList!}
          placeholder={formMessages.signup.professionPlaceholder}
        />
      </div>
      <div className="form__group">
        <RadioField
          fieldName="sex"
          control={control}
          errors={errors}
          label={formMessages.signup.sexLabel}
          options={[
            { value: 'male', label: 'муж.' },
            { value: 'female', label: 'жен.' }
          ]}
        />
      </div>
      <div className="form__group">
        <MultiSelectField
          fieldName="qualities"
          control={control}
          errors={errors}
          label={formMessages.signup.qualitiesLabel}
          options={qualitiesList!}
          placeholder={formMessages.signup.qualitiesPlaceholder}
        />
      </div>
      <div className="form__group">
        <CheckboxField
          fieldName="license"
          control={control}
          errors={errors}
          text={formMessages.signup.license}
        />
      </div>
      <PrimaryButton
        type="submit"
        text={formMessages.signup.submit}
        isDisabled={!isValid}
      />
    </form>
  )
}

export default SignupForm
