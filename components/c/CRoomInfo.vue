<template>
  <ul class="inline-grid grid-cols-3 gap-4">
    <li
      v-for="(box, index) in boxes"
      :key="index"
      :class="[
        border ? 'border border-system-primary-100' : '',
        'flex aspect-square flex-col justify-center gap-2 rounded-lg  bg-white px-4'
      ]"
    >
      <!-- Icon -->
      <Icon class="text-icon-24 text-system-primary-100" :name="box.icon" />

      <!-- Mô tả -->
      <p class="text-nowrap text-sub-title text-system-gray-80 xl:text-title">
        {{ box.name }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
/* props */
const props = defineProps({
  areaInfo: {
    type: String,
    required: true
  },
  bedInfo: {
    type: String,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  border: Boolean
})

/* Dữ liệu thẻ */
const boxes = computed(() => [
  { icon: 'IconSize', name: props.areaInfo },
  { icon: 'ic:baseline-bed', name: props.bedInfo },
  { icon: 'ic:baseline-person', name: `2-${props.maxPeople} người` }
])
</script>
