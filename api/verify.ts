import type { UseFetchOptions } from 'nuxt/app'

const verifyAPI = {
  checkEmailApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/verify/email', options)
  },
  getEmailCodeApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/verify/generateEmailCode', options)
  }
}

export default verifyAPI
