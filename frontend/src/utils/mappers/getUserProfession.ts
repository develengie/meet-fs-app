import type { Profession } from '@/types'

export const getUserProfession = (
  professions: Profession[],
  professionId: Profession['_id']
) => {
  const userProfession = professions?.find(
    (profession) => profession._id === professionId
  )

  return userProfession?.name!
}
