import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '@/config'
import type { Profession } from '@/types'

export const professionsApiSlice = createApi({
  reducerPath: 'professionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}`
  }),
  endpoints: (builder) => ({
    getProfessions: builder.query<Profession[], void>({
      query: () => '/profession'
    })
  })
})
