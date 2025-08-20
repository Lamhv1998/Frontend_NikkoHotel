export type Address = {
  zipcode: number
  detail: string
}

export type CustomerResponse = {
  customerId: string
  firstName: string
  lastName: string
  address: string
  dateOfBirth: string
  accumulatedSpending: number
  level: string
  imageUrl: string
  createdDate: string
  updatedDate: string
}

export type CustomerUpdateRequest = {
  name?: string
  email?: string
  phone?: string
  birthday?: string
  address?: Address
}

export type CustomerListResponse = {
  customers: CustomerResponse[]
  total: number
  page: number
  size: number
}

export type CustomerStats = {
  totalCustomers: number
  activeCustomers: number
  newCustomersThisMonth: number
  averagePoints: number
}
