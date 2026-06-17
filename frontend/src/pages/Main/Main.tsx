import { useState, type ChangeEvent } from 'react'
import { Input } from 'antd'
import { orderBy } from 'lodash'
import { ErrorMessage, GroupMenu, SkeletonBlock } from '@/components/common'
import { SearchStatus, UsersTable } from '@/components/users'
import { errorMessages } from '@/locales'
import { PrimaryButton } from '@/ui'
import { CURRENT_PAGE, PAGE_SIZE, SKELETON_BLOCK_SIZES } from '@/utils'
import { useDebounce } from '@/utils/hooks'
import { useAppSelector } from '@/store'
import { useGetProfessionsQuery } from '@/store/professions'
import { useGetUsersQuery } from '@/store/users'
import { selectCurrentUserId } from '@/store/auth'
import type { SortOrder, TablePaginationConfig } from 'antd/es/table/interface'
import type { Profession, User } from '@/types'
import type { SortConfig, SortField } from '@/types/users'
import '../style.scss'

const Main = () => {
  const {
    data: professions,
    isLoading: professionsLoading,
    isError: professionsError
  } = useGetProfessionsQuery()
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError
  } = useGetUsersQuery()
  const [selectedProfessionId, setSelectedProfessionId] = useState<
    Profession['_id'] | null
  >(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    order: 'ascend'
  })
  const [pagination, setPagination] = useState({
    current: CURRENT_PAGE,
    pageSize: PAGE_SIZE
  })
  const currentUserId = useAppSelector(selectCurrentUserId)
  const debouncedSearchQuery = useDebounce(searchQuery)

  const resetPagination = () => {
    setPagination((prevState) => ({ ...prevState, current: CURRENT_PAGE }))
  }

  const handleSelectProfession = (id: Profession['_id']) => {
    if (debouncedSearchQuery) {
      setSearchQuery('')
    }

    setSelectedProfessionId(id)
    resetPagination()
  }

  const handleClearFilter = () => {
    setSelectedProfessionId(null)
    resetPagination()
  }

  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedProfessionId(null)
    setSearchQuery(event.target.value)
    resetPagination()
  }

  const handleSortUsers = (field: SortField, order: SortOrder) => {
    setSortConfig({ field, order })
  }

  const handleChangePagination = (pag: TablePaginationConfig) => {
    setPagination((prevState) => ({
      current: pag.current ?? prevState.current,
      pageSize: pag.pageSize ?? prevState.pageSize
    }))
  }

  const filterUsers = (data: User[]) => {
    const filteredUsers = debouncedSearchQuery
      ? data.filter((user) =>
          user.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      : selectedProfessionId
        ? data.filter((user) => user.profession === selectedProfessionId)
        : data

    return filteredUsers.filter((user) => user._id !== currentUserId)
  }

  const professionsGroup = professions?.map((profession) => ({
    key: profession._id,
    label: profession.name
  }))!

  const filteredUsers = filterUsers(users ?? [])
  const sortedUsers = sortConfig.field
    ? orderBy(
        filteredUsers,
        [sortConfig.field],
        [sortConfig.order === 'ascend' ? 'asc' : 'desc']
      )
    : filteredUsers
  const usersCount = filteredUsers.length

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner">
          <div className="page__col  page__col--xs">
            {professionsError && (
              <ErrorMessage error={errorMessages.serverError} />
            )}
            {!professionsLoading ? (
              <>
                <GroupMenu
                  items={professionsGroup}
                  selectedId={selectedProfessionId!}
                  onItemSelect={handleSelectProfession}
                />
                <PrimaryButton
                  type="button"
                  text="Очистить"
                  onClick={handleClearFilter}
                  isDisabled={!selectedProfessionId}
                />
              </>
            ) : (
              <SkeletonBlock
                width={SKELETON_BLOCK_SIZES.GROUP_MENU.WIDTH}
                height={SKELETON_BLOCK_SIZES.GROUP_MENU.HEIGHT}
              />
            )}
          </div>
          <div className="page__col  page__col--xl">
            {!usersLoading ? (
              <SearchStatus length={usersCount} />
            ) : (
              <SkeletonBlock
                width={SKELETON_BLOCK_SIZES.SEARCH_STATUS.WIDTH}
                height={SKELETON_BLOCK_SIZES.SEARCH_STATUS.HEIGHT}
              />
            )}
            <Input
              id="searchQuery"
              name="searchQuery"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchQuery}
            />
            {!usersLoading ? (
              usersCount > 0 && (
                <div style={{ backgroundColor: 'white', borderRadius: '8px' }}>
                  <UsersTable
                    users={sortedUsers}
                    professions={professions!}
                    sortConfig={sortConfig}
                    onSortUsers={handleSortUsers}
                    pagination={pagination}
                    onChangePagination={handleChangePagination}
                  />
                </div>
              )
            ) : (
              <SkeletonBlock
                width={SKELETON_BLOCK_SIZES.USERS_TABLE.WIDTH}
                height={SKELETON_BLOCK_SIZES.USERS_TABLE.HEIGHT}
              />
            )}
            {usersError && <ErrorMessage error={errorMessages.serverError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
