export type Address = {
  city: string
  district: string
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
  code: number
  message?: string
  result: T
}

// User API Types - Cập nhật để khớp với backend
export type UserCreationRequest = {
  email: string
  password: string
  phone?: string
}

// Type mở rộng cho frontend (bao gồm thông tin bổ sung)
export type ExtendedUserCreationRequest = {
  email: string
  password: string
  name: string
  phone: string
  birthday: string
  address: Address
}

export type UserUpdatedRequest = {
  userId?: string
  name?: string
  phone?: string
  birthday?: string
  address?: Address
}

export type UserResponse = {
  _id?: string
  id?: string
  name: string
  email: string
  phone: string
  birthday: string
  address: Address
  createdAt: string
  updatedAt: string
}

// Customer API Types
export type AddressDto = {
  street: string
  ward: string
  district: string
  city: string
}

export type CustomerDto = {
  customerId: string
  firstName: string
  lastName: string
  address: string
  dateOfBirth: string
  accumulatedSpending?: number
  level: string
  imageUrl?: string
  createdDate: string
  updatedDate: string
  sex: string
  active: boolean
}

// Type cũ để tương thích (nếu cần)
export type CustomerDtoLegacy = {
  customerId: string
  userId: string
  name: string
  email: string
  phone: string
  birthday: string
  address: Address
  avatar?: string
  createdAt: string
  updatedAt: string
}

export type CreateCustomerCommand = {
  userId: string
  name: string
  email: string
  phone: string
  birthday: string
  address: Address
}

export type UpdateCustomerCommand = {
  customerId: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  address?: Address
  sex?: string
}

// OTP Types for Password Change
export type SendOtpRequest = {
  userEmail: string
}

export type SendOtpResponse = {
  message: string
  otp?: string // Chỉ có trong dev/test environment
}

export type VerifyOtpRequest = {
  userEmail: string
  otp: string
}

export type VerifyOtpResponse = {
  message: string
}

// Password Change Types
export type ChangePasswordRequest = {
  userId: string
  oldPassword: string
  newPassword: string
}

export type ChangePasswordResponse = {
  message: string
}
