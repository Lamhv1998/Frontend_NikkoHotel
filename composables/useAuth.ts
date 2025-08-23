import type {
  AuthenticationRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
  SendOtpRequest,
  SendOtpResponse,
  UserCreationRequest,
  UserResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ApiResponse
} from '@/types/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { login, signup, logout, introspect, refreshToken: refreshTokenService } = useAuthService()
  const { getCustomerProfile, createCustomer } = useCustomerService()
  const router = useRouter()

  const loginUser = async (credentials: AuthenticationRequest) => {
    try {
      const config = useRuntimeConfig()
      const authServiceUrl = config.public.authServiceUrl

      const response = await $fetch<{ token: string; user: UserResponse }>(
        `${authServiceUrl}/auth/token`,
        {
          method: 'POST',
          body: credentials
        }
      )

      if (response?.token && response?.user) {
        // Store auth data
        authStore.setToken(response.token)
        authStore.setUser(response.user)
        
        // Try to fetch customer profile
        try {
          const userId = response.user.id || response.user._id
          if (userId) {
            await fetchCustomerProfile(userId)
          }
        } catch (customerError) {
          console.warn('Could not fetch customer profile during login:', customerError)
        }

        return { success: true, message: 'Đăng nhập thành công!' }
      } else {
        return { success: false, message: 'Phản hồi không hợp lệ từ server' }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      let message = 'Có lỗi xảy ra khi đăng nhập'
      
      if (error?.data?.message) {
        message = error.data.message
      } else if (error?.message) {
        message = error.message
      } else if (error?.status === 401) {
        message = 'Email hoặc mật khẩu không đúng'
      } else if (error?.status === 500) {
        message = 'Lỗi máy chủ'
      }

      return { success: false, message }
    }
  }

  // Signup function - Cập nhật để khớp với backend API
  const signupUser = async (
    userData: UserCreationRequest
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const config = useRuntimeConfig()
      const authServiceUrl = config.public.authServiceUrl

      // Sử dụng endpoint đúng từ backend: /users
      const response = await $fetch<ApiResponse<UserResponse>>(`${authServiceUrl}/users`, {
        method: 'POST',
        body: userData
      })

      if (response?.result) {
        return { success: true, message: 'Đăng ký thành công!' }
      } else {
        return { success: false, message: response?.message || 'Đăng ký thất bại' }
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      let message = 'Có lỗi xảy ra khi đăng ký'
      
      if (error?.data?.message) {
        message = error.data.message
      } else if (error?.message) {
        message = error.message
      } else if (error?.status === 400) {
        message = 'Dữ liệu không hợp lệ'
      } else if (error?.status === 409) {
        message = 'Email đã được sử dụng'
      }

      return { success: false, message }
    }
  }

  // Logout function
  const logoutUser = async (): Promise<{ success: boolean; message: string }> => {
    try {
      authStore.clearAuth()
      await navigateTo('/')
      return { success: true, message: 'Đăng xuất thành công!' }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: 'Có lỗi xảy ra khi đăng xuất' }
    }
  }

  // Fetch user info
  const fetchUserInfo = async (): Promise<UserResponse | null> => {
    try {
      const config = useRuntimeConfig()
      const authServiceUrl = config.public.authServiceUrl
      const token = authStore.token

      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await $fetch<UserResponse>(`${authServiceUrl}/users/myInfo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response) {
        authStore.setUser(response)
        return response
      }

      return null
    } catch (error) {
      console.error('Error fetching user info:', error)
      return null
    }
  }

  // Fetch customer profile
  const fetchCustomerProfile = async (userId: string): Promise<any> => {
    try {
      const config = useRuntimeConfig()
      const customerServiceUrl = config.public.customerServiceUrl
      const token = authStore.token

      if (!token) {
        throw new Error('No authentication token')
      }

      const response = await $fetch(`${customerServiceUrl}/customers/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response) {
        // Type assertion để tránh lỗi TypeScript
        authStore.setCustomerProfile(response as any)
        return response
      }

      return null
    } catch (error) {
      console.error('Error fetching customer profile:', error)
      throw error
    }
  }

  // Check authentication
  const checkAuth = async (): Promise<void> => {
    try {
      const token = authStore.token

      if (!token) {
        console.log('No token found, redirecting to login')
        return
      }

      // Fetch user info if not available
      if (!authStore.user) {
        console.log('Fetching user info...')
        const userInfo = await fetchUserInfo()
        
        if (userInfo) {
          // Try to fetch customer profile
          const userId = userInfo.id || userInfo._id
          if (userId) {
            try {
              await fetchCustomerProfile(userId)
            } catch (customerError) {
              console.warn('Could not fetch customer profile:', customerError)
            }
          }
        }
      } else {
        console.log('No customer profile result in response')
        console.log('Response structure:', response)
        throw new Error('No customer profile data in response')
      }
    } catch (error: any) {
      console.error('Fetch customer profile error:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        data: error.data,
        userId: userId || authStore.user?.id || authStore.user?._id
      })
      
      // Thử tạo customer profile nếu không tìm thấy
      if (error.status === 404 || error.message?.includes('not found')) {
        console.log('Customer profile not found, attempting to create one...')
        try {
          const { createCustomer } = useCustomerService()
          const user = authStore.user
          if (user) {
            const userId = user.id || user._id
            if (userId) {
              const newCustomer = await createCustomer({
                userId: userId,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                birthday: user.birthday || '',
                address: user.address || ''
              })
              
              if (newCustomer.result) {
                console.log('New customer profile created:', newCustomer.result)
                authStore.setCustomerProfile(newCustomer.result)
                return newCustomer.result
              }
            }
          }
        } catch (createError) {
          console.error('Failed to create customer profile:', createError)
        }
      }
      
      // Không throw error để không làm gián đoạn flow đăng nhập
      return null
    }
  }

  const checkAuth = async () => {
    console.log('checkAuth called. Current store state:', {
      token: authStore.token,
      user: authStore.user,
      customerProfile: authStore.customerProfile
    })
    
    // Hydrate store từ localStorage trước
    authStore.hydrateFromStorage()
    
    if (authStore.token && !authStore.user) {
      try {
        console.log('Checking auth - fetching user info and customer profile...')
        const userInfo = await fetchUserInfo()
        
        // Sử dụng cả id và _id để tương thích
        const userId = userInfo?.id || userInfo?._id
        if (userId) {
          console.log('Using user ID for customer profile in checkAuth:', userId)
          await fetchCustomerProfile(userId)
        } else {
          console.log('No user ID found in checkAuth')
        }
      } catch (error) {
        console.error('Check auth error:', error)
      }
    } else if (authStore.token && authStore.user && !authStore.customerProfile) {
      console.log('User exists but no customer profile, fetching customer profile...')
      const userId = authStore.user?.id || authStore.user?._id
      if (userId) {
        await fetchCustomerProfile(userId)
      }
    } else {
      console.log('No action needed in checkAuth')
    }
  }

  const checkToken = async () => {
    try {
      if (!authStore.token) {
        console.log('No token available for check')
        return false
      }

      console.log('Checking token validity...')
      const response = await introspect(authStore.token)
      
      if (response && response.valid) {
        console.log('Token is valid')
        return true
      } else {
        console.log('Token is invalid')
        return false
      }
    } catch (error) {
      console.error('Token check failed:', error)
      return false
    }
  }

  const refreshToken = async () => {
    try {
      if (!authStore.token) {
        console.log('No token available for refresh')
        return false
      }

      console.log('Refreshing token...')
      const response = await refreshTokenService(authStore.token)
      
      if (response.code === 0 && response.result && response.result.token) {
        console.log('Token refreshed successfully')
        authStore.setToken(response.result.token)
        return true
      } else {
        console.log('Token refresh failed')
        return false
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  return {
    loginUser,
    signupUser,
    logoutUser,
    fetchUserInfo,
    fetchCustomerProfile,
    checkAuth,
    checkToken,
    refreshToken,
    isAuthenticated: computed(() => authStore.isAuthenticated),
    user: computed(() => authStore.user),
    customerProfile: computed(() => authStore.customerProfile)
  }
}
