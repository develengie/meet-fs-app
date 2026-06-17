import { professionsApiSlice } from './api'

export const { useGetProfessionsQuery } = professionsApiSlice
export const professionsMiddleware = professionsApiSlice.middleware
export const professionsReducerPath = professionsApiSlice.reducerPath
export default professionsApiSlice.reducer
