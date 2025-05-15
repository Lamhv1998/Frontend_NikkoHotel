export default defineNuxtRouteMiddleware(async (to) => {
  /* Thuộc tính toàn cục */
  const authStore = useAuthStore()
  const styleStore = useStyleStore()
  const commonStore = useCommonStore()

  /* api */
  const { checkLoginApi } = useApi()
  // Danh sách các route không cần đăng nhập
  const publicRoutes = ['/auth/login', '/auth/register', '/confirmation']

  // Nếu là route công khai thì cho qua
  if (publicRoutes.some((route) => to.path === route || to.path.startsWith(route + '/'))) {
    return
  }
  // Không có token
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

    // Kiểm tra đăng nhập thành công
    try {
      await checkLoginApi()
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
