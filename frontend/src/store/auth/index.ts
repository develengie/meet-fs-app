import { authApiSlice } from './api'
import { selectIsAuth, selectCurrentUserId } from './selectors'
import authReducer, { logout, setAuthSession } from './slice'
import type { AuthResponse } from './types'

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice
export const authMiddleware = authApiSlice.middleware
export const authReducerPath = authApiSlice.reducerPath
export const authApiReducer = authApiSlice.reducer
export { selectIsAuth, selectCurrentUserId }
export { authReducer, logout, setAuthSession }
export type { AuthResponse }
