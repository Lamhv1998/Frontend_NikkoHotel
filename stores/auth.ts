import type { UserInfo, AuthenticationResponse } from '@/types/auth'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // Authentication state
    const token = ref('')
    const refreshToken = ref('')
    const isAuthenticated = ref(false)
    const isLoading = ref(false)
    
    // User information
    const user = ref<UserInfo | null>(null)
    const userName = ref('')
    const email = ref('')
    const id = ref('')
    
    // Authentication flow states
    const isLoggingIn = ref(false)
    const isLoggingOut = ref(false)
    const isRefreshing = ref(false)
    
    // Error states
    const authError = ref<string | null>(null)
    
    // Computed properties
    const hasToken = computed(() => !!token.value)
    const isLoggedIn = computed(() => isAuthenticated.value && hasToken.value)
    
    // Actions
    const setAuthData = (authResponse: AuthenticationResponse) => {
      token.value = authResponse.token
      isAuthenticated.value = authResponse.authenticated
      authError.value = null
    }
    
    const setUserInfo = (userInfo: UserInfo) => {
      user.value = userInfo
      userName.value = userInfo.name
      email.value = userInfo.email
      id.value = userInfo._id || ''
    }
    
    const clearAuth = () => {
      token.value = ''
      refreshToken.value = ''
      isAuthenticated.value = false
      user.value = null
      userName.value = ''
      email.value = ''
      id.value = ''
      authError.value = null
    }
    
    const setError = (error: string) => {
      authError.value = error
    }
    
    const clearError = () => {
      authError.value = null
    }

    return {
      // State
      token,
      refreshToken,
      isAuthenticated,
      isLoading,
      user,
      userName,
      email,
      id,
      isLoggingIn,
      isLoggingOut,
      isRefreshing,
      authError,
      
      // Computed
      hasToken,
      isLoggedIn,
      
      // Actions
      setAuthData,
      setUserInfo,
      clearAuth,
      setError,
      clearError
    }
  },
  {
    persist: {
      storage: persistedState.localStorage,
      paths: ['token', 'refreshToken', 'isAuthenticated', 'userName', 'email', 'id']
    }
  }
)
