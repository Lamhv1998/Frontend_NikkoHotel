import type { UseFetchOptions } from 'nuxt/app'
import type { CustomerDto, CreateCustomerCommand, UpdateCustomerCommand, ApiResponse } from '@/types/auth'

const customerAPI = {
  getCustomerProfileApi: <T = any>(options: UseFetchOptions<T>) => {
    const { getCustomerProfile } = useCustomerService()
    const userId = options.params?.userId || options.body?.userId
    
    if (!userId) {
      throw new Error('User ID is required')
    }
    
    return getCustomerProfile(userId as string)
  },

  createCustomerApi: <T = any>(options: UseFetchOptions<T>) => {
    const { createCustomer } = useCustomerService()
    return createCustomer(options.body as CreateCustomerCommand)
  },

  updateCustomerApi: <T = any>(options: UseFetchOptions<T>) => {
    const { updateCustomer } = useCustomerService()
    return updateCustomer(options.body as UpdateCustomerCommand)
  },

  updateCustomerAvatarApi: <T = any>(options: UseFetchOptions<T>) => {
    const { updateCustomerAvatar } = useCustomerService()
    const { customerId, imageFile } = options.body as { customerId: string; imageFile: File }
    
    if (!customerId || !imageFile) {
      throw new Error('Customer ID and image file are required')
    }
    
    return updateCustomerAvatar(customerId, imageFile)
  }
}

export default customerAPI
