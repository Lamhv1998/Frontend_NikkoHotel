<template>
  <section class="relative">
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
          <!-- Background Image -->
          <NuxtImg 
            class="h-full w-full object-cover" 
            :src="banner" 
            width="100vw"
            loading="eager"
            alt="Nikko Hotel Banner"
          />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

          <!-- Content Container -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="container relative z-10">
              <div
                :class="[
                  props.rooms
                    ? 'justify-center gap-8 lg:gap-12 xl:gap-16'
                    : 'gap-8 lg:gap-12 xl:gap-20',
                  'flex h-full flex-col items-center lg:flex-row lg:items-center'
                ]"
              >
                <!-- Left Content -->
                <div
                  :class="[
                    props.rooms ? 'h-2/5 lg:h-auto lg:flex-1' : 'flex-1',
                    'flex flex-col items-center text-center lg:items-start lg:text-left'
                  ]"
                >
                  <div class="space-y-4">
                    <h1 class="text-h2 font-display font-bold text-text-inverse lg:text-h1 xl:text-display-2">
                      Nikko Hotel
                    </h1>
                    <p class="text-body-lg font-medium text-primary-200 lg:text-h5">
                      Nikkoment Luxury Hotel
                    </p>
                  </div>

                  <!-- Decorative Line -->
                  <div
                    class="mt-8 h-px w-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-200 lg:mt-12 lg:w-24 xl:w-32"
                  />
                </div>

                <!-- Right Content -->
                <div
                  v-if="!props.rooms"
                  class="glass-effect flex h-2/3 w-full items-center rounded-3xl border border-white/20 p-8 lg:h-auto lg:w-1/2 lg:p-12 xl:rounded-[3rem] xl:p-16"
                >
                  <div class="space-y-6 text-text-inverse">
                    <div class="space-y-2">
                      <h2 class="text-h1 font-display font-bold lg:text-display-1">
                        Nikko
                      </h2>
                      <h3 class="text-h3 font-display font-semibold lg:text-h2">
                        Lựa chọn lưu trú sang trọng
                      </h3>
                    </div>
                    
                    <p class="text-body-lg leading-relaxed text-neutral-100 lg:text-h5">
                      Chúng tôi cam kết mang đến cho bạn trải nghiệm sang trọng và dịch vụ chất lượng nhất
                    </p>
                    
                    <NuxtLink to="/rooms" class="inline-block">
                      <button class="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 text-body-lg font-semibold text-text-inverse transition-all hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-primary">
                        <span class="relative z-10">Đặt phòng ngay</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
                      </button>
                    </NuxtLink>
                  </div>
                </div>
                
                <h2 v-else class="text-h2 font-display font-bold text-text-inverse lg:text-h1 xl:text-display-2">
                  Phòng nghỉ
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      
      <template #fallback>
        <div class="flex h-screen items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
          <div class="text-center">
            <div class="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500 mx-auto"></div>
            <p class="text-body text-neutral-600">Đang tải...</p>
          </div>
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script lang="ts" setup>
// Import modules properly
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

const props = defineProps({
  rooms: Boolean
})

// Ensure component is mounted before initializing Swiper
const isMounted = ref(false)

// Define modules
const modules = [Pagination, EffectFade, Autoplay]

/* Banner list */
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
    bottom: var(--spacing-6);
    display: flex;
    justify-content: center;
    gap: var(--spacing-2);
    
    @include responsive(xl) {
      bottom: var(--spacing-8);
    }
  }
  
  .swiper-pagination-bullet {
    margin: 0;
    display: block;
    height: 4px;
    width: 32px;
    border-radius: var(--radius-full);
    background: var(--color-primary-200);
    opacity: 1;
    transition: all var(--transition-normal);
    
    &:hover {
      background: var(--color-primary-400);
    }

    &.swiper-pagination-bullet-active {
      width: 60px;
      background: var(--color-primary-500);
    }
  }

  img {
    transform: scale(1.1);
    transition: transform 8s ease-linear;
  }

  .swiper-slide-active,
  .swiper-slide-prev {
    img {
      transform: scale(1);
    }
  }
}

// Glass effect for the content card
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// Smooth animations
.banner-swiper {
  .swiper-slide {
    transition: all var(--transition-slow);
  }
}

// Responsive text adjustments
@media (max-width: 768px) {
  .text-display-2 {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .text-display-1 {
    font-size: 2rem;
    line-height: 1.2;
  }
}
</style>