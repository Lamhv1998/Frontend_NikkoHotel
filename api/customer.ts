import type { UseFetchOptions } from 'nuxt/app'
import type { CustomerDto, CreateCustomerCommand, UpdateCustomerCommand, ApiResponse } from '@/types/auth'

const customerAPI = {
  getCustomerProfileApi: <T = any>(options: UseFetchOptions<T>) => {
    const { getCustomerProfile } = useCustomer()
    const userId = (options.params as any)?.userId || (options.body as any)?.userId
    
    if (!userId) {
      throw new Error('User ID is required')
    }
    
    return getCustomerProfile(userId as string,token)
  },

  createCustomerApi: <T = any>(options: UseFetchOptions<T>) => {
    const { createCustomer } = useCustomer()
    return createCustomer(options.body as CreateCustomerCommand)
  },

  updateCustomerApi: <T = any>(options: UseFetchOptions<T>) => {
    const { updateCustomerProfile } = useCustomer()
    return updateCustomerProfile(options.body as UpdateCustomerCommand)
  },

  updateCustomerAvatarApi: <T = any>(options: UseFetchOptions<T>) => {
    const { updateCustomerAvatar } = useCustomer()
    const { customerId, imageFile } = options.body as { customerId: string; imageFile: File }
    
    if (!customerId || !imageFile) {
      throw new Error('Customer ID and image file are required')
    }
    
    return updateCustomerAvatar(customerId, imageFile)
  }
}

export default customerAPI

