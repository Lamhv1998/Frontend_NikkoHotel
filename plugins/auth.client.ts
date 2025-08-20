export default defineNuxtPlugin(async () => {
  const { initializeAuth, autoRefreshToken } = useAuth()
  const authStore = useAuthStore()

  // Initialize authentication state on app start
  await initializeAuth()

  // Set up automatic token refresh
  let refreshInterval: NodeJS.Timeout | null = null

  const startAutoRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }

    // Refresh token every 4 minutes (assuming 5-minute token expiry)
    refreshInterval = setInterval(async () => {
      if (authStore.isLoggedIn && !authStore.isRefreshing) {
        try {
          await autoRefreshToken()
        } catch (error) {
          console.error('Auto refresh failed:', error)
          // If auto refresh fails, logout user
          const { logout } = useAuth()
          await logout()
        }
      }
    }, 4 * 60 * 1000) // 4 minutes
  }

  const stopAutoRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }

  // Watch authentication state changes
  watch(
    () => authStore.isLoggedIn,
    (isLoggedIn) => {
      if (isLoggedIn) {
        startAutoRefresh()
      } else {
        stopAutoRefresh()
      }
    },
    { immediate: true }
  )

  // Clean up on app unmount
  onUnmounted(() => {
    stopAutoRefresh()
  })

  // Provide auth utilities to the app
  return {
    provide: {
      auth: {
        startAutoRefresh,
        stopAutoRefresh
      }
    }
  }
})
