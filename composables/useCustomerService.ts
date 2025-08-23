export const useCustomerService = () => {
  const config = useRuntimeConfig()
  const customerServiceUrl = config.public.customerServiceUrl
  const authStore = useAuthStore()

  const getCustomerProfile = async (userId: string) => {
    try {
      const token = authStore.token
      
      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await $fetch(`${customerServiceUrl}/customers/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      return response
    } catch (error) {
      console.error('Get customer profile error:', error)
      throw error
    }
  }

  const updateCustomerProfile = async (customerData: any) => {
    try {
      const token = authStore.token
      
      if (!token) {
        throw new Error('No authentication token')
      }

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
      console.error('Update customer profile error:', error)
      throw error
    }
  }

  const createCustomer = async (customerData: any) => {
    try {
      const token = authStore.token
      
      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await $fetch(`${customerServiceUrl}/customers/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: customerData
      })
      
      return response
    } catch (error) {
      console.error('Create customer error:', error)
      throw error
    }
  }

  return {
    getCustomerProfile,
    updateCustomerProfile,
    createCustomer
  }
}
