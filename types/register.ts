export interface CreateCustomerCommand {
  email: string
  password: string
  phone: string
  firstName: string
  lastName: string
  sex: 'MALE' | 'FEMALE'
  dateOfBirth: string
  address: {
    street: string
    ward: string
    district: string
    city: string
  }
}

export interface CustomerResponse {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  sex: 'MALE' | 'FEMALE'
  dateOfBirth: string
  address: {
    street: string
    ward: string
    district: string
    city: string
  }
  createdAt: string
  updatedAt: string
}

export interface EmailVerificationRequest {
  email: string
}

export interface EmailVerificationResponse {
  success: boolean
  message: string
  otp?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  errors?: string[]
}

export interface UserResponse {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  sex: 'MALE' | 'FEMALE'
  dateOfBirth: string
  address: {
    street: string
    ward: string
    district: string
    city: string
  }
  createdAt: string
  updatedAt: string
}
f