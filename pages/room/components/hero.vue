<template>
  <section class="hero xl:p-20">
    <!-- Desktop: Xem trước dạng lưới -->
    <div class="relative hidden grid-cols-12 gap-2 overflow-hidden rounded-[1.25rem] xl:grid">
      <!-- Ảnh chính -->
      <div class="col-span-7 flex aspect-video">
        <NuxtImg class="h-full w-full object-cover" :src="props.images[0]" />
      </div>

      <!-- 4 ảnh nhỏ xem trước -->
      <ol class="col-span-5 grid grid-cols-2 place-content-stretch gap-2">
        <li v-for="(image, index) in props.images.slice(1)" :key="index" class="flex">
          <NuxtImg class="h-full w-full object-cover" :src="image" />
        </li>
      </ol>

      <!-- Nút: Xem thêm -->
      <UIButton
        class="absolute bottom-10 right-10"
        text="Xem thêm"
        variant="secondary"
        @click="show"
      />
    </div>

    <!-- Mobile: Xem trước dạng carousel -->
    <div class="aspect-video xl:hidden">
      <Swiper
        class="room-swiper h-full"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :effect="'fade'"
        :loop="true"
        :modules="[SwiperPagination, SwiperAutoplay, SwiperEffectFade]"
        :pagination="{
          clickable: true
        }"
      >
        <!-- Ảnh xem trước -->
        <SwiperSlide v-for="(slide, index) in props.images" :key="index">
          <NuxtImg class="h-full w-full object-cover" :src="slide" />
        </SwiperSlide>

        <div class="swiper-pagination button">
          <UIButton class="ml-auto" text="Xem thêm" variant="secondary" @click="show" />
        </div>
      </Swiper>
    </div>

    <!-- Lightbox: Xem ảnh -->
    <vue-easy-lightbox :imgs="images" :visible="lightboxShow" loop @hide="close" />
  </section>
</template>

<script lang="ts" setup>
/* props */
const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

/* Xem trước ảnh */
const lightboxShow = ref(false)
const images = computed(() =>
  props.images.map((src, i) => ({ src, title: `${props.name} - ${i + 1}` }))
)
const show = () => (lightboxShow.value = true)
const close = () => (lightboxShow.value = false)
</script>

<style lang="scss" scoped>
:deep(.room-swiper) {
  .swiper-pagination {
    @apply container inset-x-0 bottom-6 flex h-14 items-end gap-2;

    &:not(.button) {
      @apply pr-32;
    }
  }

  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-8 rounded-full bg-system-primary-40 opacity-100 transition-colors hover:bg-system-primary-100;

    &.swiper-pagination-bullet-active {
      @apply w-[3.75rem]  bg-system-primary-100;
    }
  }
  img {
    @apply scale-[1.1] transition-all duration-[6000ms] ease-linear;
  }

  .swiper-slide-active,
  .swiper-slide-prev {
    img {
      @apply scale-100;
    }
  }
}

:deep(.vel-modal) {
  @apply bg-black/40 backdrop-blur-[1.25rem];
}
</style>
