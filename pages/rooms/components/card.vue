<template>
  <div
    class="overflow-hidden rounded-[1.25rem] bg-white transition-shadow hover:shadow-md xl:grid xl:grid-cols-12"
  >
    <!-- Xem trước phòng -->
    <div class="aspect-video xl:col-span-7 xl:aspect-auto">
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
          <SwiperSlide v-for="(slide, index) in room.imageUrlList" :key="index">
            <NuxtImg class="h-full w-full object-cover" :src="slide" />
          </SwiperSlide>

          <!-- Nút chọn phòng -->
          <div
            class="swiper-button-prev !left-6 !-mt-7 !hidden !h-14 !w-14 place-items-center rounded-full bg-white !text-system-gray-80 opacity-75 transition-opacity after:hidden hover:opacity-100 xl:!flex"
          >
            <Icon
              class="!h-auto !w-auto !object-none text-[2.5rem]"
              name="ic:baseline-keyboard-arrow-left"
            />
          </div>
          <div
            class="swiper-button-next !right-6 !-mt-7 !hidden !h-14 !w-14 place-items-center rounded-full bg-white !text-system-gray-80 opacity-75 transition-opacity after:hidden hover:opacity-100 xl:!flex"
          >
            <Icon
              class="!h-auto !w-auto !object-none text-[2.5rem]"
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
    <div class="space-y-6 p-4 xl:col-span-5 xl:space-y-10 xl:p-10">
      <!-- Tên phòng và mô tả -->
      <div class="space-y-2">
        <h3 class="text-h4 xl:text-h2">{{ room.name }}</h3>
        <p class="text-body-2 text-system-gray-80 xl:text-body">{{ room.description }}</p>
      </div>

      <!-- Thông tin cơ bản phòng -->
      <CRoomInfo
        :area-info="room.areaInfo"
        :bed-info="room.bedInfo"
        :max-people="room.maxPeople"
        border
      />

      <!-- Đường kẻ phân cách -->
      <UILine class="!h-[0.125rem]" color="primary" />

      <div class="flex items-center justify-between py-4">
        <!-- Giá phòng -->
        <p class="text-title text-system-primary-100 xl:text-h5">
          {{ useFormatCurrency(room.price) }}
        </p>

        <!-- Liên kết: Chi tiết phòng -->
        <NuxtLink :to="`/room/${room._id}`">
          <div
            class="flex h-6 w-6 cursor-pointer items-center justify-center text-[1.25rem] text-system-primary-100 transition-colors hover:text-system-primary-120"
          >
            <Icon name="mdi:arrow-right" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Import Swiper modules properly
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// import type { RoomResponse } from '@/types'

/* props */
// const props = defineProps({
//   room: {
//     type: Object as PropType<RoomResponse>,
//     required: true
//   }
// })

// Mount state
const isMounted = ref(false)

// Define modules
const modules = [Pagination, Autoplay, Navigation]

const room = {
  name: 'Phòng Deluxesss',
  description: 'Phòng Deluxe với đầy đủ tiện nghi',
  imageUrlList: [
    'https://picsum.photos/600/400?random=1',
    'https://picsum.photos/600/400?random=2',
    'https://picsum.photos/600/400?random=3'
  ],
  areaInfo: '30 m²',
  bedInfo: '1 giường đôi',
  maxPeople: 2,
  price: 1000000,
  _id: '1'
}

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
    @apply bottom-6 flex justify-center gap-2;
  }

  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-8 rounded-full bg-system-primary-40 opacity-100 transition-colors hover:bg-system-primary-100;

    &.swiper-pagination-bullet-active {
      @apply w-[3.75rem]  bg-system-primary-100;
    }
  }
}
</style>