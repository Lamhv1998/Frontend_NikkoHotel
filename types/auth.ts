export type Address = {
  zipcode: number
  detail: string
}

export type SignupPayload = {
  name: string
  email: string
  password: string
  phone: string
  birthday: string
  address: Address
}

export type LoginPayload = {
  email: string
  password: string
}

export type ForgotPayload = {
  email: string
  code: string
  newPassword: string
}

export type UserInfo = {
  address: Address
  name: string
  phone: string
  email: string
}

export type UserResponse = {
  address: Address
  _id: string
  name: string
  email: string
  phone: string
  birthday: string
  createdAt: string
  updatedAt: string
}
