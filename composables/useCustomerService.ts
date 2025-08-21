import type { CustomerDto, CreateCustomerCommand, UpdateCustomerCommand, ApiResponse } from '@/types/auth'

export const useCustomerService = () => {
  const runtimeConfig = useRuntimeConfig()
  const { customerServiceUrl } = runtimeConfig.public

  console.log('CustomerService initialized with URL:', customerServiceUrl)

  const getCustomerProfile = async (userId: string): Promise<ApiResponse<CustomerDto>> => {
    const url = `${customerServiceUrl}/customers/profile/${userId}`
    console.log('Calling customer service at:', url)
    console.log('User ID:', userId)
    
    try {
      const response = await $fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('Customer service response:', response)
      
      // Xử lý cả hai loại response structure
      if (response.success && response.data) {
        // Customer service response: {success: true, data: {...}, message: '...', timestamp: '...'}
        console.log('Customer service response structure detected')
        console.log('Customer data:', response.data)
        return {
          code: 0,
          result: response.data,
          message: response.message
        }
      } else if (response.code === 0 && response.result) {
        // API Gateway response: {code: 0, result: {...}, message: '...'}
        console.log('API Gateway response structure detected')
        return response
      } else {
        console.log('Unknown response structure:', response)
        throw new Error('Unknown response structure from customer service')
      }
    } catch (error) {
      console.error('Customer service error:', error)
      console.error('Error details:', {
        url,
        userId,
        error: error.message,
        status: error.status,
        data: error.data
      })
      throw error
    }
  }

  const createCustomer = async (customerData: CreateCustomerCommand): Promise<ApiResponse<CustomerDto>> => {
    return await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: customerData
    })
  }

  const updateCustomer = async (customerData: UpdateCustomerCommand): Promise<ApiResponse<CustomerDto>> => {
    return await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: customerData
    })
  }

  const updateCustomerAvatar = async (customerId: string, imageFile: File): Promise<ApiResponse<CustomerDto>> => {
    const formData = new FormData()
    formData.append('imageRaw', imageFile)

    return await $fetch<ApiResponse<CustomerDto>>(`${customerServiceUrl}/customers/profile/${customerId}/avatar`, {
      method: 'PUT',
      body: formData
    })
  }

  return {
    getCustomerProfile,
    createCustomer,
    updateCustomer,
    updateCustomerAvatar
  }
}
