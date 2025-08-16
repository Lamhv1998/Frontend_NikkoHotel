<template>
  <div
    class="group overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.01] xl:grid xl:grid-cols-2"
  >
    <!-- Xem trước phòng -->
    <div class="relative aspect-square xl:col-span-4 xl:aspect-[3/2]">
             <!-- Badge trạng thái -->
       <div class="absolute left-3 top-3 z-10">
         <span class="inline-flex items-center rounded-full bg-system-success-100 px-2 py-0.5 text-body-xs font-medium text-system-success-120">
           <Icon name="ic:baseline-check-circle" class="mr-1 h-2.5 w-2.5" />
           Còn phòng
         </span>
       </div>
      <ClientOnly>
        <Swiper
          v-if="isMounted"
          class="room-swiper h-full"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false
          }"
          :loop="true"
          :modules="modules"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          :pagination="{
            clickable: true
          }"
        >
          <!-- Ảnh phòng -->
          <SwiperSlide v-for="(slide, index) in room.imageUrlList || defaultImages" :key="index">
            <div class="relative h-full w-full overflow-hidden">
              <NuxtImg 
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                :src="slide" 
              />
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </SwiperSlide>

          <!-- Nút chọn phòng -->
          <div
            class="swiper-button-prev !left-3 !top-1/2 !-translate-y-1/2 !hidden !h-10 !w-10 place-items-center rounded-full bg-white/90 backdrop-blur-sm !text-system-gray-80 shadow-lg transition-all after:hidden hover:!bg-white hover:shadow-xl xl:!flex"
          >
            <Icon
              class="!h-auto !w-auto !object-none text-xl"
              name="ic:baseline-keyboard-arrow-left"
            />
          </div>
          <div
            class="swiper-button-next !right-3 !top-1/2 !-translate-y-1/2 !hidden !h-10 !w-10 place-items-center rounded-full bg-white/90 backdrop-blur-sm !text-system-gray-80 shadow-lg transition-all after:hidden hover:!bg-white hover:shadow-xl xl:!flex"
          >
            <Icon
              class="!h-auto !w-auto !object-none text-xl"
              name="ic:baseline-keyboard-arrow-right"
            />
          </div>
        </Swiper>
        <template #fallback>
          <div class="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span class="text-gray-500">Loading...</span>
          </div>
        </template>
      </ClientOnly>
    </div>

    <!-- Thông tin phòng -->
    <div class="flex flex-col p-4 xl:col-span-8 xl:p-6">
      <!-- Header: Tên phòng và giá -->
      <div class="mb-4 xl:mb-6">
        <div class="flex items-start justify-between mb-2">
          <h3 class="text-h5 font-display text-system-primary-100 xl:text-h3">{{ room.name }}</h3>
          <div class="flex items-center gap-1">
            <Icon name="ic:baseline-star" class="h-4 w-4 text-accent-gold" />
            <span class="text-body-xs font-medium text-system-gray-60">4.8</span>
          </div>
        </div>
        <p class="text-body-xs text-system-gray-80 xl:text-body-sm leading-relaxed">{{ room.description }}</p>
      </div>

      <!-- Thông tin cơ bản phòng -->
      <div class="mb-4 xl:mb-6">
        <CRoomInfo
          :area-info="room.areaInfo"
          :bed-info="room.bedInfo"
          :max-people="room.maxPeople"
          border
        />
      </div>

      <!-- Tiện nghi nổi bật -->
      <div class="mb-4 xl:mb-6">
        <h4 class="text-body-sm font-medium text-system-gray-80 mb-2">Tiện nghi nổi bật</h4>
        <div class="flex flex-wrap gap-1.5">
          <span class="inline-flex items-center gap-1 rounded-full bg-system-primary-10 px-2 py-0.5 text-body-xs font-medium text-system-primary-100">
            <Icon name="ic:baseline-wifi" class="h-2.5 w-2.5" />
            WiFi
          </span>
          <span class="inline-flex items-center gap-1 rounded-full bg-system-primary-10 px-2 py-0.5 text-body-xs font-medium text-system-primary-100">
            <Icon name="ic:baseline-ac-unit" class="h-2.5 w-2.5" />
            Điều hòa
          </span>
          <span class="inline-flex items-center gap-1 rounded-full bg-system-primary-10 px-2 py-0.5 text-body-xs font-medium text-system-primary-100">
            <Icon name="ic:baseline-tv" class="h-2.5 w-2.5" />
            TV
          </span>
          <span class="inline-flex items-center gap-1 rounded-full bg-system-primary-10 px-2 py-0.5 text-body-xs font-medium text-system-primary-100">
            <Icon name="ic:baseline-local-parking" class="h-2.5 w-2.5" />
            Bãi đỗ xe
          </span>
        </div>
      </div>

      <!-- Footer: Giá và CTA -->
      <div class="mt-auto">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-h6 font-bold text-system-primary-100 xl:text-h5">
              {{ useFormatCurrency(room.price) }}
            </p>
            <p class="text-body-xs text-system-gray-60">/ đêm</p>
          </div>
          
          <NuxtLink 
            :to="`/room/${room._id}`"
            class="group flex items-center gap-1.5 rounded-lg bg-system-primary-100 px-4 py-2 text-body-sm font-medium text-white transition-all hover:bg-system-primary-120 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20 active:scale-95"
          >
            Xem chi tiết
            <Icon name="mdi:arrow-right" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Import Swiper modules properly
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// import type { RoomResponse } from '@/types'

/* props */
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

// Mount state
const isMounted = ref(false)

// Define modules
const modules = [Pagination, Autoplay, Navigation]

// Sử dụng dữ liệu từ props
const room = computed(() => props.room)

// Ảnh mặc định nếu không có ảnh
const defaultImages = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3'
]

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})

onBeforeUnmount(() => {
  isMounted.value = false
})
</script>

<style lang="scss" scoped>
:deep(.room-swiper) {
  .swiper-pagination {
    @apply bottom-3 flex justify-center gap-1.5;
  }

  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-5 rounded-full bg-white/60 backdrop-blur-sm opacity-100 transition-all duration-300 hover:bg-white hover:scale-110;

    &.swiper-pagination-bullet-active {
      @apply w-6 bg-white scale-110;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 1279px) {
  :deep(.room-swiper) {
    .swiper-pagination {
      @apply bottom-2;
    }
    
    .swiper-pagination-bullet {
      @apply h-0.5 w-3;
      
      &.swiper-pagination-bullet-active {
        @apply w-4;
      }
    }
  }
}
</style>