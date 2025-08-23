import type { AuthenticationRequest, UserResponse } from '@/types/auth'

export const useAuthService = () => {
  const config = useRuntimeConfig()
  const authServiceUrl = config.public.authServiceUrl

  const authenticate = async (credentials: AuthenticationRequest) => {
    try {
      const response = await $fetch<{ token: string; user: UserResponse }>(`${authServiceUrl}/auth/authenticate`, {
        method: 'POST',
        body: credentials
      })
      
      return response
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }

  const register = async (userData: any) => {
    try {
      const response = await $fetch(`${authServiceUrl}/auth/register`, {
        method: 'POST',
        body: userData
      })
      
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const getUserInfo = async (token: string) => {
    try {
      const response = await $fetch<UserResponse>(`${authServiceUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      return response
    } catch (error) {
      console.error('Get user info error:', error)
      throw error
    }
  }

  return {
    authenticate,
    register,
    getUserInfo
  }
}
