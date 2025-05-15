<template>
  <button
    class="rounded-lg border border-black bg-white p-4 text-left transition-colors hover:bg-system-gray-10 disabled:bg-white"
    type="button"
    :disabled="disabled"
  >
    <p class="text-tiny">{{ title }}</p>
    <p class="truncate text-body">{{ date ? date : '--Ngày--' }}</p>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
