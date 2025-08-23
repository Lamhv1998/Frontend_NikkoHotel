import type { AuthenticationRequest, AuthenticationResponse, ApiResponse, UserCreationRequest, UserResponse } from '@/types/auth'

export const useAuthService = () => {
  const runtimeConfig = useRuntimeConfig()
  const { authServiceUrl, apiGatewayUrl } = runtimeConfig.public

  const login = async (credentials: AuthenticationRequest): Promise<ApiResponse<AuthenticationResponse>> => {
    console.log('Calling login API with credentials:', credentials)
    const response = await $fetch<ApiResponse<AuthenticationResponse>>(`${apiGatewayUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: credentials
    })
    console.log('Login API response:', response)
    return response
  }

  const signup = async (userData: UserCreationRequest): Promise<ApiResponse<UserResponse>> => {
    return await $fetch<ApiResponse<UserResponse>>(`${authServiceUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userData
    })
  }

  const introspect = async (token: string) => {
    return await $fetch(`${apiGatewayUrl}/auth/introspect`, {
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
    return await $fetch(`${apiGatewayUrl}/auth/logout`, {
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
    return await $fetch<ApiResponse<AuthenticationResponse>>(`${apiGatewayUrl}/auth/refresh`, {
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
    signup,
    introspect,
    logout,
    refreshToken
  }
}
