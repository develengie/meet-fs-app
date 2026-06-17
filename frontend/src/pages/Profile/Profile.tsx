import { useParams } from 'react-router-dom'
import { Comments } from '@/components/comments'
import { ErrorMessage, SkeletonBlock } from '@/components/common'
import { MeetingsCard, QualitiesCard, UserCard } from '@/components/users'
import { errorMessages } from '@/locales'
import { SKELETON_BLOCK_SIZES } from '@/utils'
import { useGetUsersQuery } from '@/store/users'
import type { UserParams } from '@/types/users'
import '../style.scss'

const Profile = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery()
  const { userId } = useParams<UserParams>()
  const user = users?.find((u) => u._id === userId)

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner">
          <div className="page__col  page__col--sm">
            {!isError ? (
              <>
                {!isLoading ? (
                  <UserCard user={user!} />
                ) : (
                  <SkeletonBlock
                    width={SKELETON_BLOCK_SIZES.USERS_CARD.WIDTH}
                    height={SKELETON_BLOCK_SIZES.USERS_CARD.HEIGHT}
                  />
                )}
                {!isLoading ? (
                  <QualitiesCard qualitiesIds={user?.qualities!} />
                ) : (
                  <SkeletonBlock
                    width={SKELETON_BLOCK_SIZES.QUALITIES_CARD.WIDTH}
                    height={SKELETON_BLOCK_SIZES.QUALITIES_CARD.HEIGHT}
                  />
                )}
                {!isLoading ? (
                  <MeetingsCard value={user?.completedMeetings!} />
                ) : (
                  <SkeletonBlock
                    width={SKELETON_BLOCK_SIZES.MEETINGS_CARD.WIDTH}
                    height={SKELETON_BLOCK_SIZES.MEETINGS_CARD.HEIGHT}
                  />
                )}
              </>
            ) : (
              <ErrorMessage error={errorMessages.serverError} />
            )}
          </div>
          <div className="page__col  page__col--lg">
            <Comments />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
