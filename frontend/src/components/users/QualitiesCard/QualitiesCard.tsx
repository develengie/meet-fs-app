import { Card } from 'antd'
import UserQualities from '../UserQualities'
import type { Quality } from '@/types'
import '../style.scss'

interface QualitiesCardProps {
  qualitiesIds: Quality['_id'][]
}

const QualitiesCard = ({ qualitiesIds }: QualitiesCardProps) => {
  return (
    <Card className="card">
      <div className="card__inner">
        <h3 className="card__title">Качества</h3>
        <UserQualities qualitiesIds={qualitiesIds} justify="center" />
      </div>
    </Card>
  )
}

export default QualitiesCard
