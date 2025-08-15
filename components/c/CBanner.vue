<template>
  <section>
    <ClientOnly>
      <Swiper
        v-if="isMounted"
        class="banner-swiper"
        :autoplay="{
          delay: 7000,
          disableOnInteraction: false
        }"
        :effect="'fade'"
        :loop="true"
        :modules="modules"
        :pagination="{
          clickable: true
        }"
      >
      <SwiperSlide v-for="(banner, index) in bannerUrlList" :key="index" class="!h-screen">
        <!-- Ảnh nền -->
        <NuxtImg class="h-full w-full object-cover" :src="banner" width="100vw" />

        <!-- Lớp phủ đen -->
        <div class="absolute inset-0 bg-black/30" />

        <!-- Định vị/Trên nền -->
        <div class="absolute inset-0 py-[4.5rem] xl:py-[7.5rem]">
          <!-- rwd container -->
          <div
            :class="[
              props.rooms || props.restaurant || props.services
                ? 'justify-center gap-10 xl:!max-w-[52rem] xl:gap-20'
                : 'xl:gap-[12.5rem] xl:px-20 xl:pt-[7.5rem]',
              'container flex h-full flex-col items-center gap-10 px-5 pt-10 xl:max-w-full xl:flex-row xl:items-stretch'
            ]"
          >
            <div
              :class="[
                props.rooms || props.restaurant || props.services ? 'h-2/5 xl:h-auto xl:flex-1' : 'flex-1',
                'flex  flex-col items-center justify-normal text-system-primary-100 xl:items-start xl:justify-center'
              ]"
            >
              <h1 class="select-none text-h4 xl:text-h2">Nikko Hotel</h1>
              <div class="mt-2 select-none text-title xl:text-h5">Nikkoment Luxury Hotel</div>

              <div
                class="mt-5 w-[0.125rem] flex-1 rounded-full bg-gradient-to-b from-system-primary-100 to-white xl:mt-10 xl:h-[0.125rem] xl:w-full xl:flex-initial xl:bg-gradient-to-r"
              />
            </div>

            <div
              v-if="!props.rooms && !props.restaurant && !props.services"
              class="ml-12 flex h-2/3 items-center rounded-[2.5rem] border-r border-t bg-gradient-to-t from-white/30 backdrop-blur-[1.25rem] xl:h-auto xl:w-1/2 xl:rounded-[5rem]"
            >
              <div class="-ml-10 pr-10 text-white xl:-ml-12 xl:pr-12">
                <div class="select-none text-h1 xl:text-display">Nikko</div>
                <div class="s:text-display mt-2 select-none text-h1">
                  Lựa chọn lưu trú sang trọng
                </div>
                <div class="mt-6 select-none text-title xl:text-h3">
                  Chúng tôi cam kết mang đến cho bạn trải nghiệm sang trọng và dịch vụ chất lượng
                  nhất
                </div>
                <NuxtLink to="/rooms">
                  <UIHeroButton class="mt-[3.75rem] xl:mt-10" text="Đặt phòng ngay" />
                </NuxtLink>
              </div>
            </div>
            
            <!-- Tiêu đề cho các trang cụ thể -->
            <h2 v-else-if="props.rooms" class="flex items-center text-h3 text-white xl:flex-initial xl:text-h1">
              Phòng nghỉ
            </h2>
            <h2 v-else-if="props.restaurant" class="flex items-center text-h3 text-white xl:flex-initial xl:text-h1">
              Nhà hàng
            </h2>
            <h2 v-else-if="props.services" class="flex items-center text-h3 text-white xl:flex-initial xl:text-h1">
              Dịch vụ
            </h2>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <template #fallback>
      <div class="h-screen bg-gray-200 animate-pulse flex items-center justify-center">
        <span class="text-gray-500">Loading banner...</span>
      </div>
    </template>
  </ClientOnly>
  </section>
</template>

<script lang="ts" setup>
// Import modules properly
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

const props = defineProps({
  rooms: Boolean,
  restaurant: Boolean,
  services: Boolean
})

// Ensure component is mounted before initializing Swiper
const isMounted = ref(false)

// Define modules
const modules = [Pagination, EffectFade, Autoplay]

/* Danh sách banner */
const bannerUrlList = ref([
  'imgur/SAbetYU.jpg',
  'imgur/eMl6NuV.png',
  'imgur/zqBWS1u.png',
  'imgur/24uhdiO.png',
  'imgur/NSnPlgZ.png'
])

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})

// Cleanup on unmount
onBeforeUnmount(() => {
  isMounted.value = false
})
</script>

<style lang="scss" scoped>
:deep(.banner-swiper) {
  .swiper-pagination {
    @apply bottom-6 flex justify-center gap-2 xl:bottom-8;
  }
  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-8 rounded-full bg-system-primary-40 opacity-100 transition-colors hover:bg-system-primary-100;

    &.swiper-pagination-bullet-active {
      @apply w-[3.75rem]  bg-system-primary-100;
    }
  }

  img {
    @apply scale-[1.1] transition-all duration-[8000ms] ease-linear;
  }

  .swiper-slide-active,
  .swiper-slide-prev {
    img {
      @apply scale-100;
    }
  }
}
</style>