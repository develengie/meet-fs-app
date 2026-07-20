import { commentsApiSlice } from './api'

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useRemoveCommentMutation
} = commentsApiSlice
export const commentsMiddleware = commentsApiSlice.middleware
export const commentsReducerPath = commentsApiSlice.reducerPath
export default commentsApiSlice.reducer
