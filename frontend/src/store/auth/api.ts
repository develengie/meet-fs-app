import { createApi } from '@reduxjs/toolkit/query/react'
import { logout as logoutAction, setAuthSession } from './slice'
import { baseQueryWithReauth } from '../baseQueryWithReauth'
import { usersApiSlice } from '../users/api'
import type { AuthResponse } from './types'
import type { Profession, Quality } from '@/types'

interface SignupDTO {
  email: string
  name: string
  password: string
  profession: Profession['_id']
  sex: string
  qualities: Quality['_id'][]
}

interface LoginDTO {
  email: string
  password: string
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupDTO>({
      query: (body) => ({
        url: '/auth/signUp',
        method: 'POST',
        body
      }),

      invalidatesTags: ['User'],

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAuthSession(data))
          dispatch(usersApiSlice.util.invalidateTags(['User']))
        } catch (e) {
          console.error('Ошибка регистрации:', e)
        }
      }
    }),

    login: builder.mutation<AuthResponse, LoginDTO>({
      query: (body) => ({
        url: '/auth/signInWithPassword',
        method: 'POST',
        body
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAuthSession(data))
        } catch (e) {
          console.error('Ошибка авторизации:', e)
        }
      }
    }),

    logout: builder.mutation<void, void>({
      queryFn: async (_, api) => {
        api.dispatch(logoutAction())
        api.dispatch(authApiSlice.util.resetApiState())

        return { data: undefined }
      }
    })
  })
})
