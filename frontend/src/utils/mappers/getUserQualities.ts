import type { Quality } from '@/types'

export const getUserQualities = (
  qualities: Quality[],
  qualitiesIds: Quality['_id'][]
) => {
  return qualities.filter((quality) => qualitiesIds.includes(quality._id))
}
