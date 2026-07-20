import type { SortOrder } from 'antd/es/table/interface'
import type { User } from '.'

export type SortField = keyof Pick<User, 'name' | 'completedMeetings' | 'rate'>

export interface SortConfig {
  field: SortField | null
  order: SortOrder
}

export type UserParams = {
  userId?: User['_id']
}
