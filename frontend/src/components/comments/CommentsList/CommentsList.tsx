import Comment from '../Comment'
import type { Comment as CommentType } from '@/types'

interface CommentsListProps {
  comments: CommentType[]
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return comments.map((comment) => (
    <Comment
      key={comment._id}
      commentId={comment._id}
      userId={comment.userId}
      content={comment.content}
      createdAt={comment.createdAt}
    />
  ))
}

export default CommentsList
