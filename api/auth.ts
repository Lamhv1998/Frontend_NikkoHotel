import type { UseFetchOptions } from 'nuxt/app'
import type { AuthenticationRequest, AuthenticationResponse, ApiResponse } from '@/types/auth'

const authAPI = {
  // POST /auth/token - Login
  loginApi: <T = any>(options: UseFetchOptions<T>) => {
    const { login } = useAuthService()
    return login(options.body as AuthenticationRequest)
  },

  // POST /auth/introspect - Validate token
  introspectApi: <T = any>(options: UseFetchOptions<T>) => {
    const { introspect } = useAuthService()
    const authStore = useAuthStore()
    return introspect(authStore.token)
  },

  // POST /auth/logout - Logout
  logoutApi: <T = any>(options: UseFetchOptions<T>) => {
    const { logout } = useAuthService()
    const authStore = useAuthStore()
    return logout(authStore.token)
  },

  // POST /auth/refresh - Refresh token
  refreshApi: <T = any>(options: UseFetchOptions<T>) => {
    const { refreshToken } = useAuthService()
    const authStore = useAuthStore()
    return refreshToken(authStore.refreshToken)
  },

  // POST /auth/callback - OAuth callback
  callbackApi: <T = any>(options: UseFetchOptions<T>) => {
    const { callback } = useAuthService()
    const { code, state } = options.body as { code: string; state?: string }
    return callback(code, state)
  },

  // Check if user is authenticated (utility function)
  checkAuthApi: () => {
    const authStore = useAuthStore()
    return {
      isAuthenticated: authStore.isAuthenticated,
      hasToken: authStore.hasToken,
      user: authStore.user
    }
  }
}

export default authAPI
