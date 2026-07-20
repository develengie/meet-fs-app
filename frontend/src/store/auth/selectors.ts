import type { RootState } from '@/store'

export const selectCurrentUserId = (state: RootState) => {
  const { userId } = state.auth

  return userId
}

export const selectIsAuth = (state: RootState) => {
  const { accessToken, expiresAt } = state.auth

  return !!accessToken && !!expiresAt && Date.now() < expiresAt
}
