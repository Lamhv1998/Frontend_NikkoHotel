import type { AuthenticationRequest, AuthenticationResponse, ApiResponse, UserInfo } from '@/types/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const commonStore = useCommonStore()
  const styleStore = useStyleStore()
  const router = useRouter()

  // Function để decode JWT token
  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error decoding JWT:', error)
      return null
    }
  }

  // Đăng nhập - Complete login flow
  const login = async (credentials: AuthenticationRequest, remember: boolean = false) => {
    try {
      authStore.isLoggingIn = true
      authStore.clearError()
      
      console.log('Attempting login with:', credentials)
      
      const authService = useAuthService()
      const response = await authService.login(credentials)
      
      console.log('Login response:', response)
      
      if (response && response.result) {
        const authData = response.result
        
        if (!authData.token) {
          throw new Error('Token không hợp lệ')
        }
        
        // Decode token để lấy thông tin user
        const decodedToken = decodeJWT(authData.token)
        console.log('Decoded token:', decodedToken)
        
        if (!decodedToken) {
          throw new Error('Token không hợp lệ')
        }
        
        // Lưu thông tin authentication vào store
        authStore.setAuthData(authData)
        
        // Lưu thông tin user từ token hoặc credentials
        const userInfo: UserInfo = {
          name: decodedToken.name || decodedToken.sub || credentials.email,
          email: decodedToken.email || credentials.email,
          phone: decodedToken.phone || '',
          address: decodedToken.address || { zipcode: 0, detail: '' },
          _id: decodedToken.sub || decodedToken.id || ''
        }
        
        authStore.setUserInfo(userInfo)
        
        // Lưu email nếu remember me được chọn
        if (remember) {
          authStore.email = credentials.email
        }
        
        console.log('Login successful:', {
          userName: authStore.userName,
          email: authStore.email,
          hasToken: !!authStore.token,
          isAuthenticated: authStore.isAuthenticated
        })
        
        // Redirect to dashboard or intended page
        const redirectTo = router.currentRoute.value.query.redirect as string || '/dashboard'
        await router.push(redirectTo)
        
        return { success: true, data: authData }
      } else {
        throw new Error('Response không hợp lệ')
      }
      
    } catch (error: any) {
      console.error('Login error:', error)
      const errorMessage = error.data?.message || error.message || 'Đăng nhập thất bại'
      authStore.setError(errorMessage)
      throw error
    } finally {
      authStore.isLoggingIn = false
    }
  }

  // Đăng xuất - Complete logout flow
  const logout = async () => {
    try {
      authStore.isLoggingOut = true
      authStore.clearError()
      
      if (authStore.token) {
        // Gọi API logout nếu có token
        const authService = useAuthService()
        await authService.logout(authStore.token)
      }
      
      // Clear store
      authStore.clearAuth()
      
      // Redirect to login page
      await router.push('/auth/login')
      
      console.log('Logout successful')
      return { success: true }
      
    } catch (error: any) {
      console.error('Logout error:', error)
      // Even if logout API fails, clear local auth
      authStore.clearAuth()
      await router.push('/auth/login')
      return { success: true }
    } finally {
      authStore.isLoggingOut = false
    }
  }

  // Kiểm tra token - Validate current token
  const checkToken = async () => {
    if (!authStore.token) {
      return false
    }
    
    try {
      authStore.clearError()
      const authService = useAuthService()
      const response = await authService.introspect(authStore.token)
      
      if (response && response.result) {
        // Token is valid, update authentication status
        authStore.isAuthenticated = true
        return true
      } else {
        throw new Error('Token không hợp lệ')
      }
    } catch (error: any) {
      console.error('Token check failed:', error)
      // Clear invalid token
      authStore.clearAuth()
      return false
    }
  }

  // Làm mới token - Refresh token flow
  const refreshToken = async () => {
    if (!authStore.refreshToken) {
      throw new Error('Không có refresh token')
    }
    
    try {
      authStore.isRefreshing = true
      authStore.clearError()
      
      const authService = useAuthService()
      const response = await authService.refreshToken(authStore.refreshToken)
      
      if (response && response.result) {
        const authData = response.result
        
        // Update tokens
        authStore.setAuthData(authData)
        
        // Decode và cập nhật thông tin user nếu cần
        const decodedToken = decodeJWT(authData.token)
        if (decodedToken) {
          const userInfo: UserInfo = {
            name: decodedToken.name || authStore.userName,
            email: decodedToken.email || authStore.email,
            phone: decodedToken.phone || '',
            address: decodedToken.address || { zipcode: 0, detail: '' },
            _id: decodedToken.sub || authStore.id
          }
          authStore.setUserInfo(userInfo)
        }
        
        console.log('Token refreshed successfully')
        return authData
      } else {
        throw new Error('Refresh token response không hợp lệ')
      }
    } catch (error: any) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout user
      await logout()
      throw error
    } finally {
      authStore.isRefreshing = false
    }
  }

  // OAuth callback - Handle OAuth authentication
  const handleOAuthCallback = async (code: string, state?: string) => {
    try {
      authStore.isLoggingIn = true
      authStore.clearError()
      
      const authService = useAuthService()
      const response = await authService.callback(code, state)
      
      if (response && response.result) {
        const authData = response.result
        
        if (!authData.token) {
          throw new Error('OAuth token không hợp lệ')
        }
        
        // Decode token và lưu thông tin
        const decodedToken = decodeJWT(authData.token)
        if (!decodedToken) {
          throw new Error('OAuth token không hợp lệ')
        }
        
        // Lưu thông tin authentication
        authStore.setAuthData(authData)
        
        // Lưu thông tin user
        const userInfo: UserInfo = {
          name: decodedToken.name || decodedToken.sub || '',
          email: decodedToken.email || '',
          phone: decodedToken.phone || '',
          address: decodedToken.address || { zipcode: 0, detail: '' },
          _id: decodedToken.sub || decodedToken.id || ''
        }
        
        authStore.setUserInfo(userInfo)
        
        // Redirect to dashboard
        const redirectTo = router.currentRoute.value.query.redirect as string || '/dashboard'
        await router.push(redirectTo)
        
        return { success: true, data: authData }
      } else {
        throw new Error('OAuth response không hợp lệ')
      }
    } catch (error: any) {
      console.error('OAuth callback error:', error)
      const errorMessage = error.data?.message || error.message || 'OAuth authentication thất bại'
      authStore.setError(errorMessage)
      throw error
    } finally {
      authStore.isLoggingIn = false
    }
  }

  // Auto refresh token - Called by plugin
  const autoRefreshToken = async () => {
    if (authStore.isRefreshing || !authStore.refreshToken) {
      return false
    }
    
    try {
      await refreshToken()
      return true
    } catch (error) {
      console.error('Auto refresh failed:', error)
      return false
    }
  }

  // Initialize auth state - Called on app start
  const initializeAuth = async () => {
    if (authStore.token) {
      const isValid = await checkToken()
      if (!isValid) {
        // Try to refresh token
        if (authStore.refreshToken) {
          try {
            await refreshToken()
          } catch (error) {
            // If refresh fails, clear auth
            authStore.clearAuth()
          }
        } else {
          authStore.clearAuth()
        }
      }
    }
  }

  // Register new user
  const register = async (userData: any) => {
    try {
      authStore.isLoggingIn = true
      authStore.clearError()
      
      console.log('Attempting registration with:', userData)
      
      const authService = useAuthService()
      const response = await authService.register(userData)
      
      console.log('Registration response:', response)
      
      if (response && response.result) {
        // If registration returns a token, automatically login
        if (response.result.token) {
          const authData = response.result
          
          // Decode token để lấy thông tin user
          const decodedToken = decodeJWT(authData.token)
          console.log('Decoded token from registration:', decodedToken)
          
          if (decodedToken) {
            // Lưu thông tin authentication vào store
            authStore.setAuthData(authData)
            
            // Lưu thông tin user từ token
            const userInfo: UserInfo = {
              name: decodedToken.name || userData.name,
              email: decodedToken.email || userData.email,
              phone: decodedToken.phone || userData.phone,
              address: decodedToken.address || userData.address,
              _id: decodedToken.sub || decodedToken.id || ''
            }
            
            authStore.setUserInfo(userInfo)
            
            console.log('Registration and auto-login successful:', {
              userName: authStore.userName,
              email: authStore.email,
              hasToken: !!authStore.token,
              isAuthenticated: authStore.isAuthenticated
            })
            
            return { success: true, data: authData, autoLogin: true }
          }
        }
        
        // If no token returned, just return success
        return { success: true, data: response.result, autoLogin: false }
      } else {
        throw new Error('Registration response không hợp lệ')
      }
      
    } catch (error: any) {
      console.error('Registration error:', error)
      const errorMessage = error.data?.message || error.message || 'Đăng ký thất bại'
      authStore.setError(errorMessage)
      throw error
    } finally {
      authStore.isLoggingIn = false
    }
  }

  // Check if email exists
  const checkEmailExists = async (email: string) => {
    try {
      authStore.clearError()
      
      const authService = useAuthService()
      const response = await authService.checkEmail(email)
      
      if (response && response.result) {
        return response.result.isEmailExists || false
      }
      
      return false
    } catch (error: any) {
      console.error('Email check error:', error)
      return false
    }
  }

  return {
    // Core authentication functions
    login,
    logout,
    checkToken,
    refreshToken,
    handleOAuthCallback,
    
    // Registration functions
    register,
    checkEmailExists,
    
    // Utility functions
    decodeJWT,
    autoRefreshToken,
    initializeAuth,
    
    // Store access
    authStore: readonly(authStore)
  }
}
