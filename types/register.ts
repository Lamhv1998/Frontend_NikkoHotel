export interface CreateCustomerCommand {
  password: string
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
}

export interface UserResponse {
  id: string
  email: string
  phone: string
  token: string
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

export interface ApiResponse<T> {
  success: boolean
  data: T
}

// Thêm interface cho xác nhận email
export interface EmailVerificationRequest {
  email: string
  code: string
}

export interface EmailVerificationResponse {
  success: boolean
  message: string
  verified: boolean
}
