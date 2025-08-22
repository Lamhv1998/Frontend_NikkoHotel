export default {
  // Get customer profile
  getCustomerProfileApi: (userId: string) => {
    return useHttp().get(`/customers/profile/${userId}`)
  },
  
  // Update customer profile
  updateCustomerApi: (options: { body: any }) => {
    return useHttp().put('/customers/update', options.body)
  },
  
  // Create customer
  createCustomerApi: (options: { body: any }) => {
    return useHttp().post('/customers/create', options.body)
  },
  
  // Update customer avatar
  updateCustomerAvatarApi: (options: { body: { customerId: string, imageFile: File } }) => {
    const formData = new FormData()
    formData.append('customerId', options.body.customerId)
    formData.append('imageFile', options.body.imageFile)
    
    return useHttp().put('/customers/update-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  // Get customer by ID
  getCustomerByIdApi: (customerId: string) => {
    return useHttp().get(`/customers/${customerId}`)
  },
  
  // Get customer orders
  getCustomerOrdersApi: (customerId: string) => {
    return useHttp().get(`/customers/${customerId}/orders`)
  },
  
  // Get customer membership info
  getCustomerMembershipApi: (customerId: string) => {
    return useHttp().get(`/customers/${customerId}/membership`)
  }
}
