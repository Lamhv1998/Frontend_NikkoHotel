export default defineNuxtRouteMiddleware((to) => {
  /* Thuộc tính toàn cục */
  const commonStore = useCommonStore()

  /* Trang: Đăng nhập, Đăng ký */
  // Danh sách trang đăng nhập/đăng ký
  const leaveAuth = ['auth-login', 'auth-signup']

  /* Khi rời khỏi: Đăng nhập, Đăng ký */
  // Xóa đường dẫn quay lại nếu không còn ở trang đăng nhập/đăng ký
  if (commonStore.routerGuide && !leaveAuth.includes(to.name)) {
    commonStore.routerGuide = ''
  }
})
