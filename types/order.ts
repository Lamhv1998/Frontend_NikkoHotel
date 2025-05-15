import type { UserInfo } from './auth.ts'
import type { RoomResponse } from './room.ts'

export type OrderPayload = {
  roomId: string
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  userInfo: UserInfo
}

export type OrderResponse = {
  userInfo: UserInfo
  _id: string
  roomId: RoomResponse
  checkInDate: string
  checkOutDate: string
  peopleNum: number
  orderUserId: string
  status: number
  createdAt: string
  updatedAt: string
}
