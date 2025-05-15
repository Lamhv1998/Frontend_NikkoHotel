<template>
  <div
    :class="[
      active ? 'cursor-default text-system-primary-100' : 'cursor-pointer text-white',
      'group relative inline-block px-6 py-4 text-title transition-colors hover:text-system-primary-100'
    ]"
  >
    {{ props.text }}
    <div
      :class="[
        active ? 'bg-system-primary-100' : 'bg-transparent',
        'absolute inset-x-1/2 bottom-1 h-1 w-12 -translate-x-1/2 rounded-full transition-colors group-hover:bg-system-primary-100'
      ]"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Item'
  },
  active: Boolean
})
</script>
