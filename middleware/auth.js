export default defineNuxtRouteMiddleware(async (to) => {
  console.log('[auth middleware] Route:', to.path)

  const authStore = useAuthStore()
  const styleStore = useStyleStore()
  const commonStore = useCommonStore()
  const { checkLoginApi } = useApi()

  const publicRoutes = [
    '/', // 👈 Thêm trang chủ
    '/auth/login',
    '/auth/register',
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
    console.log('[auth middleware] Public route:', to.path)
    return
  }

  if (import.meta.client) {
    if (!authStore.token) {
      console.warn('[auth middleware] Không có token, chuyển hướng login:', to.path)
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
      await checkLoginApi()
    } catch (error) {
      console.error('[auth middleware] Phiên hết hạn:', error)
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
