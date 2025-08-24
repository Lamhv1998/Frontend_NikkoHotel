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
  ApiResponse,
  CustomerDto
} from '@/types/auth'

// Import composable mới
import { useCustomer } from './useCustomer'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { login, signup, logout, introspect, refreshToken: refreshTokenService } = useAuthService()
  const { getCustomerProfile, createCustomer } = useCustomer()
  const router = useRouter()

  const loginUser = async (credentials: AuthenticationRequest) => {
    try {
      const { login } = useAuthService()
      
      const response = await login(credentials)

      if (response?.code === 0 && response?.result?.token) {
        const token = response.result.token
        authStore.setToken(token)
        
        // Fetch user info ngay sau khi có token
        const userInfo = await fetchUserInfo()
        
        if (userInfo && userInfo.id) {
          const userId = userInfo.id
          
          try {
            const customerProfile = await fetchCustomerProfile(userId)
          } catch (profileError) {
            // Không throw error để không làm gián đoạn quá trình đăng nhập
          }
        }
        
        return { success: true, message: 'Đăng nhập thành công!' }
      } else {
        return { success: false, message: response?.message || 'Phản hồi không hợp lệ từ server' }
      }
    } catch (error: any) {
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

      const apiUrl = `${authServiceUrl}/users/myInfo`

      // Thay đổi type để xử lý ApiResponse wrapper
      const response = await $fetch<ApiResponse<UserResponse>>(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Kiểm tra response có đúng format không
      if (response && response.code === 0 && response.result) {
        const userData = response.result
        authStore.setUser(userData)
        return userData
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  // Fetch customer profile
  const fetchCustomerProfile = async (userId: string): Promise<CustomerDto | null> => {
    try {
      
      try {
        const response = await getCustomerProfile(userId)

        if (response && response.code === 0 && response.result) {
          
          // Lưu vào store
          authStore.setCustomerProfile(response.result as CustomerDto)
          
          // Verify store was updated
          const storeProfile = authStore.customerProfile
          
          return response.result
        } else {
          // Invalid response format
        }
      } catch (profileError) {
        // Nếu không tìm thấy customer profile, thử tạo mới
        try {
          const userInfo = authStore.user
          if (userInfo) {
            const customerData = {
              userId: userId,
              name: userInfo.name || 'User',
              email: userInfo.email,
              phone: userInfo.phone || '',
              birthday: userInfo.birthday || '1990-01-01',
              address: userInfo.address || { city: '', district: '', detail: '' }
            }
            
            const createResponse = await createCustomer(customerData)
            
            if (createResponse && createResponse.code === 0 && createResponse.result) {
              authStore.setCustomerProfile(createResponse.result as CustomerDto)
              return createResponse.result
            } else {
              // Failed to create customer profile
            }
          } else {
            // No user info available for customer creation
          }
        } catch (createError) {
          // Failed to create customer profile
        }
      }

      return null
    } catch (error) {
      throw error
    }
  }


  const checkAuth = async () => {
    // Hydrate store từ localStorage trước
    authStore.hydrateFromStorage()
    
    if (authStore.token && !authStore.user) {
      try {
        const userInfo = await fetchUserInfo()
        
        // Sử dụng cả id và _id để tương thích
        const userId = userInfo?.id
        
        if (userId) {
          await fetchCustomerProfile(userId)
        }
      } catch (error) {
        // Handle error silently
      }
    } else if (authStore.token && authStore.user && !authStore.customerProfile) {
      const userId = authStore.user?.id
      if (userId) {
        await fetchCustomerProfile(userId)
      }
    }
  }

  const checkToken = async () => {
    try {
      if (!authStore.token) {
        return false
      }

      const response = await introspect(authStore.token)
      
      if (response && (response as any).valid) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const refreshToken = async () => {
    try {
      if (!authStore.token) {
        return false
      }

      const response = await refreshTokenService(authStore.token)
      
      if (response.code === 0 && response.result && response.result.token) {
        authStore.setToken(response.result.token)
        return true
      } else {
        return false
      }
    } catch (error) {
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
