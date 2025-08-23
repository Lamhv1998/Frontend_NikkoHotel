import type { AuthenticationRequest, UserResponse, CustomerDto } from '@/types/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { login, signup, logout, introspect, refreshToken: refreshTokenService } = useAuthService()
  const { getCustomerProfile, createCustomer } = useCustomerService()
  const router = useRouter()

  const loginUser = async (credentials: AuthenticationRequest) => {
    try {
      const response = await login(credentials)
      console.log('Login response:', response)
      
      // Kiểm tra response code và token
      if (response.code === 0 && response.result && response.result.token) {
        console.log('Token received, proceeding with login...')
        console.log('Note: authenticated field is', response.result.authenticated)
        
        // Lưu token vào store
        authStore.setToken(response.result.token)
        
        // Lấy thông tin user trước
        const userInfo = await fetchUserInfo()
        console.log('User info fetched:', userInfo)
        
        // Sau đó lấy customer profile với user ID
        // Sử dụng cả id và _id để tương thích
        const userId = userInfo?.id || userInfo?._id
        if (userId) {
          console.log('Using user ID for customer profile:', userId)
          await fetchCustomerProfile(userId)
        } else {
          console.log('No user ID found in user info')
        }
        
        // Chuyển hướng về trang user - sử dụng navigateTo thay vì router.push
        console.log('Redirecting to /user...')
        await navigateTo('/user')
        
        return { success: true, message: 'Đăng nhập thành công!' }
      } else {
        console.log('Login failed - no token or invalid response')
        let errorMessage = 'Email hoặc mật khẩu không đúng!'
        
        // Kiểm tra nếu có message từ backend
        if (response.message) {
          errorMessage = response.message
        }
        
        return { success: false, message: errorMessage }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.data?.message || 'Có lỗi xảy ra khi đăng nhập!' 
      }
    }
  }

  const signupUser = async (userData: any) => {
    try {
      const response = await signup(userData)
      
      if (response.result) {
        // Tạo customer profile
        if (response.result._id) {
          await createCustomer({
            userId: response.result._id,
            name: response.result.name,
            email: response.result.email,
            phone: response.result.phone,
            birthday: response.result.birthday,
            address: response.result.address
          })
        }
        
        return { success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập.' }
      } else {
        return { success: false, message: 'Có lỗi xảy ra khi đăng ký!' }
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      return { 
        success: false, 
        message: error.data?.message || 'Có lỗi xảy ra khi đăng ký!' 
      }
    }
  }

  const logoutUser = async () => {
    try {
      if (authStore.token) {
        await logout(authStore.token)
      }
      
      // Xóa thông tin authentication
      authStore.clearAuth()
      
      // Chuyển hướng về trang chủ
      await router.push('/')
      
      return { success: true, message: 'Đăng xuất thành công!' }
    } catch (error: any) {
      console.error('Logout error:', error)
      
      // Vẫn xóa thông tin local nếu có lỗi
      authStore.clearAuth()
      await router.push('/')
      
      return { success: true, message: 'Đã đăng xuất!' }
    }
  }

  const fetchUserInfo = async () => {
    try {
      console.log('Fetching user info...')
      const { getUserApi } = useApi()
      const response = await getUserApi({})
      
      if (response.result) {
        console.log('User info received:', response.result)
        authStore.setUser(response.result)
        return response.result
      }
    } catch (error) {
      console.error('Fetch user info error:', error)
      throw error
    }
  }

  const fetchCustomerProfile = async (userId?: string) => {
    try {
      // Sử dụng cả id và _id để tương thích
      const targetUserId = userId || authStore.user?.id || authStore.user?._id
      
      if (!targetUserId) {
        console.log('No user ID available for customer profile')
        return
      }
      
      console.log('Fetching customer profile for user:', targetUserId)
      console.log('Using customer service...')
      
      const response = await getCustomerProfile(targetUserId)
      console.log('Customer profile response:', response)
      
      if (response.result) {
        console.log('Customer profile received:', response.result)
        console.log('Setting customer profile to store...')
        authStore.setCustomerProfile(response.result)
        console.log('Customer profile set to store. Current store state:', {
          customerProfile: authStore.customerProfile,
          user: authStore.user,
          token: authStore.token
        })
        return response.result
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
