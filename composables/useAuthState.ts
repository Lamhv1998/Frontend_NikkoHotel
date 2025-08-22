export const useAuthState = () => {
  const authStore = useAuthStore()

  // Computed properties
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const customerProfile = computed(() => authStore.customerProfile)
  const userName = computed(() => authStore.userName)
  const userEmail = computed(() => authStore.email)

  // Helper functions
  const getFullName = () => {
    if (!authStore.customerProfile) return 'User'
    const firstName = authStore.customerProfile.firstName || ''
    const lastName = authStore.customerProfile.lastName || ''
    if (!firstName && !lastName) return 'User'
    return `${firstName} ${lastName}`.trim()
  }

  const getInitials = () => {
    if (!authStore.customerProfile) return 'U'
    const firstName = authStore.customerProfile.firstName || ''
    const lastName = authStore.customerProfile.lastName || ''
    if (!firstName && !lastName) return 'U'
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  }

  const getUserAvatar = () => {
    return authStore.customerProfile?.imageUrl || null
  }

  // Logout function
  const logout = async () => {
    try {
      authStore.clearAuth()
      await navigateTo('/')
      return { success: true, message: 'Đăng xuất thành công!' }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: 'Có lỗi xảy ra khi đăng xuất' }
    }
  }

  return {
    isAuthenticated,
    user,
    customerProfile,
    userName,
    userEmail,
    getFullName,
    getInitials,
    getUserAvatar,
    logout
  }
}
