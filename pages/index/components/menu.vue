<template>
  <section v-if="menu" class="section-container relative bg-gradient-to-br from-white to-system-primary-10">
    <!-- Trang trí sọc -->
    <img class="absolute left-10 top-14 hidden w-[11.5rem] xl:block" src="/img/line.png" alt="Line decoration" />

    <!-- Trang trí chấm -->
    <img
      class="absolute -top-10 right-20 z-0 hidden xl:block"
      src="/img/dot.png"
      alt="Dot decoration"
      width="200"
    />

    <!-- Nội dung -->
    <div class="container relative space-y-20">
      <!-- Tiêu đề lớn -->
      <div class="text-center space-y-4">
        <UITitle text1="Ẩm thực" text2="đặc sắc" />
        <p class="text-body text-system-primary-100 max-w-2xl mx-auto">
          Khám phá hương vị ẩm thực đa dạng từ truyền thống Việt Nam đến quốc tế, 
          được chế biến bởi đội ngũ đầu bếp chuyên nghiệp
        </p>
      </div>

      <!-- Carousel -->
      <Swiper class="menu-swiper" :slides-per-view="view" :space-between="24">
        <SwiperSlide
          v-for="(food, index) in menu"
          :key="index"
          class="group relative flex aspect-[4/6] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
        >
          <!-- Ảnh nền -->
          <NuxtImg
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.1]"
            :src="food.image"
            width="75vw md:50vw xl:25vw"
          />

          <!-- Nội dung -->
          <div
            class="absolute inset-x-0 bottom-0 space-y-6 bg-gradient-to-t from-system-background from-25% p-6 text-white backdrop-blur-[1.25rem]"
          >
            <!-- Tiêu đề -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="text-h5 font-bold">{{ food.title }}</h3>
                <div class="text-body-2 text-system-gray-40 xl:text-body">
                  {{ food.diningTime }}
                </div>
              </div>
              
              <!-- Thông tin bổ sung -->
              <div class="flex items-center gap-4 text-sm">
                <span class="flex items-center gap-1">
                  <Icon name="ic:baseline-timer" class="text-system-primary-120" />
                  {{ food.cookingTime }} phút
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="ic:baseline-attach-money" class="text-system-primary-120" />
                  {{ food.priceRange }}
                </span>
              </div>
            </div>

            <!-- Mô tả -->
            <p class="text-body-2 xl:text-body opacity-90">
              {{ food.description }}
            </p>

            <!-- Nút xem thêm -->
            <div class="flex justify-end">
              <NuxtLink :to="`/restaurant`">
                <button class="rounded-lg bg-system-primary-100 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-system-primary-80 hover:shadow-lg">
                  Xem thêm
                </button>
              </NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Nút xem tất cả món ăn -->
      <div class="text-center">
        <NuxtLink to="/restaurant">
          <button class="rounded-2xl border-2 border-system-primary-120 bg-system-primary-120 px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-system-primary-100 hover:border-system-primary-100 hover:shadow-xl hover:scale-105">
            Xem tất cả món ăn
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// import type { MenuResponse } from '@/types'
import UITitle from './UI/UITitle.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

/* 輪播 */
// RWD 顯示數量
const { width } = useWindowSize()
const view = computed(() => {
  if (width.value > 992) return 3

  if (width.value > 768) return 2
  return 1.2
})

/* api */
// const { getDelicaciesApi } = useApi()

// api: 取得所有房型
// const { data: menu }: { data: Ref<MenuResponse[] | null> } = await getDelicaciesApi({
//   transform(res: any): RoomResponse[] {
//     return res.result
//   }
// })
const menu = ref([
  {
    title: 'Buffet sáng quốc tế',
    image: 'https://picsum.photos/600/400?random=1',
    diningTime: '07:00 - 10:00',
    cookingTime: 15,
    priceRange: '150k - 300k',
    description:
      'Buffet sáng tại khách sạn Nikko Luxury là một trải nghiệm tuyệt vời với nhiều món ăn đa dạng và phong phú từ Á đến Âu.'
  },
  {
    title: 'Tiệc trà chiều cao cấp',
    image: 'https://picsum.photos/600/400?random=2',
    diningTime: '15:00 - 17:00',
    cookingTime: 10,
    priceRange: '100k - 200k',
    description:
      'Tiệc trà chiều tại khách sạn Nikko Luxury là một trải nghiệm thư giãn và sang trọng với bánh ngọt tinh tế.'
  },
  {
    title: 'Tiệc tối đặc biệt',
    image: 'https://picsum.photos/600/400?random=3',
    diningTime: '18:00 - 21:00',
    cookingTime: 25,
    priceRange: '300k - 800k',
    description:
      'Tiệc tối tại khách sạn Nikko Luxury là một trải nghiệm ẩm thực tuyệt vời với nhiều món ăn ngon được chế biến công phu.'
  }
])
</script>

<style lang="scss" scoped>
:deep(.menu-swiper) {
  @apply overflow-visible;
}
</style>
