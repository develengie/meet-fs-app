import { Flex, Tag } from 'antd'
import { getUserQualities } from '@/utils/mappers'
import { useGetQualitiesQuery } from '@/store/qualities'
import type { Quality } from '@/types'

type Justify = 'center' | 'flex-start'

interface UserQualitiesProps {
  qualitiesIds: Quality['_id'][]
  justify?: Justify
}

const UserQualities = ({ qualitiesIds, justify }: UserQualitiesProps) => {
  const { data: qualities = [] } = useGetQualitiesQuery()
  const qualitiesList = getUserQualities(qualities, qualitiesIds)

  return (
    <Flex gap="small" justify={justify} wrap>
      {qualitiesList.map((quality) => (
        <Tag key={quality._id} color={quality.color}>
          {quality.name}
        </Tag>
      ))}
    </Flex>
  )
}

export default UserQualities
