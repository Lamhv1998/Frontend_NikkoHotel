import type { AuthenticationRequest, AuthenticationResponse, ApiResponse } from '@/types/auth'

export const useAuthService = () => {
  const runtimeConfig = useRuntimeConfig()
  const { authServiceUrl } = runtimeConfig.public

  const login = async (credentials: AuthenticationRequest): Promise<ApiResponse<AuthenticationResponse>> => {
    return await $fetch<ApiResponse<AuthenticationResponse>>(`${authServiceUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: credentials
    })
  }

  const introspect = async (token: string) => {
    return await $fetch(`${authServiceUrl}/auth/introspect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        token
      }
    })
  }

  const logout = async (token: string) => {
    return await $fetch(`${authServiceUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        token
      }
    })
  }

  const refreshToken = async (refreshToken: string) => {
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

  return {
    login,
    introspect,
    logout,
    refreshToken
  }
}
