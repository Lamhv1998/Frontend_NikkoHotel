<template>
  <div id="default-layout">
    <PageHeader />
    <div class="relative flex h-[17rem] xl:h-[24rem]">
      <!-- Ảnh nền -->
      <NuxtImg class="h-full w-full object-cover" src="imgur/9Ae9QeE.png" />

      <div class="absolute inset-0 flex items-center">
        <div class="container flex flex-wrap items-center gap-4 px-5 xl:gap-6 xl:px-3">
          <NuxtImg
            class="h-[4.5rem] w-[4.5rem] rounded-full object-cover xl:h-[9rem] xl:w-[9rem]"
            src="imgur/darOkIL.png"
          />
          <ClientOnly>
            <p class="text-h3 text-white xl:text-h1">
              {{ `Xin chào, ${authStore.userName}` }}
            </p>
          </ClientOnly>
        </div>
      </div>
    </div>

    <main class="section-container container space-y-10 overflow-x-hidden xl:space-y-20 xl:pt-20">
      <nav>
        <NuxtLink v-slot="{ isActive }" to="/user">
          <UISectionTab :active="isActive" text="Thông tin cá nhân" />
        </NuxtLink>

        <NuxtLink v-slot="{ isActive }" to="/user/orders">
          <UISectionTab :active="isActive" text="Đơn đặt phòng của tôi" />
        </NuxtLink>

        <NuxtLink v-slot="{ isActive }" to="/user/memberships">
          <UISectionTab :active="isActive" text="Hạng thành viên" />
        </NuxtLink>

        <NuxtLink v-slot="{ isActive }" to="/user/voucher">
          <UISectionTab :active="isActive" text="Voucher của tôi" />
        </NuxtLink>
      </nav>

      <slot />
    </main>

    <!-- Trang trí sọc -->
    <CWave />

    <PageFooter />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
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
</style>
