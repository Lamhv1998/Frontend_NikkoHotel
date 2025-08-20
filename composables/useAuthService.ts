import type { AuthenticationRequest, AuthenticationResponse, ApiResponse } from '@/types/auth'

export const useAuthService = () => {
  const runtimeConfig = useRuntimeConfig()
  const { authServiceUrl } = runtimeConfig.public

  // POST /auth/token - Login
  const login = async (credentials: AuthenticationRequest): Promise<ApiResponse<AuthenticationResponse>> => {
    return await $fetch<ApiResponse<AuthenticationResponse>>(`${authServiceUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: credentials
    })
  }

  // POST /auth/introspect - Validate token
  const introspect = async (token: string): Promise<ApiResponse<any>> => {
    return await $fetch<ApiResponse<any>>(`${authServiceUrl}/auth/introspect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        token
      }
    })
  }

  // POST /auth/logout - Logout
  const logout = async (token: string): Promise<ApiResponse<any>> => {
    return await $fetch<ApiResponse<any>>(`${authServiceUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        token
      }
    })
  }

  // POST /auth/refresh - Refresh token
  const refreshToken = async (refreshToken: string): Promise<ApiResponse<AuthenticationResponse>> => {
    return await $fetch<ApiResponse<AuthenticationResponse>>(`${authServiceUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        token: refreshToken
      }
    })
  }

  // POST /auth/callback - OAuth callback (if needed)
  const callback = async (code: string, state?: string): Promise<ApiResponse<AuthenticationResponse>> => {
    return await $fetch<ApiResponse<AuthenticationResponse>>(`${authServiceUrl}/auth/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        code,
        state
      }
    })
  }

  // POST /users - User registration
  const register = async (userData: any): Promise<ApiResponse<any>> => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    
    return await $fetch<ApiResponse<any>>(`${apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userData
    })
  }

  // POST /api/v1/user/check-email - Check if email exists
  const checkEmail = async (email: string): Promise<ApiResponse<any>> => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    
    return await $fetch<ApiResponse<any>>(`${apiBase}/api/v1/user/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { email }
    })
  }

  return {
    login,
    introspect,
    logout,
    refreshToken,
    callback,
    register,
    checkEmail
  }
}
