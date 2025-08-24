import type { CustomerDto, UpdateCustomerCommand, ApiResponse } from '@/types/auth'

export const useCustomer = () => {
  const runtimeConfig = useRuntimeConfig()
  const { customerServiceUrl } = runtimeConfig.public
  const authStore = useAuthStore()

  // Lấy token từ auth store
  const getAuthToken = () => {
    const token = authStore.token
    if (!token) {
      throw new Error('No authentication token')
    }
    return token
  }

  // Cập nhật thông tin khách hàng
  const updateCustomerInfo = async (customerData: UpdateCustomerCommand): Promise<ApiResponse<CustomerDto>> => {
    try {
      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: customerData
      })
      
      return response
    } catch (error: any) {
      throw error
    }
  }

  // Cập nhật ảnh đại diện khách hàng
  const updateCustomerAvatar = async (customerId: string, imageFile: File): Promise<ApiResponse<CustomerDto>> => {
    try {
      const formData = new FormData()
      formData.append('imageRaw', imageFile)

      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile/${customerId}/avatar`, {
        method: 'PUT',
        body: formData
      })
      
      return response
    } catch (error: any) {
      throw error
    }
  }

  // Lấy thông tin khách hàng theo ID
  const getCustomerById = async (customerId: string): Promise<CustomerDto> => {
    try {
      const response = await $fetch<CustomerDto>(`${customerServiceUrl}/customers/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return response
    } catch (error: any) {
      throw error
    }
  }

  const getCustomerProfile = async (userId: string): Promise<ApiResponse<CustomerDto>> => {
    try {
      const token = getAuthToken()
      
      // Thử endpoint đầu tiên: /customers/profile/{userId}
      const firstEndpoint = `${customerServiceUrl}/customers/profile/${userId}`
      
      try {
        const response = await $fetch<any>(firstEndpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        // Xử lý response format mới: {success: true, data: {...}}
        if (response && response.success && response.data) {
          const apiResponse: ApiResponse<CustomerDto> = {
            code: 0,
            result: response.data,
            message: response.message || 'Success'
          }
          return apiResponse
        }
        
        // Xử lý response format cũ: {code: 0, result: {...}}
        if (response && response.code === 0 && response.result) {
          return response
        }
        
        throw new Error('Unknown response format')
        
      } catch (firstError) {
        // Thử endpoint thay thế: /customers/{userId}
        const secondEndpoint = `${customerServiceUrl}/customers/${userId}`
        
        const response = await $fetch<any>(secondEndpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        // Xử lý response format mới: {success: true, data: {...}}
        if (response && response.success && response.data) {
          const apiResponse: ApiResponse<CustomerDto> = {
            code: 0,
            result: response.data,
            message: response.message || 'Success'
          }
          return apiResponse
        }
        
        // Xử lý response format cũ: {code: 0, result: {...}}
        if (response && response.code === 0 && response.result) {
          return response
        }
        
        throw new Error('Unknown response format from both endpoints')
      }
    } catch (error: any) {
      throw error
    }
  }

  // Lấy profile khách hàng theo customerId
  const getCustomerProfileById = async (customerId: string): Promise<ApiResponse<CustomerDto>> => {
    try {
      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile/customer/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return response
    } catch (error: any) {
      throw error
    }
  }

  // Cập nhật profile khách hàng (có authentication)
  const updateCustomerProfile = async (customerData: any): Promise<any> => {
    try {
      const token = getAuthToken()
      
      const response = await $fetch(`${customerServiceUrl}/customers/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: customerData
      })
      
      return response
    } catch (error) {
      throw error
    }
  }

  // Tạo khách hàng mới (có authentication)
  const createCustomer = async (customerData: any): Promise<any> => {
    try {
      const token = getAuthToken()
      
      const response = await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: customerData
      })
      
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    updateCustomerInfo,
    updateCustomerAvatar,
    getCustomerById,
    getCustomerProfile,
    getCustomerProfileById,
    updateCustomerProfile,
    createCustomer
  }
}
