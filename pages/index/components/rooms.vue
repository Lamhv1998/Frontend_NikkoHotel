<template>
  <section v-if="rooms" class="section-container">
    <div class="container space-y-10 xl:space-y-20">
      <!-- Tiêu đề -->
      <div class="text-center space-y-4">
        <p class="text-sub-title text-system-primary-80 xl:text-h6">Khám phá phòng</p>
        <h2 class="text-h3 text-system-primary-120 xl:text-h1">
          Phòng nghỉ sang trọng
        </h2>
        <p class="text-body text-system-primary-100 max-w-2xl mx-auto">
          Trải nghiệm không gian sống đẳng cấp với các loại phòng đa dạng, 
          từ phòng tiêu chuẩn đến suite cao cấp
        </p>
      </div>

      <!-- Carousel phòng -->
      <div class="relative grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-20">
        <!-- Xem trước phòng -->
        <div class="container relative xl:z-0 xl:max-w-full xl:pl-0 xl:pr-5">
          <SwiperComponent
            class="rooms-swiper aspect-[5/4] rounded-2xl xl:rounded-l-none shadow-2xl"
            :autoplay="{
              delay: 7000,
              disableOnInteraction: false
            }"
            :effect="'fade'"
            :loop="true"
            :modules="[Pagination, EffectFade, Autoplay]"
            :pagination="{
              clickable: true
            }"
            @swiper="setSwiperRefs"
          >
            <SwiperSlide v-for="(slide, index) in rooms[currentRoom].imageUrlList" :key="index">
              <NuxtImg class="h-full w-full object-cover" :src="slide" width="50vw" />
            </SwiperSlide>
          </SwiperComponent>
        </div>

        <!-- Trang trí sọc -->
        <div class="absolute -top-[6.5rem] left-1/4 xl:relative xl:left-auto xl:top-auto">
          <div class="w-[120vw] xl:-ml-[8.75rem] xl:w-[56vw] xl:pt-[3.75rem]">
            <img src="/img/line3.png" alt="Line decoration" class="w-full" />
          </div>
        </div>

        <!-- Thông tin phòng -->
        <div class="rooms-info-wrapper pointer-events-none xl:absolute xl:inset-0">
          <div class="container xl:grid xl:h-full xl:grid-cols-2 xl:gap-20">
            <div
              class="pointer-events-auto col-start-2 flex flex-col justify-end gap-6 text-white xl:gap-10"
            >
              <!-- Tên phòng và mô tả -->
              <div class="space-y-4">
                <h3 class="text-h4 xl:text-h2 font-bold">{{ rooms[currentRoom].name }}</h3>
                <p class="text-body-2 xl:text-body opacity-90">{{ rooms[currentRoom].description }}</p>
                
                <!-- Thông tin chi tiết -->
                <div class="grid grid-cols-2 gap-4 text-sm xl:text-base">
                  <div class="flex items-center gap-2">
                    <Icon name="ic:baseline-aspect-ratio" class="text-system-primary-120" />
                    <span>{{ rooms[currentRoom].areaInfo }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ic:baseline-bed" class="text-system-primary-120" />
                    <span>{{ rooms[currentRoom].bedInfo }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ic:baseline-people" class="text-system-primary-120" />
                    <span>Tối đa {{ rooms[currentRoom].maxPeople }} người</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ic:baseline-wifi" class="text-system-primary-120" />
                    <span>WiFi miễn phí</span>
                  </div>
                </div>
              </div>

              <!-- Giá phòng -->
              <div class="space-y-2">
                <p class="text-sm text-system-primary-120">Giá mỗi đêm</p>
                <div class="text-h5 xl:text-h3 font-bold">
                  {{ useFormatCurrency(rooms[currentRoom].price) }}
                </div>
              </div>

              <!-- Xem chi tiết phòng -->
              <NuxtLink :to="`/room/${rooms[currentRoom]._id}`">
                <UIHeroButton text="Xem chi tiết" />
              </NuxtLink>

              <!-- Nút chọn phòng -->
              <div class="flex justify-end gap-4">
                <button
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 p-4 text-icon-24 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110"
                  type="button"
                  @click="changeRoom('prev')"
                >
                  <Icon class="shrink-0" name="ic:baseline-keyboard-arrow-left"></Icon>
                </button>
                <button
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 p-4 text-icon-24 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110"
                  type="button"
                  @click="changeRoom('next')"
                >
                  <Icon class="shrink-0" name="ic:baseline-keyboard-arrow-right"></Icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nút xem tất cả phòng -->
      <div class="text-center">
        <NuxtLink to="/rooms">
          <button class="rounded-2xl border-2 border-system-primary-120 bg-system-primary-120 px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-system-primary-100 hover:border-system-primary-100 hover:shadow-xl hover:scale-105">
            Xem tất cả phòng
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// import type { RoomResponse } from '@/types'
import type { Swiper } from 'swiper'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'

const swiperRefs = ref<Swiper | null>(null)
const setSwiperRefs = (swiper: Swiper) => {
  swiperRefs.value = swiper
}

const currentRoom = ref(0)

const changeRoom = (direction: string) => {
  if (rooms.value) {
    if (direction === 'prev') {
      currentRoom.value = (currentRoom.value - 1 + rooms.value.length) % rooms.value.length
    } else if (direction === 'next') {
      currentRoom.value = (currentRoom.value + 1) % rooms.value.length
    }
    swiperRefs.value?.slideTo(0)
  }
}

/* api */
// const { getRoomsApi } = useApi()

// api: 取得所有房型
// const { data: rooms }: { data: Ref<RoomResponse[] | null> } = await getRoomsApi({
//   transform(res: any): RoomResponse[] {
//     return res.result
//   }
// })
// Dữ liệu mẫu cải tiến
const rooms = ref([
  {
    _id: '1',
    name: 'Phòng Deluxe',
    description: 'Phòng Deluxe với đầy đủ tiện nghi, view thành phố tuyệt đẹp, thiết kế hiện đại và sang trọng.',
    price: 2000000,
    areaInfo: '30 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    imageUrlList: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3'
    ]
  },
  {
    _id: '2',
    name: 'Phòng Suite',
    description: 'Phòng Suite sang trọng với không gian rộng rãi, phòng khách riêng biệt và view toàn cảnh thành phố.',
    price: 3500000,
    areaInfo: '50 m²',
    bedInfo: '1 giường đôi + 1 sofa giường',
    maxPeople: 4,
    imageUrlList: [
      'https://picsum.photos/400/300?random=4',
      'https://picsum.photos/400/300?random=5',
      'https://picsum.photos/400/300?random=6'
    ]
  },
  {
    _id: '3',
    name: 'Phòng Executive',
    description: 'Phòng Executive cao cấp với thiết kế tinh tế, view thành phố tuyệt đẹp và dịch vụ ưu tiên.',
    price: 2800000,
    areaInfo: '40 m²',
    bedInfo: '1 giường đôi',
    maxPeople: 2,
    imageUrlList: [
      'https://picsum.photos/400/300?random=7',
      'https://picsum.photos/400/300?random=8',
      'https://picsum.photos/400/300?random=9'
    ]
  }
])
</script>

<style lang="scss" scoped>
.section-container {
  @apply bg-gradient-to-br from-system-primary-10 to-white;
  @include xl {
    background-image: 
      linear-gradient(135deg, rgba(123, 102, 81, 0.95) 0%, rgba(191, 157, 125, 0.9) 50%, rgba(240, 234, 228, 0.95) 100%),
      url('/img/bg.png');
    background-position: center 150%;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .rooms-info-wrapper {
    background-size: 100%;
    background-image: url('/img/bg.png');
    background-repeat: no-repeat;
    @include xl {
      background: none;
    }
  }
}

:deep(.rooms-swiper) {
  .swiper-pagination {
    @apply bottom-6 flex justify-center gap-2;
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
