import type { UseFetchOptions } from 'nuxt/app'
import type { CustomerResponse, CustomerUpdateRequest, CustomerListResponse, CustomerStats } from '@/types/customer'

const customerAPI = {
  // Lấy thông tin customer theo ID
  getCustomerByIdApi: <T = CustomerResponse>(id: string, options: UseFetchOptions<T> = {}) => {
    return useHttp.get(`/customers/profile/${id}`, options)
  },

  // Lấy thông tin customer hiện tại (dựa trên token)
  getCurrentCustomerApi: <T = CustomerResponse>(options: UseFetchOptions<T> = {}) => {
    const authStore = useAuthStore()
    return useHttp.get(`/customers/profile/${authStore.id}`, options)
  },

  // Cập nhật thông tin customer
  updateCustomerApi: <T = CustomerResponse>(data: CustomerUpdateRequest, options: UseFetchOptions<T> = {}) => {
    return useHttp.put('/customers/profile', {
      body: data,
      ...options
    })
  },

  // Cập nhật thông tin customer hiện tại
  updateCurrentCustomerApi: <T = CustomerResponse>(data: CustomerUpdateRequest, options: UseFetchOptions<T> = {}) => {
    return useHttp.put('/customers/profile', {
      body: data,
      ...options
    })
  },

  // Lấy danh sách customers (cho admin) với pagination
  getCustomersApi: <T = CustomerListResponse>(params: {
    page?: number
    size?: number
    search?: string
    level?: string
  } = {}, options: UseFetchOptions<T> = {}) => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.level) queryParams.append('level', params.level)
    
    const url = `/customers${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return useHttp.get(url, options)
  },

  // Xóa customer (cho admin)
  deleteCustomerApi: <T = any>(id: string, options: UseFetchOptions<T> = {}) => {
    return useHttp.delete(`/customers/${id}`, options)
  },

  // Lấy thống kê customers (cho admin)
  getCustomerStatsApi: <T = CustomerStats>(options: UseFetchOptions<T> = {}) => {
    return useHttp.get('/customers/stats', options)
  },

  // Lấy customer theo email
  getCustomerByEmailApi: <T = CustomerResponse>(email: string, options: UseFetchOptions<T> = {}) => {
    return useHttp.get(`/customers/email/${email}`, options)
  },

  // Lấy customer theo phone
  getCustomerByPhoneApi: <T = CustomerResponse>(phone: string, options: UseFetchOptions<T> = {}) => {
    return useHttp.get(`/customers/phone/${phone}`, options)
  },

  // Cập nhật avatar customer
  updateCustomerAvatarApi: <T = CustomerResponse>(file: File, options: UseFetchOptions<T> = {}) => {
    const formData = new FormData()
    formData.append('avatar', file)
    
    return useHttp.put('/customers/avatar', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...options
    })
  },

  // Lấy lịch sử giao dịch của customer
  getCustomerTransactionHistoryApi: <T = any>(customerId: string, params: {
    page?: number
    size?: number
    startDate?: string
    endDate?: string
  } = {}, options: UseFetchOptions<T> = {}) => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.size) queryParams.append('size', params.size.toString())
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)
    
    const url = `/customers/${customerId}/transactions${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return useHttp.get(url, options)
  }
}

export default customerAPI
