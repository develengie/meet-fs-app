import { qualitiesApiSlice } from './api'

export const { useGetQualitiesQuery } = qualitiesApiSlice
export const qualitiesMiddleware = qualitiesApiSlice.middleware
export const qualitiesReducerPath = qualitiesApiSlice.reducerPath
export default qualitiesApiSlice.reducer
