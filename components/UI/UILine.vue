<template>
  <div :class="[bg, props.col ? ' w-[1px]' : 'h-[1px]', 'rounded-full']" />
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String as PropType<'black' | 'darkGray' | 'lightGrey' | 'primary' | 'white'>,
    default: 'black'
  },
  col: Boolean
})

const bg = computed(() => {
  return {
    black: 'bg-black',
    white: 'bg-white',
    darkGray: 'bg-system-gray-60',
    lightGrey: 'bg-system-gray-40',
    primary: 'bg-gradient-to-r from-system-primary-100 to-white'
  }[props.color]
})
</script>
