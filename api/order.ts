import type { UseFetchOptions } from 'nuxt/app'

const OrderAPI = {
  getOrdersApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/orders', options)
  },
  addOrderApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/orders', options)
  },
  getOrderApi: <T = any>(id: string, options: UseFetchOptions<T>) => {
    return useHttp.get(`/api/v1/orders/${id}`, options)
  },
  deleteOrderApi: <T = any>(id: string, options: UseFetchOptions<T>) => {
    return useHttp.delete(`/api/v1/orders/${id}`, options)
  }
}

export default OrderAPI
