import type { AuthenticationRequest, AuthenticationResponse, ApiResponse } from '@/types/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const commonStore = useCommonStore()
  const styleStore = useStyleStore()

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

  // Đăng nhập
  const login = async (credentials: AuthenticationRequest, remember: boolean = false) => {
    try {
      const { loginApi } = useApi()
      
      console.log('Attempting login with:', credentials)
      
      const response = await loginApi({
        body: credentials
      })
      
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
        
        // Lưu thông tin user từ token
        authStore.token = authData.token
        authStore.email = remember ? credentials.email : ''
        authStore.userName = decodedToken.sub || credentials.email
        authStore.id = decodedToken.sub || ''
        
        console.log('Login successful:', {
          userName: authStore.userName,
          email: authStore.email,
          hasToken: !!authStore.token
        })
        
        return { success: true, data: authData }
      } else {
        throw new Error('Response không hợp lệ')
      }
      
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Đăng xuất
  const logout = async () => {
    try {
      if (authStore.token) {
        // Gọi API logout nếu có token
        const authService = useAuthService()
        await authService.logout(authStore.token)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear store
      authStore.token = ''
      authStore.userName = ''
      authStore.email = ''
      authStore.id = ''
    }
  }

  // Kiểm tra token
  const checkToken = async () => {
    if (!authStore.token) {
      return false
    }
    
    try {
      const authService = useAuthService()
      await authService.introspect(authStore.token)
      return true
    } catch (error) {
      console.error('Token check failed:', error)
      // Clear invalid token
      authStore.token = ''
      authStore.userName = ''
      authStore.email = ''
      authStore.id = ''
      return false
    }
  }

  // Làm mới token
  const refreshToken = async () => {
    if (!authStore.token) {
      throw new Error('Không có token để làm mới')
    }
    
    try {
      const authService = useAuthService()
      const response = await authService.refreshToken(authStore.token)
      
      if (response && response.result) {
        const authData = response.result
        authStore.token = authData.token
        
        // Decode và cập nhật thông tin user
        const decodedToken = decodeJWT(authData.token)
        if (decodedToken) {
          authStore.userName = decodedToken.sub || authStore.userName
          authStore.id = decodedToken.sub || authStore.id
        }
        
        return authData
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }

  return {
    login,
    logout,
    checkToken,
    refreshToken,
    decodeJWT
  }
}
