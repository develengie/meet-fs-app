import { errorMessages } from '@/locales'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type AuthErrorResponse = {
  error?: {
    message?: string
  }
}

export const authErrorHandler = (
  error: unknown,
  setError: (errorMessage: string) => void
) => {
  const fetchError = error as FetchBaseQueryError

  switch (fetchError.status) {
    case 'FETCH_ERROR':
      setError(errorMessages.serverError)

      return

    case 500:
      setError(errorMessages.emailError)

      return

    default:
      break
  }

  const errorData = fetchError.data as AuthErrorResponse | undefined

  switch (errorData?.error?.message) {
    case 'EMAIL_EXISTS':
      setError(errorMessages.emailError)
      break

    case 'INVALID_PASSWORD':
      setError(errorMessages.authError)
      break

    default:
      setError(errorMessages.serverError)
      break
  }
}
