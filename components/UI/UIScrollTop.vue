<template>
  <ClientOnly>
    <Transition name="scroll-top">
      <button
        v-if="scrollTopIsShow"
        :class="[
          'ui-scroll-top',
          isWithBase ? 'bottom-6' : 'bottom-4'
        ]"
        @click="scrollTop()"
        aria-label="Scroll to top"
      >
        <Icon name="ic:baseline-keyboard-arrow-up" class="text-icon-lg lg:text-icon-xl" />
      </button>
    </Transition>
  </ClientOnly>
</template>

<script lang="ts" setup>
/* Global properties */
const route = useRoute()

/* Scroll to top functionality */
const { height } = useWindowSize()
const { y } = useWindowScroll({ behavior: 'smooth' })
const scrollTop = () => {
  y.value = 0
}

// Show scroll to top button
const scrollTopIsShow = computed(() => y.value > height.value / 4)

/* Adjust height for mobile interface */
const isWithBase = computed(() => {
  return route.name === 'room-id'
})
</script>

<style lang="scss" scoped>
.ui-scroll-top {
  position: fixed;
  right: var(--spacing-lg);
  z-index: var(--z-fixed);
  display: flex;
  height: 48px;
  width: 48px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: rgba(0, 0, 0, 0.2);
  color: var(--color-text-inverse);
  transition: all var(--transition-normal);
  border: none;
  outline: none;
  
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  @include responsive(xl) {
    right: var(--spacing-xl);
    height: 56px;
    width: 56px;
  }
}

.scroll-top-enter-active {
  transition: all var(--transition-fast);
}

.scroll-top-leave-active {
  transition: all var(--transition-fast);
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
