<template>
  <div class="relative">
    <!-- User Avatar Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-body font-medium transition-all hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      :aria-expanded="isDropdownOpen"
      aria-haspopup="true"
    >
      <!-- Avatar -->
      <div class="relative">
        <div
          v-if="customerData.imageUrl"
          class="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-200"
        >
          <img
            :src="customerData.imageUrl"
            :alt="getFullName()"
            class="h-full w-full object-cover"
          />
        </div>
        <div
          v-else
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold text-lg border-2 border-primary-200"
        >
          {{ getInitials() }}
        </div>
        
        <!-- Online indicator -->
        <div class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
      </div>
      
      <!-- User name -->
      <span class="hidden text-color-white md:block">{{ getFullName() }}</span>
      
      <!-- Dropdown arrow -->
      <Icon 
        name="ic:baseline-keyboard-arrow-down" 
        class="text-icon-sm transition-transform" 
        :class="{ 'rotate-180': isDropdownOpen }" 
      />
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown" mode="out-in">
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 top-full mt-2 min-w-[220px] rounded-xl bg-white p-2 shadow-xl border border-gray-200 z-50"
      >
        <!-- User Info Header -->
        <div class="px-3 py-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div
                v-if="customerProfile?.imageUrl"
                class="h-12 w-12 rounded-full overflow-hidden border-2 border-primary-200"
              >
                <img
                  :src="customerProfile.imageUrl"
                  :alt="getFullName()"
                  class="h-full w-full object-cover"
                />
              </div>
              <div
                v-else
                class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold text-xl border-2 border-primary-200"
              >
                {{ getInitials() }}
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ getFullName() }}</p>
              <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-1">
          <NuxtLink 
            to="/user" 
            @click="closeDropdown"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Icon name="ic:outline-person" class="text-icon-sm" />
            Tài khoản của tôi
          </NuxtLink>

          <NuxtLink 
            to="/user/orders" 
            @click="closeDropdown"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Icon name="ic:outline-receipt" class="text-icon-sm" />
            Đơn đặt phòng
          </NuxtLink>

          <NuxtLink 
            to="/user/voucher" 
            @click="closeDropdown"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Icon name="ic:outline-card-giftcard" class="text-icon-sm" />
            Voucher của tôi
          </NuxtLink>

          <NuxtLink 
            to="/user/memberships" 
            @click="closeDropdown"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Icon name="ic:outline-star" class="text-icon-sm" />
            Hội viên
          </NuxtLink>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-100 my-1"></div>

        <!-- Logout -->
        <button 
          @click="handleLogout"
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          <Icon name="ic:outline-logout" class="text-icon-sm" />
          Đăng xuất
        </button>
      </div>
    </Transition>

    <!-- Backdrop to close dropdown -->
    <div
      v-if="isDropdownOpen"
      class="fixed inset-0 z-40"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const { isAuthenticated, user, customerProfile, getFullName, getInitials, logout } = useAuthState()

// Dropdown state
const isDropdownOpen = ref(false)

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleLogout = async () => {
  closeDropdown()
  
  // Sử dụng logout từ composable
  await logout()
  
  // Redirect to home page
  await navigateTo('/')
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      closeDropdown()
    }
  })
})

// Close dropdown on route change
watch(() => useRoute().path, () => {
  closeDropdown()
})
</script>

<style lang="scss" scoped>
// Dropdown animation
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-in-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
