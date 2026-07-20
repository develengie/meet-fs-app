import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage, SkeletonBlock } from '@/components/common'
import { errorMessages, formMessages, internalPaths } from '@/locales'
import {
  InputField,
  MultiSelectField,
  PrimaryButton,
  RadioField,
  SelectField
} from '@/ui'
import { SKELETON_BLOCK_SIZES } from '@/utils'
import {
  authErrorHandler,
  editProfileSchema,
  type EditProfileFormData
} from '@/utils/helpers'
import { useAppSelector } from '@/store'
import { useGetProfessionsQuery } from '@/store/professions'
import { useGetQualitiesQuery } from '@/store/qualities'
import { useGetUsersQuery, useUpdateUserMutation } from '@/store/users'
import { selectCurrentUserId } from '@/store/auth'

interface EditProfileFormProps {
  onSetEditProfileError: (error: string | null) => void
}

const EditProfileForm = ({ onSetEditProfileError }: EditProfileFormProps) => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      profession: undefined,
      sex: '',
      qualities: []
    }
  })
  const {
    data: professions,
    isLoading: professionsLoading,
    isError: professionsError
  } = useGetProfessionsQuery()
  const professionsList = professions?.map((profession) => ({
    value: profession._id,
    label: profession.name
  }))
  const {
    data: qualities,
    isLoading: qualitiesLoading,
    isError: qualitiesError
  } = useGetQualitiesQuery()
  const qualitiesList = qualities?.map((quality) => ({
    value: quality._id,
    label: quality.name
  }))
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError
  } = useGetUsersQuery()
  const [updateUser] = useUpdateUserMutation()
  const currentUserId = useAppSelector(selectCurrentUserId)
  const currentUser = users?.find((user) => user._id === currentUserId)
  const isLoading = professionsLoading || qualitiesLoading || usersLoading
  const isError = professionsError || qualitiesError || usersError
  const email = watch('email')

  const onSubmit = async (data: EditProfileFormData) => {
    const body = {
      ...data,
      qualities: data.qualities.filter(
        (quality): quality is string => typeof quality === 'string'
      )
    }

    try {
      await updateUser({ userId: currentUserId!, body }).unwrap()
      navigate(internalPaths.profile(currentUserId!), { replace: true })
    } catch (e) {
      authErrorHandler(e, onSetEditProfileError)
    }
  }

  useEffect(() => {
    if (currentUser) {
      reset({
        email: currentUser.email,
        name: currentUser.name,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: currentUser.qualities
      })
    }
  }, [currentUser, reset])

  useEffect(() => {
    onSetEditProfileError(null)
  }, [email, isError])

  if (isLoading) {
    return (
      <SkeletonBlock
        width={SKELETON_BLOCK_SIZES.EDIT_PROFILE_FORM.WIDTH}
        height={SKELETON_BLOCK_SIZES.EDIT_PROFILE_FORM.HEIGHT}
      />
    )
  }

  if (isError) {
    return <ErrorMessage error={errorMessages.serverError} />
  }

  return (
    <form
      className="form  form--mb"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="form__group">
        <InputField
          fieldName="email"
          control={control}
          errors={errors}
          label={formMessages.editProfile.emailLabel}
        />
      </div>
      <div className="form__group">
        <InputField
          fieldName="name"
          control={control}
          errors={errors}
          label={formMessages.editProfile.nameLabel}
        />
      </div>
      <div className="form__group">
        <SelectField
          fieldName="profession"
          control={control}
          errors={errors}
          label={formMessages.editProfile.professionLabel}
          options={professionsList!}
        />
      </div>
      <div className="form__group">
        <RadioField
          fieldName="sex"
          control={control}
          errors={errors}
          label={formMessages.editProfile.sexLabel}
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
          label={formMessages.editProfile.qualitiesLabel}
          options={qualitiesList!}
          placeholder={formMessages.editProfile.qualitiesPlaceholder}
        />
      </div>
      <PrimaryButton
        type="submit"
        text={formMessages.editProfile.submit}
        isDisabled={!isValid}
      />
    </form>
  )
}

export default EditProfileForm
