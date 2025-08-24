import { useAuthStore } from '@/stores/auth'
import type { UseFetchOptions } from 'nuxt/app'
import type { FetchResponse } from 'ofetch'

interface ResOptions {
  message: string
  status: boolean
}

const handleError = (error: any, message: string = 'Có lỗi xảy ra') => {
  if (error?.response?._data?.message) {
    return error.response._data.message
  }

  if (error?.data?.message) {
    return error.data.message
  }

  return message
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
