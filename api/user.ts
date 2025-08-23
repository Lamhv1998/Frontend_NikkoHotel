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

  // API gửi OTP để đổi mật khẩu
  sendOtpForPasswordChangeApi: <T = any>(options: UseFetchOptions<T>) => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    
    const requestBody = options.body && typeof options.body === 'object' && !Array.isArray(options.body) 
      ? options.body as Record<string, any>
      : {}
    
    return $fetch<{ message: string; otp: string }>(`http://localhost:8190/notifications/send-otp-for-password-change?userEmail=${requestBody.userEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  // API xác nhận OTP
  verifyOtpApi: <T = any>(options: UseFetchOptions<T>) => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    
    const requestBody = options.body && typeof options.body === 'object' && !Array.isArray(options.body) 
      ? options.body as Record<string, any>
      : {}
    
    return $fetch<{ message: string }>(`http://localhost:8190/notifications/verify-otp?userEmail=${requestBody.userEmail}&otp=${requestBody.otp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

        // API đổi mật khẩu sau khi xác nhận OTP
      changePasswordAfterOtpApi: <T = any>(options: UseFetchOptions<T>) => {
        const runtimeConfig = useRuntimeConfig()
        const { apiBase } = runtimeConfig.public
        
        const requestBody = options.body && typeof options.body === 'object' && !Array.isArray(options.body) 
          ? options.body as Record<string, any>
          : {}
        
        // Sử dụng logic giống hệt như trong changePwd.vue
        // Nếu có userId thì dùng userId, nếu không thì dùng userEmail
        if (requestBody.userId) {
          // Trường hợp đổi mật khẩu (user đã đăng nhập)
          return $fetch<{ message: string }>(`http://localhost:8092/users/${requestBody.userId}/password?newPassword=${requestBody.newPassword}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        } else {
          // Trường hợp quên mật khẩu (user chưa đăng nhập)
          // Sử dụng endpoint có sẵn: PUT /users/{userId}/password
          // Nhưng cần tìm userId từ email trước
          // Tạm thời sử dụng endpoint đơn giản nhất có thể
          return $fetch<{ message: string }>(`http://localhost:8092/users/forgot-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: {
              userEmail: requestBody.userEmail,
              newPassword: requestBody.newPassword
            }
          })
        }
      }
}

export default userAPI
