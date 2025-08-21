import type { UseFetchOptions } from 'nuxt/app'
import type { AuthenticationRequest, AuthenticationResponse, ApiResponse, UserResponse } from '@/types/auth'

const userAPI = {
  loginApi: <T = any>(options: UseFetchOptions<T>) => {
    const { login } = useAuthService()
    
    return login(options.body as AuthenticationRequest)
  },

  signupApi: <T = any>(options: UseFetchOptions<T>) => {
    const { signup } = useAuthService()
    
    return signup(options.body as any)
  },

  forgotPwdApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/user/forgot', options)
  },

  checkLoginApi: () => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = apiBase + '/api/v1/user/check'
    const authStore = useAuthStore()

    return $fetch(reqUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authStore.token
      })
    })
  },

  getUserApi: <T = any>(options: UseFetchOptions<T>) => {
    const runtimeConfig = useRuntimeConfig()
    const { authServiceUrl } = runtimeConfig.public
    const authStore = useAuthStore()

    return $fetch<ApiResponse<UserResponse>>(`${authServiceUrl}/users/myInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })
  },

  updateUserApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.put('/api/v1/user', options)
  }
}

export default userAPI
