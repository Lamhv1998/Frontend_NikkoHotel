import { useAuthStore } from '@/stores/auth'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchResponse } from 'ofetch'

interface ResOptions {
  message: string
  status: boolean
  code?: string
  details?: any
}

interface MicroserviceError {
  service: string
  endpoint: string
  status: number
  message: string
  timestamp: string
}

const handleError = (response: FetchResponse<ResOptions>, serviceName?: string) => {
  const showError = (message: string) => {
    // Use SweetAlert or other notification system instead of console.log
    // For now, we'll use a simple error handler
    const errorMessage = response?._data?.message ?? message
    
    // Log microservice error for debugging
    if (serviceName) {
      const error: MicroserviceError = {
        service: serviceName,
        endpoint: response.url || 'unknown',
        status: response.status,
        message: errorMessage,
        timestamp: new Date().toISOString()
      }
      console.error('Microservice Error:', error)
    }
    
    // TODO: Implement proper error notification system
  }

  if (!response._data) {
    showError('Yêu cầu quá thời gian, máy chủ không phản hồi!')
    return
  }

  const errorHandlers: Record<number, () => void> = {
    400: () => showError('Yêu cầu không hợp lệ'),
    401: () => showError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'),
    403: () => showError('Không có quyền truy cập tài nguyên này'),
    404: () => showError('Tài nguyên máy chủ không tồn tại'),
    408: () => showError('Yêu cầu quá thời gian chờ'),
    422: () => showError('Dữ liệu không hợp lệ'),
    429: () => showError('Quá nhiều yêu cầu, vui lòng thử lại sau'),
    500: () => showError('Lỗi nội bộ máy chủ'),
    502: () => showError('Lỗi kết nối đến microservice'),
    503: () => showError('Microservice không khả dụng'),
    504: () => showError('Microservice phản hồi quá chậm')
  }

  if (errorHandlers[response.status]) {
    errorHandlers[response.status]()
  } else {
    showError('Lỗi không xác định!')
  }
}

const fetch = <T>(url: string, options: UseFetchOptions<T>, serviceName?: string) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public
  const reqUrl = url.startsWith('/api') ? apiBase + url : url

  const fetch = useFetch(reqUrl, {
    onRequest({ options }) {
      /* Kiểm tra đã đăng nhập */
      const authStore = useAuthStore()
      options.headers = new Headers(options.headers)
      options.headers.set('Content-Type', 'application/json')
      
      // Add service identification header
      if (serviceName) {
        options.headers.set('X-Service-Name', serviceName)
      }
      
      if (!authStore.token) return
      /* Nếu đã đăng nhập, API sẽ gửi kèm token */
      options.headers.set('Authorization', authStore.token)
    },
    onResponseError({ response }) {
      handleError(response, serviceName)
    },
    ...options
  })
  return fetch
}

export default class useHttp {
  static get<T>(url: string, options: UseFetchOptions<T>, serviceName?: string) {
    return fetch(url, { method: 'get', ...options }, serviceName)
  }

  static post<T>(url: string, options: UseFetchOptions<T>, serviceName?: string) {
    return fetch(url, { method: 'post', ...options }, serviceName)
  }

  static put<T>(url: string, options: UseFetchOptions<T>, serviceName?: string) {
    return fetch(url, { method: 'put', ...options }, serviceName)
  }

  static delete<T>(url: string, options: UseFetchOptions<T>, serviceName?: string) {
    return fetch(url, { method: 'delete', ...options }, serviceName)
  }

  static patch<T>(url: string, options: UseFetchOptions<T>, serviceName?: string) {
    return fetch(url, { method: 'patch', ...options }, serviceName)
  }

  // Health check for microservices
  static async healthCheck(url: string, serviceName?: string) {
    try {
      const response = await fetch(url, { 
        method: 'get',
        timeout: 5000 
      }, serviceName)
      return { status: 'healthy', response }
    } catch (error) {
      return { status: 'unhealthy', error }
    }
  }

  // Batch health check for multiple services
  static async batchHealthCheck(services: Array<{ url: string, name: string }>) {
    const checks = await Promise.allSettled(
      services.map(service => this.healthCheck(service.url, service.name))
    )
    
    return checks.map((result, index) => ({
      service: services[index].name,
      result: result.status === 'fulfilled' ? result.value : result.reason
    }))
  }
}
