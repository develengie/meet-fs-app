import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '@/config'
import type { Quality } from '@/types'

export const qualitiesApiSlice = createApi({
  reducerPath: 'qualitiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}`
  }),
  endpoints: (builder) => ({
    getQualities: builder.query<Quality[], void>({
      query: () => '/quality'
    })
  })
})
