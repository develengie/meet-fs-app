import { CloseOutlined } from '@ant-design/icons'
import { displayDate } from '@/utils'
import { useAppSelector } from '@/store'
import { useGetUsersQuery } from '@/store/users'
import { useRemoveCommentMutation } from '@/store/comments'
import { selectCurrentUserId } from '@/store/auth'
import type { Comment as CommentType } from '@/types'
import './style.scss'

interface CommentProps {
  commentId: CommentType['_id']
  userId: CommentType['userId']
  content: CommentType['content']
  createdAt: CommentType['createdAt']
}

const Comment = (props: CommentProps) => {
  const { commentId, userId, content, createdAt } = props
  const { data: users } = useGetUsersQuery()
  const [removeComment] = useRemoveCommentMutation()
  const currentUserId = useAppSelector(selectCurrentUserId)
  const user = users?.find((u) => u._id === userId)

  const handleRemoveComment = async () => {
    await removeComment(commentId).unwrap()
  }

  return (
    <div className="comment">
      <div className="comment__inner">
        <img className="comment__image" src={user?.image} alt="" />
        <div className="comment__data">
          <div className="comment__name">
            {user?.name}
            <span className="comment__date"> - {displayDate(createdAt)}</span>
          </div>
          <div className="comment__content">{content}</div>
        </div>
      </div>
      {userId === currentUserId && (
        <button className="comment__button" onClick={handleRemoveComment}>
          <CloseOutlined />
        </button>
      )}
    </div>
  )
}

export default Comment
