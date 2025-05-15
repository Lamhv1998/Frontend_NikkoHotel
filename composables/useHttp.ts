import { useAuthStore } from '@/stores/auth'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchResponse } from 'ofetch'

interface ResOptions {
  message: string
  status: boolean
}

const handleError = (response: FetchResponse<ResOptions>) => {
  const showError = (message: string) => {
    // eslint-disable-next-line no-console
    console.log('Thông báo lỗi:', response?._data?.message ?? message)
  }

  if (!response._data) {
    showError('Yêu cầu quá thời gian, máy chủ không phản hồi!')
    return
  }

  const errorHandlers: Record<number, () => void> = {
    404: () => showError('Tài nguyên máy chủ không tồn tại'),
    500: () => showError('Lỗi nội bộ máy chủ'),
    403: () => showError('Không có quyền truy cập tài nguyên này'),
    401: () => showError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
  }

  if (errorHandlers[response.status]) {
    errorHandlers[response.status]()
  } else {
    showError('Lỗi không xác định!')
  }
}

const fetch = <T>(url: string, options: UseFetchOptions<T>) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public
  const reqUrl = url.startsWith('/api') ? apiBase + url : url

  const fetch = useFetch(reqUrl, {
    onRequest({ options }) {
      /* Kiểm tra đã đăng nhập */
      const authStore = useAuthStore()
      options.headers = new Headers(options.headers)
      options.headers.set('Content-Type', 'application/json')
      if (!authStore.token) return
      /* Nếu đã đăng nhập, API sẽ gửi kèm token */
      options.headers.set('Authorization', authStore.token)
    },
    onResponseError({ response }) {
      handleError(response)
    },
    ...options
  })
  return fetch
}

export default class useHttp {
  static get<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'get', ...options })
  }

  static post<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'post', ...options })
  }

  static put<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'put', ...options })
  }

  static delete<T>(url: string, options: UseFetchOptions<T>) {
    return fetch(url, { method: 'delete', ...options })
  }
}
