<template>
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="isModalVisible"
        class="fixed inset-0 z-[60] overflow-y-auto bg-black/40 backdrop-blur-[1.25rem]"
        @click="close"
      >
        <div :class="[wrapperStyle, 'min-h-full']">
          <div
            ref="modalRefs"
            :class="[
              props.fullscreen ? 'min-h-screen' : modalStyle,
              props.black ? ' bg-system-background' : ' bg-white',
              'overflow-hidden shadow-2xl'
            ]"
          >
            <div
              v-if="$slots.header"
              class="flex items-center justify-between border-b border-system-gray-40 p-4"
            >
              <h2 class="text-h6 xl:text-h5">
                <slot name="header"> </slot>
              </h2>
              <button
                class="flex h-6 w-6 items-center justify-center text-icon-24 transition-colors hover:text-system-primary-100"
                type="button"
                @click="toggleModal"
              >
                <Icon name="ic:baseline-close" />
              </button>
            </div>

            <slot />

            <div
              v-if="$slots.footer"
              :class="[
                footerStyle,
                'flex flex-wrap items-center gap-4 border-t border-system-gray-40 p-3'
              ]"
            >
              <slot name="footer"> </slot>
            </div>

            <slot name="form" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  position: {
    type: String as PropType<'center' | 'bottom'>,
    default: 'center'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  black: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'auto'>,
    default: 'sm'
  }
})

const { $gsap } = useNuxtApp()

const wrapperStyle = computed(() => {
  return (
    !props.fullscreen &&
    {
      center: 'flex items-center justify-center p-3',
      bottom: 'flex flex-col justify-end'
    }[props.position]
  )
})

const modalStyle = computed(() => {
  return (
    !props.fullscreen &&
    {
      center: {
        sm: 'rounded-[1.25rem] sm:max-w-[28rem] container px-0',
        md: 'rounded-[1.25rem] sm:max-w-[54rem] container px-0',
        lg: 'rounded-[1.25rem] sm:max-w-[67rem] container px-0',
        auto: 'rounded-[1.25rem] '
      }[props.size],
      bottom: 'rounded-t-[1.25rem]'
    }[props.position]
  )
})

const footerStyle = computed(() => {
  return {
    center: 'justify-end',
    bottom: 'justify-between'
  }[props.position]
})

/* Điều khiển hiển thị modal */
const isModalVisible = defineModel<Boolean>()
const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value
}
// Nhấn vào nền mờ để đóng modal
const modalRefs = ref(null)
const { isOutside } = useMouseInElement(modalRefs)
const close = () => {
  if (isOutside.value) {
    !props.focus ? toggleModal() : focusModal()
  }
}
// Thiết lập khóa cuộn trang khi mở modal
let windowLock: { value: boolean } | undefined
onMounted(() => {
  windowLock = useScrollLock(document.body)

  watchEffect(() => {
    if (windowLock) {
      windowLock.value = !!isModalVisible.value
    }
  })
})

/* Hiệu ứng focus (làm nổi bật modal) */
const focusModal = () => {
  $gsap.to(modalRefs.value, {
    duration: 0.175,
    scale: 1.02,
    ease: 'ease-in',
    yoyo: true,
    repeat: 1
  })
  $gsap.to(modalRefs.value, { duration: 0.175, scale: 1, ease: 'ease-out', delay: 1 })
}
</script>
