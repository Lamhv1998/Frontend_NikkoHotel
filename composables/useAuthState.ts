import { useAuthStore } from '@/stores/auth'

export const useAuthState = () => {
  const authStore = useAuthStore()

  // Computed properties
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const customerProfile = computed(() => authStore.customerProfile)
  const userName = computed(() => authStore.userName)
  const userEmail = computed(() => authStore.email)

  // Methods
  const getFullName = () => {
    if (customerProfile.value) {
      return `${customerProfile.value.firstName || ''} ${customerProfile.value.lastName || ''}`.trim()
    }
    return user.value?.name || userName.value || 'User'
  }

  const getInitials = () => {
    const fullName = getFullName()
    if (!fullName) return 'U'
    
    const names = fullName.split(' ')
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const getUserAvatar = () => {
    return customerProfile.value?.imageUrl || null
  }

  const logout = async () => {
    authStore.clearAuth()
    // Có thể thêm logic redirect hoặc cleanup khác ở đây
  }

  return {
    // State
    isAuthenticated,
    user,
    customerProfile,
    userName,
    userEmail,
    
    // Methods
    getFullName,
    getInitials,
    getUserAvatar,
    logout
  }
}
