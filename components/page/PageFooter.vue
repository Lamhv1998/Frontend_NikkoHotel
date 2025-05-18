<template>
  <footer class="section-container bg-system-background text-white xl:pb-[7.5rem]">
    <div class="container space-y-20">
      <div class="flex flex-col justify-between gap-10 xl:flex-row">
        <!-- Khu vực liên kết mạng xã hội -->
        <div class="space-y-10">
          <!-- Liên kết: Trang chủ -->
          <NuxtLink to="/">
            <PageLogo white />
          </NuxtLink>

          <div class="space-x-4">
            <!-- Liên kết: Line -->
            <NuxtLink class="link-wrapper" target="_blank" to="https://line.me/ti/p/l7E02lIDG4">
              <Icon class="shrink-0" name="bi:line" />
            </NuxtLink>

            <!-- Liên kết: IG -->
            <NuxtLink class="link-wrapper" target="_blank" to="https://instagram.com/cutecat8110">
              <Icon class="shrink-0" name="bi:instagram" />
            </NuxtLink>
          </div>
        </div>

        <!-- Khu vực thông tin liên hệ -->
        <ul class="contact-info-wrapper">
          <li v-for="(contact, index) in contactInfo" :key="index">
            <h4 class="text-title">{{ contact.category }}</h4>
            <p class="text-body-2 xl:text-body">{{ contact.details }}</p>
          </li>
        </ul>
      </div>

      <div
        class="flex flex-col gap-4 text-body-2 xl:flex-row xl:items-center xl:justify-between xl:text-body"
      >
        <!-- Địa chỉ -->
        <address class="not-italic">Quận 1, Thành phố Hồ Chí Minh, Việt Nam</address>

        <!-- Bản quyền và liên kết liên quan -->
        <div class="flex flex-wrap items-center gap-4 xl:flex-row-reverse">
          <!-- Bản quyền -->

          <!-- <div class="space-x-1">
            <NuxtLink class="hot-link-wrapper" target="_blank" to="/_guideline">
              <Icon class="shrink-0" name="bi:palette2" />
            </NuxtLink>

            <NuxtLink
              class="hot-link-wrapper"
              target="_blank"
              to="https:// Nikko-luxury-hotel-back.onrender.com/swagger/"
            >
              <Icon class="shrink-0" name="mdi:api" />
            </NuxtLink>

            <NuxtLink
              class="hot-link-wrapper"
              target="_blank"
              to="https://github.com/cutecat8110/ Nikko-luxury-hotel"
            >
              <Icon class="shrink-0" name="bi:github" />
            </NuxtLink>
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
/* Khu vực thông tin liên hệ */
const contactInfo = ref([
  {
    category: 'Điện thoại',
    details: '+886 9803-530-64'
  },
  {
    category: 'Email',
    details: 'fpoly@gmail.com'
  },
  {
    category: 'Fax',
    details: '+886 9803-530-64'
  },
  {
    category: 'Website',
    details: 'ssasas.fpl'
  }
])
</script>

<style lang="scss" scoped>
.link-wrapper {
  @apply inline-flex h-10 w-10 items-center justify-center rounded-full border border-white text-icon-24 text-white transition-colors hover:border-system-primary-100 hover:text-system-primary-100;
}

.hot-link-wrapper {
  @apply inline-flex h-8 w-8 items-center justify-center rounded-full  text-icon-20 text-system-gray-80 transition-colors hover:border-system-primary-100 hover:text-system-primary-100;
}

.contact-info-wrapper {
  @apply grid gap-4;

  @include xl {
    @apply gap-x-20 gap-y-10;
    grid-template-columns: auto auto;
  }
}
</style>
