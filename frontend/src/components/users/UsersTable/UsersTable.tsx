import { Link } from 'react-router-dom'
import { Table } from 'antd'
import UserQualities from '../UserQualities'
import { internalPaths } from '@/locales'
import { getUserProfession } from '@/utils/mappers'
import type { ReactNode } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { SortOrder, TablePaginationConfig } from 'antd/es/table/interface'
import type { Profession, User } from '@/types'
import type { SortConfig, SortField } from '@/types/users'

interface UsersTableProps {
  users: User[]
  professions: Profession[]
  sortConfig: SortConfig
  onSortUsers: (field: SortField, order: SortOrder) => void
  pagination: {
    current: number
    pageSize: number
  }
  onChangePagination: (pag: TablePaginationConfig) => void
}

interface UserTableRow {
  key: User['_id']
  id: User['_id']
  name: User['name']
  qualities: ReactNode
  profession: Profession['name']
  completedMeetings: User['completedMeetings']
  rate: User['rate']
}

const locale = {
  triggerAsc: 'Нажмите, чтобы сортировать по возрастанию',
  triggerDesc: 'Нажмите, чтобы сортировать по убыванию',
  cancelSort: 'Нажмите, чтобы отменить сортировку'
}

const UsersTable = (props: UsersTableProps) => {
  const {
    users,
    professions,
    sortConfig,
    onSortUsers,
    pagination,
    onChangePagination
  } = props

  const columns: ColumnsType<UserTableRow> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortConfig.field === 'name' ? sortConfig.order : null,
      render: (_, record) => (
        <Link to={internalPaths.profile(record.id)}>{record.name}</Link>
      )
    },
    {
      title: 'Качества',
      dataIndex: 'qualities',
      key: 'qualities'
    },
    {
      title: 'Профессия',
      dataIndex: 'profession',
      key: 'profession'
    },
    {
      title: 'Встретился, раз',
      dataIndex: 'completedMeetings',
      key: 'completedMeetings',
      sorter: true,
      sortOrder:
        sortConfig.field === 'completedMeetings' ? sortConfig.order : null
    },
    {
      title: 'Оценка',
      dataIndex: 'rate',
      key: 'rate',
      sorter: true,
      sortOrder: sortConfig.field === 'rate' ? sortConfig.order : null
    }
  ]

  const dataSource: UserTableRow[] = users.map((user) => ({
    key: user._id,
    id: user._id,
    name: user.name,
    qualities: <UserQualities qualitiesIds={user.qualities} />,
    profession: getUserProfession(professions, user.profession),
    completedMeetings: user.completedMeetings,
    rate: user.rate
  }))

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      locale={locale}
      onChange={(pag, __, sorter) => {
        onChangePagination(pag)

        if (!Array.isArray(sorter)) {
          onSortUsers(sorter.field as SortField, sorter.order ?? null)
        }
      }}
      pagination={{
        ...pagination,
        placement: ['bottomCenter']
      }}
    />
  )
}

export default UsersTable
