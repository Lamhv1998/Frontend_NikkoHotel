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

export interface CreateBookingRequest {
  customerId: string
  listRoomId: string[]
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  specialRequests?: string
  customerEmail?: string
  customerPhone?: string
}

export interface BookingDto {
  bookingId: string
  customerId: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests?: number
  status: string
  totalAmount: number
  createdAt: string
  updatedAt: string
  notes?: string
  paymentStatus?: string
}

export interface ConfirmPaymentResponse {
  bookingId: string
  status: string
  urlPayment?: string
  message?: string
}
  