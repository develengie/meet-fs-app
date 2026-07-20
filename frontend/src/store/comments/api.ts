import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../baseQueryWithReauth'
import type { Comment, User } from '@/types'

interface GetCommentsArgs {
  orderBy: string
  equalTo: string
}

interface CreateCommentDTO {
  content: Comment['content']
  pageId: User['_id']
}

export const commentsApiSlice = createApi({
  reducerPath: 'commentsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], GetCommentsArgs>({
      query: ({ orderBy, equalTo }) => ({
        url: '/comment',
        params: {
          orderBy,
          equalTo
        }
      }),
      providesTags: ['Comment']
    }),
    createComment: builder.mutation<Comment, CreateCommentDTO>({
      query: (body) => ({
        url: '/comment',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Comment']
    }),
    removeComment: builder.mutation<void, Comment['_id']>({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comment']
    })
  })
})
