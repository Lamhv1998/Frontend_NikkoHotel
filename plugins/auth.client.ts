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
          const refreshSuccess = await refreshToken()
          if (!refreshSuccess) {
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
        const refreshSuccess = await refreshToken()
        if (!refreshSuccess) {
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
      // Handle error silently
    }
  }
})
