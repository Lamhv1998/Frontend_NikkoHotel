import { useAuthStore } from '@/stores/auth'
import { useCommonStore } from '@/stores/common'
import { useStyleStore } from '@/stores/style'

export const useGoogleAuth = () => {
  const authStore = useAuthStore()
  const commonStore = useCommonStore()
  const styleStore = useStyleStore()
  const router = useRouter()

  // Khởi tạo Google OAuth
  const initGoogleAuth = () => {
    try {
      console.log('Initializing Google OAuth...')
      
      // Kiểm tra xem có đang ở trang callback không
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      
      if (code) {
        console.log('Google OAuth code detected:', code)
        handleGoogleCallback(code)
      } else {
        console.log('No Google OAuth code found, ready for login')
      }
    } catch (error) {
      console.error('Error initializing Google OAuth:', error)
    }
  }

  // Xử lý đăng nhập Google
  const googleSignIn = async () => {
    try {
      console.log('Starting Google OAuth flow...')
      
      // Chuyển hướng đến Google OAuth endpoint
      const googleOAuthUrl = 'http://localhost:8092/login/oauth2/authorization/google'
      console.log('Redirecting to Google OAuth URL:', googleOAuthUrl)
      
      window.location.href = googleOAuthUrl
    } catch (error) {
      console.error('Google OAuth redirect error:', error)
      
      // Hiển thị thông báo lỗi
      commonStore.sweetalertList.push({
        title: 'Lỗi đăng nhập Google',
        text: 'Không thể khởi tạo đăng nhập Google. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  }

  // Xử lý callback từ Google OAuth
  const handleGoogleCallback = async (code: string) => {
    try {
      console.log('Processing Google OAuth callback with code:', code)
      
      // Gửi code đến backend để xác thực
      const response = await $fetch('http://localhost:8092/auth/callback', {
        method: 'POST',
        body: { code },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Backend callback response:', response)
      
      if (response && response.result) {
        console.log('Google authentication successful, setting token...')
        
        // Lưu token vào store
        authStore.setToken(response.result)
        console.log('Token saved to store:', !!authStore.token)
        
        // Lấy thông tin user
        console.log('Fetching user information...')
        const { fetchUserInfo, fetchCustomerProfile } = useAuth()
        
        try {
          const userInfo = await fetchUserInfo()
          console.log('User info fetched successfully:', userInfo)
          
          if (userInfo) {
            // Lấy customer profile
            const userId = userInfo.id || userInfo._id
            if (userId) {
              console.log('Fetching customer profile for user:', userId)
              await fetchCustomerProfile(userId)
            }
            
            // Hiển thị thông báo thành công
            commonStore.sweetalertList.push({
              title: 'Đăng nhập Google thành công',
              text: `Chào mừng ${userInfo.name}!`,
              icon: 'success',
              confirmButtonText: 'Xác nhận',
              confirmButtonColor: styleStore.confirmButtonColor
            })
            
            // Chuyển hướng sau khi đăng nhập thành công
            setTimeout(() => {
              console.log('Redirecting to user dashboard...')
              navigateTo('/user')
            }, 1000)
          }
        } catch (userError) {
          console.error('Error fetching user info after Google login:', userError)
          throw userError
        }
      } else {
        console.error('Invalid response from backend callback:', response)
        throw new Error('Invalid response from backend')
      }
    } catch (error: any) {
      console.error('Google OAuth callback error:', error)
      
      let errorMessage = 'Đăng nhập Google thất bại'
      
      if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      // Hiển thị thông báo lỗi
      commonStore.sweetalertList.push({
        title: 'Lỗi đăng nhập Google',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      
      // Chuyển hướng về trang đăng nhập
      setTimeout(() => {
        console.log('Redirecting back to login page due to error...')
        navigateTo('/auth/login')
      }, 2000)
    }
  }

  // Kiểm tra xem có đang ở trang callback không
  const checkGoogleCallback = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      
      if (code) {
        console.log('Google OAuth callback detected, processing...')
        handleGoogleCallback(code)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error checking Google callback:', error)
      return false
    }
  }

  return {
    initGoogleAuth,
    googleSignIn,
    handleGoogleCallback,
    checkGoogleCallback
  }
}
