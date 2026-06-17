import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  getAccessToken,
  getExpiresAt,
  getRefreshToken,
  getUserId,
  removeAuthData,
  setAuthData
} from '@/services'
import type { AuthResponse } from './types'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
  userId: string | null
}

const getInitialState = (): AuthState => {
  const expiresAt = getExpiresAt()

  if (expiresAt && Date.now() > expiresAt) {
    removeAuthData()

    return {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      userId: null
    }
  }

  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    expiresAt,
    userId: getUserId()
  }
}

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSession: (state, action: PayloadAction<AuthResponse>) => {
      const { accessToken, refreshToken, expiresIn, userId } = action.payload
      const expiresAt = Date.now() + expiresIn * 1000

      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.expiresAt = expiresAt
      state.userId = userId

      setAuthData({
        accessToken,
        refreshToken,
        expiresAt,
        userId
      })
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.expiresAt = null
      state.userId = null

      removeAuthData()
    }
  }
})

export const { setAuthSession, logout } = authSlice.actions
export default authSlice.reducer
