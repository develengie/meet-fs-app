import { useParams } from 'react-router-dom'
import { Card } from 'antd'
import { orderBy } from 'lodash'
import CommentForm from '../CommentForm'
import CommentsList from '../CommentsList'
import { ErrorMessage, SkeletonBlock } from '@/components/common'
import { errorMessages } from '@/locales'
import { SKELETON_BLOCK_SIZES } from '@/utils'
import { useGetCommentsQuery } from '@/store/comments'
import type { UserParams } from '@/types/users'
import './style.scss'

const Comments = () => {
  const { userId } = useParams<UserParams>()
  const {
    data: comments,
    isLoading,
    isError
  } = useGetCommentsQuery({ orderBy: 'pageId', equalTo: userId! })
  const sortedComments = orderBy(comments, ['createdAt'], ['desc'])

  return (
    <>
      {!isError ? (
        <>
          {!isLoading ? (
            <Card className="comments">
              <div className="comments__inner">
                <h2 className="comments__title">Новый комментарий</h2>
                <CommentForm userId={userId!} />
              </div>
            </Card>
          ) : (
            <SkeletonBlock
              width={SKELETON_BLOCK_SIZES.COMMENT_FORM.WIDTH}
              height={SKELETON_BLOCK_SIZES.COMMENT_FORM.HEIGHT}
            />
          )}
          {!isLoading ? (
            sortedComments.length > 0 && (
              <Card className="comments">
                <div className="comments__inner">
                  <h2 className="comments__title">Комментарии</h2>
                  <CommentsList comments={sortedComments} />
                </div>
              </Card>
            )
          ) : (
            <SkeletonBlock
              width={SKELETON_BLOCK_SIZES.COMMENTS_LIST.WIDTH}
              height={SKELETON_BLOCK_SIZES.COMMENTS_LIST.HEIGHT}
            />
          )}
        </>
      ) : (
        <ErrorMessage error={errorMessages.serverError} />
      )}
    </>
  )
}

export default Comments
