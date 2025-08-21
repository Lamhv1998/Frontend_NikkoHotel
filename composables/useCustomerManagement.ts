import type { CustomerDto, UpdateCustomerCommand, UpdateCustomerAvatarCommand, ApiResponse } from '@/types/auth'

export const useCustomerManagement = () => {
  const runtimeConfig = useRuntimeConfig()
  const { customerServiceUrl } = runtimeConfig.public

  // Cập nhật thông tin khách hàng
  const updateCustomerInfo = async (customerData: UpdateCustomerCommand): Promise<ApiResponse<CustomerDto>> => {
    try {
      console.log('Updating customer info:', customerData)
      
      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: customerData
      })
      
      console.log('Update customer response:', response)
      return response
    } catch (error: any) {
      console.error('Error updating customer info:', error)
      throw error
    }
  }

  // Cập nhật ảnh đại diện khách hàng
  const updateCustomerAvatar = async (customerId: string, imageFile: File): Promise<ApiResponse<CustomerDto>> => {
    try {
      console.log('Updating customer avatar for customer:', customerId)
      
      const formData = new FormData()
      formData.append('imageRaw', imageFile)

      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile/${customerId}/avatar`, {
        method: 'PUT',
        body: formData
      })
      
      console.log('Update avatar response:', response)
      return response
    } catch (error: any) {
      console.error('Error updating customer avatar:', error)
      throw error
    }
  }

  // Lấy thông tin khách hàng theo ID
  const getCustomerById = async (customerId: string): Promise<CustomerDto> => {
    try {
      console.log('Getting customer by ID:', customerId)
      
      const response = await $fetch<CustomerDto>(`${customerServiceUrl}/customers/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Get customer response:', response)
      return response
    } catch (error: any) {
      console.error('Error getting customer by ID:', error)
      throw error
    }
  }

  // Lấy profile khách hàng theo userId
  const getCustomerProfile = async (userId: string): Promise<ApiResponse<CustomerDto>> => {
    try {
      console.log('Getting customer profile for user:', userId)
      
      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Get customer profile response:', response)
      return response
    } catch (error: any) {
      console.error('Error getting customer profile:', error)
      throw error
    }
  }

  // Lấy profile khách hàng theo customerId
  const getCustomerProfileById = async (customerId: string): Promise<ApiResponse<CustomerDto>> => {
    try {
      console.log('Getting customer profile by customer ID:', customerId)
      
      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile/customer/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Get customer profile by ID response:', response)
      return response
    } catch (error: any) {
      console.error('Error getting customer profile by ID:', error)
      throw error
    }
  }

  return {
    updateCustomerInfo,
    updateCustomerAvatar,
    getCustomerById,
    getCustomerProfile,
    getCustomerProfileById
  }
}
