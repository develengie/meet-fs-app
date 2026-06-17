import type { User } from '@/types'

export const internalPaths = {
  main: '/',
  profile: (userId: User['_id']): User['_id'] => `/users/${userId}`,
  editProfile: (userId: User['_id']): User['_id'] => `/users/${userId}/edit`,
  login: '/login',
  signup: '/signup'
}
