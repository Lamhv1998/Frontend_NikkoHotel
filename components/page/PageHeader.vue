<template>
  <header
    v-show="commonStore.isClient"
    ref="pageHeaderRefs"
    :class="[bgBlack && ' bg-system-background', 'transition-colors duration-300']"
  >
    <div class="flex items-center justify-between xl:max-w-full xl:px-20">
      <!-- Liên kết: Trang chủ -->
      <NuxtLink to="/">
        <PageLogo
          class="shrink-0 transition-colors hover:text-system-primary-100"
          :size="svgSize"
          white
        />
      </NuxtLink>

      <!-- Mobile: Nút menu -->
      <button
        v-if="commonStore.isMobile"
        class="flex h-10 w-10 items-center justify-center text-icon-24 text-white transition-colors hover:text-system-primary-100"
        type="button"
        @click="toggleModal('show')"
      >
        <Icon name="ic:round-menu"></Icon>
      </button>

      <!-- Desktop: Thanh điều hướng -->
      <nav v-else class="flex items-center gap-4">
        <NuxtLink to="/rooms">
          <UIButton text="Phòng nghỉ" variant="ghost" />
        </NuxtLink>

        <NuxtLink to="/blog">
          <UIButton text="Blog" variant="ghost" />
        </NuxtLink>

        <NuxtLink to="/services">
          <UIButton text="Dịch vụ" variant="ghost" />
        </NuxtLink>

        <ClientOnly>
          <Transition name="dropdown" mode="out-in">
            <UIDropdown v-if="authStore.userName && authStore.token" v-model="userDropdown">
              <UIButton
                class="flex-row-reverse"
                :text="authStore.userName"
                icon="ic:outline-account-circle"
                variant="ghost"
              />
              <template #item>
                <NuxtLink to="/user" @click="userDropdown = false">
                  <UIButton block text="Tài khoản của tôi" variant="dropdown" />
                </NuxtLink>

                <UIButton block text="Đăng xuất" variant="dropdown" @click="logout" />
              </template>
            </UIDropdown>

            <NuxtLink v-else to="/auth/login">
              <UIButton text="Đăng nhập" variant="ghost" />
            </NuxtLink>
          </Transition>
        </ClientOnly>

        <NuxtLink to="/rooms">
          <UIButton text="Đặt phòng ngay" />
        </NuxtLink>
      </nav>
    </div>

    <!-- Mobile: Menu popup -->
    <UIModal v-model="isModalShow" black fullscreen>
      <div
        v-if="isModalShow"
        class="relative flex h-screen flex-col items-stretch justify-center px-5"
      >
        <button
          class="absolute right-5 top-5 flex h-16 w-16 items-center justify-center text-icon-48 text-white transition-colors hover:text-system-primary-100"
          type="button"
          @click="toggleModal('close')"
        >
          <Icon name="ic:baseline-close" />
        </button>
        <nav class="space-y-10">
          <NuxtLink class="block" to="/rooms" @click="toggleModal('close')">
            <UIButton block text="Phòng nghỉ" variant="ghost" />
          </NuxtLink>
          <NuxtLink
            v-if="authStore.userName && authStore.token"
            class="block"
            to="/user"
            @click="toggleModal('close')"
          >
            <UIButton block text="Tài khoản của tôi" variant="ghost" />
          </NuxtLink>
          <NuxtLink v-else class="block" to="/auth/login" @click="toggleModal('close')">
            <UIButton block text="Đăng nhập" variant="ghost" />
          </NuxtLink>
          <NuxtLink class="block" to="/rooms" @click="toggleModal('close')">
            <UIButton block text="Đặt phòng ngay" />
          </NuxtLink>
          <UIButton
            v-if="authStore.userName && authStore.token"
            block
            text="Đăng xuất"
            variant="ghost"
            @click="logout"
          />
        </nav>
      </div>
    </UIModal>
  </header>
</template>

<script lang="ts" setup>
/* Thuộc tính toàn cục */
const commonStore = useCommonStore()
const authStore = useAuthStore()
const route = useRoute()

/* Tính toán kích thước Logo */
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

/* Đổi nền header khi cuộn */
const { height } = useWindowSize()
const { y } = useWindowScroll()
const bgBlack = ref(false)
onMounted(() => {
  watch(y, () => {
    bgBlack.value = height.value / 4 < y.value
  })
})

/* Dropdown người dùng */
const userDropdown = ref(false)

// Đăng xuất
const logout = async () => {
  userDropdown.value = false
  authStore.token = ''
  authStore.userName = ''
  if (useAuth.includes(route.name as string)) {
    toggleModal('close')
    await navigateTo('/')
  }
}
</script>
