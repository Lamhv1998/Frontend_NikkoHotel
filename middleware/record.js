export default defineNuxtRouteMiddleware((_, from) => {
  /* Thuộc tính toàn cục */
  const commonStore = useCommonStore()

  /* Trang: Đăng nhập, Đăng ký */
  // Danh sách trang đăng nhập/đăng ký
  const leaveAuth = ['auth-login', 'auth-signup']
  // Ghi nhớ đường dẫn trang trước nếu không phải đăng nhập/đăng ký và chưa có routerGuide
  if (from.name && !leaveAuth.includes(from.name) && !commonStore.routerGuide) {
    commonStore.routerGuide = from.fullPath
  }
})
