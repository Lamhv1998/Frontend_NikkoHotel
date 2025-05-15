<template>
  <section v-if="rooms" class="section-container">
    <div key="key" class="relative grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-20">
      <!-- Xem trước phòng -->
      <div class="container relative xl:z-0 xl:max-w-full xl:pl-0 xl:pr-5">
        <Swiper
          class="rooms-swiper aspect-[5/4] rounded-lg xl:rounded-l-none"
          :autoplay="{
            delay: 7000,
            disableOnInteraction: false
          }"
          :effect="'fade'"
          :loop="true"
          :modules="[SwiperPagination, SwiperEffectFade, SwiperAutoplay]"
          :pagination="{
            clickable: true
          }"
          @swiper="setSwiperRefs"
        >
          <SwiperSlide v-for="(slide, index) in rooms[currentRoom].imageUrlList" :key="index">
            <NuxtImg class="h-full w-full object-cover" :src="slide" width="50vw" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Trang trí sọc -->
      <div class="absolute -top-[6.5rem] left-1/4 xl:relative xl:left-auto xl:top-auto">
        <div class="w-[120vw] xl:-ml-[8.75rem] xl:w-[56vw] xl:pt-[3.75rem]">
          <NuxtImg src="/img/line3.png" width="100vw" />
        </div>
      </div>

      <!-- Thông tin phòng -->
      <div class="rooms-info-wrapper pointer-events-none xl:absolute xl:inset-0">
        <div class="container xl:grid xl:h-full xl:grid-cols-2 xl:gap-20">
          <div
            class="pointer-events-auto col-start-2 flex flex-col justify-end gap-6 text-white xl:gap-10"
          >
            <!-- Tên phòng và mô tả -->
            <div class="space-y-2">
              <h3 class="text-h4 xl:text-h2">{{ rooms[currentRoom].name }}</h3>
              <p class="text-body-2 xl:text-body">{{ rooms[currentRoom].description }}</p>
            </div>

            <!-- Giá phòng -->
            <div class="text-h5 xl:text-h3">
              {{ useFormatCurrency(rooms[currentRoom].price) }}
            </div>

            <!-- Xem chi tiết phòng -->
            <NuxtLink :to="`/room/${rooms[currentRoom]._id}`">
              <UIHeroButton text="Xem chi tiết" />
            </NuxtLink>

            <!-- Nút chọn phòng -->
            <div class="flex justify-end">
              <button
                class="flex h-14 w-14 items-center justify-center p-4 text-icon-24 text-system-primary-100 transition-colors hover:text-system-primary-120"
                type="button"
                @click="changeRoom('prev')"
              >
                <Icon class="shrink-0" name="ic:baseline-keyboard-arrow-left"></Icon>
              </button>
              <button
                class="flex h-14 w-14 items-center justify-center p-4 text-icon-24 text-system-primary-100 transition-colors hover:text-system-primary-120"
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
  </section>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import type { Swiper } from 'swiper'

/* 輪播 */
// 設定 Refs
const swiperRefs = ref<Swiper | null>(null)
const setSwiperRefs = (swiper: Swiper) => {
  swiperRefs.value = swiper
}

// 當前預覽房型
const currentRoom = ref(0)

// 變更預覽房型
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
const { getRoomsApi } = useApi()

// api: 取得所有房型
const { data: rooms }: { data: Ref<RoomResponse[] | null> } = await getRoomsApi({
  transform(res: any): RoomResponse[] {
    return res.result
  }
})
</script>

<style lang="scss" scoped>
.section-container {
  @apply bg-system-background;
  @include xl {
    background-image: url('/img/bg.png');
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
