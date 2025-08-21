import type { UserResponse, CustomerDto } from '@/types/auth'

export const useAuthStore = defineStore(
  'auth',
  () => {
    console.log('Auth store initializing...')
    
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
        console.log('Starting store hydration from localStorage...')
        
        // Kiểm tra localStorage
        const storedToken = localStorage.getItem('auth-token')
        const storedUser = localStorage.getItem('auth-user')
        const storedCustomerProfile = localStorage.getItem('auth-customerProfile')
        
        console.log('Found in localStorage:', {
          hasToken: !!storedToken,
          hasUser: !!storedUser,
          hasCustomerProfile: !!storedCustomerProfile
        })
        
        if (storedToken) {
          token.value = storedToken
          console.log('Token hydrated:', token.value ? 'Yes' : 'No')
        }
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            user.value = parsedUser
            userName.value = parsedUser.name || ''
            email.value = parsedUser.email || ''
            id.value = parsedUser.id || parsedUser._id || ''
            console.log('User hydrated successfully:', {
              name: userName.value,
              email: email.value,
              id: id.value
            })
          } catch (e) {
            console.error('Error parsing stored user:', e)
          }
        }
        
        if (storedCustomerProfile) {
          try {
            const parsedCustomerProfile = JSON.parse(storedCustomerProfile)
            customerProfile.value = parsedCustomerProfile
            console.log('Customer profile hydrated successfully:', {
              customerId: parsedCustomerProfile.customerId,
              firstName: parsedCustomerProfile.firstName,
              lastName: parsedCustomerProfile.lastName
            })
          } catch (e) {
            console.error('Error parsing stored customer profile:', e)
          }
        }
        
        console.log('Store hydration completed. Final state:', {
          token: token.value ? 'Present' : 'Missing',
          user: user.value ? 'Present' : 'Missing',
          customerProfile: customerProfile.value ? 'Present' : 'Missing',
          userName: userName.value,
          email: email.value,
          id: id.value
        })
      } catch (error) {
        console.error('Error hydrating store from localStorage:', error)
      }
    }

    const setUser = (userData: UserResponse) => {
      user.value = userData
      userName.value = userData.name
      email.value = userData.email
      id.value = userData._id || userData.id || ''
      
      // Lưu vào localStorage
      localStorage.setItem('auth-user', JSON.stringify(userData))
    }

    const setToken = (newToken: string) => {
      token.value = newToken
      // Lưu vào localStorage
      localStorage.setItem('auth-token', newToken)
    }

    const setCustomerProfile = (customer: CustomerDto) => {
      customerProfile.value = customer
      // Lưu vào localStorage
      localStorage.setItem('auth-customerProfile', JSON.stringify(customer))
      console.log('Customer profile saved to localStorage:', customer)
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
      console.log('Checking localStorage directly...')
      const storedToken = localStorage.getItem('auth-token')
      const storedUser = localStorage.getItem('auth-user')
      const storedCustomerProfile = localStorage.getItem('auth-customerProfile')
      
      console.log('LocalStorage contents:', {
        token: storedToken ? 'Present' : 'Missing',
        user: storedUser ? 'Present' : 'Missing',
        customerProfile: storedCustomerProfile ? 'Present' : 'Missing'
      })
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          console.log('Parsed user from localStorage:', parsedUser)
        } catch (e) {
          console.error('Error parsing user from localStorage:', e)
        }
      }
      
      if (storedCustomerProfile) {
        try {
          const parsedCustomerProfile = JSON.parse(storedCustomerProfile)
          console.log('Parsed customerProfile from localStorage:', parsedCustomerProfile)
        } catch (e) {
          console.error('Error parsing customerProfile from localStorage:', e)
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
