<template>
  <ClientOnly>
    <Transition name="scroll-top">
      <div
        v-if="scrollTopIsShow"
        :class="['ui-scroll-top', isWithBase ? 'bottom-24' : 'bottom-4']"
        @click="scrollTop()"
      >
        <Icon name="ic:baseline-keyboard-arrow-up" />
      </div>
    </Transition>
  </ClientOnly>
</template>

<script lang="ts" setup>
/* Thuộc tính toàn cục */
const route = useRoute()

/* Cuộn lên đầu trang */
const { height } = useWindowSize()
const { y } = useWindowScroll({ behavior: 'smooth' })
const scrollTop = () => {
  y.value = 0
}

// Hiển thị nút cuộn lên đầu trang
const scrollTopIsShow = computed(() => y.value > height.value / 4)

/* Điều chỉnh chiều cao cho giao diện mobile */
const isWithBase = computed(() => {
  return route.name === 'room-id'
})
</script>

<style lang="scss" scoped>
.ui-scroll-top {
  @apply fixed right-4 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/20 text-icon-24 text-white transition-all hover:bg-black/40 hover:shadow xl:bottom-10 xl:right-10 xl:h-14 xl:w-14 xl:text-icon-40;
}

.scroll-top-enter-active {
  transition: all 0.2s ease-out;
}

.scroll-top-leave-active {
  transition: all 0.15s ease-in;
}

.scroll-top-enter-from {
  opacity: 0;
  transform: translateY(-1.5rem);
}

.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(-1.5rem);
}
</style>
