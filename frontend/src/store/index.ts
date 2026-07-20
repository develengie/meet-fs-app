import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux'
import professionsReducer, {
  professionsMiddleware,
  professionsReducerPath
} from './professions'
import qualitiesReducer, {
  qualitiesMiddleware,
  qualitiesReducerPath
} from './qualities'
import usersReducer, { usersMiddleware, usersReducerPath } from './users'
import commentsReducer, {
  commentsMiddleware,
  commentsReducerPath
} from './comments'
import {
  authApiReducer,
  authReducer,
  authMiddleware,
  authReducerPath
} from './auth'

const rootReducer = combineReducers({
  [professionsReducerPath]: professionsReducer,
  [qualitiesReducerPath]: qualitiesReducer,
  [usersReducerPath]: usersReducer,
  [commentsReducerPath]: commentsReducer,
  [authReducerPath]: authApiReducer,
  auth: authReducer
})

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        professionsMiddleware,
        qualitiesMiddleware,
        usersMiddleware,
        commentsMiddleware,
        authMiddleware
      ])
  })
}

export const store = setupStore()

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
