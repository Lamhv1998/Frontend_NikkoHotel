<template>
  <div class="flex max-w-full items-center gap-4 mb-2">
    <!-- Tiêu đề: luôn hiển thị 1 dòng -->
    <h2
      :class="[
        props.white ? 'text-white' : 'text-system-primary-100',
        'text-h3 xl:text-h1 font-bold whitespace-nowrap'
      ]"
    >
      {{ props.text1 }} {{ props.text2 }}
    </h2>

    <!-- Đường kẻ trang trí -->
    <UILine class="!h-[0.125rem] flex-1" :color="props.white ? 'white' : 'primary'" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  white: Boolean,
  text1: {
    type: String,
    default: 'Tiêu đề'
  },
  text2: {
    type: String,
    default: ''
  }
})
</script>
