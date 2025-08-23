import type { UseFetchOptions } from 'nuxt/app'

export default {
  // Check if email exists - Cập nhật để khớp với backend
  checkEmailApi: <T = any>(options: { body: { email: string }, immediate?: boolean, watch?: boolean, onResponse?: Function } & UseFetchOptions<T>) => {
    const { pending, refresh } = useHttp.post('/users/check-email-exists', { 
      ...options, 
      body: options.body,
      immediate: options.immediate ?? true,
      watch: options.watch ?? false,
      onResponse: options.onResponse
    })
    
    return { pending, refresh }
  }
} 
