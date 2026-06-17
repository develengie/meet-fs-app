import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EditProfileForm } from '@/components/auth'
import { ErrorMessage } from '@/components/common'
import { formMessages, internalPaths } from '@/locales'
import { useAppSelector } from '@/store'
import { selectCurrentUserId } from '@/store/auth'
import type { UserParams } from '@/types/users'
import '../style.scss'

const EditProfile = () => {
  const { userId } = useParams<UserParams>()
  const [editProfileError, setEditProfileError] = useState<string | null>(null)
  const currentUserId = useAppSelector(selectCurrentUserId)

  const handleSetEditProfileError = (error: string | null) => {
    setEditProfileError(error)
  }

  if (userId !== currentUserId) {
    return <Navigate to={internalPaths.editProfile(currentUserId!)} />
  }

  return (
    <div className="auth  auth--profile">
      <div className="container">
        <div className="auth__inner  auth__inner--profile">
          <h1 className="auth__title">{formMessages.editProfile.title}</h1>
          <EditProfileForm onSetEditProfileError={handleSetEditProfileError} />
          {editProfileError && <ErrorMessage error={editProfileError} />}
          <p className="text-center  text-center--mt">
            <Link className="link" to={`/users/${currentUserId}`}>
              {formMessages.editProfile.linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
