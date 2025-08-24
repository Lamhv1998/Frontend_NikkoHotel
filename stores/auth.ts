import type { UserResponse, CustomerDto } from '@/types/auth'
import { nextTick } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userName = ref('')
    const token = ref('')
    const email = ref('')
    const id = ref('')
    const user = ref<UserResponse | null>(null)
    const customerProfile = ref<CustomerDto | null>(null)
    const isAuthenticated = computed(() => !!token.value)

    // Hydrate dữ liệu từ localStorage khi store được khởi tạo
    const hydrateFromStorage = () => {
      try {
        // Kiểm tra localStorage
        const storedToken = localStorage.getItem('auth-token')
        const storedUser = localStorage.getItem('auth-user')
        const storedCustomerProfile = localStorage.getItem('auth-customerProfile')
        
        if (storedToken) {
          token.value = storedToken
        }
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            user.value = parsedUser
            userName.value = parsedUser.name || ''
            email.value = parsedUser.email || ''
            id.value = parsedUser.id || ''
          } catch (e) {
            // Handle parsing error silently
          }
        }
        
        if (storedCustomerProfile) {
          try {
            const parsedCustomerProfile = JSON.parse(storedCustomerProfile)
            customerProfile.value = parsedCustomerProfile
          } catch (e) {
            // Handle parsing error silently
          }
        }
      } catch (error) {
        // Handle error silently
      }
    }

    const setUser = (userData: UserResponse) => {
      user.value = userData
      
      // Xử lý dữ liệu từ API myInfo (có thể không có name)
      userName.value = userData.name || userData.email || 'User'
      email.value = userData.email || ''
      id.value = userData.id || ''
      
      // Lưu vào localStorage
      localStorage.setItem('auth-user', JSON.stringify(userData))
    }

    const setToken = (newToken: string) => {
      token.value = newToken
      // Lưu vào localStorage
      localStorage.setItem('auth-token', newToken)
    }

    const setCustomerProfile = (customer: CustomerDto) => {
      // Lưu vào memory
      customerProfile.value = customer
      
      // Lưu vào localStorage
      localStorage.setItem('auth-customerProfile', JSON.stringify(customer))
      
      // Trigger reactivity
      nextTick(() => {
        // Reactivity triggered
      })
    }

    const clearAuth = () => {
      userName.value = ''
      token.value = ''
      email.value = ''
      id.value = ''
      user.value = null
      customerProfile.value = null
      
      // Xóa khỏi localStorage
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
      localStorage.removeItem('auth-customerProfile')
    }

    const checkLocalStorage = () => {
      const storedToken = localStorage.getItem('auth-token')
      const storedUser = localStorage.getItem('auth-user')
      const storedCustomerProfile = localStorage.getItem('auth-customerProfile')
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          // User data available
        } catch (e) {
          // Handle parsing error silently
        }
      }
      
      if (storedCustomerProfile) {
        try {
          const parsedCustomerProfile = JSON.parse(storedCustomerProfile)
          // Customer profile data available
        } catch (e) {
          // Handle parsing error silently
        }
      }
    }

    return {
      userName,
      token,
      email,
      id,
      user,
      customerProfile,
      isAuthenticated,
      setUser,
      setToken,
      setCustomerProfile,
      clearAuth,
      hydrateFromStorage,
      checkLocalStorage
    }
  }
)
