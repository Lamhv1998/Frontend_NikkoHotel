import { useAuthStore } from '@/stores/auth'
import { useCommonStore } from '@/stores/common'
import { useStyleStore } from '@/stores/style'

export const useGoogleAuth = () => {
  const authStore = useAuthStore()
  const commonStore = useCommonStore()
  const styleStore = useStyleStore()
  const router = useRouter()

  // Khởi tạo Google OAuth
  const initializeGoogleOAuth = () => {
    // Khởi tạo Google OAuth
    if (process.client) {
      // Xử lý OAuth callback
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      
      if (code) {
        handleGoogleCallback(code)
      }
    }
  }

  // Xử lý đăng nhập Google
  const googleSignIn = async () => {
    try {
      // Chuyển hướng đến Google OAuth endpoint
      const googleOAuthUrl = 'http://localhost:8092/login/oauth2/authorization/google'
      
      window.location.href = googleOAuthUrl
    } catch (error) {
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
      // Gửi code đến backend để xác thực
      const response = await $fetch('http://localhost:8092/auth/callback', {
        method: 'POST',
        body: { code },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response && (response as any).result) {
        // Lưu token vào store
        authStore.setToken((response as any).result)
        
        // Lấy thông tin user
        const { fetchUserInfo, fetchCustomerProfile } = useAuth()
        
        try {
          const userInfo = await fetchUserInfo()
          
          if (userInfo) {
            // Lấy customer profile
            const userId = userInfo.id
            if (userId) {
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
              navigateTo('/user')
            }, 1000)
          }
        } catch (userError) {
          throw userError
        }
      } else {
        throw new Error('Invalid response from backend')
      }
    } catch (error: any) {
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
        handleGoogleCallback(code)
        return true
      }
      
      return false
    } catch (error) {
      return false
    }
  }

  return {
    initializeGoogleOAuth,
    googleSignIn,
    handleGoogleCallback,
    checkGoogleCallback
  }
}
