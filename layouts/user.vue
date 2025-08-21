<template>
  <div id="default-layout">
    <PageHeader />
    
    <!-- Hero Section -->
    <div class="relative flex h-[20rem] xl:h-[28rem]">
      <!-- Ảnh nền -->
      <NuxtImg class="h-full w-full object-cover" src="imgur/9Ae9QeE.png" />

      <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

      <div class="absolute inset-0 flex items-center">
        <div class="container flex flex-wrap items-center gap-6 px-6 xl:gap-8 xl:px-8">
          <div class="flex items-center space-x-6">
            <div class="w-20 h-20 xl:w-24 xl:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <ClientOnly>
                <span class="text-3xl xl:text-4xl font-bold text-white">
                  {{ getInitials() }}
                </span>
              </ClientOnly>
            </div>
            <div>
              <ClientOnly>
                <h1 class="text-3xl xl:text-5xl font-bold text-white mb-2">
                  {{ `Xin chào, ${getFullName()}` }}
                </h1>
                <p class="text-lg xl:text-xl text-white/90">
                  {{ authStore.email || 'user@example.com' }}
                </p>

              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-6 xl:px-8">
        <nav class="flex space-x-1 overflow-x-auto">
          <NuxtLink 
            to="/user"
            class="flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="$route.path === '/user' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Thông tin cá nhân
          </NuxtLink>

          <NuxtLink 
            to="/user/orders"
            class="flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="$route.path === '/user/orders' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'"
          >
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            Đơn đặt phòng
          </NuxtLink>

          <NuxtLink 
            to="/user/memberships"
            class="flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="$route.path === '/user/memberships' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'"
          >
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            Hạng thành viên
          </NuxtLink>

          <NuxtLink 
            to="/user/voucher"
            class="flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="$route.path === '/user/voucher' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'"
          >
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            Voucher
          </NuxtLink>

          <!-- Logout Button -->
          <button 
            @click="handleLogout"
            class="flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative text-red-500 hover:text-red-700 hover:border-b-2 hover:border-red-300 ml-auto"
          >
            <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            Đăng xuất
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-50">
      <slot />
    </main>

    <!-- Trang trí sọc -->
    <!-- <CWave /> -->

    <PageFooter />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const { logoutUser } = useAuth()
const { $Swal } = useNuxtApp()

/* Helper functions for customer profile display */
const getInitials = () => {
  if (!authStore.customerProfile) return 'U'
  const firstName = authStore.customerProfile.firstName || ''
  const lastName = authStore.customerProfile.lastName || ''
  if (!firstName && !lastName) return 'U'
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
}

const getFullName = () => {
  if (!authStore.customerProfile) return 'User'
  const firstName = authStore.customerProfile.firstName || ''
  const lastName = authStore.customerProfile.lastName || ''
  if (!firstName && !lastName) return 'User'
  return `${firstName} ${lastName}`.trim()
}

const getLevelText = (level: string) => {
  switch (level?.toUpperCase()) {
    case 'SILVER':
      return 'Bạc'
    case 'GOLD':
      return 'Vàng'
    case 'PLATINUM':
      return 'Bạch kim'
    case 'DIAMOND':
      return 'Kim cương'
    case 'BRONZE':
      return 'Đồng'
    default:
      return 'Thành viên'
  }
}

/* Logout function */
const handleLogout = async () => {
  try {
    const result = await logoutUser()
    if (result.success) {
      // Hiển thị thông báo thành công
      $Swal.fire({
        icon: 'success',
        title: 'Đăng xuất thành công!',
        text: 'Bạn đã được đăng xuất khỏi hệ thống.',
        timer: 2000,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Logout error:', error)
    // Hiển thị thông báo lỗi nếu cần
    $Swal.fire({
      icon: 'error',
      title: 'Có lỗi xảy ra',
      text: 'Không thể đăng xuất. Vui lòng thử lại.',
    })
  }
}
</script>

<style lang="scss" scoped>
#default-layout {
  @apply relative flex min-h-screen flex-col;

  > header {
    @apply sticky top-0 z-[25] w-full bg-black;
  }

  > main {
    @apply flex-1;
  }
}

/* Custom scrollbar for navigation */
nav::-webkit-scrollbar {
  height: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
