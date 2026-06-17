import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '@/config'
import { getAccessToken, getRefreshToken } from '@/services'
import { logout, setAuthSession } from './auth/slice'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import type { RootState } from '.'
import type { AuthResponse } from './auth'

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.baseUrl}`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const accessToken = state.auth.accessToken ?? getAccessToken()

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  }
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const state = api.getState() as RootState
    const refreshToken = state.auth.refreshToken ?? getRefreshToken()

    if (!refreshToken) {
      api.dispatch(logout())

      return result
    }

    const refreshResult = await baseQuery(
      {
        url: '/auth/token',
        method: 'POST',
        body: {
          refresh_token: refreshToken
        }
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const data = refreshResult.data as AuthResponse
      api.dispatch(setAuthSession(data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}
