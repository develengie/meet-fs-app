export interface Profession {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Quality {
  _id: string
  name: string
  color: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface User {
  _id: string
  email: string
  name: string
  password: string
  profession: Profession['_id']
  qualities: Quality['_id'][]
  sex: string
  completedMeetings: number
  rate: number
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Comment {
  _id: string
  userId: User['_id']
  pageId: User['_id']
  content: string
  createdAt: string
  updatedAt: string
  __v: number
}
