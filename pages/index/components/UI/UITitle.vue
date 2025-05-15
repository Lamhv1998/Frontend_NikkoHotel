<template>
  <div class="flex max-w-[19rem] items-center gap-10">
    <!-- Tiêu đề -->
    <h2
      :class="[
        props.white ? 'text-white' : ' text-system-primary-100',
        'space-y-1 text-wrap text-h3 xl:text-h1'
      ]"
    >
      <div>{{ props.text1 }}</div>
      <div>{{ props.text2 }}</div>
    </h2>

    <!-- Đường kẻ trang trí -->
    <UILine class="!h-[0.125rem] flex-1" :color="props.white ? 'white' : 'primary'" />
  </div>
</template>

<script lang="ts" setup>
/* props */
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
