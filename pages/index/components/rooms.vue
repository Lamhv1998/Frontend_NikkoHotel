<template>
  <section v-if="rooms" class="section-container bg-background-secondary">
    <div class="container">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <h2 class="text-h2 font-display font-bold text-text-primary lg:text-h1">
          Phòng nghỉ sang trọng
        </h2>
        <p class="mt-4 text-body-lg text-text-secondary lg:text-h5">
          Khám phá các loại phòng độc đáo của chúng tôi
        </p>
      </div>

      <!-- Room Showcase -->
      <div class="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <!-- Room Image Slider -->
        <div class="relative lg:z-10">
          <Swiper
            class="rooms-swiper aspect-[5/4] overflow-hidden rounded-2xl shadow-xl lg:rounded-3xl"
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
              <NuxtImg 
                class="h-full w-full object-cover" 
                :src="slide" 
                width="50vw"
                loading="lazy"
                :alt="`${rooms[currentRoom].name} - Image ${index + 1}`"
              />
            </SwiperSlide>
          </Swiper>
          
          <!-- Room Navigation -->
          <div class="absolute bottom-6 right-6 flex gap-2 lg:bottom-8 lg:right-8">
            <button
              class="flex h-12 w-12 items-center justify-center rounded-full bg-background-primary/90 text-icon-lg text-text-primary transition-all hover:bg-background-primary hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 backdrop-blur-sm"
              type="button"
              @click="changeRoom('prev')"
              aria-label="Previous room"
            >
              <Icon name="ic:baseline-keyboard-arrow-left" />
            </button>
            <button
              class="flex h-12 w-12 items-center justify-center rounded-full bg-background-primary/90 text-icon-lg text-text-primary transition-all hover:bg-background-primary hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 backdrop-blur-sm"
              type="button"
              @click="changeRoom('next')"
              aria-label="Next room"
            >
              <Icon name="ic:baseline-keyboard-arrow-right" />
            </button>
          </div>
        </div>

        <!-- Room Information -->
        <div class="flex flex-col justify-center lg:pl-8">
          <div class="space-y-8">
            <!-- Room Details -->
            <div class="space-y-4">
              <div class="space-y-2">
                <h3 class="text-h3 font-display font-bold text-text-primary lg:text-h2">
                  {{ rooms[currentRoom].name }}
                </h3>
                <p class="text-body text-text-secondary leading-relaxed lg:text-body-lg">
                  {{ rooms[currentRoom].description }}
                </p>
              </div>

              <!-- Price -->
              <div class="flex items-baseline gap-2">
                <span class="text-h4 font-bold text-primary-600 lg:text-h3">
                  {{ useFormatCurrency(rooms[currentRoom].price) }}
                </span>
                <span class="text-body-sm text-text-tertiary">/ đêm</span>
              </div>
            </div>

            <!-- Features -->
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Icon name="ic:outline-king-bed" class="text-icon-md" />
                </div>
                <span class="text-body-sm font-medium text-text-primary">Giường King</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Icon name="ic:outline-people" class="text-icon-md" />
                </div>
                <span class="text-body-sm font-medium text-text-primary">2-4 người</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Icon name="ic:outline-ac-unit" class="text-icon-md" />
                </div>
                <span class="text-body-sm font-medium text-text-primary">Điều hòa</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Icon name="ic:outline-wifi" class="text-icon-md" />
                </div>
                <span class="text-body-sm font-medium text-text-primary">WiFi miễn phí</span>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="flex flex-col gap-4 sm:flex-row">
              <NuxtLink :to="`/rooms`" class="flex-1">
                <button class="w-full rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 text-body-lg font-semibold text-text-inverse transition-all hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-primary">
                  Xem chi tiết
                </button>
              </NuxtLink>
              <NuxtLink :to="`/reserve/${rooms[currentRoom]._id}`" class="flex-1">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute -top-16 left-1/4 hidden lg:block">
        <div class="w-32 opacity-10">
          <NuxtImg src="/img/line3.png" width="128" alt="Decorative line" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Swiper } from 'swiper'

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

// Sample data
const rooms = ref([
  {
    _id: '1',
    name: 'Phòng Deluxe',
    description: 'Phòng Deluxe với đầy đủ tiện nghi hiện đại, không gian rộng rãi và view tuyệt đẹp. Phù hợp cho cả công tác và nghỉ dưỡng.',
    price: '7.000.000 - 30.000.000',
    imageUrlList: [
    'imgur/SAbetYU.jpg',
    'imgur/eMl6NuV.png',
    'imgur/zqBWS1u.png',
    'imgur/24uhdiO.png',
    'imgur/NSnPlgZ.png'
    ]
  },
  {
    _id: '2',
    name: 'Phòng Superior',
    description: 'Phòng Superior với thiết kế sang trọng, nội thất cao cấp và dịch vụ đẳng cấp 5 sao. Trải nghiệm lưu trú hoàn hảo.',
    price: 2500000,
    imageUrlList: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6'
    ]
  },
  {
    _id: '3',
    name: 'Suite Presidential',
    description: 'Suite Presidential - đỉnh cao của sự sang trọng với không gian riêng biệt, dịch vụ butler và view toàn cảnh thành phố.',
    price: 5000000,
    imageUrlList: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=8',
      'https://picsum.photos/800/600?random=9'
    ]
  }
])
</script>

<style lang="scss" scoped>
.section-container {
  background: var(--color-bg-secondary);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(241, 122, 46, 0.02) 0%, rgba(212, 175, 55, 0.02) 100%);
    pointer-events: none;
  }
}

:deep(.rooms-swiper) {
  .swiper-pagination {
    bottom: var(--spacing-6);
    display: flex;
    justify-content: center;
    gap: var(--spacing-2);
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

// Smooth animations
.rooms-swiper {
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }
}

// Responsive adjustments
@media (max-width: 1024px) {
  .section-container {
    &::before {
      background: linear-gradient(135deg, rgba(241, 122, 46, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%);
    }
  }
}
</style>
