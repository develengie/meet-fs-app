import { useNavigate } from 'react-router-dom'
import { Dropdown, Space, type MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { SkeletonBlock } from '@/components/common'
import { internalPaths } from '@/locales'
import { SKELETON_BLOCK_SIZES } from '@/utils'
import { useAppSelector } from '@/store'
import { useGetUsersQuery } from '@/store/users'
import { selectCurrentUserId, useLogoutMutation } from '@/store/auth'
import './style.scss'

const items = [
  {
    key: '1',
    label: 'Профиль'
  },
  {
    key: '2',
    label: 'Выйти',
    danger: true
  }
]

const NavigationProfile = () => {
  const navigate = useNavigate()
  const { data: users, isLoading, isError } = useGetUsersQuery()
  const [logout] = useLogoutMutation()
  const currentUserId = useAppSelector(selectCurrentUserId)
  const currentUser = users?.find((user) => user._id === currentUserId)

  const handleMenuClick: MenuProps['onClick'] = (info) => {
    switch (info.key) {
      case '1':
        navigate(internalPaths.profile(currentUserId!))
        break

      case '2':
        logout()
        navigate(internalPaths.login)
        break

      default:
        break
    }
  }

  return (
    <>
      {!isError &&
        (!isLoading ? (
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <div className="dropdown__menu">
              <Space>
                <img
                  className="dropdown__menu-image"
                  src={currentUser?.image}
                  height="40"
                  alt=""
                />
                {currentUser?.name}
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        ) : (
          <SkeletonBlock
            width={SKELETON_BLOCK_SIZES.NAVIGATION_PROFILE.WIDTH}
            height={SKELETON_BLOCK_SIZES.NAVIGATION_PROFILE.HEIGHT}
          />
        ))}
    </>
  )
}

export default NavigationProfile
