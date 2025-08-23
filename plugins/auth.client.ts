export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Chỉ chạy trên client và khi có token
  if (process.client && authStore.token) {
    const { checkToken, refreshToken } = useAuth()
    
    // Kiểm tra token mỗi 5 phút
    setInterval(async () => {
      try {
        const isValid = await checkToken()
        if (!isValid) {
          console.log('Token expired, attempting refresh...')
          const refreshSuccess = await refreshToken()
          if (!refreshSuccess) {
            console.log('Token refresh failed, redirecting to login...')
            const commonStore = useCommonStore()
            commonStore.sweetalertList.push({
              title: 'Phiên đăng nhập đã hết hạn',
              text: 'Vui lòng đăng nhập lại',
              icon: 'warning',
              confirmButtonText: 'Xác nhận'
            })
            await navigateTo('/auth/login')
          }
        }
      } catch (error) {
        console.error('Token refresh failed:', error)
        // Nếu refresh thất bại, redirect về login
        const commonStore = useCommonStore()
        commonStore.sweetalertList.push({
          title: 'Phiên đăng nhập đã hết hạn',
          text: 'Vui lòng đăng nhập lại',
          icon: 'warning',
          confirmButtonText: 'Xác nhận'
        })
        await navigateTo('/auth/login')
      }
    }, 5 * 60 * 1000) // 5 phút
    
    // Kiểm tra token ngay khi load
    try {
      const isValid = await checkToken()
      if (!isValid) {
        console.log('Initial token check failed, attempting refresh...')
        const refreshSuccess = await refreshToken()
        if (!refreshSuccess) {
          console.log('Initial token refresh failed, redirecting to login...')
          const commonStore = useCommonStore()
          commonStore.sweetalertList.push({
            title: 'Phiên đăng nhập đã hết hạn',
            text: 'Vui lòng đăng nhập lại',
            icon: 'warning',
            confirmButtonText: 'Xác nhận'
          })
          await navigateTo('/auth/login')
        }
      }
    } catch (error) {
      console.error('Initial token check failed:', error)
    }
  }
})
