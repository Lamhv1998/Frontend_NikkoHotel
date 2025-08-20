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
  _id?: string
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

// Backend Authentication API Types
export type AuthenticationRequest = {
  email: string
  password: string
}

export type AuthenticationResponse = {
  authenticated: boolean  
  token: string
}

export type ApiResponse<T> = {
  code?: number
  message?: string
  result: T
}
