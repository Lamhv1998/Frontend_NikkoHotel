<template>
  <header
    v-show="commonStore.isClient"
    ref="pageHeaderRefs"
    :class="[
      'transition-all duration-300 bg-black text-text-primary',
      scrolled ? 'scrolled' : ''
    ]"
  >
    <div class="container flex items-center justify-between py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <PageLogo
          class="transition-colors hover:text-primary-500"
          :size="svgSize"
          :white="false"
        />
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button
        v-if="commonStore.isMobile"
        class="flex h-10 w-10 items-center justify-center rounded-lg text-icon-lg transition-all hover:bg-neutral-100 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        type="button"
        @click="toggleModal('show')"
        aria-label="Toggle menu"
      >
        <Icon name="ic:round-menu" />
      </button>

      <!-- Desktop Navigation -->
      <nav v-else class="flex items-center gap-6">
        <NuxtLink 
          to="/rooms"
          class="text-body font-medium transition-colors hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-2"
        >
          Phòng nghỉ
        </NuxtLink>

        <NuxtLink 
          to="/blog"
          class="text-body font-medium transition-colors hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-2"
        >
          Blog
        </NuxtLink>

        <NuxtLink 
          to="/services"
          class="text-body font-medium transition-colors hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-2"
        >
          Dịch vụ
        </NuxtLink>

        <NuxtLink 
          to="/coupons"
          class="text-body font-medium transition-colors hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-2"
        >
          Mã giảm giá
        </NuxtLink>

        <!-- User Menu -->
        <ClientOnly>
          <Transition name="dropdown" mode="out-in">
            <!-- Avatar Box khi đã đăng nhập -->
            <div v-if="authStore.isAuthenticated" class="relative">
              <button
                @click="toggleUserDropdown"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-body font-medium transition-all hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                                 <!-- Avatar -->
                 <div class="relative">
                   <div
                     v-if="getUserImageUrl()"
                     class="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-200"
                   >
                     <img
                       :src="getUserImageUrl()"
                       :alt="getUserFullName()"
                       class="h-full w-full object-cover"
                       @error="handleImageError"
                     />
                   </div>
                   <div
                     v-else
                     class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold text-lg border-2 border-primary-200"
                   >
                     {{ getUserInitials() }}
                   </div>
                   <!-- Online indicator -->
                   <div class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                 </div>
                
                <!-- User name -->
                <span class="hidden md:block">{{ getUserFullName() }}</span>
                
                <!-- Dropdown arrow -->
                <Icon 
                  name="ic:baseline-keyboard-arrow-down" 
                  class="text-icon-sm transition-transform" 
                  :class="{ 'rotate-180': isUserDropdownOpen }" 
                />
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="isUserDropdownOpen"
                class="absolute right-0 top-full mt-2 min-w-[200px] rounded-xl bg-white p-2 shadow-xl border border-gray-200 z-50"
              >
                <!-- Menu Items -->
                <div class="py-1">
                  <NuxtLink 
                    to="/user" 
                    @click="closeUserDropdown"
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <Icon name="ic:outline-person" class="text-icon-sm" />
                    Tài khoản của tôi
                  </NuxtLink>

                  <NuxtLink 
                    to="/user/bookings" 
                    @click="closeUserDropdown"
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <Icon name="ic:outline-receipt" class="text-icon-sm" />
                    Quản lý đặt phòng
                  </NuxtLink>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-100 my-1"></div>

                <!-- Logout -->
                <button 
                  @click="handleUserLogout"
                  class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <Icon name="ic:outline-logout" class="text-icon-sm" />
                  Đăng xuất
                </button>
              </div>

              <!-- Backdrop to close dropdown -->
              <div
                v-if="isUserDropdownOpen"
                class="fixed inset-0 z-40"
                @click="closeUserDropdown"
              ></div>
            </div>

            <!-- Login Button khi chưa đăng nhập -->
            <NuxtLink 
              v-else 
              to="/auth/login"
              class="rounded-lg px-4 py-2 text-body font-medium transition-colors hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Đăng nhập
            </NuxtLink>
          </Transition>
        </ClientOnly>

        <!-- CTA Button -->
        <NuxtLink to="/rooms">
          <button class="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-2 text-body font-semibold text-text-inverse transition-all hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-primary">
            Đặt phòng ngay
          </button>
        </NuxtLink>
      </nav>
    </div>

    <!-- Mobile Menu Modal -->
    <UIModal v-model="isModalShow" black fullscreen>
      <div
        v-if="isModalShow"
        class="relative flex h-screen flex-col items-stretch justify-center bg-background-dark p-6"
      >
        <!-- Close Button -->
        <button
          class="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-background-primary/10 text-icon-2xl text-text-inverse transition-all hover:bg-background-primary/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          type="button"
          @click="toggleModal('close')"
          aria-label="Close menu"
        >
          <Icon name="ic:baseline-close" />
        </button>
        
        <!-- Mobile Navigation -->
        <nav class="space-y-6">
          <NuxtLink 
            class="block rounded-lg px-4 py-3 text-h5 font-medium text-text-inverse transition-colors hover:bg-background-primary/10" 
            to="/rooms" 
            @click="toggleModal('close')"
          >
            Phòng nghỉ
          </NuxtLink>
          
          <NuxtLink 
            class="block rounded-lg px-4 py-3 text-h5 font-medium text-text-inverse transition-colors hover:bg-background-primary/10" 
            to="/blog" 
            @click="toggleModal('close')"
          >
            Blog
          </NuxtLink>
          
          <NuxtLink 
            class="block rounded-lg px-4 py-3 text-h5 font-medium text-text-inverse transition-colors hover:bg-background-primary/10" 
            to="/services" 
            @click="toggleModal('close')"
          >
            Dịch vụ
          </NuxtLink>
          
          <NuxtLink 
            class="block rounded-lg px-4 py-3 text-h5 font-medium text-text-inverse transition-colors hover:bg-background-primary/10" 
            to="/coupons" 
            @click="toggleModal('close')"
          >
            Mã giảm giá
          </NuxtLink>
          
          <NuxtLink
            v-if="authStore.isAuthenticated"
            class="block rounded-lg px-4 py-3 text-h5 font-medium text-text-inverse transition-colors hover:bg-background-primary/10"
            to="/user"
            @click="toggleModal('close')"
          >
            Tài khoản của tôi
          </NuxtLink>
          
          <NuxtLink 
            v-else 
            class="block rounded-lg px-4 py-3 text-h5 font-medium text-text-inverse transition-colors hover:bg-background-primary/10" 
            to="/auth/login" 
            @click="toggleModal('close')"
          >
            Đăng nhập
          </NuxtLink>
          
          <NuxtLink 
            class="block rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-h5 font-semibold text-text-inverse transition-all hover:from-primary-600 hover:to-primary-700" 
            to="/rooms" 
            @click="toggleModal('close')"
          >
            Đặt phòng ngay
          </NuxtLink>
          
          <button
            v-if="authStore.isAuthenticated"
            class="block w-full rounded-lg px-4 py-3 text-h5 font-medium text-error-400 transition-colors hover:bg-error-500/10"
            @click="logout"
          >
            Đăng xuất
          </button>
        </nav>
      </div>
    </UIModal>
  </header>
</template>

<script lang="ts" setup>
/* Global properties */
const commonStore = useCommonStore()
const authStore = useAuthStore()
const route = useRoute()

/* Logo size calculation */
const svgSize = computed(() => ({
  height: commonStore.isMobile ? 40 : 72,
  width: commonStore.isMobile ? 109.76 : 196
}))

/* Modal menu */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

/* User dropdown */
const isUserDropdownOpen = ref(false)
const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

const closeUserDropdown = () => {
  isUserDropdownOpen.value = false
}

/* User methods */
const getUserFullName = () => {
  if (authStore.customerProfile) {
    return `${authStore.customerProfile.firstName || ''} ${authStore.customerProfile.lastName || ''}`.trim()
  }
  return authStore.userName || 'User'
}

const getUserInitials = () => {
  const fullName = getUserFullName()
  if (!fullName) return 'U'
  
  const names = fullName.split(' ')
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

const getUserImageUrl = () => {
  // Debug: log ra dữ liệu để kiểm tra
  console.log('Debug - customerProfile:', authStore.customerProfile)
  console.log('Debug - imageUrl:', authStore.customerProfile?.imageUrl)
  
  // Kiểm tra customerProfile.imageUrl trước
  if (authStore.customerProfile?.imageUrl) {
    return authStore.customerProfile.imageUrl
  }
  return undefined
}

const handleImageError = (event: Event) => {
  console.log('Image failed to load:', event)
  // Có thể thêm logic fallback ở đây
}

const handleUserLogout = async () => {
  closeUserDropdown()
  authStore.clearAuth()
  await navigateTo('/')
}

/* Header background change on scroll */
const { y } = useWindowScroll()
const scrolled = ref(false)

onMounted(() => {
  watch(y, () => {
    scrolled.value = y.value > 50
  })
  
  // Close user dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      closeUserDropdown()
    }
  })
})

// Logout function
const logout = async () => {
  authStore.clearAuth()
  // Check if current route is an auth route
  const authRoutes = ['auth-login', 'auth-signup']
  if (authRoutes.includes(route.name as string)) {
    toggleModal('close')
    await navigateTo('/')
  }
}
</script>

<style lang="scss" scoped>
header {
  &.scrolled {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-sm);
  }
}

// Dropdown animation
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--transition-fast);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
