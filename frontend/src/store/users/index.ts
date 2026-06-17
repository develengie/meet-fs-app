import { usersApiSlice } from './api'

export const { useUpdateUserMutation, useGetUsersQuery } = usersApiSlice
export const usersMiddleware = usersApiSlice.middleware
export const usersReducerPath = usersApiSlice.reducerPath
export default usersApiSlice.reducer
