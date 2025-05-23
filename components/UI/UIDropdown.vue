<template>
  <div ref="dropdownWrapperRefs" class="relative">
    <div @click="open = !open">
      <slot />
    </div>
    <transition name="dropdown">
      <div
        v-if="open"
        ref="dropdownRefs"
        class="absolute -bottom-4 left-0 w-[16.25rem] translate-y-full overflow-hidden rounded-[1.25rem] bg-white py-3 shadow-md"
      >
        <slot name="item" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const dropdownRefs = ref<null | HTMLElement>(null)
const dropdownWrapperRefs = ref<null | HTMLElement>(null)
const { isOutside: dropdownOutside } = useMouseInElement(dropdownRefs)
const { isOutside: wrapperOutside } = useMouseInElement(dropdownWrapperRefs)

const open = defineModel<boolean>({
  default: false
})

const outsideClose = () => {
  if (open.value && dropdownOutside.value && wrapperOutside.value) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', outsideClose)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', outsideClose)
})
</script>
