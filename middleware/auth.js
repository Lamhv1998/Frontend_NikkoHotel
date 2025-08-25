export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const styleStore = useStyleStore()
  const commonStore = useCommonStore()

  const publicRoutes = [
    '/', // 👈 Thêm trang chủ
    '/auth/login',
    '/auth/register',
    '/auth/signup',
    '/confirmation',
    '/room',
    '/reserve',
    '/admin',
    '/blog',
    '/user/orders',
    '/user',
    '/user/',
    '/user/MemberStatus',
    '/User',
    '/user/*',
    '/User/*'
  ]

  if (publicRoutes.some(route => to.path === route || to.path.startsWith(route + '/'))) {
    return
  }

  if (import.meta.client) {
    if (!authStore.token) {
      commonStore.sweetalertList.push({
        title: 'Vui lòng đăng nhập',
        icon: 'warning',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      commonStore.routerGuide = to.fullPath
      return navigateTo('/auth/login')
    }

    try {
      // Kiểm tra token với useAuth composable
      const { checkToken, refreshToken } = useAuth()
      const isValid = await checkToken()
      if (isValid === false) {
        const refreshSuccess = await refreshToken()
        if (!refreshSuccess) {
          throw new Error('Token không hợp lệ và không thể refresh')
        }
      }
    } catch (error) {
      commonStore.sweetalertList.push({
        title: 'Phiên đăng nhập đã hết hạn',
        text: 'Vui lòng đăng nhập lại',
        icon: 'warning',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      commonStore.routerGuide = to.fullPath
      return navigateTo('/auth/login')
    }
  }
})
