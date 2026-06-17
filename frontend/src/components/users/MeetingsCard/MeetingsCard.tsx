import { Card } from 'antd'
import type { User } from '@/types'
import '../style.scss'

interface MeetingsCardProps {
  value: User['completedMeetings']
}

const MeetingsCard = ({ value }: MeetingsCardProps) => {
  return (
    <Card className="card">
      <div className="card__inner">
        <h3 className="card__title">Количество встреч</h3>
        <div className="card__value">{value}</div>
      </div>
    </Card>
  )
}

export default MeetingsCard
