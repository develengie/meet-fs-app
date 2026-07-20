interface AuthData {
  accessToken: string
  refreshToken: string
  expiresAt: number
  userId: string
}

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const EXPIRES_AT_KEY = 'expiresAt'
const USER_ID_KEY = 'userId'

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const getExpiresAt = (): number | null => {
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY)

  return expiresAt ? Number(expiresAt) : null
}

export const getUserId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY)
}

export const setAuthData = (props: AuthData) => {
  const { accessToken, refreshToken, expiresAt, userId } = props

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt))
  localStorage.setItem(USER_ID_KEY, userId)
}

export const removeAuthData = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
  localStorage.removeItem(USER_ID_KEY)
}
