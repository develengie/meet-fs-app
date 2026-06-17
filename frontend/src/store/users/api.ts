import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQueryWithReauth'
import type { Profession, Quality, User } from '@/types'

interface UpdateUserDTO {
  email: string
  name: string
  profession: Profession['_id']
  sex: string
  qualities: Quality['_id'][]
}

interface UpdateUserArgs {
  userId: User['_id']
  body: UpdateUserDTO
}

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    updateUser: builder.mutation<User, UpdateUserArgs>({
      query: ({ userId, body }) => ({
        url: `/user/${userId}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/user',
      providesTags: ['User']
    })
  })
})
