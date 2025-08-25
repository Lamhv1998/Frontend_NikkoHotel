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
    const { apiGatewayUrl } = runtimeConfig.public
    const authStore = useAuthStore()

    return $fetch<ApiResponse<UserResponse>>(`${apiGatewayUrl}/users/myInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      }
    })
  },

  updateUserApi: <T = any>(options: UseFetchOptions<T>) => {
    const runtimeConfig = useRuntimeConfig()
    const { apiGatewayUrl } = runtimeConfig.public
    const authStore = useAuthStore()

    // Đảm bảo body là object và có userId
    const requestBody = options.body && typeof options.body === 'object' && !Array.isArray(options.body) 
      ? options.body as Record<string, any>
      : {}
    
    const userId = requestBody.userId || 'me'

    return $fetch<ApiResponse<UserResponse>>(`${apiGatewayUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: requestBody
    })
  },



  // API đổi mật khẩu sau khi xác nhận OTP
  changePasswordAfterOtpApi: <T = any>(options: UseFetchOptions<T>) => {
    const requestBody = options.body && typeof options.body === 'object' && !Array.isArray(options.body)
        ? (options.body as Record<string, any>)
        : {}
    // Sử dụng logic giống hệt như trong changePwd.vue
    // Nếu có userId thì dùng userId, nếu không thì dùng userEmail
    if (requestBody.email) {
      // Trường hợp đổi mật khẩu (user đã đăng nhập)
      return $fetch<{ message: boolean }>(
        `http://localhost:8092/users/change/password/${requestBody.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: { password: requestBody.newPassword }
        }
      )
    }
    }
  ,
  sendMailResetPassword: <T = any>(options: UseFetchOptions<T>) => {
    const requestBody = options.body && typeof options.body === 'object' && !Array.isArray(options.body) ? (options.body as Record<string, any>) : {}

    return $fetch<{ message: string }>(
      `http://localhost:8092/users/forgot/password/${requestBody.email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  },
  validTokenFromEmail: <T = any>(options: UseFetchOptions<T>) => {
    const requestBody =
      options.body && typeof options.body === 'object' && !Array.isArray(options.body)
        ? (options.body as Record<string, any>)
        : {}

    return $fetch<{ message: boolean }>(
      `http://localhost:8092/users/forgot/password/valid/${requestBody.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
    
}

export default userAPI
