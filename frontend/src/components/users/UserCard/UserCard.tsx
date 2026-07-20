import { useNavigate } from 'react-router-dom'
import { Card } from 'antd'
import { SettingOutlined, StarOutlined } from '@ant-design/icons'
import { internalPaths } from '@/locales'
import { useAppSelector } from '@/store'
import { selectCurrentUserId } from '@/store/auth'
import type { User } from '@/types'
import '../style.scss'

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate()
  const currentUserId = useAppSelector(selectCurrentUserId)

  const handleClick = () => {
    navigate(internalPaths.editProfile(user._id))
  }

  return (
    <Card className="card">
      <div className="card__inner">
        <img className="card__image" src={user.image} alt="" />
        <h2 className="card__name">{user.name}</h2>
        <div className="card__rate">
          <StarOutlined />
          <span className="card__rate-value">{user.rate}</span>
        </div>
        {user._id === currentUserId && (
          <button className="card__button" onClick={handleClick}>
            <SettingOutlined />
          </button>
        )}
      </div>
    </Card>
  )
}

export default UserCard
